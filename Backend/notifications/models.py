from django.db import models
from users.models import CustomUser
from users.models import Friendship

# Create your models here.
class GameNotification(models.Model):
    
    CHOICES     = [
                  ("T", "TicTacToe"),
                   ("P", "PingPong")
    ]
    sender      = models.ForeignKey(CustomUser, verbose_name='sender', on_delete=models.CASCADE, related_name = "game_notifcation_sender")
    receiver    = models.ForeignKey(CustomUser, verbose_name='receiver', on_delete=models.CASCADE, related_name = "game_notifcation_receiver")
    created_at  = models.DateTimeField(auto_now_add=True)
    game        = models.CharField(max_length=1, choices=CHOICES)



class FriendshipNotification(models.Model):
    # i remove those line because we have the sender and 
    sender      = models.ForeignKey(CustomUser, verbose_name='sender', on_delete=models.CASCADE, related_name = "friend_notifcation_sender")
    receiver    = models.ForeignKey(CustomUser, verbose_name='receiver', on_delete=models.CASCADE, related_name = "friend_notifcation_receiver")
    created_at  = models.DateTimeField(auto_now_add=True)
    friendship  = models.ForeignKey(Friendship, on_delete=models.CASCADE)