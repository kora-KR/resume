<template>
  <div class="resumeEditor" :class="{htmlMode:enableHtml}" ref="container">
    <div v-if="enableHtml" v-html="result"></div>
    <pre v-else>{{result}}</pre>
  </div>
</template>

<script>
  import marked from 'marked'
  export default {
    props: ['markdown', 'enableHtml'],
    name: 'ResumeEditor',
    computed: {
      result: function () {
        // console.table({idea: '有点东西，Markdown自定义汇编语言，css3模拟只是个幌子'})
        return this.enableHtml ? marked(this.markdown) : this.markdown
      }
    },
    methods: {
      goBottom() {
        this.$refs.container.scrollTop = 100000
      },
      goTop() {
        this.$refs.container.scrollTop = 0
      }
    }
  }

</script>

<style scoped>

  @media (max-width:500px){
    .resumeEditor{
    }
  }
  .htmlMode {
    animation: flip 2s;
  }

  @keyframes flip {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
