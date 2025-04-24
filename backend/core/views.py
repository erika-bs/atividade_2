from django.shortcuts import render
from .models import Dono,Pet
from .serializers import DonoSerializer,PetSerializer
from rest_framework import viewsets

class DonoViewSet(viewsets.ModelViewSet):
    queryset = Dono.objects.all()
    serializer_class = DonoSerializer

class PetViewSet(viewsets.ModelViewSet):
    queryset= Pet.objects.all()
    serializer_class = PetSerializer

