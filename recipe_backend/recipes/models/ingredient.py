from django.db import models
from recipe_backend.models import BaseModel


class Ingredient(BaseModel):
    title = models.CharField(max_length=50, unique=True)
    unit = models.CharField(max_length=50, null=True)
    energy_per_unit = models.FloatField(null=True, blank=True, help_text='Total energy in Kcal')
    carbohydrates_per_unit = models.FloatField(null=True, blank=True)
    protein_per_unit = models.FloatField(null=True, blank=True, help_text='Total protein in grams')
    fat_per_unit = models.FloatField(null=True, blank=True, help_text='Total lipid(Fat) in grams')

    def __str__(self):
        return self.title
