from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from friendManager.views import userEquals
from typing import Callable
from rest_framework.decorators import api_view
from mapManager.serializers import getMap
from mapManager.models import MAP, MAP_USER
from django.core.exceptions import ObjectDoesNotExist
from .serializers import markerSerializer, imageSerializer, markerIdSerializer, updateMarkerActionSerializer
from .models import MARKER, MARKER_IMG
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

#authTemplate2
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
        markerInstance.save()
        #make directory for marker
        markerPath = os.path.join(settings.ROOT_FOLDER, "frontEnd/map-app/react-app/src/maps", mapId.mapFolder, "markers", markerInstance.folderPath)
        try:
            os.makedirs(markerPath)
        except OSError as e:
            markerInstance.delete()
            return Response(status=500)
        return Response(status=201)
    return authTemplate2(request, discrete)

#authTemplate2
#this returns a list of markers (it's fine to send all the marker data at once, since there isnt any scrolling)
@api_view(['POST'])
def getMarkerList(request: Response) -> Response:
    def discrete(mapId, user, request):
        markerList = MARKER.objects.filter(user=user, mapId=mapId)
        return Response(status=201, data={i.id:[i.name, i.desc, i.lat, i.long, i.address, i.imageCount, i.timeCreated, i.folderPath] for i in markerList})
    return authTemplate(request, discrete)


#authTemplate
@api_view(['POST'])
def addMarkerImg(request: Response) -> Response:
    def discrete(mapId, user, request):
        image=imageSerializer(request.data)
        markerId=markerIdSerializer(request.data)
        if image.is_valid() is False or markerId.is_valid() is False:
            return Response(status=440)
        try:
            #ensure there is a valid marker for this map
            markerId = MARKER.objects.get(id=markerId.validated_data['markerId'], mapId=mapId)
            #save image in a variable
            image=image.validated_data['image']
            
            imageInstance = MARKER_IMG(markerId=markerId)
            imageInstance.save()
            #save the image to file
            markerPath = os.path.join(settings.ROOT_FOLDER, "frontEnd/map-app/react-app/src/maps", mapId.mapFolder, "markers", markerId.folderPath,imageInstance.folderPath+".jpg")
            markerId.imageCount+=1
            markerId.save()
            try:
                with open(markerPath, 'wb') as new_image_file:
                    new_image_file.write(image.read())
            except Exception as e:
                return Response(status=500)
        except ObjectDoesNotExist:
            return Response(status=497)
    return authTemplate2(request)


@api_view(['POST'])
def getMarkerImg(request):
    def discrete(mapId, user, request):
        markerId=markerIdSerializer(request.data)
        if markerId.is_valid() is False:
            return Response(status=440)
        try:
            #ensure there is a valid marker for this map
            markerId = MARKER.objects.get(id=markerId.validated_data['markerId'], mapId=mapId)
            img = MARKER_IMG.objects.filter(markerId=markerId)
            return Response(201, {"image_ids":[i.folderPath for i in img]})
        except Exception as e:
                return Response(status=500)
    return authTemplate(request, discrete)
        

#authTemplate2
@api_view(['POST'])
#action map: {1: update lat-long, 2: update description, 3: update color}
def updateMarker(request: Response) -> Response:
    def discrete(mapId, user, request):
        
        markerId=markerIdSerializer(request.data)
        newMarker = markerSerializer(request.data)
        
        if newMarker.isvalid() is False or markerId.is_valid() is False:
            return Response(status=419)
        
        markerId=markerId.validated_data
        newMarker=newMarker.validated_data
        
        try:
            #ensure there is a valid marker for this map
            old_marker = MARKER.objects.get(id=markerId['markerId'], mapId=mapId)
            
            #update all success
            old_marker.name=newMarker['name'],
            old_marker.desc=newMarker['desc'],
            old_marker.lat=newMarker['lat'],
            old_marker.long=newMarker['long'],
            old_marker.address=newMarker['address'],
            old_marker.save()
            
            #return updated mapList
            return getMarkerList(request.data)
            
        except ObjectDoesNotExist:
            return Response(status=497)
    return authTemplate2(request, discrete)

#authTemplate2
@api_view(['POST'])
def deleteMarkerImage():
    pass
            

#authTemplate2$
@api_view(['POST'])
def deleteMarker():
    pass