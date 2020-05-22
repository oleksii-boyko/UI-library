<template>
  <div class="home">
    <MyButton size="lg" variant="warning" @click="printClick">Some text</MyButton>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import MyButton from '@/components/MyButton.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    MyButton
  },
  methods: {
    printClick: function () {
      console.log("QQ");
    }
  }
}
</script>
