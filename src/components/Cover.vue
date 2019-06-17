<template>
  <section :class="[ { cover: 'cover' }, resumeShow ]" id="impress-toolbar">
    <main>
      <img src="../assets/KR.jpg" alt="">

      <h1>
        <svg width="100%" height="60">
          <text text-anchor="middle" x="50%" y="50%" class="text text-1">
            开启美好时光
          </text>
          <text text-anchor="middle" x="50%" y="50%" class="text text-2">
            开启美好时光
          </text>
          <text text-anchor="middle" x="50%" y="50%" class="text text-3">
            开启美好时光
          </text>
          <text text-anchor="middle" x="50%" y="50%" class="text text-4">
            开启美好时光
          </text>
        </svg>
      </h1>

      <div class="btn_all">
        <div @click="handleClickCssShow">CSS展示</div>
        <div @click="handleClickPhpShow">PPT展示</div>
      </div>
    </main>

    <!--双圆绘制 -->
    <!--<div class="double_round">-->
      <!--<img src="../assets/img/zfb.jpg" alt="">-->
    <!--</div>-->
  </section>
</template>

<script>
  export default {
    name: 'Cover',
    data() {
      return {
        // resumeShow: ''
      }
    },
    props: {
      resumeShow: String
    },
    computed: {},
    mounted(){
      this.$route.params.flag && this.$router.go(0)
    },
    methods: {
      // 跳转 - PHP页面展示
      handleClickPhpShow() {
        this.$router.push({name:'php'})
        this.$router.go(0)
      },
      // 下滑 - css页面展示
      handleClickCssShow() {
        this.$emit('showCss')
      }
    }
  }

</script>

<style scoped>
  .cover{position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 9999; width: 100%; height: 100%; background: #eee; text-align: center; transition: all 1.3s ease-in-out}
  .cover>main{position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%)}
  .cover>main>h1{margin-top: 20px; font-size: 24px; color: #dedede}
  .btn_all{display: flex; justify-content: center; align-items: center; padding: 20px; box-sizing: border-box; color: #72b182; font-size: 20px}
  .btn_all>div{position: relative; top: 0; left: 0; margin: 30px; cursor: pointer}
  .btn_all>div::after{content: ''; position: absolute; bottom: -5px; left: 50%; transform: translateX(-50%); width: 10%; height: 100%; border-bottom: 2px solid #72b182; transition: all .6s}
  .btn_all>div:hover::after{width: 100%}
  .cover>main>img{width: 200px; animation: jump 1s infinite linear}
  @keyframes jump {
    0% {
      transform: translate(0px, 0px);
    }
    50% {
      transform: translate(0px, -10px);
    }
    100% {
      transform: translate(0px, 0px);
    }
  }
  .cover>main>img{border-radius: 50%}

  .resumeShow{top: 150%}
  .resumeHide{top: 50%}

  /*动画 - 选择不同走向展示个人信息*/
  /*.coverAddClass{animation: cover 1.4s linear forwards}*/
  /*@keyframes cover {*/
    /*0% {*/
      /*transform: translate(-30%, -30%);*/
    /*}*/
    /*20%{*/
      /*transform: translate(-10%, -10%) scale(.8);*/
      /*border-radius: 10%;*/
    /*}*/
    /*40%{*/
      /*transform: translate(10%, 10%) scale(.7);*/
      /*border-radius: 20%;*/
    /*}*/
    /*60%{*/
      /*transform: translate(30%, 30%) scale(.6);*/
      /*border-radius: 30%;*/
    /*}*/
    /*80%{*/
      /*transform: translate(50%, 50%) scale(.5);*/
      /*border-radius: 40%;*/
    /*}*/
    /*90%{*/
      /*transform: translate(60%, 50%) scale(.5);*/
      /*border-radius: 50%;*/
    /*}*/
    /*95%{*/
      /*transform: translate(65%, 50%) scale(.5);*/
      /*border-radius: 50%;*/
    /*}*/
    /*100% {*/
      /*transform: translate(70%, 50%) scale(.5);*/
      /*border-radius: 50%*/
    /*}*/
  /*}*/

  /*动态文字*/
  .text{
    font-size: 18px;
    font-weight: 300;
    fill: none;
    stroke-width: 1px;
    stroke-dasharray: 310;
    animation: stroke 6s infinite linear;
  }
  .text-1{
    stroke: #99cca1;
    animation-delay: -1.5s;
  }
  .text-2 {
    stroke: #99cca1;
    animation-delay: -3s;
  }
  .text-3{
    stroke: #99cca1;
    animation-delay: -4.5s;
  }
  .text-4 {
    stroke: #99cca1;
    animation-delay: -6s;
  }

  @keyframes stroke {
    100% {
      stroke-dashoffset: -400;
    }
  }


  /*.double_round{*/
    /*position: fixed;*/
    /*top: 0; left: 0;*/
    /*z-index: 9999;*/
    /*width: 100px;*/
    /*height: 100px;*/
    /*padding: 3px;*/
    /*color: green;*/
    /*border: 4px solid currentColor;*/
    /*border-radius: 50%;*/
    /*box-sizing: border-box;*/
    /*background-clip: content-box;*/
    /*background-color: #eee;*/
  /*}*/
  /*.double_round>img{position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 86px; height: 86px; border-radius: 50%}*/
</style>
