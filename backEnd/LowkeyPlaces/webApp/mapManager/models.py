from django.db import models
from friendManager.models import USER_RELATION
from registrationAndLogin.models import USER

# Create your models here.
class MAP(models.Model):
    title=models.CharField(max_length = 30)
    desc=models.TextField("")
    theme=models.IntegerField()
    lat=models.FloatField()
    long=models.FloatField()
    markerCount=models.IntegerField()
    isDeleted=models.BooleanField(default=False)

class MAP_USER(models.Model):
    mapId=models.ForeignKey(MAP, on_delete=models.CASCADE, related_name='mapUserToMapId')
    userId=models.ForeignKey(USER, on_delete=models.CASCADE, related_name='mapUserToUserId')
    status=models.IntegerField()

class MAP_REQEST(models.Model):
    usrRel = models.ForeignKey(USER_RELATION, on_delete=models.CASCADE, related_name='mapRequestToUserRelation')
    reqType = models.IntegerField()
    status = models.IntegerField()