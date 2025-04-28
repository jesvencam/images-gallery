from flask import Flask, request, jsonify
from requests import get
import os
from dotenv import load_dotenv
from flask_cors import CORS
import requests
from mongo_client import insert_test_document

gallery = mongo_client.gallery
images_collection = gallery.images


load_dotenv(dotenv_path="./.env.local")
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY","")
UNSPLASH_URL="https://api.unsplash.com/photos/random"
DEBUG=bool(os.environ.get("DEBUG", True))

print(UNSPLASH_KEY)

if not UNSPLASH_KEY:
    raise EnvironmentError("Please set the UNSPLASH_KEY environment variable in .env.local")

app = Flask(__name__)
CORS(app)

app.config["DEBUG"] = DEBUG

insert_test_document()


@app.route("/new-image")
def new_image():
    word = request.args.get("query")

    headers= {
        "Accept-Version": "v1",
        "Authorization": "Client-ID " + UNSPLASH_KEY
    }
    params = {
        "query": word
    }

    response = requests.get(url=UNSPLASH_URL, headers=headers, params=params)
    data = response.json()
    return data


|@app.route("/images", methods=["GET","POST"])
def images():
    if request.method == "POST":
        image = request.get_json()
        image["_id"] = image.get("id")
        result = images_collection.insert_one(image)
        inserted_id = result.inserted_id
        return {"inserted_id": inserted_id}
       
    else:
        images = images_collection.find()
        return jsonify([image for image in images])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)