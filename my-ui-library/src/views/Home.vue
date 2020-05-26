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
    <Carousel :images="config1"></Carousel>
    <DataTable
            :columns="columns"
            :search="search"
            :apiurl="apiURL">
    </DataTable>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import MyButton from '@/components/MyButton.vue';
import Row from "@/components/grid/Row";
import Column from "@/components/grid/Column";
import Modal from "@/components/Modal";
import Carousel from "@/components/Carousel";
import DataTable from "@/components/DataTable";

export default {
  name: 'Home',
  components: {
    Carousel,
    HelloWorld,
    MyButton,
    Row,
    Column,
    Modal,
    DataTable
  },
  data() {
    return {
      config1 : ["https://loremflickr.com/320/240",
        "https://loremflickr.com/320/240/dog",
        "https://loremflickr.com/320/240/paris,girl/all"],
      columns: [
        {title: '№', value: 'index', editable: false},
        {title: 'Тема', value: 'subject', sortable: true},
        {title: 'Тело', value: 'body'},
        {title: 'Почта', value: 'senderEmail', sortable: true, type: 'email'},
        {title: 'Аватар', value: 'senderAvatar', type: 'url'},
        //{title: 'Возраст', value: (user) => calculateTime(user['receivedAt']), type: 'number', sortable: true},
        {title: 'Получено', value: 'receivedAt', type: 'datetime-local'}
      ],
      search: {
        fields: ['subject', 'senderEmail'],
        filters: [
          v => v.toLowerCase()
        ]
      },
      apiURL: "https://5e938231c7393c0016de48e6.mockapi.io/api/ps5/emails",
      mails: [{id: 0, subject: "Ho-ho", body: "Bd", senderEmail: "a@mail.ru", senderAvatar: "a.jpg", receivedAt: "2020-05-01T06:13:49.872"},
        {id: 1, subject: "Ho-ho-ho", body: "Bdy", senderEmail: "b@gmail.com", senderAvatar: "b.jpg", receivedAt: "2020-04-01T06:13:49.872"},
        {id: 2, subject: "Ho-ho-ho-ho", body: "Body", senderEmail: "c@ukr.net", senderAvatar: "c.jpg", receivedAt: "2020-03-01T06:13:49.872"}]
  }
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