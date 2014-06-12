from django.db import models

class Card(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    color = models.CharField(max_length=10, null=True)
    background = models.CharField(max_length=10, null=True)
    radius = models.IntegerField()
    name = models.CharField(max_length=256)
    job = models.CharField(max_length=256)
    email = models.CharField(max_length=64)
