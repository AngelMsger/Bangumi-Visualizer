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
        }
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
                        this.anime.pub_time = anime.pub_time;
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
                                    that.anime.top_matches.push(other)
                                }, response => {
                                });
                            });
                        }

                        this.$http.get('/api/archive/season_id/' + this.season_id).then(response => {
                            let archives = response.body;
                            console.log(archives);
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
                        this.author.last_crawl = author.last_crawl;
                        this.author.last_analyze = author.last_analyze;

                        const that = this;

                        while (this.author.reviews.length > 0) this.author.reviews.pop();
                        if (author.reviews) {
                            author.reviews.forEach(function (review) {
                                that.$http.get('/api/anime/media_id/' + review.media_id).then(response => {
                                    let anime = response.body;
                                    if (anime && typeof anime !== 'string') {
                                        review.anime_title = anime.title;
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
                                    that.author.top_matches.push(other)
                                }, response => {
                                });
                            });
                        }

                        while (this.author.recommendation.length > 0) this.author.recommendation.pop();
                        if (author.recommendation) {
                            author.recommendation.forEach(function (media_id) {
                                that.$http.get('/api/anime/media_id/' + media_id).then(response => {
                                    that.author.recommendation.push(response.body)
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
        }
    },
    created: function () {
        console.log('success');
        document.getElementById('app').style.visibility = 'visible';
    }
});