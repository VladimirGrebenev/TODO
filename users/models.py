from django.db import models
from uuid import uuid4
# Create your models here.

class User(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    first_name = models.CharField(max_length=64, verbose_name='firstname')
    last_name = models.CharField(max_length=64, verbose_name='lastname')
    username = models.CharField(max_length=64, default=f'{first_name}{last_name}', verbose_name='name')
    user_email = models.EmailField(max_length=256, unique=True, blank=False, verbose_name='email')
