<template>
  <div class="home">
    <MyButton size="large" variant="warning" @click="printClick">Some text</MyButton>
    <Row>
      <Column class="red_square" lg="2">I'm 2</Column>
      <Column class="red_square" lg="3">I'm 3</Column>
      <Column class="red_square" lg="5">I'm 5</Column>
    </Row>
    <Modal size="md" left="">
      <template v-slot:trigger><button>Super Button</button></template>
      <template v-slot:modal-heading>
        Hi, I'm head
      </template>
      I'm Modal Body. Obey me!
      <template v-slot:modal-footer>
        And I'm - modal footer
      </template>
    </Modal>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import MyButton from '@/components/MyButton.vue';
import Modal from "@/components/Modal";
import Carousel from "@/components/Carousel";

export default {
  name: 'Home',
  components: {
    Carousel,
    HelloWorld,
    MyButton
    Modal,
  data() {
    return {
      config1 : ["https://loremflickr.com/320/240",
        "https://loremflickr.com/320/240/dog",
        "https://loremflickr.com/320/240/paris,girl/all"],
  }
  },
  methods: {
    printClick: function () {
      console.log("QQ");
    }
  }
}
</script>
