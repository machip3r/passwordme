<template>
  <v-navigation-drawer permanent expand-on-hover color="accent" app>
    <v-list>
      <v-list-item>
        <v-list-item-title>
          <h3 class="drawer-title">PasswordMe</h3>
        </v-list-item-title>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item
          link
          class="drawer-selected drawer-first-option"
          active-class="drawer-selected--active"
        >
          <v-list-item-icon>
            <v-icon size="20">fas fa-fingerprint</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Inicio</v-list-item-title>
        </v-list-item>
        <v-list-item class="drawer-subheader" @click="selectedItem = 0">
          <v-list-item-title>Etiquetas</v-list-item-title>
          <v-list-item-icon>
            <v-icon>fas fa-plus</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          active-class="drawer-selected--active"
          class="drawer-selected"
        >
          <v-list-item-icon>
            <v-icon size="18">fas fa-tag</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "NavigationDrawer",

  data: () => ({
    selectedItem: 0,
    /* items: [
      { text: "Real-Time" },
      { text: "Audience" },
      { text: "Conversions" },
    ], */
    items: [],
  }),
  created() {
    this.items = getTags();
  },
  methods: {
    async getTags() {},
  },
};
</script>
