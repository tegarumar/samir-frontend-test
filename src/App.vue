<template>
  <div id="app">
    <router-view />
    <Loader v-if="isGettingLoans" />
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    Loader,
  },
  computed: {
    // Ambil data semua isGettingLoans dari Vuex state
    ...mapGetters(["isGettingLoans"]),
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background-color: #edeef1;
}

nav {
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
