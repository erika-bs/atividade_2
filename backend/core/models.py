from django.db import models

class Dono(models.Model):
    nome = models.CharField(max_length=100)
    telefone = models.CharField(max_length=20)

    def __str__(self):
        return self.nome


class Pet(models.Model):
    nome = models.CharField(max_length=100)
    raca = models.CharField(max_length=50)
    d_nasc = models.DateField()
    dono = models.ForeignKey(Dono, on_delete=models.CASCADE, related_name='pets')

    def __str__(self):
        return self.nome
