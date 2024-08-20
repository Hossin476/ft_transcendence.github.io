# from urllib.parse import parse_qs
# from channels.middleware import BaseMiddleware
# from channels.db import database_sync_to_async
# from rest_framework_simplejwt.tokens import UntypedToken
# from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
# from django.contrib.auth.models import AnonymousUser
# from django.contrib.auth import get_user_model
# import jwt
# from django.conf import settings

# @database_sync_to_async
# def get_user(user_id):
#     try:
#         return get_user_model().objects.get(id=user_id)
#     except get_user_model().DoesNotExist:
#         return AnonymousUser()

# class JWTAuthMiddleware(BaseMiddleware):
#     async def __call__(self, scope, receive, send):
#         query_string = parse_qs(scope['query_string'].decode())
#         token = query_string.get('token', [None])[0]
#         if token is not None:
#             try:
#                 decoded_data = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
#                 user_id = decoded_data.get('user_id')
#                 scope['user'] = await get_user(user_id)
#             except InvalidToken:
#                 print("Invalid token.")
#                 scope['user'] = AnonymousUser()
#             except TokenError:
#                 print("Token error.")
#                 scope['user'] = AnonymousUser()
#             except jwt.DecodeError:
#                 print("Decode error.")
#                 scope['user'] = AnonymousUser()
#         else:
#             scope['user'] = AnonymousUser()
#         return await super().__call__(scope, receive, send)


from rest_framework_simplejwt.tokens import AccessToken
from channels.db import database_sync_to_async
from users.models import CustomUser
from urllib.parse import parse_qs


class JWTAuthMiddleware:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        query_string = scope.get("query_string", [])
        query_params = query_string.decode()
        
        query_dict = parse_qs(query_params)
        token = query_dict["token"][0]
        if token == '':
            scope['error'] = 'you have to provaid auth token'
        else:
            user = await self.get_user_from_token(token)
            if user is None:
                scope['error'] = 'invalid token'
            else:
                scope['user'] = user
        return await self.app(scope, receive, send)

    @database_sync_to_async
    def get_user_from_token(self, token):
        try:
            access_token = AccessToken(token)
            payload = access_token.payload
            user = CustomUser.objects.get(id=payload['user_id'])
            return user
        except:
            return None