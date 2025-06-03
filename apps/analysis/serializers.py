from rest_framework import serializers
from .models import SongAnalysis

class SongAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = SongAnalysis
        fields = [
            'id', 'uplifting', 'distracting', 'reappraisal', 'motivating',
            'relaxing', 'suppressing', 'destressing', 'tempo', 'track_popularity_prediction',
            'vocal_energy', 'drums_energy', 'bass_energy', 'other_energy',
            'is_complete', 'created_at'
        ]
