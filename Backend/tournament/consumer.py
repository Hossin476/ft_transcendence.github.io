from channels.generic.websocket import AsyncWebsocketConsumer
import json
from channels.db import database_sync_to_async
from notifications.serializers import playerSerializers
from tournament.models import Tournament, TournamentLocal, PlayerLocal, InviteTournament
from pingpong.models import GameOnline, GameOffline
from tournament.serializers import TournamentSerializer, TrounamentLocalSerializer
import asyncio
import random


@database_sync_to_async
def checkStart(tour_id, user):
    tournament = Tournament.objects.prefetch_related(
        'players').select_related('creator').get(id=tour_id)
    if user != tournament.creator or tournament.players.count() != 8:
        return False
    InviteTournament.objects.filter(tournament=tournament).delete()
    return True

@database_sync_to_async
def remove_user(tour_id, user):

    tournament = Tournament.objects.prefetch_related(
        'players').select_related('creator').get(id=tour_id)
    remove_tour = False
    if tournament.is_start == True:
        return remove_tour
    if user.id == tournament.creator.id:
        tournament.delete()
        remove_tour = False
    else:
        tournament.players.remove(user)
    return remove_tour


@database_sync_to_async
def set_start(tour_id):
    tournament = Tournament.objects.get(id=tour_id)
    if tournament.is_start == True:
        return TournamentSerializer(tournament).data
    tournament.is_start = True
    players = tournament.players.all().order_by('?')
    players = list(players)

    j = 0
    for i in range(0, 4):
        game = GameOnline.objects.create(
            player1=players[j],
            player2=players[j+1]
        )
        j += 2
        tournament.matches.add(game)
    for i in range(0, 3):
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
        if 'error' in self.scope:
            await self.close()
            return
        self.user = self.scope.get('user')
        self.tour_id = self.scope["url_route"]["kwargs"]["tour_id"]
        self.room_name = f'tour_{self.tour_id}'
        await self.accept()
        await self.channel_layer.group_add(self.room_name, self.channel_name)
        await self.channel_layer.group_send(self.room_name, {
            "type": "send_player_info",
            "user": playerSerializers(self.user).data
        })

    async def disconnect(self, close_code):
        if ('error' in self.scope):
            return
        await self.channel_layer.group_discard(self.room_name, self.channel_name)

    async def receive(self, text_data):
        # try:
        data_json = json.loads(text_data)
        print("tour_id", self.tour_id)
        tournament = None
        if data_json["type"] == "start_tournament":
            if not await  checkStart(self.tour_id, self.user):
                return
            # set the tournament to start
            # create the matches after shuffle
            # return and array of matches
            tournament = await set_start(self.tour_id)
            await self.channel_layer.group_send(self.room_name,
                                                {
                                                    "type": "send_data",
                                                    "data": tournament
                                                })
            # print("plaeyrs", tournament["players"])
            await self.channel_layer.group_send(f'notification_{self.user.id}',
                                                {
                                                    "type": "event_tournament",
                                                    "data": tournament
                                                })

            asyncio.create_task(self.countdown(tournament, 0, 4))
            asyncio.create_task(self.match_watcher(tournament["id"], 0, 4))
        elif data_json['type'] == "exit_tour":
            tour_removed = await remove_user(self.tour_id, self.user)
            if tour_removed:
                await self.channel_layer.group_send(self.room_name, {"type": "deleted_tour", })
            else:
                await self.channel_layer.group_send(self.room_name, {"type": "state.change", })

        # except Exception as e:
        #     print("error",e)

    async def match_watcher(self, id, start, nbr_matches):
        await asyncio.sleep(60)
        print("the watcher is watching the games")
        tournament = await database_sync_to_async(
            lambda: Tournament.objects.prefetch_related('matches').get(id=id)
        )()
        print("tournament", tournament)
        matches_state = start
        tour_knockouts = nbr_matches
        match_list = await database_sync_to_async(lambda: list(tournament.matches.select_related("player1", "player2", "winner").all()))()
        while matches_state <= tour_knockouts:
            for match in match_list:
                if match.is_game_end == True or match.is_start == False:
                    matches_state += 1
            await asyncio.sleep(10)
        print("round is finished")
        tournament.knockout = tournament.knockout/2
        print("knock out afore", tournament.knockout)
        knockout = int(tournament.knockout)
        await database_sync_to_async(tournament.save)()
        # make the next matches
        j = start
        if nbr_matches == 7:
            match_indx = 6
        else:
            match_indx = int(nbr_matches)
        print("start", start)
        print("round", int(start + knockout))
        for i in range(start, int(start + knockout)):
            print(" match_indx : ", match_indx)
            print("j = ", j)
            print("i = ", i)
            player1 = None
            player2 = None
            if match_list[j].winner is not None:
                player1 = match_list[j].winner
            if match_list[j+1].winner is not None:
                player2 = match_list[j+1].winner
            match_list[match_indx].player1 = player1
            match_list[match_indx].player2 = player2
            if player1 is None or player2 is None:
                match_list[match_indx].is_game_end = True
                if player1:
                    match_list[match_indx].winner = player1
                elif player2:
                    match_list[match_indx].winner = player2
            await database_sync_to_async(match_list[match_indx].save)()
            print("the match is saved")
            j += 2
            match_indx += 1
        tournament = await database_sync_to_async(
            lambda: Tournament.objects.prefetch_related('matches').get(id=id)
        )()
        tour = await database_sync_to_async(lambda: TournamentSerializer(tournament).data)()
        if knockout > 0:
            asyncio.create_task(self.countdown(
                tour, nbr_matches, nbr_matches + knockout))
            asyncio.create_task(self.match_watcher(
                tour["id"], nbr_matches, nbr_matches + knockout))

    async def countdown(self, tournament, start, nbr_matches):
        await asyncio.sleep(6)
        match_query = tournament["matches"]
        matches = list(match_query)
        print(tournament)
        for i in range(int(start), int(nbr_matches)):
            print("i : ", i)
            if matches[i]["is_game_end"] is True:
                continue
            await self.channel_layer.group_send(f'notification_{matches[i]["player1"]["id"]}', {
                'type': 'game.accept',
                'from': matches[i]["player1"]["username"],
                'to': matches[i]["player2"]["username"],
                'game_id': matches[i]['id'],
                'game_type': 'P'
            })
            await self.channel_layer.group_send(f'notification_{matches[i]["player2"]["id"]}', {
                'type': 'game.accept',
                'from': matches[i]["player1"]["username"],
                'to': matches[i]["player2"]["username"],
                'game_id': matches[i]['id'],
                'game_type': 'P'
            })

    async def send_data(self, event):
        await self.send(text_data=json.dumps(event))

    async def send_player_info(self, event):
        await self.send(text_data=json.dumps(event))

    async def deleted_tour(self, event):
        await self.send(text_data=json.dumps(event))

    async def state_change(self, event):
        await self.send(text_data=json.dumps(event))






