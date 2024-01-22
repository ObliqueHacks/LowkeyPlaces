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
from .userAndFriends_test import CommonSetup



class TestMakeMap(TestCase, CommonSetup):
    def setUp(self):
        super().start()
        
    def TestMakeMap():
        pass