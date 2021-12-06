<template>
  <section id="impress-toolbar" class="css_all">
    <!--首页导航-->
    <cover
      :coverAdd="coverShow"
      @showCss="showCss"
      :resumeShow="resumeShow"
    ></cover>

    <!--代码 - 左侧-->
    <StyleEditor ref="styleEditor" :code="currentStyle"></StyleEditor>
    <!--显示 - 右侧-->
    <ResumeEditor
      ref="resumeEditor"
      :markdown="currentMarkdown"
      :enableHtml="enableHtml"
    ></ResumeEditor>

    <aside class="back" @click="handleClickShowOrder">
      <span>返回首页</span>
      <svg v-if="svgShow" height="50" width="150">
        <rect id="shape" height="50" width="150" />
      </svg>
    </aside>
  </section>
</template>

<script>
import cover from "../components/Cover";
import StyleEditor from "../components/StyleEditor";
import ResumeEditor from "../components/ResumeEditor";
import "../assets/reset.css";

export default {
  name: "home",
  components: {
    cover,
    StyleEditor,
    ResumeEditor,
  },
  data() {
    return {
      svgShow: false,
      resumeShow: "",
      coverShow: true,
      interval: 1,
      currentStyle: "",
      enableHtml: false,
      fullStyle: [
        `/* KORA - 个人简历 */

/* 首先，*元素添加过渡效果 */
* {
  transition: all .3s;
}
/* 试试改变整体样式 */
html {
  color: #222;
  font-size: 14px;
  background: #eee;
  font-weight: bold;
}
/* 优化 - 文字和边框的距离、外部元素宽高设定 */
.styleEditor {
  margin: 20px;
  padding: 50px;
  width: 48vw;
  height: 90vh;
  overflow: auto;
  box-sizing: border-box;
  border: 1px solid #eee;
}
/* prismJs - 自定义高亮文本 */
.token.selector{ color: #900; }
.token.property{ color: red; }
.token.punctuation{ color: blue; }
.token.function{ color: yellow; }

/* 加点 3D 效果呗 */
.styleEditor_add{
  perspective: 1000px;
}
.styleEditor_main {
  transition: none;
  text-shadow: 2px -1px 1px rgba(255, 255, 255, .2);
  -webkit-transform: rotateY(10deg) translateZ(-100px) ;
          transform: rotateY(10deg) translateZ(-100px) ;
}

/* 右侧创建一个编辑器 */
.resumeEditor{
  position: fixed; right: 0; top: 0;
  padding: 50px;  margin: 20px;
  width: 48vw; height: 90vh;
  border: 1px solid #eee;
  background: white; color: #222;
  overflow: auto;
}
/* 开始编辑个人信息咯~ */

`,
        `
/* 纯文本 - 添点样式
 * Markdown 格式怎么样，对咱们的HR是不是更友好点 ^_^
 * 开源的marked时候能满足这个需求
 */
`,
        `
/* 再对 HTML 加点样式 */
.resumeEditor{
  padding: 2em;
}
.resumeEditor h2{
  color: #7cb68a;
  margin: 1em 0 .5em;
  padding-bottom: 4px;
  display: inline-block;
  border-bottom: 2px solid #7cb68a;
}
.resumeEditor ul,.resumeEditor ol{
  list-style: none;
}
.resumeEditor ul> li::before{
  content: '•';
  margin-right: .5em;
}
.resumeEditor ol {
  counter-reset: section;
}
.resumeEditor ol li::before {
  counter-increment: section;
  content: counters(section, ".") " ";
  margin-right: .5em;
}
.resumeEditor blockquote {
  margin: 1em;
  padding: .5em;
  background: #ddd;
}
`,
      ],
      currentMarkdown: "",
      fullMarkdown: `康润
----

前端工程师

技能
----

* PC开发
* 移动端开发
* 小程序开发
* es6+/TS/SEO/NODE...

工作经历
----

1. 北京博瑞开源
2. 青岛格兰德
3. 南京视客眼镜

链接
----

* [个人博客](https://kora-kr.github.io/)
* [GitHub](https://github.com/kora-KR)
* [码云](https://gitee.com/koras)
* [知乎](https://www.zhihu.com/people/keycode/activities)

> 如果你喜欢这个效果，Fork [我的项目](https://github.com/kora-KR)，打造你自己的简历！

:::tip 点击底部 - 导航 - 查看PPT，更多资料等你解锁~  ☀☀☀☀☀

`,
    };
  },
  async created() {
    // 默认开始不展示,通过点击事件触发
    // this.makeResume()
  },
  beforeCreate() {},
  methods: {
    showCss() {
      this.resumeShow = "resumeShow";
      this.makeResume();
    },
    // 动态展示 - css
    async makeResume() {
      await this.progressivelyShowStyle(0).then(() => {
        console.log(0);
      });
      await this.progressivelyShowResume().then(() => {
        // console.warn("简直不要太棒了1");
      });
      await this.progressivelyShowStyle(1).then(() => {
        console.log(1);
      });
      await this.showHtml().then(() => {
        // console.warn("简直不要太棒了2");
      });
      await this.progressivelyShowStyle(2).then(() => {
        console.log(2), (this.svgShow = true);
      });
    },
    showHtml() {
      return new Promise((resolve, reject) => {
        this.enableHtml = true;
        resolve();
      });
    },
    progressivelyShowStyle(n) {
      return new Promise((resolve, reject) => {
        let interval = this.interval;
        let showStyle = async function () {
          let style = this.fullStyle[n];
          if (!style) {
            return;
          }
          // 计算前 n 个 style 的字符总数
          // console.log(this.fullStyle.filter((_, index, _____________) => index <= n), 777)
          let length = this.fullStyle
            .filter((_, index, _____________) => index <= n)
            .map((item) => item.length)
            .reduce((p, c) => p + c, 0);
          let prefixLength = length - style.length;
          if (this.currentStyle.length < length) {
            let l = this.currentStyle.length - prefixLength;
            let char = style.substring(l, l + 1) || " ";
            this.currentStyle += char;
            if (style.substring(l - 1, l) === "\n" && this.$refs.styleEditor) {
              this.$nextTick(() => {
                this.$refs.styleEditor.goBottom();
              });
            }
            setTimeout(showStyle, interval);
          } else {
            resolve();
          }
        }.bind(this);
        showStyle();
      });
    },
    progressivelyShowResume() {
      return new Promise((resolve, reject) => {
        let length = this.fullMarkdown.length;
        let interval = this.interval;
        let showResume = () => {
          if (this.currentMarkdown.length < length) {
            this.currentMarkdown = this.fullMarkdown.substring(
              0,
              this.currentMarkdown.length + 1
            );
            let lastChar =
              this.currentMarkdown[this.currentMarkdown.length - 1];
            let prevChar =
              this.currentMarkdown[this.currentMarkdown.length - 2];
            if (prevChar === "\n" && this.$refs.resumeEditor) {
              this.$nextTick(() => this.$refs.resumeEditor.goBottom());
            }
            setTimeout(showResume, interval);
          } else {
            resolve();
          }
        };
        showResume();
      });
    },

    handleClickShowOrder() {
      this.resumeShow = "resumeHide";
    },
  },
};
</script>

<style scoped>
html {
  min-height: 100vh;
}
* {
  box-sizing: border-box;
}
.css_all {
  height: 92vh;
}
#impress-toolbar {
  opacity: 1 !important;
}
#shape {
  stroke-width: 6px;
  fill: transparent;
  stroke: #222;
  stroke-dasharray: 104 300;
  stroke-dashoffset: -220;
  transition: 1s all ease;
}
svg:hover #shape {
  stroke-dasharray: 70 0;
  stroke-width: 3px;
  stroke-dashoffset: 0;
  stroke: #72b182;
}
.back {
  position: fixed;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 52px;
  font-size: 14px;
  cursor: pointer;
  opacity: 1 !important;
}
.back > span {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: -1;
  transform: translate(-50%, -50%);
  line-height: 30px;
  transition: all 0.3s linear;
}
.back:hover > span {
  color: #72b182;
}
</style>
