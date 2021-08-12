from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.paginator import Paginator
from ..models import Recipe
from ..serializers import RecipeSerializer, RecipeDetailSerializer


class RecipeView(APIView):
    def get(self, request):
        page = self.request.query_params.get('page', None) or 1
        size = self.request.query_params.get('size', None) or 10
        search = self.request.query_params.get('search', None)
        cuisines = self.request.query_params.get('cuisines', '').strip()
        ingredients = self.request.query_params.get('ingredients', '').strip()

        # Filter
        kwargs = {}
        search and kwargs.__setitem__('title__contains', search)
        cuisines and kwargs.__setitem__('cuisine_id__in', list(map(int, cuisines.split(","))))
        # ingredients and kwargs.__setitem__('ingredients__ingredient_id__in', list(map(int, ingredients.split(","))))

        queryset = Recipe.objects.get_queryset().order_by('id').filter(**kwargs)
        if ingredients:
            for ingredient_id in list(map(int, ingredients.split(","))):
                queryset = queryset.filter(ingredients__ingredient_id=ingredient_id)
        queryset = queryset.distinct()

        paginator = Paginator(queryset, size)
        results = paginator.page(page).object_list
        return Response({
            "recipes": RecipeSerializer(results, many=True).data,
            "total": paginator.page_range[-1],
            "size": int(size),
        })


class RecipeDetailView(APIView):
    def get(self, request, recipe_id):
        instance = Recipe.objects.filter(id=recipe_id).first()
        return Response(RecipeDetailSerializer(instance).data)
