from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from uuid import uuid4

from .managers import CustomUserManager

# Create your models here.

class CustomUser(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(default=uuid4, primary_key=True, verbose_name='id')
    first_name = models.CharField(max_length=64, verbose_name='firstname')
    last_name = models.CharField(max_length=64, verbose_name='lastname')
    user_name = models.CharField(max_length=64, verbose_name='username')
    email = models.EmailField(max_length=256, unique=True, blank=False, verbose_name='email')
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True, verbose_name="Created")
    updated = models.DateTimeField(auto_now=True, verbose_name="Edited")
    deleted = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self) -> str:
        return f"{self.user_name}"

    def delete(self, *kwargs):
        self.deleted = True
        self.save()

    class Meta:
        verbose_name = ("Пользователь TODO")
        verbose_name_plural = ("Пользователи TODO")
        ordering = ("-date_joined",)
