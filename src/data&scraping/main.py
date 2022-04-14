from unicodedata import name
import bs4, requests, webbrowser
import json

players = []

def serieA():
    for page in range(1,15):
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
""" def ferrara():

    link = "https://iechub.rfi.it/ArriviPartenze/ArrivalsDepartures/Monitor?placeId=1309&arrivals=False"
    response = requests.get(link)
    response.raise_for_status()
    soup = bs4.BeautifulSoup(response.text, 'html.parser')
    rows = iter(soup.find('table').find_all('tr', {"name":"treno"}))
    for row in rows:
        for cell in row.find_all('td', class_="Stazione_classtd marquee"):
            stazione_arrivo = str(cell.find('div').text).strip()
            cod_treno = row.find('td', {"id": "RTreno"}).text
            orario = row.find('td', class_="Orario_classtd").text
            binario = str(row.find('td', class_="marquee Binario_classtd").text).strip()
            ritardo = str(row.find('td', class_="Ritardo_classtd").text).strip()
            sg = str(row.findAll('div', class_="testoinfoaggiuntive"))
            sgbl = False
            if "S.GIORGIO P" in sg:
                sgbl = True;
            if ritardo == "":
                ritardo = "No"

            if stazione_arrivo == "BOLOGNA CENTRALE":
                print(cod_treno, "| ", stazione_arrivo, "|",  orario , "|", binario, "|" ," ritardo : " + ritardo+ "|",
                      str(sgbl))


def sgdp():

    link = "https://iechub.rfi.it/ArriviPartenze/ArrivalsDepartures/Monitor?Arrivals=False&Search=san+giorgio&PlaceId=2510"
    response = requests.get(link)
    response.raise_for_status()
    soup = bs4.BeautifulSoup(response.text, 'html.parser')
    rows = iter(soup.find('table').find_all('tr', {"name":"treno"}))
    for row in rows:
        for cell in row.find_all('td', class_="Stazione_classtd marquee"):
            stazione_arrivo = str(cell.find('div').text).strip()
            cod_treno = row.find('td', {"id": "RTreno"}).text
            orario = row.find('td', class_="Orario_classtd").text
            binario = str(row.find('td', class_="marquee Binario_classtd").text).strip()
            ritardo = str(row.find('td', class_="Ritardo_classtd").text).strip()
            if ritardo == "":
                ritardo = "No"

            if stazione_arrivo == "BOLOGNA CENTRALE" or stazione_arrivo == "FERRARA":
                print(cod_treno, "| ", stazione_arrivo, "|",  orario, "|", binario, "|"," ritardo : " + ritardo)

ferrara() """