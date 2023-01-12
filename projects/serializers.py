from rest_framework.serializers import HyperlinkedModelSerializer, StringRelatedField , ModelSerializer
from .models import Project, ToDoTask

class ProjectModelSerializer(ModelSerializer):
    # users = StringRelatedField(many=True)
    class Meta:
        model = Project
        fields = '__all__'


class ToDoTaskModelSerializer(ModelSerializer):
    project = ProjectModelSerializer()
    auther = StringRelatedField()
    class Meta:
        model = ToDoTask
        fields = '__all__'


