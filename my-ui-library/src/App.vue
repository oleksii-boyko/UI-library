<template>
  <div id="app">
    <Navbar>
      <template #brand><i class="fab fa-suse"></i>Chameleon Inc</template>
      <template #menu>
        <router-link to="/">Home</router-link>
        <router-link to="/button">Button</router-link>
        <router-link to="/grid">Grid</router-link>
        <router-link to="/modal">Modal</router-link>
        <router-link to="/carousel">Carousel</router-link>
        <router-link to="/table">Table</router-link>
      </template>
    </Navbar>
    <router-view/>
    <div class="footer">
      <h3>For a <i class="fab fa-suse"></i> feedback contact us via:</h3>
      <ul class="contacts">
        <li>
          <i class="fas fa-google"></i>
          <span>  chameleon_rules@gmail.com</span>
        </li>
        <li>
          <i class="fas fa-skype"></i>
          <span>  believe_in_chameleon</span>
        </li>
        <li>
          <i class="fa fa-telegram" aria-hidden="true"></i>
          <span>  @Chameleon_team</span>
        </li>
        <li>
          <i class="fas fa-github"></i>
          <span>  github.com/chameleon_team</span>
        </li>
      </ul>
    </div>
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

  .footer{
    background-color: blue;
    color: white;
    font-weight: bold;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;

    h3{
      padding-top: 10px;
      margin-bottom: 0;
    }

    .contacts{
      text-align: left;
      list-style: none;
      padding: 10px 0;
      margin: 0 auto;
      width: 270px;

      li{
        padding: 5px 0;
      }
    }
  }
</style>
