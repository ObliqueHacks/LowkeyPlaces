# Generated by Django 4.2.8 on 2024-01-10 16:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('registrationAndLogin', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='dateTimeCreated',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
