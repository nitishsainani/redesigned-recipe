from rest_framework import routers
from . import views
from django.urls import path

urlpatterns = [
    path('cuisines/', views.CuisineView.as_view()),
    path('recipes/', views.RecipeView.as_view()),
    path('recipes/<int:recipe_id>/', views.RecipeDetailView.as_view()),
    path('ingredients/', views.IngredientView.as_view()),
]
