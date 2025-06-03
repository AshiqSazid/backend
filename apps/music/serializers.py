from rest_framework import serializers
from .models import Song

class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ['id', 'title', 'file', 'url', 'is_analyzed', 'created_at']
        read_only_fields = ['is_analyzed', 'created_at']

class SongListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ['id', 'title', 'is_analyzed', 'created_at']