import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from .models import CustomUser, Project, ToDoTask
from .views import ProjectModelViewSet


# Create your tests here.

class TestProjectViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/projects/', {'title': 'Новый проект'}, format='json')
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_auth_user(self):
        # у пользователя не хватает прав доступа к запрашиваемому ресурсу
        factory = APIRequestFactory()
        request = factory.post('/api/projects/', {'title': 'Новый проект'}, format='json')
        admin = CustomUser.objects.create_user('user@mail.ru', 'iddqd', )
        force_authenticate(request, admin)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_detail(self):
        project = Project.objects.create(title='Ещё один новый проект')
        client = APIClient()
        response = client.get(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        project = Project.objects.create(title='Ещё проект')
        client = APIClient()
        response = client.put(f'/api/projects/{project.id}/', {'title': 'Просто проект'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

class TestTodoViewSet(APITestCase):

    def test_get_list(self):
        response = self.client.get('/api/todo-tasks/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail(self):
        todo_task = mixer.blend(ToDoTask, description='Посадить дерево')
        response = self.client.get(f'/api/todo-tasks/{todo_task.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_todo_task = json.loads(response.content)
        self.assertEqual(response_todo_task['description'], 'Посадить дерево')
