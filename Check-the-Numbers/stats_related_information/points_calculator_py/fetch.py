import json
import requests
import constants
import csv

#def main():
       

  
def get_stats(id):  
    player_stats = get_player_stats(id)
    goals = player_stats['stats'][0]['splits'][0]['stat']['goals']
    assists = player_stats['stats'][0]['splits'][0]['stat']['assists']
    shots = player_stats['stats'][0]['splits'][0]['stat']['shots']
    plusminus = player_stats['stats'][0]['splits'][0]['stat']['plusMinus']   
    blocks = player_stats['stats'][0]['splits'][0]['stat']['blocked']
    hits = player_stats['stats'][0]['splits'][0]['stat']['hits']
    ppp = player_stats['stats'][0]['splits'][0]['stat']['powerPlayPoints']
    pim = player_stats['stats'][0]['splits'][0]['stat']['pim']

    stats_list = [goals, assists, shots, plusminus, blocks, hits, pim, ppp]
    return stats_list

def get_player_stats(id):
        stats =  requests.get(constants.API_URL + constants.PEOPLE_ENDPOINT + id + constants.STATS_ENDPOINT)
        stats_json = json.loads(stats.text)
        stats_list = []
        if "stats" in stats_json:
                for item in stats_json["stats"]:
                        if "splits" in item:
                                for item in stats_json["stats"][0]["splits"]:
                                        if "stat" in item:
                                                if "goals" in stats_json["stats"][0]["splits"][0]["stat"]:
                                                        return stats_json       


def get_player(id, command):
    player_id = str (id)
    player = requests.get(constants.API_URL + constants.PEOPLE_ENDPOINT + player_id)
    player_json = json.loads(player.text)
    player_list = []

    for item in player_json:
        if "people" in item:
                for item in player_json["people"]:
                         if command in item:
                                return (item[command])

def get_all_teams():
    teams = requests.get(constants.API_URL + constants.TEAMS_ENDPOINT)
    teams_json = json.loads(teams.text)
    league_list = []
    for item in teams_json['teams']:
        print('{} - {}'.format(item['id'], item['abbreviation']))