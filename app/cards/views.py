from rest_framework import status
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from cards.models import Card
from cards.serializers import CardSerializer

from django.template import RequestContext
from django.shortcuts import render_to_response
from django.http import HttpResponse


def index(request):
    context = RequestContext(request)
    return render_to_response('base/index.html', context)

@csrf_exempt
@api_view(['GET', 'POST'])
def card_list(request):
    """
    List all cards, or create a new card.
    """
    if request.method == 'GET':
        cards = Card.objects.all()
        serializer = CardSerializer(cards, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
def card_detail(request, pk):
    """
    Retrieve, update or delete a card instance.
    """
    try:
        card = Card.objects.get(title=pk)
    except Card.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CardSerializer(card)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CardSerializer(card, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        card.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
