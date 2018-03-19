# Bangumi-Visualizer

## Overview
Bangumi-Visualizer is a visual frontend demo for data provided by [Bangumi-Provider](https://github.com/AngelMsger/Bangumi-Provider). Bangumi-Visualizer only support data in mongodb while multi storage backend is supported by Bangumi-Provider.

## Features

### Completely Split the Frontend and Backend Components.
* Lightweight API Backend with Node.js & Express.
* Implement [SPA](https://www.wikiwand.com/en/Single-page_application) Frontend Simply with Vue.js.

### Data Visualization with Echarts.

## Usage
1. Make Sure Your Data Source(Data in MongoDB Provided by [Bangumi-Provider](https://github.com/AngelMsger/Bangumi-Provider)).
2. Update `conf.js` and Run `npm install && node bin/www` to Set up API Server.
3. Copy Files `dist/*` to Your Web Server(eg. Nginx) Root.
4. Update `apiPrefix` in `js/bangumi.js` to Your API Server URL.

## API Response Example

### Anime Information
```
curl https://api.angelmsger.com/bangumi/anime/season_id/21421
{
    "rating": {
        "count": 31896,
        "score": 9.8
    },
    "area": [
        {
            "id": 2,
            "name": "日本"
        }
    ],
    "tags": [
        {
            "id": 9,
            "name": "少女"
        },
        {
            "id": 122,
            "name": "魔法"
        },
        {
            "id": 135,
            "name": "漫改"
        }
    ],
    "top_matches": [
        {
            "media_id": 3756,
            "similarity": 0.28640856945518733
        },
        {
            "media_id": 8892,
            "similarity": 0.19707309807208745
        },
        {
            "media_id": 8772,
            "similarity": 0.1422207767154259
        },
        {
            "media_id": 8932,
            "similarity": 0.11738195985814143
        },
        {
            "media_id": 8792,
            "similarity": 0.10697599425914822
        },
        {
            "media_id": 11712,
            "similarity": 0.10262114618086689
        },
        {
            "media_id": 33512,
            "similarity": 0.10059228641931872
        },
        {
            "media_id": 8992,
            "similarity": 0.09941438054869527
        }
    ],
    "_id": "5aac7499635dc8f02da70665",
    "season_id": 21421,
    "alias": "カードキャプターさくら クリアカード編,百变小樱,魔法少女樱,魔卡少女樱：透明牌篇,魔卡少女樱,小樱",
    "cover_url": "http://i0.hdslb.com/bfs/bangumi/07245c4bf4acb03a5819762fea3210c656aba66c.jpg",
    "danmaku_count": 619362,
    "episodes": 11,
    "evaluate": "樱集齐了会给世间带来灾难的“库洛牌”，并用魔法的力量将它们变成了自己的牌。樱花盛开的4月，小樱升入了初中1年级。而后，小樱与曾返回香港的小狼重逢，并一起开心地去往学校。某个夜里，收集的牌出现了异常……而友枝町接连发生奇怪的事。小樱在梦中遇见的“钥匙”的指引下，再次开始收集卡片。这时，班里转来一个女孩子……",
    "favorites": 2364534,
    "is_finish": true,
    "media_id": 8752,
    "pub_time": "2018-01-07T09:00:00.000Z",
    "title": "魔卡少女樱 CLEAR CARD篇",
    "last_long_reviews_cursor": "4294976682",
    "last_short_reviews_cursor": "73285027959490"
}
```

### Author Information
```
curl https://api.angelmsger.com/bangumi/author/mid/3346211
{
    "follow": [],
    "recommendation": [
        8892,
        6463,
        6434,
        8772,
        6425,
        6301,
        836,
        8792
    ],
    "reviews": [
        {
            "review_id": 1721177,
            "content": "没看过原作，纯动画党表示剧情还可以。",
            "ctime": "2018-03-15T19:01:10.000Z",
            "mtime": "2018-03-15T19:01:10.000Z",
            "likes": 0,
            "score": 8,
            "media_id": 6339,
            "is_long": false,
            "last_ep_index": "12"
        },
        {
            "review_id": 1721182,
            "content": "一口气12集，真的有毒！",
            "ctime": "2018-03-15T19:01:37.000Z",
            "mtime": "2018-03-15T19:01:37.000Z",
            "likes": 0,
            "score": 8,
            "media_id": 6311,
            "is_long": false,
            "last_ep_index": "12"
        },
        {
            "review_id": 1721189,
            "content": "一开始设定很新鲜，但看久了就没有那么惊艳了。",
            "ctime": "2018-03-15T19:02:59.000Z",
            "mtime": "2018-03-15T19:02:59.000Z",
            "likes": 0,
            "score": 8,
            "media_id": 3461,
            "is_long": false,
            "last_ep_index": "25"
        },
        {
            "review_id": 1719102,
            "content": "很喜欢这种轻松的日常，有没有WiFi！",
            "ctime": "2018-03-15T11:25:25.000Z",
            "mtime": "2018-03-15T11:25:25.000Z",
            "likes": 0,
            "score": 10,
            "media_id": 2580,
            "is_long": false,
            "last_ep_index": "12"
        },
        {
            "review_id": 1725078,
            "content": "学姐党表示很不满┐(´-｀)┌。",
            "ctime": "2018-03-16T12:54:43.000Z",
            "mtime": "2018-03-16T12:54:43.000Z",
            "likes": 0,
            "score": 8,
            "media_id": 1512,
            "is_long": false,
            "last_ep_index": "0"
        },
        {
            "review_id": 1719106,
            "content": "友谊真的是很珍贵的东西，这部番很优秀很感人，面码赛高！",
            "ctime": "2018-03-15T11:26:51.000Z",
            "mtime": "2018-03-15T11:26:51.000Z",
            "likes": 0,
            "score": 10,
            "media_id": 835,
            "is_long": false
        },
        {
            "review_id": 1719092,
            "content": "一部被埋没的优秀作品。",
            "ctime": "2018-03-15T11:24:18.000Z",
            "mtime": "2018-03-15T11:24:18.000Z",
            "likes": 1,
            "score": 10,
            "media_id": 713,
            "is_long": false,
            "last_ep_index": "4"
        },
        {
            "review_id": 1721165,
            "content": "期待第三季(◍ ´꒳` ◍)！",
            "ctime": "2018-03-15T18:58:21.000Z",
            "mtime": "2018-03-15T18:58:21.000Z",
            "likes": 1,
            "score": 10,
            "media_id": 6446,
            "is_long": false,
            "last_ep_index": "12"
        },
        {
            "review_id": 1721901,
            "content": "OPED承载了回忆( ´▽` )。",
            "ctime": "2018-03-15T21:21:06.000Z",
            "mtime": "2018-03-15T21:21:06.000Z",
            "likes": 0,
            "score": 10,
            "media_id": 425,
            "is_long": false,
            "last_ep_index": "4"
        },
        {
            "review_id": 1721903,
            "content": "炮姐赛高ヾ(╹◡╹)ﾉ~",
            "ctime": "2018-03-15T21:21:36.000Z",
            "mtime": "2018-03-15T21:21:36.000Z",
            "likes": 0,
            "score": 10,
            "media_id": 427,
            "is_long": false
        },
        {
            "review_id": 1721883,
            "content": "不是很吸引我（ ’ - ’ * )。",
            "ctime": "2018-03-15T21:18:09.000Z",
            "mtime": "2018-03-15T21:18:09.000Z",
            "likes": 0,
            "score": 6,
            "media_id": 3450,
            "is_long": false
        },
        {
            "review_id": 1047291,
            "content": "信仰啊，快要二十年了，我的大学时光都要结束了，小樱知世还是那么年轻，Sakura赛高*٩(๑´∀`๑)ง*！",
            "ctime": "2018-01-10T22:27:29.000Z",
            "mtime": "2018-01-10T22:27:29.000Z",
            "likes": 1,
            "score": 10,
            "media_id": 8752,
            "is_long": false,
            "last_ep_index": "1"
        },
        {
            "review_id": 1703840,
            "content": "很不错的日常搞笑番剧～( ´▽` )",
            "ctime": "2018-03-12T00:49:05.000Z",
            "mtime": "2018-03-12T00:49:05.000Z",
            "likes": 0,
            "score": 10,
            "media_id": 5069,
            "is_long": false,
            "last_ep_index": "1"
        },
        {
            "review_id": 1721199,
            "content": "感觉和罪恶王冠相似的设定很多（ ’ - ’ * )。",
            "ctime": "2018-03-15T19:03:50.000Z",
            "mtime": "2018-03-15T19:03:50.000Z",
            "likes": 0,
            "score": 8,
            "media_id": 3494,
            "is_long": false,
            "last_ep_index": "12"
        },
        {
            "review_id": 790871,
            "content": "对我影响最深远的作品，小樱是我唯一的女神！(ˊ˘ˋ*)",
            "ctime": "2017-12-18T20:19:14.000Z",
            "mtime": "2017-12-18T20:19:14.000Z",
            "likes": 0,
            "score": 10,
            "media_id": 3756,
            "is_long": false,
            "last_ep_index": "1"
        },
        {
            "review_id": 1721207,
            "content": "室友推荐的，祈妹我的。",
            "ctime": "2018-03-15T19:05:26.000Z",
            "mtime": "2018-03-15T19:05:26.000Z",
            "likes": 0,
            "score": 10,
            "media_id": 1588,
            "is_long": false,
            "last_ep_index": "1"
        }
    ],
    "top_matches": [
        {
            "mid": 40355388,
            "similarity": 0.48550148160528617
        },
        {
            "mid": 33071733,
            "similarity": 0.4811947284652843
        },
        {
            "mid": 8005102,
            "similarity": 0.4588097570922974
        },
        {
            "mid": 18288767,
            "similarity": 0.4542083633154889
        },
        {
            "mid": 2527584,
            "similarity": 0.450496738116172
        },
        {
            "mid": 19352249,
            "similarity": 0.4497567393745113
        },
        {
            "mid": 21806447,
            "similarity": 0.443463559968293
        },
        {
            "mid": 34545175,
            "similarity": 0.44296005140240013
        }
    ],
    "_id": "5aac778a635dc8f02da91643",
    "mid": 3346211,
    "avatar_url": "http://i0.hdslb.com/bfs/face/6d848efd8e5cbab7369cb7005b6c3c9f94bb8e85.jpg",
    "uname": "共享协同过滤算法",
    "last_analyze": "2018-03-19T14:54:22.063Z"
}
```

## ~~Need Help~~(Solved)

### Question:
I use following code to query anime's archive in mongodb by its season_id:
```
db.archives.aggregate([
    {$replaceRoot: {
        newRoot: {
            $mergeObjects: [
                {date: '$date'},
                {$arrayElemAt: [
                    {$filter:{
                        input: '$archives',
                        cond: {
                            $eq: ['$$this.season_id',  21729]
                        }
                    }
                }, 0]
                }
            ]
        }
    }
    }
])
```
In Mongo Shell, it return result as following:
```
{
    "date": ISODate("2018-03-17T00:00:00Z"),
    "season_id": 21729,
    "favorites": 1169110,
    "danmaku_count": 88299,
    "reviews_count": 3731,
    "rating": {
        "count": 7831,
        "score": 9.7
    }
}
```
But with [Mongoose](http://mongoosejs.com/) in Node.js, the [same query](routes/app.js) return something different:
```
[{"date":"2018-03-17T00:00:00.000Z"}]
```
~~I have no solution for this right now.~~

## Solution:
While mongoose support auto convert type of parameter to Number in top level by [the schema](db.js) you defined, you should do this manually in embedded query by yourself such as aggregate. The reason why you should do this I guess is that Mongoose don't support advanced query type correctness detection.
```
# this is ok(season_id will auto convert to in)
db.collection.findOne({season_id: req.params.season_id})

# while this is error
db.archives.aggregate([
    {$replaceRoot: {
        ...
                    {$filter:{
                        ...
                            $eq: ['$$this.season_id', req.params.season_id]
                        ...
                    }
        ...
    }
    }
])

# fix error
db.archives.aggregate([
    {$replaceRoot: {
        ...
                    {$filter:{
                        ...
                            $eq: ['$$this.season_id', Number(req.params.season_id)]
                        ...
                    }
        ...
    }
    }
])
```

# Quote
1. Always dependent data from [AngelMsger/Bangumi-Provider](https://github.com/AngelMsger/Bangumi-Provider).
2. Use [Vue-Material](https://github.com/vuematerial/vue-material) to design web pages.