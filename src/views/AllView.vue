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

    <div class="container-passwords">
      <div
        class="message-no-passwords"
        v-if="passwords == null || passwords.length == 0"
      >
        <v-icon size="100">fas fa-frown</v-icon>
        <h4>Aún no tienes contraseñas</h4>
        <p>Puedes intentarlo con el botón de abajo a la derecha</p>
      </div>
      <div class="group-passwords" v-else>
        <v-card
          class="mx-2 my-2"
          width="350"
          v-for="password in passwords"
          :key="password.title"
          @click="seePassword(password)"
        >
          <v-img height="100" :src="password.urlLogo"></v-img>
          <v-card-title>
            <h5>{{ password.title }}</h5>
          </v-card-title>
          <v-card-text>
            <div>
              <a :href="password.url">{{ password.url }}</a>
            </div>
            <v-chip-group column show-arrows>
              <v-chip
                v-for="category in password.id_category"
                :key="category"
                color="accent"
              >
                {{ category }}
              </v-chip>
            </v-chip-group>
          </v-card-text>
        </v-card>
      </div>
    </div>

    <v-dialog v-model="addPasswordDialog" max-width="700px">
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
    <v-dialog v-model="seePasswordDialog" max-width="700px">
      <v-card>
        <v-card-title>
          <h4>{{ actualPassword.title }}</h4>
        </v-card-title>
        <v-card-text class="mt-1">
          <div class="container-info-password">
            <div class="container-info-password-inside">
              <v-chip-group column show-arrows>
                <v-chip
                  v-for="category in actualPassword.id_category"
                  :key="category"
                  color="accent"
                >
                  {{ category }}
                </v-chip>
              </v-chip-group>
              <v-text-field
                class="mt-3"
                prepend-inner-icon="fas fa-laugh"
                label="Usuario"
                outlined
                readonly
                :value="actualPassword.username"
              ></v-text-field>
              <v-text-field
                prepend-inner-icon="fas fa-at"
                label="Correo electrónico"
                outlined
                readonly
                :value="actualPassword.email"
              ></v-text-field>
              <v-text-field
                prepend-inner-icon="fas fa-lock"
                label="Contraseña"
                outlined
                readonly
                :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="decryptPassword()"
                :value="actualPassword.password"
              ></v-text-field>
              <v-textarea
                prepend-inner-icon="fas fa-sticky-note"
                label="Notas o descripción"
                outlined
                readonly
                :value="actualPassword.notes"
              ></v-textarea>
              <v-text-field
                prepend-inner-icon="fas fa-link"
                label="Sitio web"
                outlined
                readonly
                append-icon="fas fa-external-link-alt"
                @click:append="goTo(actualPassword.url)"
                :value="actualPassword.url"
              ></v-text-field>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="openDeletePassword(actualPassword)">
            Eliminar
          </v-btn>
          <v-btn color="warning" text @click="openEditPassword(actualPassword)">
            Editar
          </v-btn>
          <v-btn color="primary" text @click="closeSeePassword()"> OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="addCategoryDialog" max-width="700px">
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
    <v-dialog v-model="deletePasswordDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <h4>Eliminar contraseña</h4>
        </v-card-title>
        <v-card-text>
          <v-container>
            ¿Estás seguro de eliminar esta contraseña?
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeDeletePassword()">
            Cancelar
          </v-btn>
          <v-btn color="error" text @click="deletePassword(actualPassword._id)">
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbarError" timeout="3000">
      {{ error }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbarError = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "AllPasswords",

  data: () => ({
    addPasswordDialog: false,
    seePasswordDialog: false,
    editPasswordDialog: false,
    deletePasswordDialog: false,
    addCategoryDialog: false,
    passwordFormValid: true,
    categoryFormValid: true,
    snackbarError: false,
    showPassword: false,

    error: "",

    category: "",
    categories: [],

    actualPassword: [],
    passwords: [],

    categoryRules: [
      (value) =>
        (value && value.length > 0) ||
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
        date: Date.now(),
      },
    },
  }),

  computed: {},

  created() {
    this.getCategories();
    this.getPasswords();
  },

  methods: {
    openAddPassword() {
      this.addPasswordDialog = true;
    },

    closeAddPassword() {
      this.addPasswordDialog = false;
    },

    openSeePassword(password) {
      this.actualPassword = password;
      this.seePasswordDialog = true;
    },

    closeSeePassword() {
      this.actualPassword = [];
      this.showPassword = false;

      this.seePasswordDialog = false;
    },

    openEditPassword(password) {
      this.editPasswordDialog = true;
    },

    closeEditPassword() {
      this.editPasswordDialog = false;
    },

    openDeletePassword(password) {
      this.deletePasswordDialog = true;
    },

    closeDeletePassword() {
      this.actualPassword = [];

      this.deletePasswordDialog = false;
    },

    async getPasswords() {
      try {
        let id_user = await this.$store.getters.getIDUser;
        const config = {
          headers: {
            "Content-Type": "application/json",
            AuthToken: this.$store.getters.getAuthToken,
          },
        };
        const apiData = await this.axios.get("passwords/" + id_user, config);

        this.passwords = apiData.data.data.passwords;
      } catch (error) {
        this.error = error.response.data.error;
        this.snackbarError = true;
      }
    },

    async seePassword(password) {
      // add visits
      this.openSeePassword(password);
    },

    async addPassword() {
      if (this.$refs.form.validate() && this.passwordFormValid) {
        try {
          this.passwordsList.id_user = this.$store.getters.getIDUser;

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

          this.getPasswords();

          this.$refs.form.reset();

          this.addPasswordDialog = false;
        } catch (error) {
          this.error = error.response.data.error;
          this.snackbarError = true;
        }
      }
    },

    async deletePassword(id_password) {
      try {
        let id_user = await this.$store.getters.getIDUser;
        const config = {
          headers: {
            "Content-Type": "application/json",
            AuthToken: this.$store.getters.getAuthToken,
          },
        };
        const apiData = await this.axios.post(
          "passwords/deletePassword/",
          {
            id_user,
            id_password,
          },
          config
        );

        this.getPasswords();
        this.actualPassword = [];
        this.seePasswordDialog = false;
        this.deletePasswordDialog = false;
      } catch (error) {
        this.error = error.response.data.error;
        this.snackbarError = true;
      }
    },

    openAddCategory() {
      this.addCategoryDialog = true;
    },

    closeAddCategory() {
      this.category = "";
      this.addCategoryDialog = false;
    },

    async getCategories() {
      try {
        let id_user = await this.$store.getters.getIDUser;
        const apiData = await this.axios.get("category/" + id_user);

        apiData.data.data.categoriesObject.forEach((element) =>
          this.categories.push(element.category)
        );

        this.categories = this.categories.sort();
      } catch (error) {
        this.error = error.response.data.error;
        this.snackbarError = true;
      }
    },

    async addCategory() {
      if (this.$refs.form.validate() && this.categoryFormValid) {
        try {
          let id_user = await this.$store.getters.getIDUser,
            category = this.category;
          const apiData = await this.axios.post("category/addCategory/", {
            id_user,
            category,
          });

          await this.getCategories();

          this.category = "";
          this.addCategoryDialog = false;
        } catch (error) {
          this.error = error.response.data.error;
          this.snackbarError = true;
        }
      }
    },
    async goTo(url) {
      window.open("https://" + url, "_blank");
    },
  },
};
</script>
