from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import registrationSerializer, loginSerializer 
from .models import USER
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import status
from datetime import datetime, timedelta
from django.db.models.query import QuerySet
from utils import create_token
# Create your views here.
@api_view(['Post'])
def register(request):
    data=request.data
    serializer=registrationSerializer(data=data)
    if serializer.is_valid():
        instance=serializer.save()
        instance.dateTimeCreated = timezone.now()
        instance.save()
        return Response({'user': 'Successfully Registered'}, status=status.HTTP_201_CREATED)
    else:
        return Response({'user': 'Username taken'}, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['Post'])
def login(request):
    data = request.data
    serializer = loginSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        found=USER.objects.filter(field1=serializer.name, field2=serializer.psswd)
        if found:
            found=found.first()
            genToken = create_token(found)
            return Response({'genToken': genToken}, status=status.HTTP_201_CREATED)
    return Response({'genToken': 'login or password incorrect'}, status=status.HTTP_201_CREATED)


            

