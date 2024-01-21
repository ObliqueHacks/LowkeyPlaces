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
    if user is None: error_returner("invalid_or_expired_token")
    
    #make sure its a valid map request
    mapObject = mapRequest(data=request.data)
    if mapObject.is_valid() is False:
        error_returner("internal error")
    mapObject=mapObject.save()
    
    #make map user with map number
    mapUserInstance = MAP_USER(mapId=mapObject, userId=user, status=0)
    mapUserInstance.save()
    return Response(status=201,date={'success':'map_created'})

def getMapLink(request) -> Response:
    pass
               
def addUser(request) -> Response:
    pass

def getUserMaps(request) -> Response:
    pass

def editMapFeatures(request) -> Response:
    pass