import fetch

def main():
    get_rates('8480801')

def get_rates(id):
    goals = 5
    assists = 3 
    shots = 0.5
    plusminus = 1 
    blocks = 1
    hits = 1
    ppp = 1
    pim = 1

    conversions = [goals, assists, shots, plusminus, blocks, hits, pim, ppp]

    convert(id, conversions)

def convert(id, multipliers):
    stats = fetch.get_stats(id)
    print (stats)

    goals = (stats[0])*(multipliers[0])
    assists = (stats[1])*(multipliers[1])
    shots = (stats[2])*(multipliers[2])
    plusminus = (stats[3])*(multipliers[3])
    blocks = (stats[4])*(multipliers[4])
    hits = (stats[5])*(multipliers[5])
    ppp = (stats[6])*(multipliers[6])
    pim = (stats[7])*(multipliers[7])

    total = goals + assists + shots + plusminus + blocks + pim + ppp

    stats_list = [{'goals': goals, 'assists': assists, 'shots': shots, 'plusminus': plusminus, 'blocks': blocks, 'hits': hits, 'pim': pim, 'ppp': ppp, 'total': total}]
    print (stats_list)

if __name__ == '__main__':
    main()


