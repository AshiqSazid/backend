from moodsinger_backend.moodsinger.moodsinger.celery import shared_task
from apps.music.models import Song
from .models import SongAnalysis
from .viral_analyzer import ViralSongAnalyzer
from .music_detector import MusicDetector
import os

@shared_task
def analyze_song_task(song_id):
    """Celery task to analyze a song"""
    try:
        song = Song.objects.get(id=song_id)
        
        # Create or get analysis instance
        analysis, created = SongAnalysis.objects.get_or_create(song=song)
        
        # Get file path
        file_path = song.file.path
        
        # Initialize analyzers
        viral_analyzer = ViralSongAnalyzer()
        music_detector = MusicDetector()
        
        # Extract audio features
        audio_features = viral_analyzer.extract_audio_features(file_path)
        
        if audio_features:
            # Get emotion predictions
            emotions = viral_analyzer.analyze_emotion_impact(audio_features)
            
            # Update analysis with emotions
            for emotion, score in emotions.items():
                setattr(analysis, emotion, score)
            
            # Update audio features
            analysis.tempo = audio_features['tempo']
            analysis.mfcc_features = audio_features['mfcc_features']
            analysis.spectral_features = audio_features['spectral_features']
            analysis.chroma_features = audio_features['chroma_features']
            analysis.duration_ms = audio_features['duration_ms']
            
            # Predict virality
            popularity = viral_analyzer.predict_virality(
                audio_features,
                artist_popularity=50,  # Default value
                year=2024
            )
            analysis.track_popularity_prediction = popularity
        
        # Analyze stems
        stem_results = music_detector.analyze_stems(file_path)
        
        if stem_results:
            # Update energy proportions
            for stem_name, proportion in stem_results['proportions'].items():
                setattr(analysis, f'{stem_name}_energy', proportion)
            
            # Update embeddings
            for stem_name, embedding in stem_results['embeddings'].items():
                setattr(analysis, f'{stem_name}_embedding', embedding)
        
        # Mark as complete
        analysis.is_complete = True
        analysis.save()
        
        # Update song status
        song.is_analyzed = True
        song.save()
        
        return f"Analysis completed for song {song_id}"
        
    except Exception as e:
        # Log error
        if 'analysis' in locals():
            analysis.error_message = str(e)
            analysis.save()
        return f"Error analyzing song {song_id}: {str(e)}"