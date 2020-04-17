from django.urls import path

from .views import GettingStartedView, GameView, create_kitten_view


urlpatterns = [
    path('', GettingStartedView.as_view(), name='getting_started'),
    path('moodykittens/', GameView.as_view(), name='game'),
    path('create-new-kitten/', create_kitten_view, name='create_kitten')
]
