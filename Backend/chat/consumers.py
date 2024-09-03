from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
import json
from django.db.models import Q
from channels.db import database_sync_to_async
from datetime import datetime
from .models import Message
from users.models import CustomUser,Friendship
from .serializers import UserSerializer,MessageSerializer,FriendShipSerializer


@database_sync_to_async
def set_message(text_data_json):
    send_user = json.loads(text_data_json["senderId"])
    friendship =  Friendship.objects.get(id=text_data_json["friendshipId"])
    _message = Message.objects.create(
        friendshipid = Friendship.objects.get(id=text_data_json["friendshipId"]),
        sendId = CustomUser.objects.get(id=send_user["id"]) , 
        content = text_data_json["content"],
    )

    friend = FriendShipSerializer(friendship).data
    if friend["from_user"]["id"] != send_user["id"]:
        friend.pop("from_user")
        friend["user"] = friend.pop("to_user")
    else:
        friend.pop("to_user")
        friend["user"] = friend.pop("from_user")

    return {"message":MessageSerializer(_message).data,"friendship":friend}

@database_sync_to_async
def update_seen(text_data_json):
    message = Message.objects.get(id=text_data_json["msg_id"])
    message.seen = True
    message.save()


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        if "error" in self.scope:
            self.close()
            return
        self.user_id = self.scope['user'].id
        self.group_name = f"chat_{self.user_id}"
    
        async_to_sync(self.channel_layer.group_add) (
            self.group_name,
            self.channel_name
        )
        self.accept()
    def disconnect(self,code):
        if "error" in self.scope:
            return
        async_to_sync(self.channel_layer.group_discard) (
            self.group_name,
            self.channel_name
        )
    def receive(self, text_data=None):
        text_data_json = json.loads(text_data)
        print(text_data_json["type"])
        if(text_data_json["type"] == "new_messgaes"):
            receiver = "chat_" + str(text_data_json["receiver"])
            convo =  async_to_sync(set_message)(text_data_json)
            async_to_sync(self.channel_layer.group_send) (
                receiver,
                {
                    "type": "chat.message",
                    "convo" : convo,
                    "sender": text_data_json["sender"],
                    "receiver":text_data_json["receiver"]
                }
            )
            async_to_sync(self.channel_layer.group_send) (
                self.group_name,
                {
                    "type": "chat.message",
                    "convo" : convo,
                    "sender": text_data_json["sender"],
                    "receiver":text_data_json["receiver"]
                }
            )
        if(text_data_json["type"] == "seen_message"):
            print("zeeeb khdaaam olyaaa")
            receiver = "chat_"+str(text_data_json["reciever"])
            async_to_sync(update_seen)(text_data_json)
            async_to_sync(self.channel_layer.group_send) (
             receiver,
            {
                "type": "message.seen",
                "reciever" : text_data_json["reciever"]
            }
        )
    def chat_message(self,event):
        print("zebi 3ndk mochkil f front")
        self.send(text_data=json.dumps({
            "event": event
        }))
    def message_seen(self,event):
        self.send(text_data=json.dumps({
            "event": event
        }))