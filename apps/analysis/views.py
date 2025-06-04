from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import SongAnalysis
from .serializers import SongAnalysisSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_analysis(request, analysis_id):
    try:
        analysis = SongAnalysis.objects.get(
            id=analysis_id, 
            song__user=request.user
        )
        serializer = SongAnalysisSerializer(analysis)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except SongAnalysis.DoesNotExist:
        return Response(
            {'error': 'Analysis not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )
