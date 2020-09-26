let header = document.getElementById('header');
let linkList = header.getElementsByTagName('a');
let listBox = document.getElementById('list');
let productList = document.getElementsByTagName('li')

/* 
// 第一阶段
// Ajax请求
let productData = null;
let xhr = new XMLHttpRequest;
xhr.open('GET','json/product.json',false);
xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200) {
        productData =  xhr.responseText;
    }
    productData ? productData = JSON.parse(productData):null;
}
xhr.send(null);

//数据绑定
let str = ``;
for(let i=0;i<productData.length;i++) {
    let {
        title,
        img,
        price
    } = productData[i];
    str += `
    <li>
    <a href="#">
        <img src="${img}">
        <p>${title}</p>
        <span>￥${price}</span>
    </a>
    </li> `
}
listBox.innerHTML = str;
 */

// 第二阶段
~function() {
    let productData = null;
    let xhr = new XMLHttpRequest;
    xhr.open('GET','json/product.json',false);  //这一这里不能写成../json/
    xhr.onreadystatechange = () => {
        xhr.readyState === 4 && xhr.status === 200 ? productData = xhr.responseText : null;

        // 格式胡json格式
        productData ? productData = JSON.parse(productData) : null;
    };
    xhr.send(null);

    //数据板顶
    let str = ``;
    for(let i=0;i<productData.length;i++) {
        let {
            title,
            img,
            price,
            time,
            hot
        } = productData[i];
        str += `
        <li product-time=${time} 
            product-price=${price}
            product-hot=${hot}>
        <a href="#">
            <img src="${img}">
            <p>${title}</p>
            <span>${price}</span><br>
            <span>${time}</span><br>
            <span>${hot}</span>
        </a>
        </li> `
    }
    //把这些li插入到List当中
    listBox.innerHTML = str;
}();

//实现点击操作-按照价格排序
/*
 ~function() {
    let sortList = () => {
        //把类数组转成数组
        let productAry =  [].slice.call(productList);
        //现在是数组了，可以直接调用数组中的sort方法实现排序
        productAry.sort((a,b) => {
            let aP = a.getAttribute('product-price');
            let bP = b.getAttribute('product-price');
            return aP - bP;
        });
        // 把排序好的li插入到List中
        for(let i=0;i<productAry.length;i++) {
            let curList = productAry[i];
            listBox.appendChild(curList);
        }
    };
    // 刷新页面就是实现排序
    // sortList();

    // 点击价格按钮再进行排序
    linkList[1].onclick = function() {
        sortList();
    }

}();
 */


//  第三阶段
/* ~function() {
    let sortList = function() {
        // console.log(this);  //this  调用的时候用sortList,call()这里的this就变成a标签了

        
        //把类数组转成数组
        let productAry =  [].slice.call(productList);
        //现在是数组了，可以直接调用数组中的sort方法实现排序
        productAry.sort((a,b) => {
            let aP = a.getAttribute('product-price');
            let bP = b.getAttribute('product-price');
            return ((aP - bP)*this.flag);
        });
        // 把排序好的li插入到List中
        for(let i=0;i<productAry.length;i++) {
            let curList = productAry[i];
            listBox.appendChild(curList);
        }
    };
    // 刷新页面就是实现排序
    // sortList();

    // 点击价格按钮再进行排序
    linkList[1].flag = 1;
    linkList[1].onclick = function() {
        // sortList();

        this.flag *= -1;
        sortList.call(this);

    }

}();
 */
// 第四阶段，三个按钮都这是点击操作
/* ~function() {
    let sortList = function() {
        let productAry = [].slice.call(productList);
        productAry.sort((a,b) => {
            let aInn,
                bInn;
            switch(this.index) {
                case 0:
                    aInn = a.getAttribute('product-time').replace(/-/g,'');
                    bInn = b.getAttribute('product-time').replace(/-/g,'');
                    break;
                case 1:
                    aInn = a.getAttribute('product-price');
                    bInn = b.getAttribute('product-price');
                    break;
                case 2:
                    aInn = a.getAttribute('product-hot');
                    bInn = b.getAttribute('product-hot');
                    break;
            };
            return (aInn - bInn) * this.flag;
        });
        // 把排序号的li插入List中
        for(let i=0;i<productList.length;i++) {
            let curList = productAry[i];
            listBox.appendChild(curList);
        }
    };
    for(let i=0;i<linkList.length;i++) {
        let curLink = linkList[i];
        curLink.index = i;
        curLink.flag = 1;
        curLink.onclick = function() {
            curLink.flag *= -1;
            sortList.call(this);
        }
    }
}();
 */

//  第四阶段：每个按钮点击排序优化
~function() {
    let sortList = function() {
        let productAry = [].slice.call(productList);
        productAry.sort((a,b) => {
            let {index:_index,flag:_flag} = this;
            let ary = ['product-time','product-price','product-hot'];
            let aInn,
                bInn;
            aInn = a.getAttribute(ary[_index]);
            bInn = b.getAttribute(ary[_index]);
            if(_index === 0){
                aInn = aInn.replace(/-/g,'');
                bInn = bInn.replace(/-/g,'');
            }
            return (aInn - bInn) * _flag;
        });
        for(let i=0;i<productAry.length;i++) {
            var curList = productAry[i];
            listBox.appendChild(curList);
        } 
    };
    for(let i=0;i<linkList.length;i++) {
        let curLink = linkList[i];
        curLink.index = i;
        curLink.flag = 1;
        curLink.onclick = function() {
            curLink.flag *= -1;
            sortList.call(this);
        }
    }
}();






