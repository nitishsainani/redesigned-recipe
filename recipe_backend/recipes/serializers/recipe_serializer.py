from rest_framework import serializers
from ..models import Recipe, RecipeNutrient, RecipeIngredient, Cuisine
from .ingredient_serializer import IngredientSerializer
from .nutrient_serializer import NutrientSerializer


class CuisineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuisine
        fields = ('id', 'title1', 'title2', 'title3', )


class RecipeIngredientSerializer(serializers.ModelSerializer):
    ingredient = IngredientSerializer(read_only=True)

    class Meta:
        model = RecipeIngredient
        fields = ('id', 'recipe', 'ingredient', 'quantity', 'custom_quantity', 'state', )


class RecipeNutrientSerializer(serializers.ModelSerializer):
    nutrient = NutrientSerializer(read_only=True)

    class Meta:
        model = RecipeNutrient
        fields = ('id', 'recipe', 'nutrient', 'quantity', )


class RecipeDetailSerializer(serializers.ModelSerializer):
    ingredients = RecipeIngredientSerializer(read_only=True, many=True)
    nutrients = RecipeNutrientSerializer(read_only=True, many=True)
    cuisine = CuisineSerializer()

    class Meta:
        model = Recipe
        fields = ('id', 'title', 'cuisine', 'preparation_time', 'instructions', 'dietary_style', 'ingredients',
                  'nutrients', )


class RecipeSerializer(serializers.ModelSerializer):
    cuisine = CuisineSerializer()

    class Meta:
        model = Recipe
        fields = ('id', 'title', 'cuisine', 'preparation_time', 'instructions', 'dietary_style', )
