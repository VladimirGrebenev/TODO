from django_filters import rest_framework as filters, DateFromToRangeFilter
from .models import Project, ToDoTask


class ProjectFilter(filters.FilterSet):
    title = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['title']


class ToDoTaskFilter(filters.FilterSet):
    created = DateFromToRangeFilter()

    class Meta:
        model = ToDoTask
        fields = ['project', 'created']
