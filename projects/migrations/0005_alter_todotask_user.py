# Generated by Django 4.1.4 on 2023-01-12 07:57

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('projects', '0004_alter_project_repo_link'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todotask',
            name='user',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
    ]
