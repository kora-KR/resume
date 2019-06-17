<template>
  <section>
    <!--

      Hint其实和impress.js没有半点关系。

      不过它演示一种创造性的使用impress.js的方法。

      当某一个场景显示的时候，它会获得`active`类属性（译注：确实，除了上面的present以外还有一个active），
      同时body元素会有一个`impress-on-ID`（ID就是当前显示的场景的id）的类...
      听起来很让人迷惑，举个栗子，当我们的第一张幻灯片显示的时候，它的id是`bored`，那么我们的body
      就有一个叫做`impress-on-bored`的类名。

      我们就是用这个类来显示下面的Hint，查看一下CSS文件，我们延时的显示了操作方法。

      ...

      当然这里面还有一些JavaScript的代码…… 孩子，千万不要再家里模仿这样的做法：）
      我们只是为了演示对应触摸设备的提示而随便写写的，你应该把这代码写到一个独立的JS文件里，
      而且这个演示也应该放在HTML里的某个地方，而不是写死在代码里。

      不过我只是随口说所;)

  -->
    <div id="impress-toolbar" class="hint">
      <p>- 使用空格或者方向键来移动 -</p>
      <div>
        <div id="hintLeft" data-flag="hintLeft" @click="handleClickPrev">上一张</div>
        <div id="hintRight" data-flag="hintRight" @click="handleClickNext">下一张</div>
        <div @click="handleClickToHome">返回首页</div>
      </div>
    </div>

    <!--<div class="toptit"  @click="handleClickToHome" style="position: relative; top: 0; left: 0; z-index: 9999; background: #900">键盘左右键翻页</div>-->
    <div id="impress">
      <!--
          接下来就要发生一些有趣的事情了。

          所有在`#impress`中并且有`step`类名的元素都是一个场景。这些个场景会被impress.js定位、
          旋转和缩放，我们的‘镜头’会一一的展示它们。

          位置信息也是通过data属性设置的。

          在下面这个场景里，我们给它设置了`data-x="-1000"`和`data-y="-1500`的属性。
          这意味着这个元素的**中心**（是的，确实是中心）在整个幻灯片的(-1000px, -1500px)处。
          这个场景没有旋转和缩放。
      -->
      <!--<div id="bored" class="step slide" data-x="-600" data-y="-1500">-->
        <!--<div>dsad</div>-->
      <!--</div>-->

      <!--
          `id`属性仅仅是用来表示场景的URL的，事实上也不是必须的东西。
          即使你没有给它定义，你依然可以使用`step-N`来找到这一幕。

          比如说下面这个场景就可以叫做`step-2`。

          这个URL的锚部分就应该是`#/step-2`。

          你也可以在一个链接里使用`#step-2`，这可以直接定位到这个场景。

          请注意，`#/step-2`虽然在链接中也可以使用，但是并不是推荐的，使用`#step-2`可以在
          更广泛的情况是使用（比如impress.js压根儿没起作用的时候）。

      -->
      <!--<div class="step slide" data-x="0" data-y="-1500">-->
        <!--<q>你有没有想过，在 <strong>现代浏览器</strong> 光辉下，我们可以不再受限于 <strong>老旧浏览器的残忍压迫</strong> ？</q>-->
      <!--</div>-->

      <!--<div class="step slide" data-x="1000" data-y="-1500">-->
        <!--<q>你难道不想使用 <strong>华丽的舞台效果</strong> 来 <strong>震惊你的观众</strong> 吗？</q>-->
      <!--</div>-->

      <!--

          这个场景使用了旋转。

          写法你一定猜到了，我们使用了`data-rotate="90"`属性，这就意味着这这个场景会被
          顺时针旋转90度。

      -->
      <!--<div id="its" class="step" data-x="850" data-y="3000" data-rotate="90" data-scale="5">-->
        <!--<p>它是一个 <strong>演示工具</strong> <br/>-->
          <!--受<a href="http://prezi.com" target="_blank">prezi.com</a>启发 <br/>-->
          <!--基于现代浏览器中 <strong>强大的CSS3特效</strong> 开发而成</p>-->
      <!--</div>-->

      <!--<div id="big" class="step" data-x="3500" data-y="2100" data-rotate="180" data-scale="6">-->
        <!--<p>它可以具象化您 <big style="font-size:larger">伟大</big> </p>-->
      <!--</div>-->

      <!--

          现在事情变得更欢乐了，我们开始进入三维的世界！

          除了`data-x`和`data-y`以外，我们还可以定义第三个坐标，就是`data-z`。
          我们在下一个例子上加上了`data-z="-3000"`，意味着这个场景离我们有3000px那么远。

      -->
      <!--<div id="tiny" class="step" data-x="2825" data-y="2325" data-z="-3000" data-rotate="300" data-scale="1">-->
        <!--<p>或者 <span style="font-size:smaller">细致</span> 的 <span class="thoughts">想法</span></p>-->
      <!--</div>-->

      <!--

          下面这个场景并没有展示新的data属性，但是你应该可以看到这里面有些字是动的。
          这些是非常基础的CSS transition动画，当这个场景开始后，我们就让它们开始播放。

          在演示刚开始的时候，所有的step元素都有一个`future`类，也就是说它们还没有开始上演。

          当舞台进入某个场景，这个场景被贴上了`present`的类标签，这就是动画的秘密——
          字符在`present`类里面发生动画。

          当场景完毕，`present`类就被移除了，写上一个`past`的类。

          简而言之，每个场景都会具有`future`、`present`、`past`中某一个的类，只有当前
          播放的step元素具有`present`类属性。

      -->
      <div id="ing" class="step" data-x="1500" data-y="-1850" data-rotate="0" data-scale="6">
        <div class="step_one">
          <font color="#666"><font color="#cc7832">const</font> person = <font color="#cc7832">new</font> Map()</font>
          <br>
          <font color="#666">person.<font color="#ffc66d">set</font>( <font color="#46bd87">'name'</font>, <font color="#46bd87">'kora'</font> )</font>
          <br>
          <font color="#666">person.<font color="#ffc66d">set</font>( <font color="#46bd87">'age'</font>, <font color="#46bd87">'25'</font> )</font>
          <br>
          <font color="#666">person.<font color="#ffc66d">set</font>( <font color="#46bd87">'sex'</font>, person.<font color="#ffc66d">get</font>( <font color="#46bd87">'name'</font> )  ==  <font color="#46bd87">'kora'</font>  &&  <font color="#46bd87">'Mr'</font> )</font>
          <br>
          <font color="#666">person.<font color="#ffc66d">set</font>( <font color="#46bd87">'say'</font>, () => { console.<font color="#ffc66d">info</font>( <font color="#46bd87">'it's Kora'</font> ) })</font>
          <br>
          <br>
          <font color="#666">person.<font color="ffc66d">get</font>(<font color="#46bd87">'say'</font>)()</font>
          <br>
          <font style="margin-top: 30px; display: block; width: 100%; text-align: center; font-size: 16px">控制台有答案（F12 + F5）</font>
        </div>
      </div>


      <!--

      这是一个缩放的效果。

      同样的，我们又使用了`data-`属性，这一次我们写了一个`data-scale="4"`，这样一来，
      这个元素就会被放大成原来的4倍。
      如果从这个场景退出，它会被还原原来的大小（缩小4倍）。

  -->
      <div id="title" class="step" data-x="1500" data-y="1500" data-scale="4" style="color: #94e9ec">
        <h2 style="color: #eee">嗨，我是 <font color="#94e9ec" style="font-size: 60px; font-family: JasmineUPC">康润</font></h2>
        <span>现居<span class="animates" style="color: aqua">青岛</span>，往后余生也将爱在青岛的前端码农</span>
        <div>正在致力于全栈发展的道路上...</div>
      </div>

      <div id="its" class="step" data-x="950" data-y="3000" data-rotate="90" data-scale="5">
        <h2 style="color: #c1c1c1">曾致力于</h2>
        <ul style="color: #c1c1c8">
          <li>· 青岛格兰德信用管理咨询有限公司</li>
          <li>· 北京博瑞开源网络科技有限公司</li>
          <li>· 南京视客眼镜网</li>
        </ul>
      </div>

      <div id="imagination" class="step" data-x="6700" data-y="-300" data-scale="6">
        <h2>专业技能</h2>
        <ul>
          <li>· 移动端：vue</li>
          <li>· PC: JQ/JS/H5/CSS</li>
          <li>· 小程序：原生/wepy/taro</li>
          <li>· 附属：es6+/TS/SEO/node...</li>
        </ul>
      </div>

      <div id="source" class="step" data-x="6300" data-y="2000" data-rotate="20" data-scale="4" style="color: #6aa9ec">
        <h2>项目展示</h2>
        <ul>
          <li><a href="https://www.cuiqq.com/urging#/">催全球</a></li>
          <li><a href="https://www.x315.com/">信用视界</a></li>
          <li><a href="https://www.vsigo.cn">视客眼镜网</a></li>
          <li>大蓝营销 <img src="../assets/img/dlyx.jpg" alt=""></li>
          <li>信融易 <img src="../assets/img/xry.jpg" alt=""></li>
          <li>...</li>
        </ul>
      </div>

      <div id="one-more-thing" class="step" data-x="6000" data-y="4000" data-scale="2">
        <p> <span style="margin-right: 10px; font-size: 40px; color: #ff4466">路遥知马力 日久见人心  </span>  i wait you </p>
      </div>

      <!--

          最后我们演示一下impress.js强大的灵活性。

          你不仅仅可以再3D空间中定位一个物体，同样的也能在3D中旋转一个物体！
          所以我们这里沿着X轴旋转-40度（逆时针旋转40度），沿着Y轴旋转10度（顺时针）。

          当然你也可以沿着z轴旋转`data-rotate-z`——我想你猜到了，这和`data-rotate`是一个效果。

      -->
      <div id="its-in-3d" class="step" data-x="6200" data-y="4400" data-z="-100" data-rotate-x="-40" data-rotate-y="20" data-scale="2">
        <h3>联系方式</h3>
        <div class="step_one">
          <div style="display: block; margin-bottom: 10px; color: #46bd87"> <span style="color: #eee">电话</span>：17865356192</div>
          <div style="display: block; margin-bottom: 10px; color: #46bd87"> <span style="color: #eee">邮箱</span>：keycode86@outlook.com</div>
          <div style="display: block; margin-bottom: 5px; color: #46bd87"> <span style="color: #eee">博客</span>：<a href="https://kora-kr.github.io/">https://kora-kr.github.io/</a></div>

          <div style="width: 33%; float: left">
            <img src="../assets/img/wx.jpg" class="wx" alt="微信扫码">
            <p style="font-size: 20px; color: #eee">微信</p>
          </div>
          <div style="width: 33%; float: left">
            <img src="../assets/img/zfb.jpg"  class="wx zfb" alt="支付宝扫码">
            <p style="font-size: 20px; color: #eee">支付宝</p>
          </div>
          <div style="width: 33%; float: left">
            <img src="../assets/img/gzh.jpg"  class="wx zfb" alt="公众号关注">
            <p style="font-size: 20px; color: #eee">公众号</p>
          </div>
        </div>
      </div>

      <!--

          我们最后来整理一下所有的属性：

          * `data-x`, `data-y`, `data-z` —— 它们定义了元素中心在画布的位置，默认是0；
          * `data-rotate-x`, `data-rotate-y`, 'data-rotate-z`, `data-rotate` —— 它们定义了元素
              沿着指定轴旋转的角度，默认是0；`data-rotate` 和 `data-rotate-z`是一回事；
          * `data-scale` —— 定义了元素缩放的比率，默认是1；

          这些值会被impress.js读取并写入CSS的transformation变化，你可以在下面网址查看更多信息：
          https://developer.mozilla.org/en/CSS/transform

      -->
      <div id="overview" class="step" data-x="3000" data-y="1500" data-scale="10"></div>

    </div>

    <!--

        `impress()` 函数给了你一个控制演示API的方法。

        把结果放在一个变量里：

            var api = impress();

        这样你就可以使用几个可以使用的方法：

            `api.init()` - 初始化演示；
            `api.next()` - 播放下一个幻灯片；
            `api.prev()` - 回到上一个幻灯片；
            `api.goto( idx | id | element, [duration] )` - 通过知道那个id或者DOM播放指定的幻灯片
                    可以指定转换时间（单位毫秒），当然时间可以是缺省的。

        你可以随时再次调用`impress()`来再一次获得这个API，类似`impress().next()`当然也是可以的。
        不用担心，这不会再一次的初始化impress。

    -->
  </section>
</template>

<script>

  export default {
    name: 'phpResume',
    props: [],
    computed: {},
    methods: {
      handleClickPrev() {impress().prev()},
      handleClickNext() {impress().next()},
      handleClickToHome() {
        this.$router.push({name:'home', params: { flag: 'back' }})
      }
    }
  }

</script>

<style scoped>
  .hint{position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 20%; font-size: .8em; z-index: 999999!important; color: #fff; opacity: 1!important;}
  .hint>p{padding-bottom: 10px; margin-bottom: 0; box-sizing: border-box; border-bottom: 1px solid #eee}
  .hint>div{display: flex; justify-content: space-around; align-items: center; line-height: 50px; text-align: center; cursor: pointer}
  .hint>div>div{line-height: 50px; transition: all .3s linear}
  .hint>div>div:hover{color: #72b182; font-weight: 600}

  .step_one{padding: 20px; box-sizing: border-box; width: 100%; height: 400px; border: 1px solid #eee; background: #fff; box-shadow: 0  0 5px #eee; border-radius: 6px}

  .animates{animation: kr .6s linear alternate infinite; position: relative; top:0; left: 0}
  @keyframes kr {
    from {top: -14px}
    to {top: 0}
  }

  li{position: relative; top: 0; left: 0; text-align: center; list-style: none; cursor: pointer}
  li>img{position: absolute; top: 50%; right: 20%; transform: translate(-50%, -50%); width: 100px; height: auto; opacity: 0; transition: all .3s linear}
  li:hover>img{opacity: 1}

  .wx{position: relative; top: 50%; left: 50%; transform: translate(-50%, 15%);width: 160px; height: 160px; border-radius: 10px; border: 1px solid #eee; box-shadow: 0 0 5px #eee}
</style>
