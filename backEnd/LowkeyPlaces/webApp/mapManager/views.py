from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import mapRequest, mapSerializer
from .models import USER
from rest_framework import status
from utils import create_token, hash_password, verify_password
from friendManager.serializers import getUser
from utils import token_to_user, error_returner
from .models import MAP_USER
from django.core.exceptions import ValidationError
import os
# Create your views here.

def userEquals(request):
    user=getUser(data=request.data)
    if user.is_valid() is False:
        return None
    user=token_to_user(user.validated_data['userToken'])
    return user
    
@api_view(['POST'])
def makeMap(request) -> Response:
    #authenticate user: 
    user=userEquals(request.data)
    if user is None: return Response(status=400)
    
    #make sure its a valid map request
    mapObject = mapRequest(data=request.data)
    if mapObject.is_valid() is False:
        return Response(status=500)
    
    #make map user with map number
    mapUserInstance = MAP_USER(mapId=mapObject, userId=user, status=0)
    mapUserInstance.save()
    
    #make map folder
    directory_path = "/lowkeySpots/frontEnd/map-app/react-app/src/maps/" + mapObject.mapFolder
    try:
        os.makedirs(directory_path)
    except OSError as e:
        mapObject.delete()
        mapUserInstance.delete()
        return Response(status=500)
    return Response(status=201, data={'mapId': mapObject.id})


def getMapLink(request) -> Response:
    pass
               
def addUser(request) -> Response:
    pass

def getUserMaps(request) -> Response:
    pass

def editMapFeatures(request) -> Response:
    pass