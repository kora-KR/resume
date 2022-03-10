<template>
  <section>
    <phpResume></phpResume>
  </section>
</template>

<script>
// impress
import "../assets/css/fonts.css";
import "../assets/css/presentation.css";
import "../assets/js/impress";

import phpResume from "../components/phpResume";

export default {
  name: "php",
  components: {
    phpResume,
  },
  props: [],
  mounted() {
    impress().init();

    const birth = 1994;
    const workDate = 2015;
    const person = new Map();
    const newYear = new Date().getFullYear();

    let baseInfo = Object.create({});

    person.set("name", "kora");
    person.set("age", newYear - birth + "");
    person.set("sex", person.get("name") == "kora" && "Mr");
    person.set("say", () => {
      console.log(
        `%c人潮汹涌，感恩相遇!`,
        `font-size: 14px; background: #40aa7f;color: #fff; letter-space: 1px`
      );
      console.info(
        `HI~ 我是康润，今年${person.get(
          "age"
        )}岁，现居青岛ᕦ(･ㅂ･)ᕤ，致力于前端开发已经${newYear - workDate}年！`
      );
    });

    for (let [key, val] of person) {
      baseInfo[key] = val;
    }
    console.table({
      ...baseInfo,
      worker: "前端工程师",
      pretreat: "css、less、sass、stylus、windi",
      frame: "vue、react、uniapp、wechart、ionic",
      other: "node、express、es6+、微信、支付宝、加密",
    });
    person.get("say")();
  },
  computed: {},
  methods: {},
};
</script>

<style scoped></style>
