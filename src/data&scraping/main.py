from unicodedata import name
import bs4, requests, webbrowser
import json

players = []

def serieA():
    for page in range(1,16):
        link = "https://www.worldfootball.net/players_list/ita-serie-a-2021-2022/nach-name/"+ str(page) +"/"
        response = requests.get(link)
        response.raise_for_status()
        soup = bs4.BeautifulSoup(response.text, 'html.parser')
        rows = soup.find('table', class_="standard_tabelle").find_all('tr')
        row_num = 0
        name = ""
        team = ""
        birth = ""
        pos = ""
        for row in rows:
            player = {}
            if row_num > 0:
                cell_num = 0
                for cell in row.find_all('td'):
                    elm = (cell.text.split("\n "))
                    if cell_num == 0:
                        name = str(elm[0])
                    elif cell_num == 1:
                        pass
                    elif cell_num == 2:
                        team = str(elm[0])
                    elif cell_num == 3:
                        birth = str(elm[0])
                    elif cell_num == 4:
                        pass
                    elif cell_num == 5:
                        pos = str(elm[0])
                    cell_num += 1 
                player["name"] = name
                player["team"] = team
                player["birth"] = birth
                player["pos"] = pos
                players.append(player)           
            row_num = row_num + 1
    with open("serieA.json", "w") as outfile:
        json.dump(players, outfile)


serieA()
