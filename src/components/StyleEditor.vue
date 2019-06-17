<template>
  <div class="styleEditor styleEditor_add" ref="container">
    <div class="styleEditor_main">
      <!--样式渲染-->
      <div class="code" v-html="codeInStyleTag"></div>
      <!--动态文本 - 定时器赋值-->
      <pre class="" v-html="highlightedCode"></pre>
    </div>
  </div>
</template>

<script>
  import Prism from 'prismjs'

  export default {
    name: 'Editor',
    props: ['code'],
    computed: {
      highlightedCode() {
        return Prism.highlight(this.code, Prism.languages.css)
      },
      codeInStyleTag() {
        return `<style>${this.code}</style>`
      }
    },
    methods: {
      goBottom() {
        this.$refs.container.scrollTop = 100000
      }
    }
  }

</script>

<style scoped>
  pre{
  }
  @media (max-width:500px){
    pre{
    }
  }
  .code {
    background: #900
  }
</style>
