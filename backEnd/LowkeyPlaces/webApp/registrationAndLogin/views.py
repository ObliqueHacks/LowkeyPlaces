from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from serializer import registrationSerializer, loginSerializer 
# Create your views here.
@api_view['Post']
def register(request):
    data = request.data
    serializer=registrationSerializer(data=data)
    if serializer.is_valid():
        pass


@api_view['Post']
def login(request):
    pass


    
