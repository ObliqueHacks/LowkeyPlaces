from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import mapRequest, mapSerializer, getMap
from .models import USER, USER_RELATION
from rest_framework import status
from utils import create_token, hash_password, verify_password
from friendManager.serializers import getUser
from utils import token_to_user, error_returner
from .models import MAP_USER, MAP
from django.core.exceptions import ValidationError
import os
from django.core.exceptions import ObjectDoesNotExist
from typing import Callable
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
    user=userEquals(request)
    if user is None: return Response(status=408)
    
    #make sure its a valid map request
    mapObject = mapSerializer(data=request.data)
    if mapObject.is_valid() is False:
        return Response(status=500)
    mapObject = mapObject.save()
    
    #make map user with map number
    mapUserInstance = MAP_USER(mapId=mapObject, userId=user, status=0)
    mapUserInstance.save()
    
    #show a 3 level higher
    current_directory = os.getcwd()
    new_path = os.path.abspath(os.path.join(current_directory, "..", "..", ".."))
    
    #join the path to correct path from lowkeySpots/
    directory_path = os.path.join(new_path, "frontEnd/map-app/react-app/src/maps/", mapObject.mapFolder)
    
    #make map directory
    try:
        os.makedirs(directory_path)
    except OSError as e:
        mapObject.delete()
        mapUserInstance.delete()
        return Response(status=500)
  
    #make marker directory
    directory_path = os.path.join(directory_path, "markers")
    
    try:
        os.makedirs(directory_path)
    except OSError as e:
        mapObject.delete()
        mapUserInstance.delete()
        return Response(status=500)
    
    return Response(status=201, data={'mapId': mapObject.id})
 
 
@api_view(['POST'])               
def addFriendToMap(request) -> Response:
    
    #authenticate user and reciever
    user=userEquals(request)
    if user is None: return Response(status=408)
    tempVar = mapRequest(data=request.data)
    if tempVar.is_valid() is False:
        return Response(status=400)
    recId=tempVar.recId
    mapId=tempVar.mapId
    reqType=tempVar.typeOfRequest
    
    if reqType not in [1,2]:
        Response(status=400)    
    #authenticate user even has permissions to add (is a collaborator or owner)
    try:
        checker = MAP_USER.objects.get(userId=user, mapId=mapId)
        if checker.status == 2:
            return Response(status=427)
    except ObjectDoesNotExist:
        return Response(status=427)

    #add them to the map by default instead of creating a mapRequest (since they are already Friends)
    try:
        recId=USER.objects.get(name=recId)
        try:
            curr_relation = USER_RELATION.objects.get(user1=user,user2=recId)
            #if they are friends add a newMapUser
            if curr_relation.status==1:
                
                #ensure they arent already part of the map
                if MAP_USER.objects.filter(mapId=mapId, userId=recId, status=reqType) != None:
                    return Response(status=404)
                
                
                #correct request so proceed:
                new_instance=MAP_USER(mapId=mapId, userId=recId, status=reqType)
                new_instance.save()
                return Response(status=201)
            
            else:
                return Response(status=404)
        except ObjectDoesNotExist:
            return Response(status=404)
    except ObjectDoesNotExist:
        return Response(status=404)
    
    
@api_view(['POST'])    
def getUserMaps(request) -> Response:
    #authenticate suer
    user=userEquals(request)
    if user is None: return Response(status=408)
    #return list of current maps
    userMaps = MAP_USER.objects.filter(userId=user)
    list_of_mapId = [t.mapId.id for t in userMaps]
    return Response(status=201, data={'mapId': list_of_mapId})


def template(request, func1:Callable)->Response:
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
            MAP_USER.objects.get(mapId=mapId, userId=user)
            #perform action    
            return func1(mapId,user,request)
        
        except ObjectDoesNotExist:
            return Response(status=400)
    except ObjectDoesNotExist:
        return Response(status=400)    


@api_view(['POST'])
def getMapFromId(request) -> Response:
    def discrete(mapId,user,request):
        mapData=mapSerializer(mapId)
        return Response(status=201, data=mapData.data)
    return template(request=request, func1=discrete())

@api_view(['POST'])
def getMapUsers(request):
    def discrete(mapId,user,request):
        mapUsers=MAP_USER.objects.filter(mapId=mapId)
        mapUsers={i.userId.name: i.status for i in mapUsers}
        return Response(status=201,data=mapUsers)
    return template(request=request, func1=discrete())

@api_view(['POST'])
def editMapFeatures(request) -> Response:
    def discrete(mapId,user,request):
        pass
    
    return template(request=request, func1=discrete())

@api_view(['POST'])
def deleteMap(request) -> Response:
    def discrete(mapId,user,request):
        pass
    return template(request=request, func1=discrete())


@api_view(['POST'])
def getMapLink(request) -> Response:
    pass
