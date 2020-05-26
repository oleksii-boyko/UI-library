<template>
  <div class="home">
    <MyButton size="large" variant="warning" @click="printClick">Some text</MyButton>
    <Row>
      <Column class="red_square" lg="2">I'm 2</Column>
      <Column class="red_square" lg="3">I'm 3</Column>
      <Column class="red_square" lg="5">I'm 5</Column>
    </Row>
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
