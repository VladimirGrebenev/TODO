from django.db import models
from users.models import CustomUser
from uuid import uuid4


# Create your models here.

class Project(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True, verbose_name='id')
    title = models.CharField(max_length=50, unique=True)
    users = models.ManyToManyField(CustomUser)
    repo_link = models.CharField(max_length=128, blank=True)

    class Meta:
        verbose_name = ("Проект")
        verbose_name_plural = ("Проекты")

    def __str__(self):
        return self.title


class ToDoTask(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True, verbose_name='id')
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    description = models.CharField(max_length=500)
    created = models.DateTimeField(auto_now_add=True, verbose_name='Created')
    updated = models.DateTimeField(auto_now=True, verbose_name='Updated')
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    is_done = models.BooleanField(default=False)


    class Meta:
        verbose_name = ("Задача")
        verbose_name_plural = ("Задачи")

    def __str__(self):
        return self.description
