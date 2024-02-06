"""
WSGI config for webApp project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application
import sys

print("Python path:", sys.path)
print("Environment variables:", os.environ)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'webApp.settings')


application = get_wsgi_application()
