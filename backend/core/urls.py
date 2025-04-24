from django.urls import path,include
from rest_framework import routers
from .views import DonoViewSet,PetViewSet

router = routers.DefaultRouter()
router.register(r'pets',PetViewSet)
router.register(r'donos',DonoViewSet)

urlpatterns = [
    path('',include(router.urls)),
]