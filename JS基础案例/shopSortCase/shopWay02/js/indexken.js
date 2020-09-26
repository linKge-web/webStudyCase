//高级单例模式
let productRender = (function() {
    let productData = null;
    let productBox = document.getElementById('productBox');
    // 获取每个按钮链接
    let headerBox =document.getElementById('headerBox'),
        linkList = headerBox.getElementsByTagName('a');
    // 这里获取productList是不能直接绑定数据的
    let productList = null;

    //基于Ajax从服务器获取数据
    let getData = function() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET','json/product.json',false);
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
                productData = JSON.parse(xhr.responseText);
            }
        };
        xhr.send(null);
    };

    //完成数据绑定
    let bindHTML = function() {
        let str = ``;
        /*
        forEach方法中的function回调有三个参数：
        第一个参数是遍历的数组内容，
        第二个参数是对应的数组索引，
        第三个参数是数组本身
        */
    //    console.log(productData)
        productData.forEach(( {title,price,time,hot,img},index) => {
            str += `
            <li data-time="${time}" data-price="${price}" data="${hot}">
            <a href="#">
                <img src="${img}" alt="">
                <p>${title}</p>
                <span>￥${price}</span>
                <span>时间：${time}</span>
                <span>热度：${hot}</span>
            </a>
            </li>`
        });
        productBox.innerHTML = str;
        //获取绑定之后的productList
        productList = productBox.querySelectorAll('li');

    }
    //实现点击按钮排序
    let bindClick = function() {
        // 点击按钮的时候，productList根据点击的不同进行排序
        // 可以使用数组中foreach的方法来实现
        // 但是linkList是类数组，不能使用数组中的方法，可以使用call调用数组中的方法来实现
        //需要把所以传进去根据索引进行排序，和点击了几次的索引
        [].forEach.call(linkList,(curClick,curIndex) => {
            // curClick是三个按钮，所以需要判断一下点击的是哪个按钮
            // 给每个按钮添加一个属性flag 用来判定是升序还是降序
            curClick.flag = -1;
            // 点击按钮的时候时候实现排序
            curClick.onclick = function() {
                curClick.flag *= -1;
                // 所以需要去获取productList 但是需要先转成数组
                let productAry = [].slice.call(productList);
                let ary = ['data-time','data-price','data-hot'];
                // a b分别是li
                productAry.sort((a,b) => {
                    //价格，时间，热度三个按键的顺序是不变的
                    // 上面添加自定义属性的时候直接将这个是值赋值给对应的属性了,所以获取相应的值就可以排序了
                    let aInn = a.getAttribute(ary[curIndex]),
                        bInn = b.getAttribute(ary[curIndex]);
                    //时间不能直接相减
                    if(curIndex === 0){
                        aInn = aInn.replace(/-/g,'');
                        bInn = bInn.replace(/-/g,'');
                    }
                    return (aInn - bInn) * this.flag;
                });
                //还有把他们排序好的添加到列表中
                for(let i=0;i<productAry.length;i++) {
                    let item = productAry[i];
                    productBox.appendChild(item);
                } 
                
            }
        })
    };


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