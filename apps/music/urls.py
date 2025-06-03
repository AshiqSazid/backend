from django.urls import path
from . import views

urlpatterns = [
    path('upload/', views.upload_song, name='upload-song'),
    path('', views.list_songs, name='list-songs'),
    path('count/', views.get_song_count, name='song-count'),
    path('analyse/<int:song_id>/', views.analyze_song, name='analyze-song'),
]