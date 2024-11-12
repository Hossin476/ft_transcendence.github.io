from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.utils import timezone
from rest_framework_simplejwt.tokens import RefreshToken



class CustomUser(AbstractUser):
    username = models.CharField(max_length=255, unique=True, blank=False, null=False, default='default_username')
    date_joined = models.DateTimeField(auto_now_add=True)
    email = models.EmailField(max_length=255, unique=True)
    is_verified = models.BooleanField(default=False)
    is_online = models.BooleanField(default=False)
    is_ingame = models.BooleanField(default=False)
    game_type = models.CharField(max_length=255, blank=True, null=True, default=None)
    rank = models.IntegerField(default=1, validators=[MinValueValidator(1)])
    xp = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])
    wins_p = models.IntegerField(default=0)
    loses_p = models.IntegerField(default=0)
    wins_t = models.IntegerField(default=0)
    loses_t = models.IntegerField(default=0)
    last_time = models.DateTimeField(default=timezone.now)
    # 2FA
    key = models.CharField(max_length=255, null=True, default=None)
    two_factor_enabled = models.BooleanField(default=False)
    
    # profile image
    profile_image   = models.ImageField(upload_to='images/profile/', null=True)
    cover_image     = models.ImageField(upload_to='images/cover/', null=True)

    USERNAME_FIELD  = "username"
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username

    
    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return ({
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        })


class OneTimePassword(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    code = models.CharField(max_length=6, unique=True)

    def __str__(self):
        return f"{self.user.username}--passcode"


class Friendship(models.Model):

    REQUEST_STATE   = [
        ('P', 'Pending'),
        ('A', 'Accepted')
    ]
    ACTIVE_STATE = [
        ('B', "BLOCKED"),
        ('A', "ACTIVE")
    ]
    BLOCK_STATE = [
        ('F', "from_user"),
        ('T', "to_user"),
        ('N', "None")
    ]
    request         = models.CharField(max_length=1, choices=REQUEST_STATE, default='P')
    active          = models.CharField(max_length=1, choices=ACTIVE_STATE, default='A')
    block_user      = models.CharField(max_length = 1, choices=BLOCK_STATE, default='N')
    from_user       = models.ForeignKey(
        CustomUser,
        related_name    ='from_user',
        on_delete       =models.CASCADE
    )
    to_user         = models.ForeignKey(
        CustomUser,
        related_name    ='to_user',
        on_delete       =models.CASCADE
    )
    

class Block(models.Model):
    BLOCK_STATE = [
        ("F", "from_user"),
        ("T", "to_user"),
        ("N", "None")
    ]
    blocker     = models.ForeignKey(CustomUser, on_delete=models.CASCADE,related_name='blocker')
    blocked     = models.ForeignKey(CustomUser, on_delete=models.CASCADE,related_name='blocked')
    Block_user  = models.CharField(max_length=1, choices=Friendship.BLOCK_STATE, default='N')