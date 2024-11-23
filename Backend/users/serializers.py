from rest_framework import serializers
from .models import *
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken,TokenError
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import serializers
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import smart_bytes, force_str
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from .utils import *
from django.conf import settings
from notifications.serializers import playerSerializers
    

class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name']

class AppUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'date_joined']
        
class MatchUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'profile_image',]
    

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    password2 = serializers.CharField(max_length=68, min_length=6, write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'password2']
    
    def validate(self, attrs):
        password = attrs.get('password', '')
        password2 = attrs.get('password2', '')
        if password != password2:
            raise serializers.ValidationError("passwords do not match !")
        return attrs

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username= validated_data.get('username'),
            email = validated_data.get('email'),
            password= validated_data.get('password')
        )
        return user

class UserLoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=68, write_only=True)
    access = serializers.CharField(max_length=255, read_only=True)
    refresh = serializers.CharField(max_length=255, read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'password', 'access', 'refresh', 'user']

    def get_user(self, obj):
        try:
            if isinstance(obj, dict) and 'username' in obj:
                user = CustomUser.objects.get(username=obj['username'])
                data = playerSerializers(user).data
                data['user_id'] = user.id
                return data
            return None
        except Exception :
            return None

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        request = self.context.get('request')
        user = authenticate(request, username=username, password=password)

        if user:
            if not user.is_verified:
                raise AuthenticationFailed({'error': 'user not verified !'})
            
            user_tokens = user.tokens()
            
            if user.two_factor_enabled:
                return {'username': user.username}
            else:
                return {
                    'username': user.username,
                    'access': str(user_tokens.get('access')),
                    'refresh': str(user_tokens.get('refresh')),
                }
        raise AuthenticationFailed({'error': 'invalid credentials, try again !'})




class PasswordResetSerializer(serializers.Serializer):
    
    email = serializers.EmailField(max_length=255)

    class Meta:
        model = CustomUser
        fields = ['email']

    def validate(self, attrs):
        email = attrs.get('email')
        if CustomUser.objects.filter(email=email).exists():
            user = CustomUser.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            request = self.context.get('request')
            site_domain = get_current_site(request).domain
            rltv_link = reverse('password-reset-confirm', kwargs={'uidb64': uidb64, 'token': token})
            absl_link = f"https://{site_domain}{rltv_link.replace('api/users/', '')}"
            email_body = f"Hi {user.username}, use the link bellow to reset your password \n {absl_link}"
            data = {
                'email_body': email_body,
                'email_subject': 'Reset your Password',
                'to_email': user.email
            }
            send_password_reset_email(data)
            return user
        else:
            raise serializers.ValidationError({"error": "User with this email does not exist"})

class SetNewPasswordSerializer(serializers.Serializer):

    password = serializers.CharField(max_length=100, min_length=6, write_only=True)
    confirm_password = serializers.CharField(max_length=100, min_length=6, write_only=True)
    uidb64 = serializers.CharField(write_only=True)
    token = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ["password", "confirm_password", "uidb64", "token"]

    def validate(self, attrs):
        try:
            password = attrs.get("password")
            confirm_password = attrs.get("confirm_password")
            uidb64 = attrs.get("uidb64")
            token = attrs.get("token")
            user_id = force_str(urlsafe_base64_decode(uidb64))
            user = CustomUser.objects.get(id=user_id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed("The reset link is invalid or has expired", 401)
            if password != confirm_password:
                raise AuthenticationFailed("passwords do not match !")
            user.set_password(password)
            user.save()
            return user
        except Exception as e:
            raise AuthenticationFailed("The reset link is invalid or has expired", 401)
    
class UserLogoutSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()

    default_error_messages = {
        'bad_token': ('Token is invalid or expired')
    }

    def validate(self, attrs):
        self.token = attrs.get('refresh_token')
        return attrs

    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError:
            return self.fail('bad_token')

class ProfileImageSerializer(serializers.Serializer):
    image = serializers.ImageField()

    def validate(self, data):
        image_type = self.context.get('image_type')
        if image_type not in ['profile', 'cover']:
            raise serializers.ValidationError("Invalid image type")
        return data

    def create(self, validated_data):
        request = self.context['request']
        user = request.user
        image = validated_data['image']
        
        if self.context['image_type'] == 'user':
            user.profile_image = image
        else:
            user.cover_image = image
        
        user.save()
        return user
    

class BlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Block
        fields = ['id', 'blocker', 'blocked', 'Block_user']
