<template>
  <div id="app">
    <StyleEditor ref="styleEditor" :code="currentStyle"></StyleEditor>
    <ResumeEditor
      ref="resumeEditor"
      :markdown="currentMarkdown"
      :enableHtml="enableHtml"
    ></ResumeEditor>
  </div>
</template>

<script>
import StyleEditor from "./components/StyleEditor";
import ResumeEditor from "./components/ResumeEditor";
import "./assets/reset.css";

export default {
  name: "app",
  components: {
    StyleEditor,
    ResumeEditor,
  },
  data() {
    return {
      interval: 40,
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
  created() {
    this.makeResume();
  },

  methods: {
    makeResume: async function () {
      await this.progressivelyShowStyle(0);
      await this.progressivelyShowResume();
      await this.progressivelyShowStyle(1);
      await this.showHtml();
      await this.progressivelyShowStyle(2);
    },
    showHtml: function () {
      return new Promise((resolve, reject) => {
        this.enableHtml = true;
        this.$nextTick(() => {
          this.$refs.resumeEditor.goTop();
        });
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
          let length = this.fullStyle
            .filter((_, index) => index <= n)
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
  },
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  position: relative;
}

html {
  min-height: 100vh;
}
* {
  box-sizing: border-box;
}
</style>
