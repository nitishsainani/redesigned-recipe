from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.paginator import Paginator
from ..models import Ingredient
from ..serializers import IngredientSerializer


class IngredientView(APIView):
    def get(self, request):
        page = self.request.query_params.get('page', None) or 1
        size = self.request.query_params.get('size', None) or 10
        search = self.request.query_params.get('search', None)

        # Filter
        kwargs = {}
        search and kwargs.__setitem__('title__contains', search)

        queryset = Ingredient.objects.get_queryset().order_by('id').filter(**kwargs)

        paginator = Paginator(queryset, size)
        results = paginator.page(page).object_list
        return Response({
            "ingredients": IngredientSerializer(results, many=True).data,
            "total": paginator.page_range[-1],
            "size": int(size),
        })
