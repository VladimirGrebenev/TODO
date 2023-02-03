from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework import mixins, viewsets, generics
from .models import CustomUser
from .serializers import UserModelSerializer, UserModelSerializerFull


# Create your views here.
class UserCustomViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                        mixins.UpdateModelMixin, viewsets.GenericViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = CustomUser.objects.all()
    serializer_class = UserModelSerializer

    def get_queryset(self):
        return CustomUser.objects.filter(is_active=True)

class UserListAPIView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == '0.2':
            return UserModelSerializerFull
        return UserModelSerializer
