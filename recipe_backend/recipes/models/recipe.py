from django.db import models
from recipe_backend.models import BaseModel
from .nutrient import Nutrient
from .ingredient import Ingredient


class Cuisine(BaseModel):
    title1 = models.CharField(max_length=50)
    title2 = models.CharField(max_length=50)
    title3 = models.CharField(max_length=50)

    class Meta:
        unique_together = ('title1', 'title2', 'title3', )

    def __str__(self):
        return "{} >> {} >> {}".format(self.title1, self.title2, self.title3)


class Recipe(BaseModel):
    title = models.CharField(max_length=100, unique=True)
    cuisine_raw = models.CharField(max_length=300, null=True, blank=True)
    cuisine = models.ForeignKey(Cuisine, on_delete=models.RESTRICT, null=True, blank=True)
    preparation_time = models.CharField(max_length=300, null=True, blank=True)
    instructions = models.TextField(null=True, blank=True)
    dietary_style = models.CharField(max_length=300, null=True, blank=True)

    def __str__(self):
        return self.title


class RecipeNutrient(BaseModel):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='nutrients')
    nutrient = models.ForeignKey(Nutrient, on_delete=models.RESTRICT)
    quantity = models.FloatField(null=True, blank=True)

    class Meta:
        unique_together = ('recipe', 'nutrient')


class RecipeIngredient(BaseModel):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='ingredients')
    ingredient = models.ForeignKey(Ingredient, on_delete=models.RESTRICT)
    quantity = models.FloatField(null=True, blank=True)
    custom_quantity = models.BooleanField(default=False)
    state = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        unique_together = ('recipe', 'ingredient', 'quantity', 'state')
