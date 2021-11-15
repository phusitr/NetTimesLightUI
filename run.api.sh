gunicorn --certfile=/usr/local/etc/letsencrypt/live/fullchain.pem --keyfile=/usr/local/etc/letsencrypt/live/privkey.pem --bind 0.0.0.0:5842 wsgi:app --workers 3 & > /dev/null
