from .models import MAP, MAP_REQEST, MAP_USER
from rest_framework import serializers


class mapSerializer(serializers.ModelSerializer):
    class Meta:
        model = MAP
        fields = '__all__'

class joinMapRequest(serializers.Serializer):
    recId = serializers.CharField(max_length=30)
    typeOfRequest = serializers.IntegerField()
    
    