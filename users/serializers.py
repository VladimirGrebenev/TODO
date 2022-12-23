from rest_framework.serializers import HyperlinkedModelSerializer
from .models import CustomUser

class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'user_name', 'email', 'password', 'date_joined', 'updated', 'is_staff', 'is_active']
