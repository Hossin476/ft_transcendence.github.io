from channels.generic.websocket import AsyncWebsocketConsumer
import json
from channels.db import database_sync_to_async
from notifications.serializers import playerSerializers
from tournament.models import Tournament
from pingpong.models import GameOnline
from tournament.serializers import TournamentSerializer
import asyncio


@database_sync_to_async
def set_start(tour_id):
    tournament = Tournament.objects.get(id=tour_id)
    if tournament.is_start == True:
        return TournamentSerializer(tournament).data

    tournament.is_start = True
    players = tournament.players.all().order_by('?')
    players = list(players)

    j = 0
    for i in range(0,4):
        game = GameOnline.objects.create(
            player1 = players[j],
            player2 = players[j+1]
        )
        j+=2
        tournament.matches.add(game)
    for i in range(0,3):
        game = GameOnline.objects.create()
        tournament.matches.add(game)
    tournament.save()
    return TournamentSerializer(tournament).data

class TournamentConsumer(AsyncWebsocketConsumer):
    tasks = {}
    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.user = None
        self.tour_id = None
        self.room_name = None

    async def connect(self):
        try:
            if 'error' in self.scope:
                await self.close()
                return
            self.user = self.scope.get('user')
            self.tour_id = self.scope["url_route"]["kwargs"]["tour_id"]
            self.room_name = f'tour_{self.tour_id}'
            await self.accept()
            await self.channel_layer.group_add(self.room_name,self.channel_name)
            await self.channel_layer.group_send(self.room_name, {
                "type": "send_player_info",
                "user": playerSerializers(self.user).data
            })
        except Exception as e:
            print("error", e)

    async def disconnect(self,close_code):
        print("test")
        if('error' in self.scope):
            return
        await self.channel_layer.group_discard(self.room_name,self.channel_name)

    async def receive(self,text_data):
        try:
            data_json = json.loads(text_data)
            print("tour_id",self.tour_id)
            tournament = None
            if data_json["type"] == "start_tournament":
                #set the tournament to start
                #create the matches after shuffle
                # return and array of matches
                tournament = await set_start(self.tour_id)
                await self.channel_layer.group_send(self.room_name,
                    {
                        "type" : "send_data",
                        "data" : tournament
                    })
                # print("plaeyrs", tournament["players"])
                await self.channel_layer.group_send(f'notification_{self.user.id}',
                    {
                        "type" : "event_tournament",
                        "data" : tournament
                    })
                asyncio.create_task(self.countdown(tournament))
                TournamentConsumer.tasks[f'tour_{self.tour_id}']= asyncio.create_task(self.match_watcher(tournament.id))


    
        except Exception as e:
            print("error",e)

    async def match_watcher(self,id):
        await asyncio.sleep(60)
        tournament = database_sync_to_async(Tournament.objects.get(id=id))
        





    async def countdown(self,tournament):
        try:
            await asyncio.sleep(6)
            matches = tournament["matches"]

            for match in matches:
                print("matches are : ",match)
                await self.channel_layer.group_send(f'notification_{match["player1"]["id"]}', {
                    'type': 'game.accept',
                    'from': match["player1"]["username"],
                    'to': match["player2"]["username"],
                    'game_id': match['id'],
                    'game_type': 'P'
                })
                await self.channel_layer.group_send(f'notification_{match["player2"]["id"]}', {
                    'type': 'game.accept',
                    'from': match["player1"]["username"],
                    'to': match["player2"]["username"],
                    'game_id': match['id'],
                    'game_type': 'P'
                })
            # print("try catch")
        except Exception as e:
            print(e)
    async def send_data(self, event):
        self.send(text_data=json.dumps(event))
    

    async def send_player_info(self, event):
        self.send(text_data=json.dumps(event))
    
