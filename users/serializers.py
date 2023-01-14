from rest_framework.serializers import ModelSerializer
from .models import CustomUser

class UserModelSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'user_name', 'email', 'date_joined', 'updated', 'is_staff', 'is_active']
