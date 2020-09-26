// 高级单例模式完成业务逻辑开发
let productRender = (function() {
    let productData = null,
        productBox = document.getElementById('productBox'),
        headerBox = document.getElementById('headerBox'),
        linkList = headerBox.getElementsByTagName('a'),
        // productList = productBox.getElementsByTagName('li');
        // console.log(productList);  //这个时候productList还是空的，还没有绑定数据,因为我们在下面再获取li
        productList = null;


    //自执行的函数在私有作用域中不会被销毁（‘闭包’）
    // 有两个作用：
    
    //1.get-data:基于Ajax从服务器汇总获取数据
    let getData = function() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET','json/product.json',false);  //false 采用同步编程
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
                //把从服务器获取的JSON字符串转换为对象,方便后续操作
                productData = JSON.parse(xhr.responseText);
            }
        };
        xhr.send(null);
    }

    //2.bind-html: 完成数据的绑定（基于ES6模板字符串）
    let bindHTML = function() {
        // console.log(productData);  //可以查看到数据

        // ES6模板字符串中出现的${}里面存放的是JS代码(包含需要动态绑定数据的JS变量的值)
        let str = ``;
        productData.forEach(({title,price,time,hot,img},index) => {
            str += `<li data-time="${time}" data-hot="${hot}" data-price="${price}"><a href="#">
                <img src="${img}" alt="">
                <p title="${title}">${title}</p>
                <span>￥${price}</span>
                <span>时间：${time}</span>
                <span>热度：${hot}</span>
            </a></li>`;
        });
        productBox.innerHTML = str;
        // 这个时候再获取li
        productList = document.querySelectorAll('li');

    };
    //3.BIND-CLICK：给三个排序标签绑定点击事件
    let bindClick = function() {
        // console.log(linkList);  //linkList是个类数组，不能进行forEach循环
        // linkList.forEach((curLink,index) => {  //Uncaught TypeError: linkList.forEach is not a function
        // });

        /* linkAry = Array.prototype.slice.call(linkList);  //转成数组
        linkAry.forEach((curlink,index) => {
        }) */
        // 或者：直接用数组原型上的forEach方法执行
        [].forEach.call(linkList,(curlink,index) => {
            //循环三次，执行三次这个方法，每一次执行都会形成一个闭包
            //每一个闭包保存了当前这个a对应的索引index
            curlink.flag = -1;

            curlink.onclick = function() {
                this.flag *= -1;
                //给product-List进行排序（根据点击列的不同进行排序）
                //点击需要获取每一个li的价格/热度等信息，此时我们可以在绑定的时候，把这些信息存到自定义属性上，
                //点击的时候根据自定义属性获取即可
                //A:根据点击Li索引获取按照谁来排序
                let ary = ['data-time','data-price','data-hot'];
                productList = Array.prototype.slice.call(productList);
                productList.sort((a,b) => {
                    let aInn = a.getAttribute(ary[index]),
                        bInn = b.getAttribute(ary[index]);
                    if(index === 0) {
                        aInn = aInn.replace(/-/g,'');
                        bInn = bInn.replace(/-/g,'');
                    }
                    return (aInn - bInn)*this.flag;
                });
    
                //2.按照最新顺序依次添加到容器中
                productList.forEach(curList => {
                    productBox.appendChild(curList);
                })
            }


        });
    }


    return {
        init: function() {
            //顺序不能变
            getData();
            bindHTML();    
            bindClick();
        }
    }

})();

// 执行上面的方法
productRender.init();