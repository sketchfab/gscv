from django.forms import widgets
from rest_framework import serializers
from cards.models import Card

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ('id', 'color', 'background', 'radius', 'name', 'job', 'email',
                'url')
