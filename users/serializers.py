from rest_framework.serializers import HyperlinkedModelSerializer
from .models import CustomUser

class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name', 'user_name', 'email',]

class UserModelSerializerFull(HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name', 'user_name', 'email',
                  'date_joined', 'updated', 'is_staff', 'is_active', 'is_superuser']