from django.contrib.auth.models import User
from rest_framework import serializers
from cards.models import Card

class CardSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.HyperlinkedIdentityField(source='owner.name',
            view_name='user-detail')

    class Meta:
        model = Card
        fields = ('id', 'color', 'background', 'radius', 'name', 'job', 'email',
                'url', 'owner')


class UserSerializer(serializers.ModelSerializer):
    cards = serializers.HyperlinkedRelatedField(many=True,
            view_name='card-detail')

    class Meta:
        model = User
        fields = ('id', 'username', 'cards')
