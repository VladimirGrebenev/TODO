from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer
from rest_framework.relations import StringRelatedField
from .models import Project, ToDoTask


class ProjectModelSerializer(ModelSerializer):
    users = StringRelatedField(many=True)
    class Meta:
        model = Project
        fields = '__all__'


class ToDoTaskHyperlinkedModelSerializer(HyperlinkedModelSerializer):
    # project = StringRelatedField()
    # author = StringRelatedField()
    class Meta:
        model = ToDoTask
        fields = '__all__'


