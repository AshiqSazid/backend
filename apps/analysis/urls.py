from django.urls import path
from . import views

urlpatterns = [
    path('<int:analysis_id>/', views.get_analysis, name='get-analysis'),
]
