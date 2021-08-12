from recipes.models import RecipeIngredient, RecipeNutrient, Recipe

print('Start')
def start():
    for i, recipe in enumerate(Recipe.objects.all()):
        ingredients = set()
        for ri in RecipeIngredient.objects.filter(recipe=recipe):
            if ri.ingredient.title in ingredients:
                ri.delete()
            else:
                ingredients.add(ri.ingredient.title)
