from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from friendManager.views import userEquals
from typing import Callable
from rest_framework.decorators import api_view
from mapManager.serializers import getMap
from mapManager.models import MAP, MAP_USER
from django.core.exceptions import ObjectDoesNotExist
from .serializers import markerSerializer, imageSerializer, markerIdSerializer, updateMarkerActionSerializer, imageIdSerializer
from .models import MARKER, MARKER_IMG
from mapManager.views import authTemplate
from django.conf import settings 
import os

def authTemplate2(request: Response, func1: Callable) -> Callable:
    #authenticate user
    print(request)
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
        marker = markerSerializer(data=request.data)
        if marker.is_valid() is False:
            return Response(status=419)
        marker=marker.validated_data
        markerInstance = MARKER(
            userId=user,
            mapId=mapId
        )
        if 'name' in marker:
            markerInstance.name=marker['name']
            
        if 'desc' in marker:
            markerInstance.desc=marker['desc']
            
        if 'lat' in marker:
            markerInstance.lat=marker['lat']
        
        if 'long' in marker:    
            markerInstance.long=marker['long']
          
        if 'address' in marker:      
            markerInstance.address=marker['address']
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
        markerList = MARKER.objects.filter(mapId=mapId)
        return Response(status=201, data={i.id:{'name':i.name, 'desc':i.desc, 'lat': i.lat, 'long': i.long, 'address': i.address, 'imageCount': i.imageCount, 'timeCreated': i.timeCreated, 'folderPath':i.folderPath} for i in markerList})
    return authTemplate(request, discrete)


#authTemplate
@api_view(['POST'])
def addMarkerImg(request: Response) -> Response:
    def discrete(mapId, user, request):
        print(request.data)
        image=imageSerializer(data=request.data)
        markerId=markerIdSerializer(data=request.data)
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
    return authTemplate2(request, discrete)



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
        except ObjectDoesNotExist:
                return Response(status=500)
    return authTemplate(request, discrete)
        
        

#authTemplate2
@api_view(['POST'])
#action map: {1: update lat-long, 2: update description, 3: update color}
def updateMarker(request: Response) -> Response:
    def discrete(mapId, user, request): 
        markerId = markerIdSerializer(data=request.data)
        newMarker = markerSerializer(data=request.data)

        if newMarker.is_valid() is False or markerId.is_valid() is False:
            return Response(status=419)
        markerId=markerId.validated_data
        
        newMarker=newMarker.validated_data
        try:
            #ensure there is a valid marker for this map
            old_marker = MARKER.objects.get(id=markerId['markerId'], mapId=mapId)
            #update all success
            if 'name' in newMarker:
                old_marker.name=newMarker['name']   
            if 'desc' in newMarker:
                old_marker.desc=newMarker['desc']
            if 'lat' in newMarker:
                old_marker.lat=newMarker['lat']
            if 'long' in newMarker:
                old_marker.long=newMarker['long']
            if 'address' in newMarker:
                old_marker.address=newMarker['address']
            old_marker.save()
            return Response(status=201)
        except ObjectDoesNotExist:
            return Response(status=497)
    return authTemplate2(request, discrete)


#authTemplate2
@api_view(['POST'])
def deleteMarkerImage(request):
    def discrete(mapId, user, request):
        markerId=markerIdSerializer(request.data)
        if markerId.is_valid() is False:
            return Response(status=440)
        try:
            #ensure there is a valid marker for this map
            markerId = MARKER.objects.get(id=markerId.validated_data['markerId'], mapId=mapId)
            
            #delete image
            img = imageIdSerializer(request.data)
            if img.is_valid() is False:
                return Response(status=440)
                       
            img = MARKER_IMG.objects.get(folderPath = img.validated_data['folderPath'])
            img.delete()
            markerId.save()
            return Response(status=201)
            
        except ObjectDoesNotExist:
                return Response(status=500)
            
    return authTemplate2(request, discrete)
        
            
#authTemplate2$
@api_view(['POST'])
def deleteMarker():
    def discrete(mapId, user, request):
        markerId=markerIdSerializer(request.data)
        if markerId.is_valid() is False:
            return Response(status=440)
        try:
            #ensure there is a valid marker for this map
            markerId = MARKER.objects.get(id=markerId.validated_data['markerId'], mapId=mapId)
            markerId.delete()
            markerId.save()
        except ObjectDoesNotExist:
                return Response(status=500)