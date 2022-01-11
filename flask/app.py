from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

import pandas as pd
import snscrape.modules.twitter as sntwitter
import itertools
import json

import helper

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


@app.route("/")
def hello():
    return "hello"


@app.route("/twitter-search", methods=["POST"])
def twitterSearch():
    if request.method == "POST":
        request_data = request.get_json()

        keyword = None
        locsearch = None
        radius = None
        city = None
        lat = None
        long = None

        if request_data:
            if "keyword" in request_data:
                keyword = request_data["keyword"]

            if "locsearch" in request_data:
                locsearch = request_data["locsearch"]

            if "radius" in request_data:
                radius = request_data["radius"]

            if "city" in request_data:
                city = request_data["city"]

            if "lat" in request_data:
                lat = request_data["lat"]

            if "long" in request_data:
                long = request_data["long"]

        if keyword != None and locsearch != None:
            if locsearch == "city":
                locQuery = "near:{city} within:{radius}km".format(
                    city=city, radius=radius
                )
            elif locsearch == "geo":
                geostring = "{lat}, {long}, {radius}km".format(
                    lat=lat, long=long, radius=radius
                )
                locQuery = 'geocode:"%s"' % geostring

            query = "{keyword} {locsearchstr}".format(
                keyword=keyword, locsearchstr=locQuery
            )
            # the scraped tweets, this is a generator
            scraped_tweets = sntwitter.TwitterSearchScraper(query).get_items()

            # slicing the generator to keep only the first 100 tweets
            sliced_scraped_tweets = itertools.islice(scraped_tweets, 100)

            # convert to a DataFrame and keep only relevant columns
            df = pd.DataFrame(sliced_scraped_tweets)

            df = helper.fixDatetimes(df)
            dfJson = df.to_json(orient="records")
            # dfJson = json.dumps(dfDict, default=str, indent=2)

            return jsonify(dfJson)


if __name__ == "__main__":
    app.run(debug=True)
