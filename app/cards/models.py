from django.db import models


class Info(models.Model):
    fontsize = models.CharField(max_length=100, blank=True)
    text = models.CharField(max_length=100, blank=True, default='')
    x = models.CharField(max_length=100, blank=True)
    y = models.CharField(max_length=100, blank=True)

class Card(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='', unique=True)
    color = models.CharField(max_length=100, blank=True, default='')
    radius = models.CharField(max_length=100, blank=True, default='')
    # description = models.ForeignKey('card_info')
    avatar = models.TextField(blank=True, default='')
    background = models.TextField(blank=True, default='')

    class Meta:
        ordering = ('created',)
