import sqlite3
import requests
import json
from datetime import datetime

conn = sqlite3.connect('../database/database.sqlite')
cursor = conn.cursor()

BASE_URL = "https://api.pokemontcg.io/v2/cards"

cursor.execute("SELECT id, seen_id from owned;")

cards_data = [(row[0], row[1]) for row in cursor.fetchall()]

def create_new_price_data(prices):

  card_data = (
        prices['seen_id'],  # apiCardId
        prices.get('low', None),  # low
        prices.get('mid', None),  # mid
        prices.get('high', None),  # high
        prices.get('market', None),  # market
        prices.get('directLow', None),  # directLow
        prices['created_at'],
        prices['updated_at']
    )

  return card_data

def insert_price_data(card_data):

    cursor.execute('''
    INSERT INTO card_price_data (seen_id, low, mid, high, market, directLow, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', card_data)

    conn.commit()


def get_card_prices(cards_data):
  for card_data in cards_data:
    seen_id = card_data[1]

    card_id, type = seen_id.split(":")

    url = f"{BASE_URL}/{card_id}"
    response = requests.get(url)

    if response.status_code == 200:
      data = response.json()
      c_d = data['data']

      price = c_d['tcgplayer']['prices'].get(type)

      current_datetime = datetime.now()
      formatted_datetime = current_datetime.strftime('%Y-%m-%d %H:%M:%S')

      price_data = {
        'seen_id': seen_id,
        'low': price.get('low'),
        'mid': price.get('mid'),
        'high': price.get('high'),
        'market': price.get('market'),
        'directLow': price.get('directLow'),
        'created_at': formatted_datetime,
        'updated_at': formatted_datetime
      }

      fin_data = create_new_price_data(price_data)

      print(fin_data)
      insert_price_data(fin_data)

get_card_prices(cards_data)

conn.close()

