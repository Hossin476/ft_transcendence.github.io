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
            scope['error'] = 'You have to provide the auth token'
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