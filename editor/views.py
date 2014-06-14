from django.shortcuts import render
from cards.models import Card

def index(request, **kwargs):
    context = {}

    if 'pk' in kwargs and Card.objects.filter(id=kwargs['pk']).exists():
        context = {'cardID': kwargs['pk']}
    elif 'key' in kwargs:
        c = Card.objects.filter(url=kwargs['key'])

        if c.exists():
            context = {'cardID': c.first().id}

    return render(request, 'editor/index.html', context)
