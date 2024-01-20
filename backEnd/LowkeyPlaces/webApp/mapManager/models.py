from django.db import models
from friendManager.models import USER_RELATION
from registrationAndLogin.models import USER

# Create your models here.
class MAP(models.Model):
    title=models.CharField(max_length = 30)
    desc=models.TextField(default="")
    theme=models.IntegerField(default=0)
    lat=models.FloatField(default=0.0)
    long=models.FloatField(default=0.0)
    markerCount=models.IntegerField(default=0)
    isDeleted=models.BooleanField(default=False)

class MAP_USER(models.Model):
    mapId=models.ForeignKey(MAP, on_delete=models.CASCADE, related_name='mapUserToMapId')
    userId=models.ForeignKey(USER, on_delete=models.CASCADE, related_name='mapUserToUserId')
    status=models.IntegerField()
#status -> 0: owner 1: collaborator 2: spectator

class MAP_REQEST(models.Model):
    usrRel = models.ForeignKey(USER_RELATION, on_delete=models.CASCADE, related_name='mapRequestToUserRelation')
    reqType = models.IntegerField()
    status = models.IntegerField()