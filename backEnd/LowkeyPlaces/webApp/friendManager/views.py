from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import getUser, toUserAction
from .models import USER
from django.utils import timezone
from rest_framework import status
from utils import create_token, token_to_user, intToAction, error_returner
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
        rec=toUserAction(request.data)
        if rec.is_valid():
            action=intToAction(rec.action)
            rec=USER.objects.filter(name=rec.name)
            if rec and action!=None:
                rec = rec.first()
            
            if action == 'sendFriendRequest':
                pass

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

            return error_returner('rec_not_found_or_unkown_action')
        return error_returner('no_user_provided')
    return error_returner('invalid_or_expired')


#TODO: create a view to send the current friends, incoming friendrequests, blocked individuals, sent friend requests for a user
@api_view(['POST'])
def getUserInfo(request):
    pass
