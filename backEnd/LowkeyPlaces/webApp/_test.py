from django.test import TestCase
from registrationAndLogin.views import register, login
from registrationAndLogin.models import USER
from friendManager import views
from rest_framework.test import APIRequestFactory
from rest_framework.response import Response
from rest_framework import status
from utils import create_token

class TestRegistrationAndLogin(TestCase):
    # Make 10 users
    def setUp(self):
        passwords_dict = {
            'User1': 'A$2rP#zT8x',
            'User2': 'qF9v!oI7jL',
            'User3': 'gH5uX*bW1y',
            'User4': 'cK3s&dV6mN',
            'User5': 'xP8l@zQ4eF',
            'User6': 'iO7w#yU6vB',
            'User7': 'mC2n!hG3fX',
            'User8': 'rZ1aV&kP9t',
            'User9': 'bJ4eQ7dM2u',
            'User10': 'lT6oI9gY#1'
        }
        factory = APIRequestFactory()
        
        # Make Register Account Requests
        for i in passwords_dict:
            request=factory.post('/api-auth/register', {'name': i, 'psswd': passwords_dict[i]}, format='json')
            response = register(request)
            try:
                elem = USER.objects.get(name=i)
                self.assertEqual(elem.name, i)
                self.assertEqual(elem.psswd, passwords_dict[i])
            except USER.DoesNotExist:
                self.fail("Record Not Populated")

            self.assertEqual(response.data, {'user': 'success'})
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Assert Registered Username Will Not Be Allowed
        request=factory.post('/api-auth/register', {'name': 'User1' ,'psswd':'A$2rP#zT8x'}, format='json')
        response=register(request)
        self.assertEqual(response.status_code, 400)


    def testAuthenitication(self):
        factory = APIRequestFactory()
        #correct username and incorrect password
        request=factory.post('/api-auth/login', {'name': 'User1' ,'psswd':'A$2rP#zT8xfdf'}, format='json')
        response = login(request)
        self.assertEqual(response.status_code, 400)

        #incorrect usernames correct password 
        request=factory.post('/api-auth/login', {'name': 'User11' ,'psswd':'A$2rP#zT8x'}, format='json')
        response = login(request)
        self.assertEqual(response.status_code, 400)


        request=factory.post('/api-auth/login', {'name': 'User10' ,'psswd':'A$2rP#zT8x'}, format='json')
        response = login(request)
        self.assertEqual(response.status_code, 400)

        #incorrect username and incorrect password
        request=factory.post('/api-auth/login', {'name': 'User10' ,'psswd':'A$2frP#zT8x'}, format='json')
        response = login(request)
        self.assertEqual(response.status_code, 400)
        #correct username correct password
        request=factory.post('/api-auth/login', {'name': 'User1' ,'psswd':'A$2rP#zT8x'}, format='json')
        response = login(request)
        self.assertEqual(response.status_code, 201)
        #assert it gave correct code:
        self.assertEqual(response.data, {'genToken': create_token(USER.objects.get(name='User1'))})


class TestFriendManager(TestRegistrationAndLogin):
    def setUp(self):
        super().setUp()

