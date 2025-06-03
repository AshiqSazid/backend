from django.db import models
from apps.music.models import Song

class SongAnalysis(models.Model):
    song = models.OneToOneField(Song, on_delete=models.CASCADE, related_name='analysis')
    
    # Emotion scores
    uplifting = models.FloatField(default=0.0)
    distracting = models.FloatField(default=0.0)
    reappraisal = models.FloatField(default=0.0)
    motivating = models.FloatField(default=0.0)
    relaxing = models.FloatField(default=0.0)
    suppressing = models.FloatField(default=0.0)
    destressing = models.FloatField(default=0.0)
    
    # Audio features
    tempo = models.FloatField(null=True, blank=True)
    mfcc_features = models.JSONField(default=list)
    spectral_features = models.JSONField(default=list)
    chroma_features = models.JSONField(default=list)
    
    # Viral prediction
    artist_popularity = models.IntegerField(default=0)
    year = models.IntegerField(null=True, blank=True)
    duration_ms = models.IntegerField(null=True, blank=True)
    track_popularity_prediction = models.FloatField(null=True, blank=True)
    
    # Stem analysis (from music detection)
    vocal_energy = models.FloatField(default=0.0)
    drums_energy = models.FloatField(default=0.0)
    bass_energy = models.FloatField(default=0.0)
    other_energy = models.FloatField(default=0.0)
    
    vocal_embedding = models.JSONField(default=list)
    drums_embedding = models.JSONField(default=list)
    bass_embedding = models.JSONField(default=list)
    other_embedding = models.JSONField(default=list)
    
    # Analysis metadata
    is_complete = models.BooleanField(default=False)
    error_message = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Analysis for {self.song.title}"