<template>
  <div class="content">
    <div class="logo"><i class="fab fa-suse"></i></div>
    <h1>Chameleon Inc - young developers team from Kropyvnytskyi presents you new library of commonly used Vue components</h1>
    <h3 class="align-right">We don't exist, but chameleon does ;)</h3>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {}
}
</script>

<style lang="less">
  .content {
    margin: 0 auto;
    @media screen and (max-width: 1600px) {
      width: 900px
    }
    @media screen and (max-width: 768px) {
      width: 600px;
    }
    @media screen and (max-width: 411px) {
      width: 100vw;
    }
  }

  .code{
    margin: 1vh 0;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    background-color: aliceblue;
    font-weight: bold;
    padding: 2px;
    box-shadow: 0 0 1px black;
  }

  .logo{
    font-size: 300px;
    text-align: center;
  }

  h1{
    text-align: center;
  }
</style>