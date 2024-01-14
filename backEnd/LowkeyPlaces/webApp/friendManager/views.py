from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import toUserAction
from .models import USER
from django.utils import timezone
from rest_framework import status
from utils import create_token, token_to_user, intToAction, error_returner
from .models import FRIEND_REQUEST, USER_RELATION
from datetime import datetime
from django.core.exceptions import ValidationError


# all respnses to makeRequest are binary in status code
#specific error message may be displayed if frontend desires.
@api_view(['POST'])
def makeRequest(request):
    
    #authenticating incoming data
    user=toUserAction(data=request.data)
    if user.is_valid() is False:
        return error_returner('incorrect_format')
    
    #authenitcate user
    sender=token_to_user(user.validated_data['userToken'])
    if sender==None:
        return error_returner('invalid_or_expired')

    #authenticate action
    action=intToAction(user.validated_data['action'])
    if action is None:
        return error_returner('invalid_action')
    
    #authenticate rec
    rec=USER.objects.filter(name=user.validated_data['name'])
    if rec.first() is None:
        return error_returner('rec_not_found_or_unkown_action')

    #protect against self ref
    rec=rec.first()            
    if (rec==sender): error_returner('self_reference')

    #handle friend request
    if action == 'sendFriendReq':
        
        #account for a pending request (resolve the case by changing the reqest type)
        if FRIEND_REQUEST.objects.filter(sendId=rec, recId=sender).first() is not None:
            action='acceptFriendReq'
            rec,sender=sender,rec

        #account for already friends or blocked
        elif USER_RELATION.objects.filter(user1=sender, user2=rec).first() is not None:
            error_returner('already_friends_or_blocked')

        else:
            try:
                #create request (ensure there is only one instance of it)
                friendRequest=FRIEND_REQUEST(sendId=sender, recId=rec)
                friendRequest.save()
                return Response(status=201)
            except ValidationError:
                error_returner('request_already_sent')

    #if user accepts
    if action == 'acceptFriendReq':
        rec,sender=sender,rec #flip to see if there even is an inconming request
        if FRIEND_REQUEST.objects.filter(sendId=sender, recId=rec).first() is not None:
            #create two way relation
            new_relation=USER_RELATION(user1=sender, user2=rec, status=1)
            new_relation.save()

            new_relation=USER_RELATION(user1=rec, user2=sender, status=1)
            new_relation.save()

            #remove pending requests
            FRIEND_REQUEST.objects.get(sendId=sender, recId=rec).delete().save()
            return Response(status=201)
        error_returner('no_friend_request_found')
            
    # if user rejects        
    if action == 'rejectFriendReq':
        friend_request = FRIEND_REQUEST.objects.filter(sendId=sender, recId=rec).first()
        if friend_request is not None:
            friend_request.delete()
            return Response(status=201)
        error_returner('no_friend_request_found')


    #TODO: fill in these methods when u have time. the logic above already accounts for their existence
    if action == 'blockFriendReq':
        #just add a block relation if you see this
        pass

    if action == 'removeFriend':
        pass

    if action == 'blockFriend':
        pass

    if action == 'unblockUser':
        pass

        
#TODO: create a view to send the current friends, incoming friendrequests, blocked individuals, sent friend requests for a user
@api_view(['POST'])
def getUserInfo(request):
    pass
