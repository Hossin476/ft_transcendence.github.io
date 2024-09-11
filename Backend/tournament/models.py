from django.db import models

# Create your models here.
from users.models import CustomUser
from pingpong.models import GameOnline
class Tournament(models.Model):

    creator         = models.ForeignKey(CustomUser, related_name="admin",on_delete=models.CASCADE)
    players         = models.ManyToManyField(CustomUser)
    matches         = models.ManyToManyField(GameOnline, blank=True)
    created_at      = models.DateTimeField(auto_now_add=True)
    name            = models.CharField(max_length=255)
    is_start        = models.BooleanField(default=False)
    is_end          = models.BooleanField(default=False)
    knockout        = models.IntegerField(default=4)
    is_full         = models.BooleanField(default=False)

    def __str__(self):
        return self.name + "tour"
    
class InviteTournament(models.Model):
    tournament  = models.ForeignKey(Tournament,on_delete=models.CASCADE)
    user        = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    created_at  = models.DateTimeField(auto_now_add=True)
    state       = models.BooleanField(default = False)
    
    def __str__(self):
        return str(self.id) + "invite"