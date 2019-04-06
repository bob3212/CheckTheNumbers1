import json
import requests
import kivy
import constants


def main():
    while True:
        team_id = ask_for_team()
        print(team_id)
        break


def ask_for_team():
    while True:
        get_all_teams()
        teams_tuples = get_all_teams()
        team_ids = []
        for item in teams_tuples:
            print('{} - {}'.format(item[0], item[1]))
            team_ids.append(str(item[0]))
        user_team = input("What team is the player you want to view on? Be sure to give your answer as the team's number.")

        if user_team in team_ids:
            print(user_team)
            return user_team
        # if int(user_team) in team_ids:
        #     print("found")
        #     return user_team
        break

def get_all_teams():
    teams = requests.get(constants.API_URL + constants.TEAMS_ENDPOINT)
    teams_json = json.loads(teams.text)

    id_abbreviation_tuples = []
    for item in teams_json['teams']:
        id_abbreviation_tuple = (item['id'], item['abbreviation'])
        id_abbreviation_tuples.append(id_abbreviation_tuple)
    return id_abbreviation_tuples


if __name__ == '__main__':
    main()