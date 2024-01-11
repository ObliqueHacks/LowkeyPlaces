from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import registrationSerializer, loginSerializer 
from .models import USER
from django.utils import timezone
from rest_framework import status
from utils import create_token
# Create your views here.
#TODO: add a view for granting friendbased requests. it either grants it or it doesnt.
#TODO: create a view to send the current friends, incoming friendrequests, blocked individuals, sent friend requests for a user