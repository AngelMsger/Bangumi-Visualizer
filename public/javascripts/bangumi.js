Vue.use(VueMaterial.default);

let vm = new Vue({
    el: '#app',
    data: {
        page: 0,
        menuVisible: false,
        mid: '',
        author: {
            avatar_url: '',
            reviews: [],
            uname: '',
            follow: [],
            last_crawl: null,
            last_analyze: null,
            top_matches: [],
            recommendation: []
        },
        season_id: '',
        anime: {

        }
    },
    watch: {
        mid: function () {
            this.$http.get('/api/authors/' + this.mid).then(response => {
                let author = response.body;
                this.author.reviews = author.reviews;
                this.author.uname = author.uname;
                this.author.follow = author.follow;
                this.author.last_crawl = author.last_crawl;
                this.author.last_analyze = author.last_analyze;

                const that = this;

                this.author.top_matches = [];
                author.top_matches.forEach(function (pair) {
                    that.$http.get('/api/authors/' + pair.mid).then(response => {
                        let other = response.body;
                        other.similarity = pair.similarity;
                        that.author.top_matches.push(other)
                    }, response => {});
                });

                this.author.recommendation = [];
                author.recommendation.forEach(function (media_id) {
                    that.$http.get('/api/media/' + media_id).then(response => {
                        that.author.recommendation.push(response.body)
                    }, response => {});
                });
            }, response => {});
        }
    }
});