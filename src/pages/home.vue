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
      <span>&lt;返回首页&gt;</span>
      <svg
        v-if="svgShow"
        height="30"
        width="150"
        style="position: relative; top: -5px"
      >
        <rect id="shape" height="30" width="150" />
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

* css、less、sass、stylus、windi
* vue、react、uniapp、wechart、ionic
* node、express、es6+、微信、支付宝、加密

开源
----

* <a target='_blank' href='https://www.npmjs.com/package/inx-shell'>框架封装[INX]</a>
* <a target='_blank' href='http://test.hhxinfo.com/drag/#/'>拖拽平台[Drag]</a>

工作经历
---- 
* 青岛海华信科技技术有限公司
* 青岛格兰德信用管理咨询有限公司
* 北京博瑞开源网络科技有限公司
* 南京视客眼镜网

友情链接
----
* <a target='_blank' href='https://gitee.com/koras'>码云</a>
* <a target='_blank' href='https://www.zhihu.com/people/keycode'>知乎</a> 
* <a target='_blank' href='https://github.com/kora-KR'>gitHub</a>
* <a target='_blank' href='https://kora-kr.github.io/'>个人博客</a>

> 如果你喜欢这个效果，Fork <a target='_blank' href='https://github.com/kora-KR/resume'>我的项目</a>，打造你自己的简历！

☀☀☀☀☀ 点击底部 - <返回首页> - 查看PPT展示，更多资料等你解锁~  ☀☀☀☀☀

`,
    };
  },
  async created() {
    // 默认开始不展示,通过点击事件触发
    // this.makeResume()
  },
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
  /* stroke: #222; */
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
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 20px;
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
  line-height: 20px;
  transition: all 0.3s linear;
  display: inline-block;
  width: 80px;
}
.back:hover > span {
  color: #72b182;
}
a {
  text-decoration: none;
}
</style>
