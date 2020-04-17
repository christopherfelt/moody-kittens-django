from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView

from .models import Kitten


class GettingStartedView(TemplateView):
    template_name = 'getting_started.html'


class GameView(LoginRequiredMixin, TemplateView):
    template_name = "game.html"


def create_kitten_view(request):
    if request.user.is_authenticated:
        if request.POST:
            Kitten.objects.create(
                username=request.user,
                name=request.POST.get('name'),
                affection=5
            ).save()
            return HttpResponse(status=200)

