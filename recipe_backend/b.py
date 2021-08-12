def filter_quantity(s):
    try:
        if "to taste" == s.strip().lower():
            return None
        if not s.strip():
            return None
        if "-" in s:
            lst = [filter_quantity(itt.strip()) for itt in s.strip().split('-')]
            return sum(lst) / len(lst)
        vals = s.strip().split(' ')
        if len(vals) == 1:
            val = vals[0]
            try:
                return float(val)
            except:
                return float(val.split('/')[0].strip()) / float(val.split('/')[1].strip())
        else:
            a, val = vals
            return float(a) + int(val.split('/')[0].strip()) / int(val.split('/')[1].strip())
    except Exception as e:
        print(e)
        return None


def start():
    import json
    from recipes.models import Recipe, Ingredient, Nutrient, RecipeNutrient, RecipeIngredient
    with open('recipes.json') as f:
        recipes = json.loads(f.read())

    fails = []

    total_recipes = len(recipes)
    ris = []
    for i in range(total_recipes):
        try:
            recipe = recipes[i]
            print("recipe", i+1, "of", total_recipes)
            recipe_instance = Recipe.objects.create(
                title=recipe['name'],
                cuisine=recipe['cuisine'],
                dietary_style=recipe['dietary_style'],
                preparation_time=recipe['preparation_time'],
                instructions=recipe['instructions'],
            )
            for ingredient in recipe.get('ingredients', []):
                try:
                    quantity = filter_quantity(ingredient['quantity'])
                    unit = None if not ingredient['unit'].strip().strip('-') else ingredient['unit']
                    state = None if not ingredient['state'].strip().strip('-') else ingredient['state']

                    energy = None if not ingredient['energy (kcal)'].strip().strip('-') else float(ingredient['energy (kcal)'])
                    energy_per_unit = None if (not quantity) or (not energy) else energy / quantity

                    carbohydrates = None if not ingredient['carbohydrates'].strip().strip('-') else float(ingredient['carbohydrates'])
                    carbohydrates_per_unit = None if (not quantity) or (not carbohydrates) else carbohydrates / quantity

                    protein = None if not ingredient['protein (g)'].strip().strip('-') else float(ingredient['protein (g)'])
                    protein_per_unit = None if (not quantity) or (not protein) else protein / quantity

                    fat = None if not ingredient['total lipid (Fat) (g)'].strip().strip('-') else float(ingredient['total lipid (Fat) (g)'])
                    fat_per_unit = None if (not quantity) or (not fat) else fat / quantity

                    custom_quantity = "taste" in ingredient['quantity'].lower()

                    RecipeIngredient.objects.create(
                        recipe=recipe_instance,
                        ingredient=Ingredient.objects.get_or_create(
                            defaults={
                                "unit": ingredient['unit'],
                                "energy_per_unit": energy_per_unit,
                                "carbohydrates_per_unit": carbohydrates_per_unit,
                                "protein_per_unit": protein_per_unit,
                                "fat_per_unit": fat_per_unit,
                            },
                            title=ingredient['title']
                        )[0],
                        quantity=quantity,
                        state=state,
                        custom_quantity=custom_quantity,
                    )
                except Exception as e:
                    print("Ingredient Error: ", e)
                    continue

            for nutrient in recipe.get('nutrition', []):
                try:
                    quantity = None if not recipe['nutrition'][nutrient].strip().strip('-') else float(
                        recipe['nutrition'][nutrient])
                    if not quantity or quantity == float(0):
                        continue
                    RecipeNutrient.objects.create(
                        recipe=recipe_instance,
                        nutrient=Nutrient.objects.get_or_create(title=nutrient)[0],
                        quantity=quantity
                    )
                except Exception as e:
                    print("Nutrient Error: ", e)
                    continue

        except Exception as e:
            print(str(e))
            fails.append(recipes[i])
            continue

    print(len(fails))
    with open('frecipes.json', 'w+') as out:
        out.write(json.dumps(fails, indent=4))
