from rest_framework.serializers import HyperlinkedModelSerializer, StringRelatedField
from .models import Project, ToDoTask

class ProjectSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        exclude = ['users']


class ToDoTaskSerializer(HyperlinkedModelSerializer):
    project = ProjectSerializer()
    users = StringRelatedField(many=True)
    class Meta:
        model = ToDoTask
        exclude = '__aLL__'
