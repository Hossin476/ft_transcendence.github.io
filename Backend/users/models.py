from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.utils import timezone



class CustomUser(AbstractUser):
<<<<<<< HEAD
    username = models.CharField(max_length=255, unique=True, blank=False, null=False, default='default_username')
    date_joined = models.DateTimeField(auto_now_add=True)
    is_online = models.BooleanField(default=False)
    is_ingame = models.BooleanField(default=False)
    rank = models.IntegerField(default=1, validators=[MinValueValidator(1)])
    xp = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])
    wins_p = models.IntegerField(default=0)
    loses_p = models.IntegerField(default=0)
    wins_t = models.IntegerField(default=0)
    loses_t = models.IntegerField(default=0)
    last_time = models.DateTimeField(default=timezone.now)
=======
    username        = models.CharField(max_length=255, unique=True, blank=False, null=False, default='default_username')
    date_joined     = models.DateTimeField(auto_now_add=True)
    is_online       = models.BooleanField(default=False)
    is_ingame       = models.BooleanField(default=False)
    game_type        = models.CharField(max_length=255, null=True, default=None)
    rank            = models.IntegerField(default=1, validators=[MinValueValidator(1)])
    xp              = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])
    wins            = models.IntegerField(default=0)
    loses           = models.IntegerField(default=0)
    draws           = models.IntegerField(default=0)
    last_time       = models.DateTimeField(default=timezone.now)
>>>>>>> 153aa05297be6d1d828159d1c5ca906e65f569bb
    # 2FA
    key             = models.CharField(max_length=255, null=True, default=None)
    # profile image 
    profile_image   = models.ImageField(upload_to='images/profile/', null=True)
    cover_image     = models.ImageField(upload_to='images/cover/', null=True)

    USERNAME_FIELD  = "username"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username


class Friendship(models.Model):

    REQUEST_STATE   = [
        ('P', 'Pending'),
        ('A', 'Accepted')
    ]
    ACTIVE_STATE = [
        ('B', "BLOCKED"),
        ('A', "ACTIVE")
    ]
    request         = models.CharField(max_length=1, choices=REQUEST_STATE, default='P')
    active          = models.CharField(max_length=1, choices=ACTIVE_STATE, default='A')
    from_user       = models.ForeignKey(
        CustomUser,
        related_name='from_user',
        on_delete=models.CASCADE
    )
    to_user         = models.ForeignKey(
        CustomUser,
        related_name    ='to_user',
        on_delete       =models.CASCADE
    )
