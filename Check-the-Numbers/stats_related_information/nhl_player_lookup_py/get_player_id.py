import json
import requests
import constants
import csv

def main2():
    csv.register_dialect('myDialect',
    delimiter = ',',
    skipinitialspace=True)

    with open('/Users/samee/Documents/Computer Science/Computer_Science_Grade_12_Summative/id_list_roster.csv', 'r') as csvFile:
        reader = csv.reader(csvFile, dialect='myDialect')
        for row in reader:
            print(row)

    csvFile.close()

def main():
    id_list = [["Player ID", "Full Name", "First Name", "Last Name"]]
    for x in range(8464989, 8482000):
        id = str (x)
        full_id = find_id(id)
        if not full_id:
            print()
        else:    
            id_list.append(full_id)

    csv.register_dialect('myDialect',
    quoting=csv.QUOTE_ALL,
    skipinitialspace=True)

    with open('/Users/samee/Documents/Computer Science/Computer_Science_Grade_12_Summative/id_list.csv', 'w') as f:  
        writer = csv.writer(f, dialect='myDialect')
        for row in id_list:
            writer.writerow(row)

def create_id_list():

    with open('/Users/samee/Documents/Computer Science/Computer_Science_Grade_12_Summative/id_list_roster.csv', 'r') as csvFile:
        reader = csv.reader(csvFile)
        for row in reader:
            print(row)
    csvFile.close()

    

#def main():
 #  for x in range(8464989, 8465009):
  #      get_player(x)
   #for x in range(8466138, 8466148):
    #    get_player(x)
   #for x in range(8468011, 8480900):
    #    get_player(x)

def find_id(id):
    player_stats = get_player_stats(id)
    if not player_stats:
        return 0
    else:
        player_id = get_player(id, "id")
        full_name = get_player(id, "fullName")
        first_name = get_player(id, "firstName")
        last_name = get_player(id, "lastName")
        return [player_id,full_name,first_name,last_name]
    

def get_player_stats(id):
    stats =  requests.get(constants.API_URL + constants.PEOPLE_ENDPOINT + id + constants.STATS_ENDPOINT)
    stats_json = json.loads(stats.text)
    stats_list = []
    if "stats" in stats_json:
            for item in stats_json["stats"]:
                    if "splits" in item:
                        for item in stats_json["stats"][0]["splits"]:
                            if "stat" in item:
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



if __name__ == '__main__':
    main()