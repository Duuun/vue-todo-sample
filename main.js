const likeComponent = Vue.extend({
    props: {
        message: {
            type: String,
            defalut: 'Like'
        }
    },
    data: function () {
        return {
            count: 0
        }
    },
    template: '<a href="#!" class="secondary-content" @click="countUp"> <i class="material-icons" style="color:lightpink;">star_border</i> {{ count }} </a>',
    methods: {
        countUp: function () {
            this.count++;
            this.$emit('increment');
        }
    }
})

new Vue({
    el: '#app',
    data: {
        newItem: '',
        todos: [],
        total: 0
    },
    watch: {
        todos: {
            handler: function () {
                localStorage.setItem('todos', JSON.stringify(this.todos));
            },
            deep: true
        }
    },
    components: {
        'like-component': likeComponent
    },
    mounted: function () {
        this.todos = JSON.parse(localStorage.getItem('todos'));
    },
    methods: {
        addItem: function () {
            let item = {
                title: this.newItem,
                isDone: false
            }
            this.todos.push(item);
            this.newItem = '';
        },
        deleteItem: function (index) {
            if (confirm('削除してもいいですか？')) {
                this.todos.splice(index, 1);
            }
        },
        putStar: function (index) {
            alert('test');
            this.addClass('test');
        },
        incrementTotal: function () {
            this.total++;
        }
    },
    computed: {
        remaining: function () {
            let items = this.todos.filter(function (todo) {
                return !todo.isDone;
            });
            return items.length;
        }
    }
})