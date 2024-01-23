from django.db import models
from registrationAndLogin.models import USER
from mapManager.models import MAP
from datetime import datetime 
from django.conf import settings 

# Create your models here.
class MARKER(models.Model):
    name=models.CharField(default="No Name", max_length=30)
    desc=models.TextField(default="")
    lat=models.FloatField(default=0.0)
    long=models.FloatField(default=0.0)
    address=models.CharField(max_length=100)
    
    mapId=models.ForeignKey(MAP, on_delete=models.CASCADE, related_name='markerToMapId')
    userId=models.ForeignKey(USER, on_delete=models.CASCADE, related_name='markerToUserId')
    imageCount=models.IntegerField(default=0)
    timeCreated=models.DateTimeField(default=datetime.now)

class MARKER_IMAGE(models.Model):
    markerId=models.ForeignKey(MARKER, on_delete=models.CASCADE, related_name='markerImageToMarker')
    image=models.ImageField()