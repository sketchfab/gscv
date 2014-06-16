from django.contrib.auth.models import User
from rest_framework import serializers
from cards.models import Card, Comment

class CardSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.HyperlinkedIdentityField(view_name='user-detail')
    comments = serializers.HyperlinkedIdentityField(view_name='comment-list')
    comments_count = serializers.Field(source='comments.count')

    class Meta:
        model = Card
        url_field_name = 'card_url'
        fields = ('id', 'card_url', 'color', 'background', 'radius', 'name', 'job', 'email',
                'url', 'owner', 'comments', 'comments_count')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    cards = serializers.HyperlinkedRelatedField(many=True, view_name='card-detail')
    comments = serializers.HyperlinkedRelatedField(many=True, view_name='comment-detail')

    class Meta:
        model = User
        url_field_name = 'user_url'
        fields = ('id', 'user_url', 'username', 'cards', 'comments')


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.HyperlinkedRelatedField(view_name='user-detail')
    name = serializers.Field(source='owner.username')
    card = serializers.HyperlinkedRelatedField(view_name='card-detail')

    class Meta:
        model = Comment
        url_field_name = 'comment_url'
        fields = ('id', 'comment_url', 'owner', 'card', 'name', 'text')
