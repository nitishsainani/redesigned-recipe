from rest_framework import serializers
from ..models import Ingredient


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('id', 'title', 'unit', 'energy_per_unit', 'carbohydrates_per_unit', 'protein_per_unit',
                  'fat_per_unit', )
