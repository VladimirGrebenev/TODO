from django.core.management.base import BaseCommand

from users.models import CustomUser

class Command(BaseCommand):

    def handle(self, *args, **options):
        # добавляем тестовых пользователей
        test_users_list = []
        CustomUser.objects.filter(email__startswith='test').delete()
        for i in range(3):
            CustomUser.objects.create_user(
                            first_name=f'testFirst{i}',
                            last_name=f'testLast{i}',
                            user_name=f'testName{i}',
                            email=f'testMail{i}@mail.ru',
                            password=f'test{i}'
            )
        #     test_users_list.append(CustomUser(
        #         first_name=f'testFirst{i}',
        #         last_name=f'testLast{i}',
        #         user_name=f'testName{i}',
        #         email=f'testMail{i}@mail.ru',
        #         password=f'test{i}'
        #     ))
        #
        # CustomUser.objects.bulk_create(test_users_list)

        # добавляем тестового админа superuser
        CustomUser.objects.filter(email='admin@mail.ru').delete()
        CustomUser.objects.create_superuser('admin@mail.ru', 'admin', user_name='admin')
