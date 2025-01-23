#!/usr/bin/env python3

import os
import mysql.connector
from datetime import datetime
import requests
from dotenv import load_dotenv

load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_DATABASE = os.getenv("DB_DATABASE")
DB_USERNAME = os.getenv("DB_USERNAME")
DB_PASSWORD = os.getenv("DB_PASSWORD")

# MySQL connection configuration
conn = mysql.connector.connect(
    host=DB_HOST,
    user=DB_USERNAME,
    password=DB_PASSWORD,
    database=DB_DATABASE,
    port=DB_PORT,
)
cursor = conn.cursor()

BASE_URL = "https://api.pokemontcg.io/v2/cards"

cursor.execute(
    """
SELECT id, seen_id, created_at
FROM (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY seen_id ORDER BY created_at DESC) AS row_num
    FROM card_price_data
) subquery
WHERE row_num = 1;
"""
)

cards_data = [(row[0], row[1], row[2]) for row in cursor.fetchall()]

def create_new_price_data(prices):
    card_data = (
        prices["seen_id"],  # apiCardId
        prices.get("low", None),
        prices.get("mid", None),
        prices.get("high", None),
        prices.get("market", None),
        prices.get("direct_low", None),
        prices["created_at"],
        prices["updated_at"],
    )
    return card_data

def insert_price_data(card_data):
    cursor.execute(
        """
    INSERT INTO card_price_data (seen_id, low, mid, high, market, direct_low, created_at, updated_at)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """,
        card_data,
    )
    conn.commit()

def log_update(info):
    print(f"{info['date']},{info['id']}")

    current_dir = os.path.dirname(os.path.realpath(__file__))
    log_file_path = os.path.join(current_dir, "price_log.csv")

    file_exists = os.path.exists(log_file_path)

    if not file_exists:
        with open(log_file_path, "w", encoding="utf-8") as file:
            file.write("date,id\n")

    with open(log_file_path, "a", encoding="utf-8") as file:
        file.write(f"{info['date']},{info['id']}\n")

def get_card_prices(cards_data):
    for card_data in cards_data:
        seen_id = card_data[1]
        card_created_at = card_data[2].strftime("%Y/%m/%d")

        card_id, type = seen_id.split(":")

        url = f"{BASE_URL}/{card_id}"
        response = requests.get(url)

        if response.status_code == 200:
            data = response.json()
            c_d = data["data"]

            live_updated_date = c_d["tcgplayer"]["updatedAt"]

            price = c_d["tcgplayer"]["prices"].get(type)

            current_datetime = datetime.now()
            formatted_datetime = current_datetime.strftime("%Y-%m-%d %H:%M:%S")

            price_data = {
                "seen_id": seen_id,
                "low": price.get("low"),
                "mid": price.get("mid"),
                "high": price.get("high"),
                "market": price.get("market"),
                "direct_low": price.get("direct_low"),
                "created_at": formatted_datetime,
                "updated_at": formatted_datetime,
            }

            fin_data = create_new_price_data(price_data)

            log_update({"date": live_updated_date, "id": seen_id})
            insert_price_data(fin_data)

get_card_prices(cards_data)

conn.close()

