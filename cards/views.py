from cards.models import Card, Comment
from django.db.models import Count
from django.contrib.auth.models import User
from cards.serializers import CardSerializer, UserSerializer, CommentSerializer
from rest_framework import generics
from rest_framework import renderers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse


@api_view(('GET',))
def api_root(request, format=None):
    return Response({
        'users'     : reverse('user-list', request=request, format=format),
        'cards'     : reverse('card-list', request=request, format=format),
        'ranking'   : reverse('card-ranking', request=request, format=format),
    })

class CardList(generics.ListCreateAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer

    def pre_save(self, obj):
        obj.owner = (self.request.user  if not self.request.user.is_anonymous()
                                        else
                                        User.objects.filter(username='anonymous').first())

class CardRanking(generics.ListAPIView):
    queryset = Card.objects.\
            all().\
            annotate(comments_count=Count('comments')).\
            order_by('-comments_count', 'id')
    serializer_class = CardSerializer

class CardDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer

    def pre_save(self, obj):
        obj.owner = (self.request.user  if not self.request.user.is_anonymous()
                                        else
                                        User.objects.filter(username='anonymous').first())


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CommentList(generics.ListCreateAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        return Comment.objects.filter(card=self.kwargs['pk']).order_by('-created', 'id')

    def pre_save(self, obj):
        obj.owner = (self.request.user  if not self.request.user.is_anonymous()
                                        else
                                        User.objects.filter(username='anonymous').first())
        obj.card = Card.objects.filter(id=self.kwargs['pk']).first()

class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def pre_save(self, obj):
        obj.owner = (self.request.user  if not self.request.user.is_anonymous()
                                        else
                                        User.objects.filter(username='anonymous').first())
