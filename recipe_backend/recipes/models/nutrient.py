from django.db import models
from recipe_backend.models import BaseModel


class Nutrient(BaseModel):
    title = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.title
