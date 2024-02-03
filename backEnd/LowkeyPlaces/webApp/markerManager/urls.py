from django.urls import path
from .views import placeMarker, getMarkerList, addMarkerImg, getMarkerImg, updateMarker, deleteMarker

urlpatterns = [
    path('place-marker/', placeMarker),
    path('marker-list/', getMarkerList),
    path('add-marker-img/', addMarkerImg), 
    path('get-marker-img/', getMarkerImg), 
    path('update-marker/', updateMarker),
    path('delete-marker/', deleteMarker),
]
