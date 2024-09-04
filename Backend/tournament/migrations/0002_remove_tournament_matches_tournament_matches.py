# Generated by Django 5.1 on 2024-09-03 14:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pingpong', '0001_initial'),
        ('tournament', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tournament',
            name='matches',
        ),
        migrations.AddField(
            model_name='tournament',
            name='matches',
            field=models.ManyToManyField(to='pingpong.gameonline'),
        ),
    ]
