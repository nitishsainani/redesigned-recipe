from django.contrib import admin
from .models import Recipe, Nutrient, Ingredient, RecipeNutrient, RecipeIngredient, Cuisine


class RecipeAdmin(admin.ModelAdmin):
    list_display = ('title', 'cuisine', 'cuisine_raw', 'preparation_time', 'instructions', 'dietary_style', )


admin.site.register(Recipe, RecipeAdmin)
admin.site.register(Nutrient)
admin.site.register(Ingredient)
admin.site.register(RecipeNutrient)
admin.site.register(RecipeIngredient)
admin.site.register(Cuisine)
