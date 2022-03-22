import logging
from pyrogram import Client, filters

logging.basicConfig(level=logging.DEBUG)

app = Client("datacenter.ts", api_id=1, api_hash="00000000000000000000000000000000")
app.run()
