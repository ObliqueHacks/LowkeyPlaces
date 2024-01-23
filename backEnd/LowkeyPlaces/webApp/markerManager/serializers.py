from rest_framework import serializers
from .models import MARKER


class markerSerializer(serializers.Serializer):
    name=serializers.CharField(default="No Name", max_length=30)
    desc=serializers.CharField(default="")
    lat=serializers.FloatField()
    long=serializers.FloatField()
    address=serializers.CharField(max_length=150)

class imageSerializer(serializers.Serializer):
    image=serializers.ImageField()
    
class markerIdSerializer(serializers.Serializer):
    markerId=serializers.IntegerField()
    
class updateMarkerActionSerializer(serializers.Serializer):
    action=serializers.IntegerField(max_length = 10)