from django.urls import path
from .views import UserListAPIView

app_name = 'users'
urlpatterns = [
    path('', UserListAPIView.as_view()),
]