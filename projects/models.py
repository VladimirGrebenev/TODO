from django.db import models
from django.utils import timezone

from users.models import CustomUser
# Create your models here.

class Project(models.Model):
    name = models.CharField(max_length=32)
    created = models.DateTimeField(default=timezone.now, verbose_name='Created')
    repo_link = models.CharField(max_length=128)


    class Meta:
        verbose_name = ("Проект")
        verbose_name_plural = ("Проекты")

    def __str__(self):
        return self.name

class ToDoTask(models.Model):
    name = models.CharField(max_length=32)
    description = models.CharField(max_length=128)
    created = models.DateTimeField(default=timezone.now, verbose_name='Created')
    updated = models.DateTimeField(default=timezone.now, verbose_name='Updated')
    user = models.ForeignKey(CustomUser, models.PROTECT)
    is_done = models.BooleanField(default=False)
    project = models.OneToOneField(Project, on_delete=models.CASCADE)

    class Meta:
        verbose_name = ("Задача")
        verbose_name_plural = ("Задачи")

    def __str__(self):
        return f"{self.name}: {self.description}"

