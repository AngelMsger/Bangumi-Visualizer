# Bangumi-Visualizer

## Overview
Bangumi-Visualizer is a visual frontend demo for data provided by [Bangumi-Provider](https://github.com/AngelMsger/Bangumi-Provider). Bangumi-Visualizer only support data in mongodb while multi storage backend is supported by Bangumi-Provider.

## Features
* Lightweight with Node.js & Express.
* Implement [SPA](https://www.wikiwand.com/en/Single-page_application) Simply with Vue.js.
* Support Data visualization with Echarts.

## Need Help(Solved)

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