# 使用Webpack+Vue建立基于iView的页面

> 最近需求变动很快啊…今天基于这个明天构建那个的。多写点东西沉淀一下知识，之后查阅起来会方便很多

文章用到的代码，都可以在github上`clone`至本地，使用`npm install`安装依赖，使用`npm run build`打包后，双击`index.html`即可看到效果。

## 1. 起始语
前端技术日新月异，这就导致很多我这样的初级前端三天两头琢磨新工具…上一篇文章[使用Webpack+React建立基于Ant Design的页面](https://blog.hduzplus.xyz/articles/2017/03/20/1490020310263.html)，就是因为项目组准备使用ant design来重构一个平台，于是我就研究了一把新技术。没想到的是连Ant Design的边都还没摸到，项目组又准备用新技术来重构了…这次要用的是基于[Vue](https://cn.vuejs.org/)的组件库[iView](https://www.iviewui.com/)。Vue大名鼎鼎，大家应该都知道。那iView是个什么东东呢？
![](https://image.hduzplus.xyz/image/1490880118127.png)
其实iView是Ant Design组件库的另一种实现版本啦，换汤不换药。
就像孙悟空有七十二变，但是不管变成什么，他都是孙悟空。
![](https://image.hduzplus.xyz/image/1490880234444.png)

## 2. 构建
按照老套路，我们先构建一个webpack的，使用Vue的Helloworld程序出来！

### 1. 要用到的库
```
"babel-core": "^6.24.0",
"babel-loader": "^6.4.1",
"babel-preset-es2015": "^6.24.0",
"vue": "^2.2.6",
"webpack": "^2.3.2"
```
可以把上文直接复制到`package.json`的`devDependencies`节点里，之后`npm install`，当然也可以使用npm下载到项目中
```
npm install babel-core babel-loader babel-preset-es2015 vue webpack --save-dev
```

### 2.  配置文件
#### 1. babel
babel的配置文件，从用到的库里就可以看出来，使用了es2015的preset，所以新建一个名为`.babelrc`的文件，里面写入
```
{
    presets: [
        "es2015"
    ]
}
```

#### 2. webpack
`webpack.config.js`目前来看也很简单，内容如下
```
module.exports = {
    entry: "./entry.js",
    output: {
        filename: "bundle.js"
    },
    module: {
        loaders:[
            {
                test: /\.js$/,
                exclude: "/node_modules/",
                loader: "babel-loader"
            }
        ]
    }
}
```
这里面的意思是，项目入口文件为`entry.js`，会被webpack打包成`bundle.js`，所有用到的js文件(除了/node_modules文件夹内的)都会由`babel`进行处理。

### 3. index.html
我们可以很简单的构建一个`index.html`
```
<!doctype html>
<html>
<head>
<meta charset="utf-8">
</head>
<body>
<div id="app">
{{message}}
</div>
</body>
<script src="bundle.js"></script>
</html>
```

#### 4. entry.js
```
import Vue from 'vue'
new Vue({
    el: "#app",
    data: {
        message: "HelloWorld!"
    }
})
```

#### 5. 构建完成(假)
构建好啦~
这时候可以在控制台输入`webpack`打包，会自动生成`bundle.js`文件。
我们运行`index.html`，会看到
![](https://image.hduzplus.xyz/image/1490881490912.png)
一脸懵逼，什么都没有！
还有一个奇怪的报错，仿佛在尽情的愚弄我们！
![](https://image.hduzplus.xyz/image/1490881522824.png)
这是什么意思呢？
错误是告诉我们，我们使用的是运行构建模式，关于这种模式的说明，Vue的官网是这么说的：
> 独立构建和运行构建。它们的区别在于前者包含模板编译器而后者不包含。
模板编译用于编译 Vue 模板字符串成纯 JavaScript 渲染函数。如果你想用 template 选项， 你需要编译。
> 模板编译器的职责是将模板字符串编译为纯 JavaScript 的渲染函数。如果你想要在组件中使用 template 选项，你就需要编译器。

Soga！我又通过对`/node_modules/vue`内的`package.json`的研究，发现其对应的`main`指向了`dist/vue.runtime.common.js`，而不是传统的`vue.js`。
怎么解决？其实很简单。打开`webpack.config.js`，进行一个`alias`的配置即可。
官网上是这样配置的，我们可以参照
```
// ...
resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
}
// ...
```

#### 5. 构建完成(真)
这回是真的构建完成了，我们进行打包`webpack`。之后运行`index.html`，可以看见`HelloWorld!`啦。
![](https://image.hduzplus.xyz/image/1490882285991.png)

（未完待续...）



