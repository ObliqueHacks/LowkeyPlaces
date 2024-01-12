from django.urls import path
from .views import 

urlpatterns = [
    path('user/', register, name='user_info'),
    path('request/', login, name='send_friend_request')
    
]
