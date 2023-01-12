from django.contrib import admin
from projects import models


# Register your models here.

@admin.register(models.Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'repo_link']
    search_fields = ['title']
    list_filter = ['users']
    ordering = ['title']


@admin.register(models.ToDoTask)
class ToDoTaskAdmin(admin.ModelAdmin):
    list_display = ['description', 'project', 'created', 'updated', 'author', 'is_done']
    search_fields = ['description', 'author', 'project']
    list_filter = ['created']
    ordering = ['-created']
