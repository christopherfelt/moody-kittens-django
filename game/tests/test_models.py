from django.test import TestCase
from django.contrib.auth import get_user_model

from game.models import Kitten


class TestModels(TestCase):

    def setUp(self):
        User = get_user_model()
        self.user = User.objects.create_user(
            username="johnsmith1",
            email="johnsmith1@email.com",
            password="testpass123"
        )
        self.kitten = Kitten.objects.create(
            username=self.user,
            name='snuggles',
            affection=5
        )

    def test_kitten_creation(self):
        self.assertEqual(f'{self.kitten.username.username}', "johnsmith1")
        self.assertEqual(f'{self.kitten.name}', "snuggles")
        self.assertEqual(self.kitten.affection, 5)
        self.assertEqual(f'{self.kitten.mood}', "Tolerant")
        url_test = int(self.kitten.image_url[33]) > 0 & int(self.kitten.image_url[33]) < 6
        self.assertTrue(url_test)