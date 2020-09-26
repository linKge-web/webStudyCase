0.首先是HTML布局
显示版心container中间包含着两个版块，一个是头部的点击列表，一个是下面的显示列表。
    头部的排序列表，包l
下面的展示ul列表有很多个li，但是不能写死，可以先写一个li来调试，每一个li都是一个可以点的链接，中间分成三部分，分别是图片，标题和价格。

2.获取标签变量，包括headerList，linkList，listBox，productList。

3.通过ajax请求数据元素，然后进行数据绑定
    创建一个变量用来存储获取的值
    创建Ajax的一个实例，通过new XMLHttpRequest来创建
    打开一个请求连接
    写一个onreadystatechange 箭头函数
        里面判断readyState是否等于4和status是否等于200
            就把xhr.responseText赋值给productData,否则就是赋值null
        然后就是格式化json
        如果productData存在就用parse全部格式化
    最后写生send(null);

4.数据绑定
用ES6的模板拼接把需要动态展示的内容进行拼接，最后存储到容器中
    循环获取的数据
    把每一项获取到的数据取出title，img，price。
    然后拼接，通过${}获取绑定的数据
    最后插入页面中，通过innerHTML。

5. 按照价格升序排序
做这个之前，先把之前的用闭包包含起来，以~function(){}()的形式
第二步才是到实现点击操作
也是用闭包包含起来
    因为点击需要按价格排序，所以需要写一个排序的sortList箭头函数，因为pruductData只是类数组，并不是真正的数组，不能直接使用数组中的sort函数，因此需要转成数组，使用[].slice.call的形式
    编写sort函数
        主要是return a-b的思想，a相当于前一个价格，b相当于后一个价格.
        需要在HTML中插入自定义属性product-time，product-price，product-hot。
    把排序好的数组添加到页面当中
        通过循环遍历productData，然后通过appendChild的方式去添加所有的li到List中。
    最后实现排序
        可以是刷新就按照价格排序，就直接调用sortList函数即可
        可以是点击按照价格排序，使用价格按钮.onclick()调用sortList()


6.实现点击价格的时候升降序排序
通过自定义属性的方式来实现，在价格a链接添加一个索引属性flag。让每次点击之后flag在1和-1之间来回切换，通过flag的不同决定是升序还是降序。
但是箭头函数是没有this的，也就是this指向的是window，所以不适合用箭头函数，改成普通函数
箭头函数中的this不受我们管控，都是默认继承上下文中的，我们基于call的也改不了。

7.点击排序的时候，把只点击价格改成循环每个按钮。
因为时间，价格，热度是按照顺序排序的，所以添加一个索引属性。
let aP = a.getAttribute('data-price'); 
let bP = b.getAttribute('data-price');
return (aP - bP) * this.flag;
把这个改成索引的形式，用switch来实现，注意时间需要格式化之后才能相减的，需要格式化时间，去掉’-‘

8.点击排序优化
从上面可知，需要获取当前点击a的索引，通过索引的不同，按照不同的方式进行排序，用swich很明显冗长。
考虑到索引是一样的，所以在一个数组中按顺序存入['data-time','data-price','data-hot'];，然后直接复制给aInn，或者bInn。