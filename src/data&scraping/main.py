from unicodedata import name
import bs4, requests, webbrowser
import re
import json
from operator import itemgetter

playersList = []

def extractAge(string, start='(', stop=')'):
        return string[string.index(start)+1:string.index(stop)]

positions_dict = {"Portiere" : "POR",
                "Difensore centrale" : "DC",
                "Terzino destro" : "TD",
                "Terzino sinistro" : "TS",
               "Centrale" : "CC",
               "Centrocampista di destra": "ED",
                "Centrocampista di sinistra" : "ES",
                "Mediano" : "CDC",
                "Trequartista" : "COC",
                "Ala destra" : "AD",
                "Ala sinistra" : "AS",
                "Seconda punta" : "AT",
                "Punta centrale" : "ATT",
                }
        
def serieATransfermakt():
    headers = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) ApplewebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36'}
    link = "https://www.transfermarkt.it/serie-a/startseite/wettbewerb/IT1"
    pageTree = requests.get(link, headers=headers)
    pageSoup = bs4.BeautifulSoup(pageTree.content, 'html.parser')
    rows = pageSoup.find('div', class_="responsive-table").find('table', class_="items").find('tbody').find_all('tr')
    for row in rows:
        cell = row.find('td', class_='hauptlink no-border-links').find('a')
        team_link = "https://www.transfermarkt.it"+cell['href']
        teamPageTree = requests.get(team_link, headers=headers)
        teamPageSoup = bs4.BeautifulSoup(teamPageTree.content, 'html.parser')
        extTeamSection = teamPageSoup.find('div', class_="tm-tabs").find_all('a')
        extTeamLink = "https://www.transfermarkt.it"+extTeamSection[1]['href']
        extTeamPageTree = requests.get(extTeamLink, headers=headers)
        extTeamPageSoup = bs4.BeautifulSoup(extTeamPageTree.content, 'html.parser')
        teamInfo = extTeamPageSoup.find('div', class_="large-12 columns")
        teamName = teamInfo.find('h1').find('span').text
        teamLogo = teamInfo.find('div', class_="dataBild").find('img')['src']
        players = extTeamPageSoup.find('div',class_='responsive-table').find('table', class_="items").find('tbody').find_all('tr', class_ = re.compile(r"^(even|odd)$"))
        for player in players:
            playerElement = {}
            playerElement["number"] = player.find('div', class_="rn_nummer").text
            playerElement["name"] = player.find('td', class_="hauptlink").a.text.strip()
            position = player.find('table', class_="inline-table").find_all('tr')[1].td.text.strip()
            playerElement["position"] = positions_dict[position]
            playerBirthInfo = player.find_all('td', class_="zentriert")[1].text
            playerElement["age"] = extractAge(playerBirthInfo)
            playerElement["nationality"] = player.find_all('td', class_="zentriert")[2].img['alt']
            playerElement["nationalityFlag"] = player.find_all('td', class_="zentriert")[2].img['src']
            playerElement["height"] = player.find_all('td', class_="zentriert")[3].text.split(" ")[0].replace(",", ".")
            playerElement["foot"] = player.find_all('td', class_="zentriert")[4].text[0]+"x"
            playerElement["team"] = teamName
            playerElement["teamLogo"] = teamLogo
            playersList.append(playerElement)
    playerListSorted = sorted(playersList, key=itemgetter('name'))
    with open("serieA.json", "w", encoding="utf-8") as outfile:
        json.dump(playerListSorted, outfile, ensure_ascii=False)
   
serieATransfermakt()