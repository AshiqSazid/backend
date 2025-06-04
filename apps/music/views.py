import os
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.paginator import Paginator
from django.db.models import Q
from .models import Song, SongChunk
from .serializers import SongSerializer, SongListSerializer
from apps.analysis.tasks import analyze_song_task # type: ignore

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def upload_song(request):
    # Handle chunk upload
    chunk_number = request.data.get('chunkNumber')
    total_chunks = request.data.get('totalChunks')
    unique_id = request.data.get('uniqueId')
    original_name = request.data.get('originalname', 'Untitled')
    
    if chunk_number is not None and total_chunks is not None:
        # This is a chunked upload
        chunk_data = request.FILES['file'].read()
        
        # Create or get song instance
        song, created = Song.objects.get_or_create(
            user=request.user,
            title=original_name,
            defaults={'file': None}
        )
        
        # Save chunk
        SongChunk.objects.create(
            song=song,
            chunk_number=int(chunk_number),
            total_chunks=int(total_chunks),
            chunk_data=chunk_data,
            unique_id=unique_id
        )
        
        # Check if all chunks are uploaded
        uploaded_chunks = SongChunk.objects.filter(
            song=song,
            unique_id=unique_id
        ).count()
        
        if uploaded_chunks == int(total_chunks):
            # Combine chunks and save file
            chunks = SongChunk.objects.filter(
                song=song,
                unique_id=unique_id
            ).order_by('chunk_number')
            
            # Create the complete file
            file_path = f'songs/{unique_id}_{original_name}'
            full_path = os.path.join('media', file_path)
            
            os.makedirs(os.path.dirname(full_path), exist_ok=True)
            
            with open(full_path, 'wb') as f:
                for chunk in chunks:
                    f.write(chunk.chunk_data)
            
            # Update song with file path
            song.file = file_path
            song.save()
            
            # Clean up chunks
            chunks.delete()
            
            # Trigger analysis
            analyze_song_task.delay(song.id)
            
            return Response({
                'message': 'Upload complete',
                'song_id': song.id
            }, status=status.HTTP_201_CREATED)
        
        return Response({
            'message': f'Chunk {chunk_number} uploaded successfully'
        }, status=status.HTTP_200_OK)
    
    else:
        # Handle regular file upload
        serializer = SongSerializer(data=request.data)
        if serializer.is_valid():
            song = serializer.save(user=request.user)
            
            # Trigger analysis
            analyze_song_task.delay(song.id)
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_songs(request):
    page = request.GET.get('page', 1)
    limit = request.GET.get('limit', 10)
    
    songs = Song.objects.filter(user=request.user)
    paginator = Paginator(songs, limit)
    
    try:
        songs_page = paginator.page(page)
    except:
        songs_page = paginator.page(1)
    
    serializer = SongListSerializer(songs_page, many=True)
    
    return Response({
        'data': serializer.data,
        'pagination': {
            'totalItems': paginator.count,
            'totalPages': paginator.num_pages,
            'currentPage': songs_page.number,
            'hasNext': songs_page.has_next(),
            'hasPrevious': songs_page.has_previous()
        }
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_song_count(request):
    count = Song.objects.filter(user=request.user).count()
    return Response({'count': count}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def analyze_song(request, song_id):
    try:
        song = Song.objects.get(id=song_id, user=request.user)
        
        # Get or create analysis
        analysis = getattr(song, 'analysis', None)
        
        if analysis:
            return Response({
                'request_id': analysis.id,
                'title': song.title,
                'status': 'completed' if song.is_analyzed else 'processing'
            }, status=status.HTTP_200_OK)
        else:
            # Trigger analysis if not exists
            analyze_song_task.delay(song.id)
            return Response({
                'message': 'Analysis started',
                'title': song.title,
                'status': 'processing'
            }, status=status.HTTP_200_OK)
            
    except Song.DoesNotExist:
        return Response({'error': 'Song not found'}, status=status.HTTP_404_NOT_FOUND)
