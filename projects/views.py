from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Project, ToDoTask
from .serializers import ProjectSerializer, ToDoTaskSerializer


# Create your views here.
class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ToDoTaskModelViewSet(ModelViewSet):
    queryset = ToDoTask.objects.all()
    serializer_class = ToDoTaskSerializer
