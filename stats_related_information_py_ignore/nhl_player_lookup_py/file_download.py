import requests

print('Beginning file download with requests')

url = 'https://s3951.pcdn.co/wp-content/uploads/2015/09/Brady-Tkachuk-Senators-575x431.jpg'  
r = requests.get(url)

with open('/Users/samee/Documents/tkachukisbetterthanhughes.jpg', 'wb') as f:  
    f.write(r.content)

# Retrieve HTTP meta-data
print(r.status_code)  
print(r.headers['content-type'])  
print(r.encoding)  

