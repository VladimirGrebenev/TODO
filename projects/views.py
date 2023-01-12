from rest_framework.viewsets import ModelViewSet
from .models import Project, ToDoTask
from .serializers import ProjectModelSerializer, ToDoTaskHyperlinkedModelSerializer


# Create your views here.
class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


class ToDoTaskModelViewSet(ModelViewSet):
    queryset = ToDoTask.objects.all()
    serializer_class = ToDoTaskHyperlinkedModelSerializer
