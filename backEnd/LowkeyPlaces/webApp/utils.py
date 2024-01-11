#return user based on token or return None
from registrationAndLogin.models import USER
import jwt
from datetime import datetime, timedelta
from django.db.models.query import QuerySet
from dotenv import load_dotenv
import os


#load Key
load_dotenv()
randomKey=os.getenv('randomKey')

# generate token
def create_token(elem: QuerySet[USER]) -> str:
    load = {
        'name': elem.first()['USER'],
        'exp': datetime.utcnow() + timedelta(days=3)  # Token expiration time
    }
    token=jwt.encode(load, randomKey, algorithm='HS256')
    return token

#verify token
def token_to_user(usrToken: str) -> QuerySet[USER]:
    load=jwt.decode(usrToken, randomKey, algorithm='HS256')
    found=USER.objects.filter(field1=load['name'])
    exp=datetime.utcfromtimestamp(load['exp'])
    if found and exp > datetime.utcnow():
        return found.first(),'validToken'
    elif found:
        return found.first(), 'invalidToken'
    return None, ''


