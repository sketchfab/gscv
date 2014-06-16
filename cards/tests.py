from django.test import TestCase
from django.test.client import Client
from cards.models import Card, Comment
from django.contrib.auth.models import User

class TestUser(TestCase):
    def setUp(self):
        self.user = User.objects.create(username='anonymous', password='yolo')
        self.client = Client()

    def test_card_creation(self):
        r = self.client.post('/api/cards/', {
            'color' : '#FF0000',
            'background' : '#FF0000',
            'radius' : 666,
            'name' : 'Arthur',
            'job' : 'Tester',
            'email' : 'test@test.com'
        })

        self.assertEqual(r.status_code, 201)
        # Should include a test of the expected output

    def test_card_fail_creation(self):
        r = self.client.post('/api/cards/', {})

        self.assertEqual(r.status_code, 400)
        # Should include a test of the expected output

    def test_card_creation_with_user_defined_url(self):
        r = self.client.post('/api/cards/', {
            'color' : '#FF0000',
            'background' : '#FF0000',
            'radius' : 666,
            'name' : 'Arthur',
            'job' : 'Tester',
            'email' : 'test@test.com',
            'url' : 'test'
        })

        self.assertEqual(r.status_code, 201)
        # Should include a test of the expected output

