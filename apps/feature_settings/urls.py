from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_settings, name='get-settings'),
    path('update/', views.update_settings, name='update-settings'),
]
