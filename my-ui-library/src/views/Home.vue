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
import Row from "@/components/grid/Row";
import Column from "@/components/grid/Column";
import Modal from "@/components/Modal";

export default {
  name: 'Home',
  components: {
    HelloWorld,
    MyButton,
    Row,
    Column,
    Modal,
  },
  methods: {
    printClick: function () {
      console.log("Event works");
    }
  }
}
</script>

<style>
  .red_square{
    background-color: red;
    color: yellow;
    padding-top: 10px;
    padding-bottom: 10px;
  }
</style>