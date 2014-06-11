from django.db import models

class Card(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    color = models.CharField(max_length=10, null=True)
    radius = models.IntegerField()
