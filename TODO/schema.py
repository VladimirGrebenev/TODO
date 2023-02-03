import graphene
from graphene_django import DjangoObjectType
from users.models import CustomUser
from projects.models import ToDoTask, Project


class CustomUserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = '__all__'


class ToDoTaskType(DjangoObjectType):
    class Meta:
        model = ToDoTask
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class Query(graphene.ObjectType):
    all_users = graphene.List(CustomUserType)
    all_todos = graphene.List(ToDoTaskType)
    all_projects = graphene.List(ProjectType)
    user_by_user_name = graphene.Field(CustomUserType, user_name=graphene.String(required=True))
    todos_by_user_name = graphene.List(ToDoTaskType, user_name=graphene.String(required=False))

    def resolve_all_users(root, info):
        return CustomUser.objects.all()

    def resolve_user_by_user_name(self, info, user_name):
        try:
            return CustomUser.objects.get(user_name=user_name)
        except CustomUser.DoesNotExist:
            return None

    def resolve_all_todos(root, info):
        return ToDoTask.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_todos_by_user_name(self, info, user_name=None):
        todos = ToDoTask.objects.all()
        if user_name:
            todos = todos.filter(author__user_name=user_name)
        return todos

schema = graphene.Schema(query=Query)
