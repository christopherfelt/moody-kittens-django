from django.db import models
from django.contrib.auth import get_user_model

from random import randint


class Kitten(models.Model):
    username = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    mood = models.CharField(max_length=255)
    affection = models.IntegerField()
    image_url = models.CharField(max_length=255)

    def save(self, *args, **kwargs):
        if(self.affection > 6):
            self.mood = "Happy"
        elif(self.affection <= 5 & self.affection > 3):
            self.mood = "Tolerant"
        elif(self.affection <= 3 & self.affection > 0):
            self.mood = "Angry"
        elif(self.affection >= 0):
            self.mood = "Gone"
        self.image_url = "https://robohash.org/moodykittens{}/?set=set4".format(randint(1, 5))
        super(Kitten, self).save(*args, **kwargs)

    # https://robohash.org/moodykittens${kitten.img}/?set=set4