const obj = {
  counter: 1,
  books: [
    {
      id: 1,
      name: '《算法导论》',
      date: '2006-9',
      price: 85.00,
      count: 1
    },
    {
      id: 2,
      name: '《UNIX编程艺术》',
      date: '2006-2',
      price: 59.00,
      count: 1
    },
    {
      id: 3,
      name: '《编程珠玑》',
      date: '2008-10',
      price: 39.00,
      count: 1
    },
    {
      id: 4,
      name: '《代码大全》',
      date: '2006-3',
      price: 128.00,
      count: 1
    },
  ]
}

const App = new Vue({
  el: '#app',
  data: obj,
  methods: {
    decrement(index) {
      return this.books[index].count--;
    },
    increment(index) {
      return this.books[index].count++;
    },
    // 移除操作
    removeBook(index) {
      this.books.splice(index,1); //从index开始移除1个
    }
  },
  computed: {
    //计算属性是有缓存的
    totalPrice() {
      let sumPrice = 0
      for(let i=0;i<this.books.length;i++) {
        sumPrice += this.books[i].price * this.books[i].count;
      }
      return sumPrice;
    },
  },
  //过滤器
  filters: {
    //显示价格的方式
    showPrice(price) {
      // console.log(price);
      return "￥" + price.toFixed(2);
    }
  }
})