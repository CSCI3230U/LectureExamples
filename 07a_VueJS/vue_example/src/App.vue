<template>
<div id="app">
  <Header title="Contact Manager" />
</div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: 'home',
  components: {
    'Header': Header
  },
};
</script>

<style lang="scss">
#app {

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
