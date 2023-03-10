# Generated by Django 4.1.4 on 2023-01-12 10:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('projects', '0008_alter_todotask_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='project',
            name='created',
        ),
        migrations.RemoveField(
            model_name='project',
            name='updated',
        ),
        migrations.RemoveField(
            model_name='todotask',
            name='deadline',
        ),
        migrations.RemoveField(
            model_name='todotask',
            name='title',
        ),
        migrations.RemoveField(
            model_name='todotask',
            name='user',
        ),
        migrations.AddField(
            model_name='project',
            name='users',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='todotask',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='project',
            name='title',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]
