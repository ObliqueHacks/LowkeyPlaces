from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import registrationSerializer, loginSerializer 
from .models import USER
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import status


# Create your views here.
@api_view(['Post'])
def register(request):
    data = request.data
    serializer = registrationSerializer(data=data)
    if serializer.is_valid():
        instance = serializer.save()
        instance.dateTimeCreated = timezone.now()
        instance.save()
        return Response({'user': 'created'}, status=status.HTTP_201_CREATED)
    else:
        return Response({'user': 'not_created', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['Post'])
def login(request):
    pass
