import json
import os
import psycopg2
# v2


def handler(event: dict, context) -> dict:
    """Сохраняет заявку на бронирование тура в базу данных."""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')

    name = body.get('name', '')
    phone = body.get('phone', '')
    tour_format = body.get('tour_format', '')
    date = body.get('date', '')
    guests = body.get('guests', '')
    comment = body.get('comment', '')

    message = f"Дата: {date}, Гостей: {guests}\n{comment}".strip()

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO t_p4624542_bogatov_travel_adven.bookings (name, phone, tour_format, message) VALUES (%s, %s, %s, %s) RETURNING id",
        (name, phone, tour_format, message)
    )
    booking_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({'success': True, 'id': booking_id})
    }