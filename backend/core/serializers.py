from rest_framework import serializers
from .models import Dono,Pet


class PetSerializer(serializers.ModelSerializer):
    dono = serializers.PrimaryKeyRelatedField(queryset=Dono.objects.all())
    dono_nome = serializers.CharField(source='dono.nome',read_only=True)

    class Meta:
        model = Pet
        fields = ['id','nome','raca','d_nasc','dono','dono_nome']


class DonoSerializer(serializers.ModelSerializer):
    pets = PetSerializer(many=True,read_only=True)

    class Meta:
        model = Dono
        fields = ['id','nome','telefone','pets']