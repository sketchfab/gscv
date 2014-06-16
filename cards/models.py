from django.db import models
from django.core.validators import RegexValidator
import random, string

class Card(models.Model):
    owner = models.ForeignKey('auth.User', related_name='cards')
    created = models.DateTimeField(auto_now_add=True)
    color = models.CharField(max_length=10, null=True)
    background = models.CharField(max_length=10, null=True)
    radius = models.IntegerField()
    name = models.CharField(max_length=256)
    job = models.CharField(max_length=256)
    email = models.CharField(max_length=64)
    url = models.CharField(max_length=128, blank=True, unique=True,
            validators=[RegexValidator('^[a-zA-Z]+$')])

    def save(self, *args, **kwargs):
        self.clean_fields()
        if not self.url:
            self.url = ''.join(random.choice(string.ascii_letters) for _ in range(8))
        super(Card, self).save(*args, **kwargs)
