from django.urls import include, path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('google/', views.google_auth, name='google-auth'),
    path('api/auth/', include('apps.accounts.urls')), 
]