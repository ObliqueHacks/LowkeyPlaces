from django.db import models
from registrationAndLogin.models import USER
from mapManager.models import MAP

# Create your models here.
class MARKER(models.Model):
    lat=models.FloatField()
    long=models.FloatField()
    address=models.CharField(max_length = 40)
    mapId=models.ForeignKey(MAP, on_delete=models.CASCADE, related_name='markerToMapId')
    userId=models.ForeignKey(USER, on_delete=models.CASCADE, related_name='markerToUserId')
    imageCount=models.IntegerField(default=0)
    hasDesc=models.BooleanField(default=False)
    dateTimeCreated=models.DateTimeField()