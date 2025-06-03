from rest_framework import serializers
from .models import FeatureSettings

class FeatureSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeatureSettings
        fields = [
            'EmotionAnalysis', 'EmotionTagging', 'TargetAudience',
            'PlaylistRecommendations', 'MusicImprovementRecommendation',
            'CollaborationMatching', 'TrendAnalysis'
        ]