from rest_framework import serializers
from .models import USER_RELATION, FRIEND_REQUEST
from utils import token_to_user


class getUserSerializer(serializers.Serializer):
    userToken = serializers.CharField(max_length=20)

class toUserAction(serializers.Serializer):
    name=serializers.CharField(max_length=20)     
    action=serializers.IntegerField()
