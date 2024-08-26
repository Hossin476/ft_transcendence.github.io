from channels.middleware import BaseMiddleware
from rest_framework_simplejwt.tokens import AccessToken
from channels.db import database_sync_to_async
from urllib.parse import parse_qs
from ..models import MyUser
class JWTAuthMiddleware:

      def __init__(self, app):
            self.app = app

      async def __call__(self,scope,recieve,send):
        
        query_string = scope.get("query_string",[])
        query_params = query_string.decode()

        query_dict = parse_qs(query_params)
        token = query_dict["token"][0]

        if token == '':
            scope['error'] = "you have to provide an Auth token"
        else:
            user = await self.get_user_from_token(token)
            if user is None:
                  scope['error']= 'invalid token'
            else:
                  scope['user'] = user
        return await self.app(scope, recieve,send )

      @database_sync_to_async
      def  get_user_from_token(self ,token):
          try:
                access_token = AccessToken(token)
                payload = access_token.payload
                user = MyUser.objects.get(id=payload['user_id'])
                return user
          except:
                return None