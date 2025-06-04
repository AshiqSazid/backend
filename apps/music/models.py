from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Song(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='songs')
    title = models.CharField(max_length=255)
    file = models.FileField(upload_to='songs/')
    url = models.URLField(null=True, blank=True)
    is_analyzed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class SongChunk(models.Model):
    song = models.ForeignKey(Song, on_delete=models.CASCADE, related_name='chunks')
    chunk_number = models.IntegerField()
    total_chunks = models.IntegerField()
    chunk_data = models.BinaryField()
    unique_id = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['song', 'chunk_number']
        ordering = ['chunk_number']
