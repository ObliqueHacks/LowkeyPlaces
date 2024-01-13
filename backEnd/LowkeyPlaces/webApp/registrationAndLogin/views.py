from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import registrationSerializer, loginSerializer 
from .models import USER
from django.utils import timezone
from rest_framework import status
from utils import create_token
# Create your views here.
@api_view(['Post'])
def register(request):
    data=request.data
    serializer=registrationSerializer(data=data)
    if serializer.is_valid():
        instance=serializer.save()
        instance.dateTimeCreated = timezone.now()
        instance.save()
        return Response({'user': 'success'}, status=status.HTTP_201_CREATED)
    else:
        return Response({'error': 'user_name_taken'}, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['Post'])
def login(request):
    data = request.data
    serializer = loginSerializer(data=data)
    if serializer.is_valid():
        found=USER.objects.filter(name=str(serializer.validated_data['name']),psswd=str(serializer.validated_data['psswd']))
        if found:
            found=found.first()
            genToken = create_token(found)
            return Response({'genToken': genToken}, status=status.HTTP_201_CREATED)
    return Response({'error': 'failed'}, status=status.HTTP_400_BAD_REQUEST)