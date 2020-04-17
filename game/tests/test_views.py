from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.urls import reverse

from game.models import Kitten


class TestViews(TestCase):

    def setUp(self):
        User = get_user_model()
        self.user = User.objects.create_user(
            username="johnsmith1",
            email="johnsmith1@email.com",
            password="testpass123"
        )
        self.client = Client()
        self.client.login(username="johnsmith1", password="testpass123")

    def test_create_kitten_POST(self):
        url = reverse("create_kitten")
        response = self.client.post(url, {
            'name': 'snuggles'
        })
        
        kitten_record = Kitten.objects.first()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(kitten_record.username.username, "johnsmith1")
        self.assertEqual(kitten_record.name, "snuggles")
        self.assertEqual(kitten_record.affection, 5)
        self.assertEqual(kitten_record.mood, "Tolerant")
        url_test = int(kitten_record.image_url[33]) > 0 & int(kitten_record.image_url[33]) < 6
        self.assertTrue(url_test)
