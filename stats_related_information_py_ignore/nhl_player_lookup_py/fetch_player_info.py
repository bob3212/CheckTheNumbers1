import json
import requests
import constants
import csv

#def main():
    #create_html ("8464989")    

def main():

    csv.register_dialect('myDialect',
    delimiter = ',',
    skipinitialspace=True)

    with open('/Users/samee/Documents/Computer Science/Computer_Science_Grade_12_Summative/id_list_roster.csv', 'r') as csvFile:
        reader = csv.reader(csvFile, dialect='myDialect')
        for row in reader:
            if not row:
                print()
            else:    
                create_html(row[0])   

    csvFile.close()

def main2():
    for x in range(8464989, 8465009):
        id = str (x)   
        create_html(id) 
    for x in range(8466138, 8466148):
        id = str (x)   
        create_html(id)  
    for x in range(8468011, 8480900):
        id = str (x)   
        create_html(id)     

def create_html(id):    
    name = get_player(id, "fullName") 
    player_stats = get_player_stats(id)
    if not player_stats:
        print("lol")
    else:        
        html_file = get_header(name) + get_body(name, player_stats)
        name = get_player(id, "fullName")    
        write_html_file(html_file, "/Users/samee/Documents/Computer Science/Computer_Science_Grade_12_Summative/Test_HTML_Files/{}.html".format(name) )   
    
def get_header(file_title):
    name = file_title   
    header_string = "<!DOCTYPE html><html><head><title>{}</title></head>".format(name)
    return header_string

def get_body(name, player_stats):
    body_string = "<body><h1>{}</h1></br><table>".format(name)
    games = player_stats['stats'][0]['splits'][0]['stat']['games']
    goals = player_stats['stats'][0]['splits'][0]['stat']['goals']
    assists = player_stats['stats'][0]['splits'][0]['stat']['assists']
    plus_minus = player_stats['stats'][0]['splits'][0]['stat']['plusMinus']    
    pims = player_stats['stats'][0]['splits'][0]['stat']['pim']
    body_string += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td><td>{}</td></tr>".format("GP", "G", "A", "+/-", "PIMS")
    body_string += "<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td><td>{}</td></tr>".format(games, goals, assists, plus_minus, pims)
    body_string += "</table></body></html>"
    return body_string



def write_html_file(file_string, filename):
    html_file = open(filename, "w")
    html_file.write(file_string)
    html_file.close()

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



if __name__ == '__main__':
    main()