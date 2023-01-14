# Generated by Django 4.1.4 on 2023-01-12 08:44

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('projects', '0006_remove_project_name_remove_todotask_name_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='todotask',
            name='user',
        ),
        migrations.AddField(
            model_name='todotask',
            name='user',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL),
        ),
    ]
