import json
import requests
import constants
import csv

def main():
    id_list = get_roster_id_list()

    csv.register_dialect('myDialect',
    quoting=csv.QUOTE_ALL,
    skipinitialspace=True)

    with open('/Users/samee/Documents/Computer Science/Computer_Science_Grade_12_Summative/id_list_roster.csv', 'w') as f:  
        writer = csv.writer(f, dialect='myDialect')
        for row in id_list:
            writer.writerow(row)


def get_roster_id_list():

    team_list = []

    for x in range(1,11):
        id = str (x)
        team = requests.get(constants.API_URL + constants.TEAMS_ENDPOINT + id + constants.ROSTER_ENDPOINT)
        team_json = json.loads(team.text)
        for item in team_json["roster"]:
            team_list.append([item['person']['id'], item['person']['fullName']])

    for x in range(12,27):
        id = str (x)
        team = requests.get(constants.API_URL + constants.TEAMS_ENDPOINT + id + constants.ROSTER_ENDPOINT)
        team_json = json.loads(team.text)
        for item in team_json["roster"]:
            team_list.append([item['person']['id'], item['person']['fullName']])

    for x in range(28,31):
        id = str (x)
        team = requests.get(constants.API_URL + constants.TEAMS_ENDPOINT + id + constants.ROSTER_ENDPOINT)
        team_json = json.loads(team.text)
        for item in team_json["roster"]:
            team_list.append([item['person']['id'], item['person']['fullName']])

    for x in range(52,55):
        id = str (x)
        team = requests.get(constants.API_URL + constants.TEAMS_ENDPOINT + id + constants.ROSTER_ENDPOINT)
        team_json = json.loads(team.text)
        for item in team_json["roster"]:
            team_list.append([item['person']['id'], item['person']['fullName']])

    return team_list

    

if __name__ == '__main__':
    main()