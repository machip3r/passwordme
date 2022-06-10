<template>
  <v-app>
    <v-main>
      <NavigationDrawer />
      <router-view />
    </v-main>
  </v-app>
</template>

<style lang="css">
@import "./styles/main.css";
@import "./styles/password.css";
</style>

<script>
import NavigationDrawer from "./components/NavigationDrawer.vue";

export default {
  name: "App",

  data: () => ({
    //
  }),

  components: {
    NavigationDrawer,
  },
};
</script>
