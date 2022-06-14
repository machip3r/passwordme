<template>
  <div class="container-mac container-all-passwords">
    <v-btn
      class="mb-10"
      dark
      color="primary"
      fab
      right
      bottom
      absolute
      @click="openAddPassword()"
    >
      <v-icon size="15">fas fa-plus</v-icon>
    </v-btn>
    <h1>Todas las Contraseñas</h1>

    <div class="container-passwords"></div>

    <v-dialog v-model="addPasswordDialog" persistent max-width="700px">
      <v-card>
        <v-card-title>
          <h4>Agregar Contraseña</h4>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="passwordFormValid" lazy-validation>
              <v-row>
                <v-col cols="11">
                  <v-select
                    v-model="passwordsList.passwordArray.id_category"
                    :items="categories"
                    label="Selecciona las etiquetas"
                    filled
                    multiple
                    prepend-inner-icon="fas fa-tag"
                  >
                    <template v-slot:selection="{ item, index }">
                      <v-chip v-if="index === 0">
                        <span>{{ item }}</span>
                      </v-chip>
                      <span v-if="index === 1" class="grey--text text-caption">
                        (+{{ categories.length - 1 }} others)
                      </span>
                    </template>
                  </v-select>
                </v-col>
                <v-col cols="1">
                  <v-btn
                    fab
                    small
                    color="accent"
                    class="mt-3"
                    @click="openAddCategory()"
                  >
                    <v-icon size="15">fas fa-plus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-text-field
                v-model="passwordsList.passwordArray.title"
                prepend-inner-icon="fas fa-bold"
                label="Título"
                :rules="titleRules"
                outlined
                clearable
                required
              ></v-text-field>
              <v-text-field
                v-model="passwordsList.passwordArray.username"
                prepend-inner-icon="fas fa-laugh"
                label="Usuario"
                outlined
                clearable
              ></v-text-field>
              <v-text-field
                v-model="passwordsList.passwordArray.email"
                prepend-inner-icon="fas fa-at"
                label="Correo electrónico"
                :rules="emailRules"
                outlined
                clearable
              ></v-text-field>
              <v-text-field
                v-model="passwordsList.passwordArray.password"
                prepend-inner-icon="fas fa-lock"
                label="Contraseña"
                :rules="passwordRules"
                type="password"
                outlined
                clearable
                required
              ></v-text-field>
              <v-textarea
                v-model="passwordsList.passwordArray.notes"
                prepend-inner-icon="fas fa-sticky-note"
                label="Notas o descripción"
                outlined
                clearable
              ></v-textarea>
              <v-text-field
                v-model="passwordsList.passwordArray.url"
                prepend-inner-icon="fas fa-link"
                label="Sitio web (google.com)"
                :rules="urlRules"
                outlined
                clearable
                required
              ></v-text-field>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="closeAddPassword()">
            Cancelar
          </v-btn>
          <v-btn color="primary" text @click="addPassword()"> Agregar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  </div>
</template>

<script>
export default {
  name: "AllPasswords",

  data: () => ({
    addPasswordDialog: false,
    addCategoryDialog: false,
    passwordFormValid: true,
    categoryFormValid: true,

    category: "",
    categories: [],

    categoryRules: [
      (value) =>
        (value && value.length > 1) ||
        "La categoría debe ser de al menos 1 caracter",
    ],
    titleRules: [(value) => !!value || "Escribe un título para la contraseña"],
    emailRules: [
      (value) => /.+@.+\..+/.test(value) || "Correo electrónico inválido",
    ],
    passwordRules: [(value) => !!value || "Escribe la contraseña"],
    urlRules: [
      (value) => !!value || "Escribe el sitio web donde se puede utilizar",
    ],

    passwordsList: {
      id_user: "",
      passwordArray: {
        id_category: [],
        title: "",
        username: "",
        email: "",
        password: "",
        notes: "",
        visits: 0,
        url: "",
        urlLogo: "",
        date: "",
      },
    },
  }),

  computed: {},

  created() {
    this.getCategories();
  },

  methods: {
    openAddPassword() {
      this.addPasswordDialog = true;
    },

    closeAddPassword() {
      //clean form
      this.addPasswordDialog = false;
    },

    async addPassword() {
      if (this.$refs.form.validate() && this.passwordFormValid) {
        this.passwordsList.id_user = this.$store.getters.getIDUser;
        this.passwordsList.passwordArray.date = Date.now;

        const config = {
          headers: {
            "Content-Type": "application/json",
            AuthToken: this.$store.getters.getAuthToken,
          },
        };

        const apiData = await this.axios.post(
          "passwords/addPassword/",
          this.passwordsList,
          config
        );

        this.addPasswordDialog = false;
      }
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

      this.categories = apiData.data.data.categories.sort();
    },

    async addCategory() {
      if (this.$refs.form.validate() && this.categoryFormValid) {
        let id_user = await this.$store.getters.getIDUser,
          category = this.category;
        const apiData = await this.axios.post("category/addCategory/", {
          id_user,
          category,
        });

        await this.getCategories();

        this.addCategoryDialog = false;
      }
    },
  },
};
</script>
