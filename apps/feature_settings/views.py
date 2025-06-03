from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import FeatureSettings
from .serializers import FeatureSettingsSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_settings(request):
    settings, created = FeatureSettings.objects.get_or_create(user=request.user)
    serializer = FeatureSettingsSerializer(settings)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_settings(request):
    settings, created = FeatureSettings.objects.get_or_create(user=request.user)
    
    # Update settings from request data
    settings_data = request.data.get('settings', {})
    
    for key, value in settings_data.items():
        if hasattr(settings, key):
            setattr(settings, key, value)
    
    settings.save()
    
    serializer = FeatureSettingsSerializer(settings)
    return Response(serializer.data, status=status.HTTP_200_OK)
