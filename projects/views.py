from rest_framework.viewsets import ModelViewSet
from .models import Project, ToDoTask
from .serializers import ProjectModelSerializer, ToDoTaskModelSerializer, ToDoTaskSerializerBase
from rest_framework.pagination import LimitOffsetPagination
from .filters import ProjectFilter, ToDoTaskFilter


# Create your views here.
class ToDoTaskLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter


class ToDoTaskModelViewSet(ModelViewSet):
    queryset = ToDoTask.objects.all()
    serializer_class = ToDoTaskModelSerializer
    pagination_class = ToDoTaskLimitOffsetPagination
    filterset_class = ToDoTaskFilter

    def perform_destroy(self, instance):
        self.is_done = True

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return ToDoTaskModelSerializer
        return ToDoTaskSerializerBase
