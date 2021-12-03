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

    const person = new Map();
    person.set("name", "kora");
    person.set("age", "25");
    person.set("sex", person.get("name") == "kora" && "Mr");
    person.set("say", () => {
      console.info(
        "亲 happy every day，我叫康润，今年25岁，已婚男士ᕦ(･ㅂ･)ᕤ，从事前端工作已经3年"
      );
    });

    console.table({
      name: "康润",
      age: "25",
      worke: "前端码农",
      skills: "vue、wepy、es6+、node、Ts...",
    });
    person.get("say")();
  },
  computed: {},
  methods: {},
};
</script>

<style scoped></style>
