from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from .managers import CustomUserManager



class CustomUser(AbstractUser):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=254)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_online = models.BooleanField(default=False)
    is_ingame = models.BooleanField(default=False)
    rank = models.IntegerField(default=1, validators=[MinValueValidator(1)])
    xp = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])
    wins = models.IntegerField()
    loses = models.ImageField()
    draws = models.IntegerField()
    #2FA
    key = models.CharField(max_length=255, null=True, default=None)
    # profile image 
    profile_image = models.ImageField(upload_to='images/')
    cover_image = models.ImageField(upload_to='images/')

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []


    objects = CustomUserManager()

    def __str__(self):
        return self.email


class Friendship(models.Model):

    REQUEST_STATE = [
        ('P', 'Pending'),
        ('A', 'Accepted')
    ]
    ACTIVE_STATE = [
        ('B', "BLOCKED"),
        ('A', "ACTIVE")
    ]

    request = models.CharField(max_length=1, choices=REQUEST_STATE, default='P')
    active = models.CharField(max_length=1, choices=ACTIVE_STATE, default='A')
    from_user = models.ForeignKey(
        CustomUser,
        related_name='from_user',
        on_delete=models.CASCADE
    )
    to_user = models.ForeignKey(
        CustomUser,
        related_name='to_user',
        on_delete=models.CASCADE
    )

# class Private_message(models.Model):
#     friendship = models.ForeignKey("Friendship", on_delete=models.CASCADE)
#     UserID = models.BigIntegerField()
#     time = models.DateTimeField(auto_now=True)