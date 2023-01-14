from rest_framework.viewsets import ModelViewSet
from .models import Project, ToDoTask
from .serializers import ProjectModelSerializer, ToDoTaskModelSerializer
from rest_framework.pagination import LimitOffsetPagination


# Create your views here.
class ToDoTaskLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 3


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


class ToDoTaskModelViewSet(ModelViewSet):
    queryset = ToDoTask.objects.all()
    serializer_class = ToDoTaskModelSerializer
    pagination_class = ToDoTaskLimitOffsetPagination
