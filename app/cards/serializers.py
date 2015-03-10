from django.forms import widgets
from rest_framework import serializers
from cards.models import Card

#
class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ('id', 'title', 'color', 'background', 'avatar', 'radius')
        # fields = ('id', 'title', 'color', 'description', 'job', 'name', 'phone', 'orientation', 'radius')
