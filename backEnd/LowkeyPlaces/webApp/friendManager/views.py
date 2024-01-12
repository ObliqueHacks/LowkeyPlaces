from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import getUser, toUserAction
from .models import USER
from django.utils import timezone
from rest_framework import status
from utils import create_token, token_to_user
# Create your views here.
#TODO: add a view for granting friendbased requests. it either grants it or it doesnt.
@api_view['POST']
def makeRequest(request):
    user=getUser(request.data)
    if not user.is_valid():
        return Response({'error': 'no_token_provided'}, status=status.HTTP_400_BAD_REQUEST)
    sender=token_to_user(user.userToken)
    if sender!=None:
        rec=toUserAction(request.data)
        if rec.is_valid():
            action = rec.action
            rec=USER.objects.filter(name=rec.name)

        return Response({'error': 'no_user_provided'}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'error': 'invalid_or_expired'}, status=status.HTTP_400_BAD_REQUEST)


#TODO: create a view to send the current friends, incoming friendrequests, blocked individuals, sent friend requests for a user
@api_view['POST']
def getUserInfo(request):
    pass
