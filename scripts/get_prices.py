#!/usr/bin/env python3

import sqlite3
import requests
import os
from datetime import datetime

conn = sqlite3.connect('/Users/destin/projects/pokemoney/database/database.sqlite')
cursor = conn.cursor()

BASE_URL = "https://api.pokemontcg.io/v2/cards"


cursor.execute('''
SELECT id, seen_id, created_at
FROM (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY seen_id ORDER BY created_at DESC) AS row_num
    FROM card_price_data
) subquery
WHERE row_num = 1;
''')

cards_data = [(row[0], row[1], row[2]) for row in cursor.fetchall()]

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


def log_update(info):
    print(f"{info['date']},{info['id']}")

    current_dir = os.path.dirname(os.path.realpath(__file__))
    log_file_path = os.path.join(current_dir, 'price_log.csv')

    file_exists = os.path.exists(log_file_path)

    if not file_exists:
      with open(log_file_path, 'w', encoding='utf-8') as file:
        file.write("date,id\n")

    with open(log_file_path, 'a', encoding='utf-8') as file:
      file.write(f"{info['date']},{info['id']}\n")


def get_card_prices(cards_data):
  for card_data in cards_data:
    seen_id = card_data[1]
    card_created_at = card_data[2].split(' ')[0].replace("-", "/")

    card_id, type = seen_id.split(":")

    url = f"{BASE_URL}/{card_id}"
    response = requests.get(url)

    if response.status_code == 200:
      data = response.json()
      c_d = data['data']

      # print(c_d)
      live_updated_date = c_d['tcgplayer']['updatedAt']

      if(card_created_at == live_updated_date):
        return

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

      log_update({'date': live_updated_date, 'id': seen_id})
      insert_price_data(fin_data)

get_card_prices(cards_data)

conn.close()

