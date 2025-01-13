import sqlite3
import requests
import json

conn = sqlite3.connect('../database/database.sqlite')
cursor = conn.cursor()

BASE_URL = "https://api.pokemontcg.io/v2/cards"

cursor.execute("SELECT cardId, type from owned;")

cards_data = [(row[0], row[1]) for row in cursor.fetchall()]

conn.close()

def get_card_prices(card_data):
    id = card_data[0]
    type = card_data[1]
    url = f"{BASE_URL}/{id}"

    response = requests.get(url)

    if response.status_code == 200:
      data = response.json()
      c_d = data['data']

      price = c_d['tcgplayer']['prices'].get(type)

      jsonP = json.dumps(price, indent=2)
      print(jsonP)


    print(id, type)


get_card_prices(cards_data[0])

## normal, holofoil, reverseHolofoil, 1stEditionHolofoil and 1stEditionNormal.

'''
{
  "low": 39.99,
  "mid": 50.4,
  "high": 121.75,
  "market": 44.13,
  "directLow": null
}
'''
