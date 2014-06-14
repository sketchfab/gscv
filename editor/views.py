from django.shortcuts import render
from cards.models import Card

def index(request, **kwargs):
    context = {}

    if 'key' in kwargs and Card.objects.filter(id=kwargs['key']).exists():
        context = {'cardID': kwargs['key']}

    return render(request, 'editor/index.html', context)
