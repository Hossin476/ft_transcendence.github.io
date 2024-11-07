from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer
from asgiref.sync import async_to_sync
import json
from django.db.models import Q
from channels.db import database_sync_to_async
from datetime import datetime
from .models import Message
from users.models import CustomUser,Friendship,Block
from .serializers import UserSerializer,MessageSerializer,FriendShipSerializer


"""

manage the friendship
    -keep view profile
    -exlude the game invites and chat

manage the block 
    -exclude the user from the search
    -exclude the user from the chat
    -unfriend the user
    -this should be managed globally 
    -u need to create a module for the block 

"""


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
def block_event(text_data_json, userId):
    friendship = text_data_json["friendship"]
    blocked = text_data_json["blocked"]
    friendship_obg = Friendship.objects.select_related("from_user","to_user").get(id=friendship)

    if friendship_obg.from_user.id == userId or friendship_obg.to_user.id == userId:
        if friendship_obg.from_user.id == blocked or friendship_obg.to_user.id == blocked:
            blocker = Block.objects.create(
                blocker = CustomUser.objects.get(id=userId),
                blocked = CustomUser.objects.get(id=blocked),
            )
            Friendship.objects.filter(id=friendship).delete()
            return True
    return False    
        
        

    return {"blocker":blocker,"block_user":block_user}


# return the friendship id to fix the bug of the seen event 
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
        event_type = text_data_json.get("type")
    
        if event_type == "new_messgaes":
            self.handle_new_message(text_data_json)
        elif event_type == "seen_message":
            self.handle_seen_message(text_data_json)
        elif event_type == "typing":
            self.handle_typing(text_data_json)
        elif event_type == "count":
            self.hundel_count(text_data_json)
        elif event_type == "block":
            self.handle_block(text_data_json)
        else:
            print("error f recieve")

    def handle_new_message(self, text_data_json):
        receiver = "chat_" + str(text_data_json["receiver"])
        convo = async_to_sync(set_message)(text_data_json)
        async_to_sync(self.channel_layer.group_send) (
            receiver,
            {
                "type": "chat.message",
                "convo" : convo,
                "sender": text_data_json["sender"],
                "receiver": text_data_json["receiver"]
            }
        )
        async_to_sync(self.channel_layer.group_send) (
            self.group_name,
            {
                "type": "chat.message",
                "convo" : convo,
                "sender": text_data_json["sender"],
                "receiver": text_data_json["receiver"]
            }
        )
    def handle_block(self, text_data_json):
        receiver = "chat_"+str(text_data_json["blocked"])
        blocker =  async_to_sync(block_event)(text_data_json,self.user_id)
        async_to_sync(self.channel_layer.group_send) (
            receiver,
            {
                "type": "block",
                "blocker" : blocker
            }
        )
        async_to_sync(self.channel_layer.group_send) (
            self.group_name,
            {
                "type": "block",
                "blocker" : blocker
            }
        )
    def handle_seen_message(self, text_data_json):
        receiver = "chat_"+str(text_data_json["reciever"])
        friendship = text_data_json["friendship"]
        async_to_sync(update_seen)(text_data_json)
        async_to_sync(self.channel_layer.group_send) (
            receiver,
            {
                "type": "message.seen",
                "reciever" : text_data_json["reciever"],
                "friendship" : friendship,
            }
        )
    
    def handle_typing(self, text_data_json):
        receiver = "chat_"+str(text_data_json["reciever"])
        async_to_sync(self.channel_layer.group_send) (
            receiver,
            {
                "type": "typing",
                "reciever" : text_data_json["reciever"],
                "sender" : text_data_json["senderId"],
            }
        )
    def hundel_count(self, text_data_json):
        receiver = "chat_"+str(text_data_json["reciever"])
        async_to_sync(self.channel_layer.group_send) (
            receiver,
            {
                "type": "count",
                "reciever" : text_data_json["reciever"],
                "sender" : text_data_json["senderId"],
            }
        )

    def block(self, event):
        self.send(text_data=json.dumps({
            "event": event
        }))
    def unblock(self, event):
        self.send(text_data=json.dumps({
            "event": event
        }))
    def chat_message(self, event):
        self.send(text_data=json.dumps({
            "event": event
        }))
    def message_seen(self, event):
        self.send(text_data=json.dumps({
            "event": event
        }))
    def typing(self, event):
        self.send(text_data=json.dumps({
            "event": event
        }))
    def count(self, event):
        self.send(text_data=json.dumps({
            "event": event
        }))