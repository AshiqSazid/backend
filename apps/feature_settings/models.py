from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class FeatureSettings(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='feature_settings')
    EmotionAnalysis = models.BooleanField(default=True)
    EmotionTagging = models.BooleanField(default=True)
    TargetAudience = models.BooleanField(default=True)
    PlaylistRecommendations = models.BooleanField(default=True)
    MusicImprovementRecommendation = models.BooleanField(default=True)
    CollaborationMatching = models.BooleanField(default=True)
    TrendAnalysis = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Settings for {self.user.email}"
