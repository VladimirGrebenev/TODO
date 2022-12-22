from django.core.management.base import BaseCommand

from users.models import User

class Command(BaseCommand):

    def handle(self, *args, **options):
        test_users_list = []
        for i in range(3):
            test_users_list.append(User(
                first_name=f'testuserFN{i}',
                last_name=f'testuserLN{i}',
                username=f'testUN{i}',
                user_email=f'testUM{i}@mail.ru'
            ))

        User.objects.bulk_create(test_users_list)
