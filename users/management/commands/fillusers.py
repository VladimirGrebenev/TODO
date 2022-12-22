from django.core.management.base import BaseCommand

from users.models import User as User_TODO
from django.contrib.auth.models import User

class Command(BaseCommand):

    def handle(self, *args, **options):
        # добавляем тестовых пользователей
        test_users_list = []
        User_TODO.objects.filter(username__startswith='testUN').delete()
        for i in range(3):
            test_users_list.append(User_TODO(
                first_name=f'testuserFN{i}',
                last_name=f'testuserLN{i}',
                username=f'testUN{i}',
                user_email=f'testUM{i}@mail.ru'
            ))

        User_TODO.objects.bulk_create(test_users_list)

        # добавляем тестового админа superuser
        User.objects.filter(email='admin@mail.ru').delete()
        User.objects.create_superuser('admin', 'admin@mail.ru', 'admin')