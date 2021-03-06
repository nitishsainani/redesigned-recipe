# Generated by Django 3.2 on 2021-05-01 06:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Ingredient',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=50, unique=True)),
                ('unit', models.CharField(max_length=50, null=True)),
                ('energy_per_unit', models.FloatField(blank=True, help_text='Total energy in Kcal', null=True)),
                ('carbohydrates_per_unit', models.FloatField(blank=True, null=True)),
                ('protein_per_unit', models.FloatField(blank=True, help_text='Total protein in grams', null=True)),
                ('fat_per_unit', models.FloatField(blank=True, help_text='Total lipid(Fat) in grams', null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Nutrient',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=100, unique=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=100, unique=True)),
                ('cuisine', models.CharField(blank=True, max_length=300, null=True)),
                ('preparation_time', models.CharField(blank=True, max_length=300, null=True)),
                ('instructions', models.TextField(blank=True, null=True)),
                ('dietary_style', models.CharField(blank=True, max_length=300, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='RecipeNutrient',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('quantity', models.FloatField(blank=True, null=True)),
                ('nutrient', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='recipes.nutrient')),
                ('recipe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='nutrients', to='recipes.recipe')),
            ],
            options={
                'unique_together': {('recipe', 'nutrient')},
            },
        ),
        migrations.CreateModel(
            name='RecipeIngredient',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('quantity', models.FloatField(blank=True, null=True)),
                ('custom_quantity', models.BooleanField(default=False)),
                ('state', models.CharField(blank=True, max_length=100, null=True)),
                ('ingredient', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='recipes.ingredient')),
                ('recipe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ingredients', to='recipes.recipe')),
            ],
            options={
                'unique_together': {('recipe', 'ingredient', 'quantity', 'state')},
            },
        ),
    ]
