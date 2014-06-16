from cards.models import Card
from django.contrib.auth.models import User
from cards.serializers import CardSerializer
from cards.serializers import UserSerializer
from rest_framework import generics
from rest_framework import renderers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse


@api_view(('GET',))
def api_root(request, format=None):
    return Response({
        'users' : reverse('user-list', request=request, format=format),
        'cards' : reverse('card-list', request=request, format=format)
    })

class CardList(generics.ListCreateAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer

    def pre_save(self, obj):
        obj.owner = (self.request.user  if not self.request.user.is_anonymous()
                                        else User.objects.first())

class CardDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer

    def pre_save(self, obj):
        obj.owner = (self.request.user  if not self.request.user.is_anonymous()
                                        else User.objects.first())


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
