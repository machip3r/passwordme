<template>
  <v-navigation-drawer
    permanent
    expand-on-hover
    color="accent"
    app
    v-if="this.$route.name != 'Login'"
  >
    <v-list>
      <v-list-item>
        <v-list-item-title>
          <h3 class="drawer-title">PasswordMe</h3>
        </v-list-item-title>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-item-group v-model="selectedItem" color="primary" justify>
        <v-list-item
          link
          class="drawer-selected drawer-first-option"
          active-class="drawer-selected--active"
          :to="{ name: 'Home' }"
        >
          <v-list-item-icon>
            <v-icon size="20">fas fa-fingerprint</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Inicio</v-list-item-title>
        </v-list-item>
        <v-list-item
          link
          class="drawer-selected"
          active-class="drawer-selected--active"
          :to="{ name: 'AllPasswords' }"
        >
          <v-list-item-icon>
            <v-icon size="20">fas fa-lock</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Todas las contraseñas</v-list-item-title>
        </v-list-item>
        <v-list-item class="drawer-subheader" @click="openAddCategory()">
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
          :to="{ name: 'Category' }"
        >
          <v-list-item-icon>
            <v-icon size="18">fas fa-tag</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item justify-end class="drawer-logout" @click="signOut()">
          <v-list-item-icon>
            <v-icon>fas fa-times-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Cerrar sesión</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-dialog v-model="addCategoryDialog" persistent max-width="700px">
      <v-card>
        <v-card-title>
          <h4>Nueva Categoría</h4>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="categoryFormValid" lazy-validation>
              <v-text-field
                v-model="category"
                prepend-inner-icon="fas fa-tag"
                label="Categoría"
                :rules="categoryRules"
                outlined
                clearable
                required
              ></v-text-field>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="closeAddCategory()">
            Cancelar
          </v-btn>
          <v-btn color="primary" text @click="addCategory()"> Agregar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "NavigationDrawer",

  data: () => ({
    addCategoryDialog: false,
    categoryFormValid: true,

    category: "",
    categoryRules: [
      (value) =>
        (value && value.length > 1) ||
        "La categoría debe ser de al menos 1 caracter",
    ],

    selectedItem: 0,
    items: [],
  }),
  created() {
    this.getCategories();
  },
  methods: {
    async signOut() {
      await this.$store.commit("deleteSession");

      window.location.reload();
    },

    openAddCategory() {
      this.addCategoryDialog = true;
    },

    closeAddCategory() {
      //clean form
      this.addCategoryDialog = false;
    },

    async getCategories() {
      let id_user = await this.$store.getters.getIDUser;

      const apiData = await this.axios.get("category/" + id_user);

      let tags = [];

      for (let i = 0; i < apiData.data.data.categories.length; i++) {
        let tag = new Object();

        tag.text = apiData.data.data.categories[i];
        tag.to = apiData.data.data.categories[i].toLowerCase();

        tags.push(tag);
      }

      this.items = tags;
    },
  },
};
</script>
