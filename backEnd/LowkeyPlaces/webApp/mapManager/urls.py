from django.urls import path
from .views import makeMap, addFriendToMap, getMapUsers, getUserMaps, getMapFromId, editMapFeatures, deleteMap

urlpatterns = [
    path('make-map/', makeMap),
    path('add-friend/', addFriendToMap),
    path('get-users/', getMapUsers),
    path('get-user-maps/', getUserMaps),
    path('get-map/', getMapFromId),
    path('edit/', editMapFeatures),
    path('delete-map', deleteMap),
]