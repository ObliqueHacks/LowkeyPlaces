from rest_framework import serializers

class toUserAction(serializers.Serializer):
    userToken=serializers.CharField(max_length=200)
    name=serializers.CharField(max_length=20)     
    action=serializers.IntegerField()

class getUser(serializers.Serializer):
    userToken=serializers.CharField(max_length=300)