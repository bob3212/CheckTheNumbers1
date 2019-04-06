from lxml import html
import requests

page = requests.get('https://www.hockey-reference.com/leagues/NHL_2019_skaters.html')
tree = html.fromstring(page.content)

#This will create a list of buyers:
data = tree.xpath('//*[@id="csv_stats"]/text()')

print ('Data: ', data)


