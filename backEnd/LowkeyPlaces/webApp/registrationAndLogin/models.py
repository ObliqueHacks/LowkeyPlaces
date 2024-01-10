from django.db import models

# Create your models here.
class USER(models.Model):
    name=models.CharField(max_length = 20, unique=True)
    psswd=models.CharField(max_length=20)
    email=models.EmailField(unique=True)
    dateTimeCreated=models.DateTimeField()
    isDeleted=models.BooleanField(default=False)
    mapCount=models.IntegerField(default=0)
    token=models.CharField(max_length = 15)