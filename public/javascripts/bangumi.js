function LineChartOption(title, xAxisData, seriesData) {
    this.title = {
        text: title
    };
    this.xAxis = {
        data: xAxisData
    };
    this.yAxis = {
        type: 'value'
    };
    this.series = {
        type: 'line',
        data: seriesData
    };
}

function PieChartOption(seriesData, title='用户偏好', seriesName='评论番剧携带标签') {
    this.title = {
        text: title,
        left: 'center',
        top: 20,
        textStyle: {
            color: '#ccc'
        }
    };
    this.tooltip = {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    };
    this.visualMap = {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    };
    this.series = [{
        name: seriesName,
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data:seriesData.sort(function (a, b) { return a.value - b.value; }),
        roseType: 'radius',
        label: {
            normal: {
                textStyle: {
                    color: 'rgba(0, 0, 0, 0.3)'
                }
            }
        },
        labelLine: {
            normal: {
                lineStyle: {
                    color: 'rgba(0, 0, 0, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
            }
        },
        itemStyle: {
            normal: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
            return Math.random() * 200;
        }
    }];
}

Vue.use(VueMaterial.default);

Vue.filter('filter_slice', function (value) {
    return value.length > 32 ? value.slice(0, 32) + '...' : value;
});

let vm = new Vue({
    el: '#app',
    data: {
        page: 0,
        menuVisible: false,
        season_id: '',
        anime: {
            success: false,
            alias: '',
            area: [],
            danmaku_count: 0,
            episodes: 0,
            evaluate: '',
            favorites: 0,
            is_finish: false,
            pub_time: null,
            rating: {
                count: 0,
                score: 0
            },
            tags: [],
            title: '',
            last_long_reviews_cursor: null,
            last_short_reviews_cursor: null,
            top_matches: [],
            archives: []
        },
        mid: '',
        author: {
            success: false,
            reviews: [],
            uname: '',
            follow: [],
            last_crawl: null,
            last_analyze: null,
            top_matches: [],
            recommendation: []
        },
        charts: {}
    },
    watch: {
        season_id: function () {
            if (this.season_id) {
                this.$http.get('/api/anime/season_id/' + this.season_id).then(response => {
                    let anime = response.body;
                    if (anime && typeof anime !== 'string') {
                        this.anime.success = true;
                        this.anime.alias = anime.alias;
                        this.anime.danmaku_count = anime.danmaku_count;
                        this.anime.episodes = anime.episodes;
                        this.anime.evaluate = anime.evaluate;
                        this.anime.favorites = anime.favorites;
                        this.anime.is_finish = anime.is_finish;
                        this.anime.pub_time = moment(anime.pub_time).format('LL');
                        this.anime.rating = anime.rating;
                        this.anime.title = anime.title;

                        const that = this;

                        while (this.anime.area.length > 0) this.anime.area.pop();
                        if (anime.area) {
                            anime.area.forEach(function (area) {
                                that.anime.area.push(area.name);
                            });
                        }

                        while (this.anime.tags.length > 0) this.anime.tags.pop();
                        if (anime.tags) {
                            anime.tags.forEach(function (tag) {
                                that.anime.tags.push(tag.name);
                            });
                        }

                        while (this.anime.top_matches.length > 0) this.anime.top_matches.pop();
                        if (anime.top_matches) {
                            anime.top_matches.forEach(function (pair) {
                                that.$http.get('/api/anime/media_id/' + pair.media_id).then(response => {
                                    let other = response.body;
                                    other.similarity = pair.similarity;
                                    that.anime.top_matches.push(other);
                                }, response => {
                                });
                            });
                        }

                        this.$http.get('/api/archive/season_id/' + this.season_id).then(response => {
                            while (that.anime.archives.length > 0) that.anime.archives.pop();
                            let archives = response.body;
                            if (archives && typeof archives !== 'string') {
                                archives.forEach(function (archive) {
                                    that.anime.archives.push(archive);
                                });
                            }
                        }, response => {});
                    }
                }, response => {
                    this.anime.success = false;
                });
            }
        },
        mid: function () {
            if (this.mid) {
                this.$http.get('/api/author/mid/' + this.mid).then(response => {
                    let author = response.body;
                    if (author && typeof author !== 'string') {
                        this.author.success = true;
                        this.author.uname = author.uname;
                        this.author.follow = author.follow;
                        if (author.last_crawl) {
                            this.author.last_crawl = moment(author.last_crawl).format('LLL');
                        }
                        else {
                            this.author.last_crawl = null;
                        }
                        if (author.last_analyze) {
                            this.author.last_analyze = moment(author.last_analyze).format('LLL');
                        }
                        else {
                            this.author.last_analyze = null;
                        }

                        const that = this;

                        while (this.author.reviews.length > 0) this.author.reviews.pop();
                        if (author.reviews) {
                            author.reviews.forEach(function (review) {
                                that.$http.get('/api/anime/media_id/' + review.media_id).then(response => {
                                    let anime = response.body;
                                    if (anime && typeof anime !== 'string') {
                                        review.anime_title = anime.title;
                                        review.anime_tags = anime.tags;
                                        review.ctime = moment(review.ctime).format('LLL');
                                        review.mtime = moment(review.mtime).format('LLL');
                                        that.author.reviews.push(review);
                                    }
                                }, response => {
                                });
                            });
                        }

                        while (this.author.top_matches.length > 0) this.author.top_matches.pop();
                        if (author.top_matches) {
                            author.top_matches.forEach(function (pair) {
                                that.$http.get('/api/author/mid/' + pair.mid).then(response => {
                                    let other = response.body;
                                    other.similarity = pair.similarity;
                                    that.author.top_matches.push(other);
                                }, response => {
                                });
                            });
                        }

                        while (this.author.recommendation.length > 0) this.author.recommendation.pop();
                        if (author.recommendation) {
                            author.recommendation.forEach(function (media_id) {
                                that.$http.get('/api/anime/media_id/' + media_id).then(response => {
                                    that.author.recommendation.push(response.body);
                                }, response => {
                                });
                            });
                        }
                    }
                }, response => {
                    this.author.success = false;
                });
            }
        },
    },
    methods: {
        switchPage: function (index) {
            this.page = index;
            this.menuVisible = false;
        },
        applyAnime: function (season_id) {
            this.season_id = season_id;
            this.page = 0;
        },
        applyAuthor: function (mid) {
            this.mid = mid;
            this.page = 1;
        },
        updateAnimeArchiveCharts: function() {
            if (this.anime.archives) {
                let favoritesChart = echarts.init(document.getElementById('favorites-chart'));
                let danmakuChart = echarts.init(document.getElementById('danmaku-chart'));
                let reviewsChart = echarts.init(document.getElementById('reviews-chart'));

                let dates = [];
                let favorites = [];
                let danmaku = [];
                let reviews = [];
                this.anime.archives.forEach(function (archive) {
                    dates.push(moment(archive.date).format('LL'));
                    favorites.push(archive.favorites);
                    danmaku.push(archive.danmaku_count);
                    reviews.push(archive.reviews_count);
                });

                favoritesChart.setOption(new LineChartOption('追番人数', dates, favorites));
                danmakuChart.setOption(new LineChartOption('弹幕数量', dates, danmaku));
                reviewsChart.setOption(new LineChartOption('评论人数', dates, reviews));
            }
        },
        updateAuthorReviewsTagsChart: function() {
            if (this.author.reviews) {
                let tagsChart = echarts.init(document.getElementById('tags-chart'));
                let seriesData = [];
                let tags_count = new Map();
                this.author.reviews.forEach(function (review) {
                    if (review.anime_tags) {
                        review.anime_tags.forEach(function (pair) {
                            if (tags_count.has(pair.name)) {
                                tags_count.set(pair.name, tags_count.get(pair.name) + 1);
                            }
                            else {
                                tags_count.set(pair.name, 1);
                            }
                        });
                    }
                });
                tags_count.forEach(function (value, key, map) {
                    seriesData.push({
                        value: value,
                        name: key
                    });
                });
                tagsChart.setOption(new PieChartOption(seriesData));
            }
        }
    },
    created: function () {
        document.getElementById('app').style.visibility = 'visible';
    },
    updated: function () {
        if (this.page === 0 && this.anime.archives) {
            this.updateAnimeArchiveCharts();
        }
        else if (this.page === 1 && this.author.reviews) {
            this.updateAuthorReviewsTagsChart();
        }
    }
});