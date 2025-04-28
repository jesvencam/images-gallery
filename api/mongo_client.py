from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path="./.env.local")

MONGO_URL = os.environ.get("MONGO_URL", "mongo")
MONGO_USERNAME = os.environ.get("MONGO_USERNAME", "root")
MONGO_PORT = os.environ.get("MONGO_PORT", 27017)
MONGO_PASSWORD = os.environ.get("MONGO_PASSWORD", "")


mongo_client = MongoClient(host=MONGO_URL,
    port=MONGO_PORT,
    username=MONGO_USERNAME,
    password=MONGO_PASSWORD,
)

def insert_test_document():
    db = mongo_client.test
    collection = db.test_collection
    res = collection.insert_one({"name": "Bogdan", "instructor": True})
    print(res)
