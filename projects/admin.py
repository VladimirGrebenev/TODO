from django.contrib import admin
from projects import models

# Register your models here.

@admin.register(models.Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'created', 'repo_link']
    search_fields = ['name']
    list_filter = ['created']
    ordering = ['-created']

@admin.register(models.ToDoTask)
class ToDoTaskAdmin(admin.ModelAdmin):
    list_display = ['name', 'project', 'id', 'description', 'created', 'updated', 'user', 'is_done']
    search_fields = ['name', 'user']
    list_filter = ['created']
    ordering = ['-project', '-created']