@database_sync_to_async
def make_matches(tour_id, user, players):
    tournament = TournamentLocal.objects.get(id=tour_id)
    tournament.is_start = True
    random.shuffle(players)
    j = 0
    for i in range(0,2):
        game = GameOffline.objects.create(creater_game=user, player1=players[j], player2=players[j+1])
        tournament.matches.add(game)
        j += 2
    game = GameOffline.objects.create(creater_game=user)
    tournament.matches.add(game)
    tournament.save()
    return TrounamentLocalSerializer(tournament).data

 

class Tournamentlocal(AsyncWebsocketConsumer):

    async def connect(self):
        if 'error' in self.scope:
            await self.close()
            return
        self.user = self.scope['user']
        self.tour_id = self.scope['url_route']['kwargs']['tour_id']
        self.room_name = f'tourLocal_{self.tour_id}'
        await self.channel_layer.group_add(self.room_name, self.channel_name)
        await self.accept()
    
    async def disconnect(self, close_code):
        if ('error' in self.scope):
            return
        await self.channel_layer.group_discard(self.room_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        if data['type'] == "start_tournament":
            tournament_model =  await make_matches(self.tour_id, self.user,data['players'])
            await self.channel_layer.group_send(self.room_name,
                            {
                                'type':'start.tournament',
                                'model':tournament_model
                            })
            asyncio.create_task(self.matches_watcher(self.tour_id, 2,0))
    async def start_tournament(self, event):
        await self.send(text_data=json.dumps(event))
    
    async def matches_watcher(self, tour_id, next_match, current_match):
        tournament = await database_sync_to_async(lambda : TournamentLocal.objects.prefetch_related('matches').get(id=tour_id))()
        matches = await database_sync_to_async(lambda :list(tournament.matches.select_related('creater_game').all().order_by('id')))()
        await self.channel_layer.group_send(f'notification_{self.user.id}',{
            'type': 'game.offline',
            'game_id': matches[current_match].id,
            'game_type': 'P'
        })
        while matches[current_match].is_game_end != True:
            matches[current_match] =  await database_sync_to_async(lambda: GameOffline.objects.get(id=matches[current_match].id))()
            await asyncio.sleep(2)
        if current_match == 2:
            return 
        if current_match % 2 == 0:
            matches[next_match].player1 = matches[current_match].winner
        else:
            matches[next_match].player2 = matches[current_match].winner
        print("next tour:", next_match)
        await database_sync_to_async(matches[next_match].save)()
        asyncio.create_task(self.matches_watcher(self.tour_id, next_match + int(current_match/2), current_match + 1))
