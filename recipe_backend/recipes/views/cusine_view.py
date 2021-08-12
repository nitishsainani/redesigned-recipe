from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.paginator import Paginator
from ..models import Recipe, Cuisine
from ..serializers import CuisineSerializer
from django.db.models import Q


class CuisineView(APIView):
    def get(self, request):
        page = self.request.query_params.get('page', None) or 1
        size = self.request.query_params.get('size', None) or 10
        search = self.request.query_params.get('search', None)

        queryset = Cuisine.objects.get_queryset()
        if search:
            queryset = queryset.filter(
                Q(title1__contains=search) | Q(title2__contains=search) | Q(title3__contains=search)
            )

        paginator = Paginator(queryset, size)
        results = paginator.page(page).object_list
        return Response({
            "cuisines": CuisineSerializer(results, many=True).data,
            "total": paginator.page_range[-1],
            "size": int(size),
        })
