from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from friendManager.views import userEquals
from typing import Callable
from rest_framework.decorators import api_view
from mapManager.serializers import getMap
from mapManager.models import MAP, MAP_USER
from django.core.exceptions import ObjectDoesNotExist


def authTemplate(request: Response, func1: Callable) -> Callable:
    #authenticate user
    user=userEquals(request)
    if user is None: return Response(status=408)
    
    #authenticate mapId
    mapId=getMap(data=request.data)
    if mapId.is_valid() is False:
        return Response(status=400)
    mapId=mapId.validated_data['mapId']
    
    #authenticate this is a real map
    try:
        mapId=MAP.objects.get(id=mapId)
        #authenticate this map belongs to user
        try:
            #authenticate this map even has the user
            checker = MAP_USER.objects.get(mapId=mapId, userId=user)
            
            #if they are spectator then ignore 
            if checker.status == 2: return Response(status=400)
            
            # finally perform action    
            return func1(mapId,user,request)
    
    #edit the codes here  
        except ObjectDoesNotExist:
            return Response(status=400)
        
    except ObjectDoesNotExist:
        return Response(status=400)    


@api_view(['POST'])
def placeMarker(request: Response) -> Response:
    pass

@api_view(['POST'])
#{action map: 1: update lat-long, 2: update description}
def updateMarker(request: Response) -> Response:
    pass


@api_view(['POST'])
#{action map: update new image, 2: delete old image}
def updateMarkerImg(request: Response) -> Response:
    pass