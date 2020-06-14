<template>
  <div id="app">
    <Navbar>
      <template #brand><i class="fab fa-suse"></i>Chameleon Inc</template>
      <template #menu>
        <router-link to="/">Home</router-link>
      </template>
    </Navbar>
    <router-view/>
  </div>
</template>

<script>
  import Navbar from "@/components/Navbar.vue";
  export default {
    components: {
      Navbar
    }
  }
</script>

<style lang="less">

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
