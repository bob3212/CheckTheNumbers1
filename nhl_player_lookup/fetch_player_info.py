import json
import requests
import kivy
import constants


def main():
    get_player('8471214')


def get_player(player_id):
    player = requests.get(constants.API_URL + constants.PEOPLE_ENDPOINT + player_id)
    player_json = json.loads(player.text)
    player_list = []
    for item in player_json['people']:
            print('{} - {}'.format(item['fullName'], item['primaryNumber']))


def get_all_teams():
    teams = requests.get(constants.API_URL + constants.TEAMS_ENDPOINT)
    teams_json = json.loads(teams.text)
    league_list = []
    for item in teams_json['teams']:
        print('{} - {}'.format(item['id'], item['abbreviation']))



if __name__ == '__main__':
    main()