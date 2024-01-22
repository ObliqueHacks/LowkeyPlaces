from .models import MAP, MAP_REQEST, MAP_USER
from rest_framework import serializers

class mapSerializer(serializers.ModelSerializer):
    class Meta:
        model = MAP
        fields = ["title", "desc", "theme", "lat", "long"]


class mapRequest(serializers.Serializer):
    mapId=serializers.IntegerField()
    recId=serializers.CharField(max_length=30)
    reqType=serializers.IntegerField()
   
class getMap(serializers.Serializer):
    mapId=serializers.IntegerField()
    
    