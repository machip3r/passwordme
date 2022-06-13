<template>
  <v-app>
    <NavigationDrawer />
    <router-view />
  </v-app>
</template>

<style lang="css">
@import "./styles/main.css";
@import "./styles/password.css";
@import "./styles/login.css";
</style>

<script>
import NavigationDrawer from "./components/NavigationDrawer.vue";

export default {
  name: "App",

  components: {
    NavigationDrawer,
  },
};
</script>
