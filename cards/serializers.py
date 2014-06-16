from django.contrib.auth.models import User
from rest_framework import serializers
from cards.models import Card

class CardSerializer(serializers.ModelSerializer):
    owner = serializers.Field(source='owner.username')

    class Meta:
        model = Card
        fields = ('id', 'color', 'background', 'radius', 'name', 'job', 'email',
                'url', 'owner')


class UserSerializer(serializers.ModelSerializer):
    cards = serializers.PrimaryKeyRelatedField(many=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'cards')
