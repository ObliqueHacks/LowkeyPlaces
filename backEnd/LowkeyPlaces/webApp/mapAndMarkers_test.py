from django.test import TestCase
from registrationAndLogin.views import register, login
from registrationAndLogin.models import USER
from rest_framework.test import APIRequestFactory
from rest_framework.response import Response
from rest_framework import status
from utils import create_token
from django.core.exceptions import ValidationError
from friendManager.models import FRIEND_REQUEST, USER_RELATION
from friendManager.views import makeRequest, getUserInfo
from mapManager.views import makeMap
from userAndFriends_test import CommonSetup



class TestMakeMap(TestCase, CommonSetup):
    def setUp(self):
        super().start()
        
    def testMakeMap(self):
        #assert map requests can be made
        request=self.factory.post('/api-auth/homepage/register', {"userToken": self.user1}, format='json')
        response=makeMap(request)
        self.assertEqual(201, response.status_code)
        
        #do it again
        request=self.factory.post('/api-auth/homepage/register', {"userToken": self.user2}, format='json')
        response=makeMap(request)
        self.assertEqual(201, response.status_code)
        
        #check if incorrect token is not taken
        request=self.factory.post('/api-auth/homepage/register', {"userToken": "3dkjgfdln"}, format='json')
        response=makeMap(request)
        self.assertEqual(408, response.status_code)
        
        
        