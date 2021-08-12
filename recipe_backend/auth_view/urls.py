from django.urls import path, include
from .views import FacebookLogin, GoogleLogin


urlpatterns = [
    path('rest-auth/facebook/', FacebookLogin.as_view(), name='fb_login'),
    path('rest-auth/google/', GoogleLogin.as_view(), name='google_login'),
]
