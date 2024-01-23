from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from friendManager.views import userEquals
from typing import Callable
from rest_framework.decorators import api_view
from mapManager.serializers import getMap
from mapManager.models import MAP, MAP_USER
from django.core.exceptions import ObjectDoesNotExist
from .serializers import markerSerializer, imageSerializer, markerIdSerializer
from .models import MARKER, MARKER_IMAGE
from mapManager.views import authTemplate
from django.conf import settings 
import os

def authTemplate2(request: Response, func1: Callable) -> Callable:
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
    def discrete(mapId, user, request):
        marker = markerSerializer(request.data)
        if marker.isvalid() is False:
            return Response(status=419)
        marker=marker.validated_data
        markerInstance = MARKER(
            name=marker['name'],
            desc=marker['desc'],
            lat=marker['lat'],
            long=marker['long'],
            address=marker['address'],
            user=user,
            mapId=mapId
        )
        #make directory for marker
        markerPath = os.path.join(settings.ROOT_FOLDER, "frontEnd/map-app/react-app/src/maps/", mapId.mapFolder, "/markers/", mapId.markerCount)
        try:
            os.makedirs(markerPath)
        except OSError as e:
            return Response(status=500)
        markerInstance.save()
        return Response(status=201)
    return authTemplate2(request, discrete)

#use the normal auth template for these


#use authTemplate for these
#this returns a list of markers (it's fine to send all the marker data at once, since there isnt any scrolling)
@api_view(['POST'])
def getMarkerList(request: Response) -> Response:
    def discrete(mapId, user, request):
        markerList = MARKER.objects.filter(user=user, mapId=mapId)
        return Response(status=201, data={i.id:[i.name, i.desc, i.lat, i.long, i.address, i.imageCount, i.timeCreated] for i in markerList})
    return authTemplate(request, discrete)


#use authtemplate2 here
@api_view(['POST'])
def addMarkerImg(request: Response) -> Response:
    def discrete(mapId, user, request):
        image=imageSerializer(request.data)
        markerId=markerIdSerializer(request.data)
        if image.is_valid() is False:
            return Response(status=440)
        try:
            #ensure there is a valid marker for this map
            MARKER.objects.get(id=markerId.validated_data['markerId'], mapId=mapId)
            #save image in a variable
            image=image.validated_data['image']
            #save the image to file
            markerPath = os.path.join(settings.ROOT_FOLDER, "frontEnd/map-app/react-app/src/maps/", mapId.mapFolder, "/markers/", str(mapId.markerCount), '/')
            mapId.markerCount+=1
            mapId.save()
            try:
                with open(markerPath, 'wb') as new_image_file:
                    new_image_file.write(image.read())
            except Exception as e:
                return Response(status=500)
        except ObjectDoesNotExist:
            return Response(status=497)
    return authTemplate2(request)

#def return None
@api_view(['POST'])
#action map: {1: update lat-long, 2: update description}
def updateMarker(request: Response) -> Response:
    pass

@api_view(['POST'])
def deleteMarkerImage():
    pass

@api_view(['POST'])
def deleteMarker():
    pass