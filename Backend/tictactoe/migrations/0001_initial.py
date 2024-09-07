# Generated by Django 5.1 on 2024-09-07 14:08

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='OnlineGameModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score_x', models.IntegerField(default=0, verbose_name='Score X')),
                ('score_o', models.IntegerField(default=0, verbose_name='Score O')),
                ('game_start', models.DateTimeField(auto_now_add=True)),
                ('game_end', models.DateTimeField(auto_now=True)),
                ('player1', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='player1_games', to=settings.AUTH_USER_MODEL, verbose_name='Player 1')),
                ('player2', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='player2_games', to=settings.AUTH_USER_MODEL, verbose_name='Player 2')),
                ('winner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='won_games', to=settings.AUTH_USER_MODEL, verbose_name='Winner')),
            ],
        ),
    ]
