import pandas as pd


def fixQuotedTweet(x):
    if (
        type(x) is dict
        and hasattr(x, "date")
        and hasattr(x, "user")
        and hasattr(x["user"], "created")
    ):
        x["date"] = pd.to_datetime(x["date"]).isoformat()
        x["user"]["created"] = pd.to_datetime(x["user"]["created"]).isoformat()
        return x


def fixUser(x):
    if type(x) is dict and x["created"] != None:
        x["created"] = pd.to_datetime(x["created"]).isoformat()
        return x


def fixDatetimes(df):
    if "user" in df.columns:
        df["user"] = df["user"].apply(fixUser)
    if "quotedTweet" in df.columns:
        df["quotedTweet"] = df["quotedTweet"].apply(fixQuotedTweet)
    if "inReplyToUser" in df.columns:
        df["inReplyToUser"] = df["inReplyToUser"].apply(fixUser)

    return df
