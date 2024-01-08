from django.db import models

# id is loaded by default into each model
# Create your models here

##User based models
class USER(models.Model):
    name=models.CharField(max_length = 20, unique=True)
    psswd=models.CharField(max_length=20)
    email=models.EmailField(unique=True)
    dateTimeCreated=models.DateTimeField()
    isDeleted=models.BooleanField(default=False)
    mapCount=models.IntegerField(default=0)
    token=models.CharField(max_length = 15)

class USER_RELATION(models.Model):
    usrOneId=models.ForeignKey(USER, on_delete=models.CASCADE, related_name='usrRelToUser1')
    usrTwoId=models.ForeignKey(USER, on_delete=models.CASCADE, related_name='usrRelToUser2')
    status=models.IntegerField()

class FRIEND_REQUEST(models.Model):
    sendId=models.ForeignKey(USER, on_delete=models.CASCADE, related_name='senderToUser')
    recId=models.ForeignKey(USER, on_delete=models.CASCADE, related_name='receiverToUser')
    dateSent=models.DateTimeField()
    status=models.IntegerField
    

##Map based models
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

class MARKER(models.Model):
    lat=models.FloatField()
    long=models.FloatField()
    address=models.CharField(max_length = 40)
    mapId=models.ForeignKey(MAP, on_delete=models.CASCADE, related_name='markerToMapId')
    userId=models.ForeignKey(USER, on_delete=models.CASCADE, related_name='markerToUserId')
    imageCount=models.IntegerField(default=0)
    hasDesc=models.BooleanField(default=False)
    dateTimeCreated=models.DateTimeField()

class MAP_REQEST(models.Model):
    usrRel = models.ForeignKey(USER_RELATION, on_delete=models.CASCADE, related_name='mapRequestToUserRelation')
    reqType = models.IntegerField()
    status = models.IntegerField()