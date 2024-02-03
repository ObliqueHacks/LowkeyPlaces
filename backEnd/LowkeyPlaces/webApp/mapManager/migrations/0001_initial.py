# Generated by Django 4.2.8 on 2024-01-08 18:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('friendManager', '0001_initial'),
        ('registrationAndLogin', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='MAP',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=30)),
                ('desc', models.TextField(verbose_name='')),
                ('theme', models.IntegerField()),
                ('lat', models.FloatField()),
                ('long', models.FloatField()),
                ('markerCount', models.IntegerField()),
                ('isDeleted', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='MAP_USER',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.IntegerField()),
                ('mapId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mapUserToMapId', to='mapManager.map')),
                ('userId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mapUserToUserId', to='registrationAndLogin.user')),
            ],
        ),
        migrations.CreateModel(
            name='MAP_REQEST',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reqType', models.IntegerField()),
                ('status', models.IntegerField()),
                ('usrRel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mapRequestToUserRelation', to='friendManager.user_relation')),
            ],
        ),
    ]
