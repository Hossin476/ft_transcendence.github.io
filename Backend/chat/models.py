from django.db import models
from users.models import CustomUser,Friendship

class Message(models.Model):
    friendshipid    = models.ForeignKey(Friendship, related_name = "friendship", on_delete = models.CASCADE,null=False)
    sendId          = models.ForeignKey(CustomUser, related_name = "sender",on_delete = models.CASCADE)
    content         = models.TextField()
    created_at      = models.DateTimeField(auto_now_add=True)
    seen            = models.BooleanField(default=False)

    class Meta:
        ordering = ['created_at']
    def __str__(self):
        return f'{self.sendId} to {self.friendshipid} : {self.content}'

