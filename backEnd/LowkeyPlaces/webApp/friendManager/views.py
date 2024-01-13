from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import getUser, toUserAction
from .models import USER
from django.utils import timezone
from rest_framework import status
from utils import create_token, token_to_user, intToAction, error_returner
from .models import FRIEND_REQUEST
from datetime import datetime
from django.core.exceptions import ValidationError
# Create your views here.
#TODO: add a view for granting friendbased requests. it either grants it or it doesnt.
@api_view(['POST'])
def makeRequest(request):
    #authenticating sender
    user=getUser(request.data)
    if not user.is_valid():
        return error_returner('no_token_provided')
    sender=token_to_user(user.userToken)

    if sender!=None:
        #authenticating rec
        req=toUserAction(request.data) 
        if req.is_valid():
            action=intToAction(req.action)
            rec=USER.objects.filter(name=req.name)
            if rec.first() is None or action is None:
                return error_returner('rec_not_found_or_unkown_action')
            rec=rec.first()            
            if (rec==sender):
                error_returner('self_reference')

            #handle friend request
            if action == 'sendFriendRequest':
                try:
                    newInstance = FRIEND_REQUEST(sendId=sender, recId=rec, status=0)
                    newInstance.save()
                except ValidationError as e:
                    error_returner('tried_sending_same_request_twice')


            if action == 'acceptFriendReq':
                pass

            #maybe only write top 2 for now and move on to map (will have to edit both if below is filled)
            if action == 'rejectFriendReq':
                pass

            if action == 'blockFriendReq':
                pass

            if action == 'removeFriend':
                pass

            if action == 'blockFriend':
                pass

            if action == 'removePendingFriendReq':
                pass

        return error_returner('no_user_provided')
    return error_returner('invalid_or_expired')


#TODO: create a view to send the current friends, incoming friendrequests, blocked individuals, sent friend requests for a user
@api_view(['POST'])
def getUserInfo(request):
    pass
