from django.db import models
from uuid import uuid4
from rest_framework import serializers
# Create your models here.

class User(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True, verbose_name='id')
    first_name = models.CharField(max_length=64, verbose_name='firstname')
    last_name = models.CharField(max_length=64, verbose_name='lastname')
    username = models.CharField(max_length=64, verbose_name='username')
    user_email = models.EmailField(max_length=256, unique=True, blank=False, verbose_name='email')
    created = models.DateTimeField(null=True, blank=True)
    updated = models.DateTimeField(null=True, blank=True)
    deleted = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.id} {self.username}"

    def delete(self, *args):
        self.deleted = True
        self.save()

    class Meta:
        verbose_name = ("Пользователь TODO")
        verbose_name_plural = ("Пользователи TODO")
        ordering = ("last_name",)
