from rest_framework.serializers import HyperlinkedModelSerializer, StringRelatedField
from .models import Project, ToDoTask

class ProjectSerializer(HyperlinkedModelSerializer):
    users = StringRelatedField(many=True)
    class Meta:
        model = Project
        fields = '__all__'


class ToDoTaskSerializer(HyperlinkedModelSerializer):
    project = ProjectSerializer()
    auther = StringRelatedField()
    class Meta:
        model = ToDoTask
        fields = '__all__'


