from rest_framework import serializers
from .models import MARKER

class markerSerializer(serializers.Serializer):
    name=serializers.CharField(default="No Name", max_length=30)
    desc=serializers.CharField(default="")
    lat=serializers.FloatField(default=0.0)
    long=serializers.FloatField(default=0.0)
    address=serializers.CharField(max_length=100)