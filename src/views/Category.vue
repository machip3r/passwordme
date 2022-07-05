<template>
  <div class="container-mac container-category">
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
    <h1>
      Etiqueta:
      {{
        this.$route.params.c.toLowerCase().charAt(0).toUpperCase() +
        this.$route.params.c.slice(1)
      }}
    </h1>
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
                    chips
                    prepend-inner-icon="fas fa-tag"
                  >
                    <!-- <template v-slot:selection="{ item, index }">
                      <v-chip v-if="index === 0">
                        <span>{{ item }}</span>
                      </v-chip>
                      <span v-if="index === 1" class="grey--text text-caption">
                        (+{{ categories.length - 1 }} others)
                      </span>
                    </template> -->
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
                :type="showPassword ? 'text' : 'password'"
                :color="colorSecurity"
                outlined
                clearable
                required
              >
                <template slot="append">
                  <v-icon
                    @click="
                      checkSecurity(passwordsList.passwordArray.password, false)
                    "
                    >fas fa-shield-alt</v-icon
                  >
                  <v-icon
                    @click="showPassword = !showPassword"
                    v-if="showPassword"
                    >fas fa-eye-slash</v-icon
                  >
                  <v-icon @click="showPassword = !showPassword" v-else
                    >fas fa-eye</v-icon
                  >
                </template>
              </v-text-field>
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
    <v-dialog v-model="editPasswordDialog" max-width="700px">
      <v-card>
        <v-card-title>
          <h4>Editar Contraseña</h4>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="passwordEditFormValid" lazy-validation>
              <v-row>
                <v-col cols="11">
                  <v-select
                    v-model="editingPassword.id_category"
                    :items="categories"
                    label="Selecciona las etiquetas"
                    filled
                    multiple
                    chips
                    prepend-inner-icon="fas fa-tag"
                  >
                    <!-- <template v-slot:selection="{ item, index }">
                      <v-chip v-if="index === 0">
                        <span>{{ item }}</span>
                      </v-chip>
                      <span v-if="index === 1" class="grey--text text-caption">
                        (+{{ categories.length - 1 }} others)
                      </span>
                    </template> -->
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
                v-model="editingPassword.username"
                prepend-inner-icon="fas fa-laugh"
                label="Usuario"
                outlined
                clearable
              ></v-text-field>
              <v-text-field
                v-model="editingPassword.email"
                prepend-inner-icon="fas fa-at"
                label="Correo electrónico"
                :rules="emailRules"
                outlined
                clearable
              ></v-text-field>
              <v-text-field
                v-model="editingPassword.password"
                prepend-inner-icon="fas fa-lock"
                label="Contraseña"
                :rules="passwordRules"
                :type="showPassword ? 'text' : 'password'"
                :color="colorSecurity"
                outlined
                clearable
                required
              >
                <template slot="append">
                  <v-icon @click="checkSecurity(editingPassword.password, true)"
                    >fas fa-shield-alt</v-icon
                  >
                  <v-icon
                    @click="showPassword = !showPassword"
                    v-if="showPassword"
                    >fas fa-eye-slash</v-icon
                  >
                  <v-icon @click="showPassword = !showPassword" v-else
                    >fas fa-eye</v-icon
                  >
                </template>
              </v-text-field>
              <v-textarea
                v-model="editingPassword.notes"
                prepend-inner-icon="fas fa-sticky-note"
                label="Notas o descripción"
                outlined
                clearable
              ></v-textarea>
              <v-text-field
                v-model="editingPassword.url"
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
          <v-btn color="error" text @click="closeEditPassword()">
            Cancelar
          </v-btn>
          <v-btn color="primary" text @click="editPassword()"> Editar </v-btn>
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
                @click:append="decryptPassword(actualPassword.password)"
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
          <v-btn color="error" text @click="openDeletePassword()">
            Eliminar
          </v-btn>
          <v-btn color="warning" text @click="openEditPassword()">
            Editar
          </v-btn>
          <v-btn color="primary" text @click="closeSeePassword()"> OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="addCategoryDialog" max-width="700px">
      <v-card>
        <v-card-title>
          <h4>Nueva Etiqueta</h4>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="categoryFormValid" lazy-validation>
              <v-text-field
                v-model="category"
                prepend-inner-icon="fas fa-tag"
                label="Etiqueta"
                :rules="categoryRules"
                outlined
                clearable
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
  name: "Category",

  data: () => ({
    tagUpperCase: "",

    addPasswordDialog: false,
    seePasswordDialog: false,
    editPasswordDialog: false,
    deletePasswordDialog: false,
    addCategoryDialog: false,
    passwordFormValid: true,
    passwordEditFormValid: true,
    categoryFormValid: true,
    snackbarError: false,
    showPassword: false,

    error: "",
    colorSecurity: "",

    category: "",
    categories: [],

    actualPassword: [],
    editingPassword: [],
    passwords: [],

    decryptedPassword: "",
    encryptedPassword: "",

    categoryRules: [
      (value) =>
        (value && value.length > 0) ||
        "La etiqueta debe ser de al menos 1 caracter",
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
        security: 0,
        notes: "",
        visits: 0,
        url: "",
        urlLogo: "",
        date: Date.now(),
      },
    },
  }),

  computed: {},

  watch: {
    $route(to, from) {
      this.getCategories();
      this.getPasswordsByCategory();
    },
    addPasswordDialog(newValue, old) {
      if (!newValue) {
        this.passwordsList.passwordArray.id_category = [];
        this.passwordsList.passwordArray.title = "";
        this.passwordsList.passwordArray.username = "";
        this.passwordsList.passwordArray.email = "";
        this.passwordsList.passwordArray.password = "";
        this.passwordsList.passwordArray.security = 0;
        this.passwordsList.passwordArray.notes = "";
        this.passwordsList.passwordArray.visits = 0;
        this.passwordsList.passwordArray.url = "";
        this.passwordsList.passwordArray.urlLogo = "";

        this.$refs.form.reset();
      }
    },
    editPasswordDialog(newValue, old) {
      if (!newValue) {
        this.editingPassword.id_category = [];
        this.editingPassword.title = "";
        this.editingPassword.username = "";
        this.editingPassword.email = "";
        this.editingPassword.password = "";
        this.editingPassword.security = 0;
        this.editingPassword.notes = "";
        this.editingPassword.visits = 0;
        this.editingPassword.url = "";
        this.editingPassword.urlLogo = "";
      }
    },
  },

  created() {
    this.tagUpperCase =
      this.$route.params.c.toLowerCase().charAt(0).toUpperCase() +
      this.$route.params.c.slice(1);

    this.getCategories();
    this.getPasswordsByCategory();
  },

  methods: {
    openAddPassword() {
      this.passwordsList.passwordArray.id_category.push(this.$route.params.c);
      this.addPasswordDialog = true;
    },

    closeAddPassword() {
      this.passwordsList.passwordArray.id_category = [];
      this.addPasswordDialog = false;
    },

    openSeePassword(password) {
      let aux = JSON.stringify(password);
      this.actualPassword = JSON.parse(aux);

      this.seePasswordDialog = true;
    },

    closeSeePassword() {
      this.actualPassword.id_category = [];
      this.actualPassword.title = "";
      this.actualPassword.username = "";
      this.actualPassword.email = "";
      this.actualPassword.password = "";
      this.actualPassword.security = 0;
      this.actualPassword.notes = "";
      this.actualPassword.visits = 0;
      this.actualPassword.url = "";
      this.actualPassword.urlLogo = "";

      this.showPassword = false;

      this.seePasswordDialog = false;
    },

    openEditPassword() {
      let aux = JSON.stringify(this.actualPassword);
      this.editingPassword = JSON.parse(aux);
      this.editingPassword.password = "";
      this.editPasswordDialog = true;
    },

    closeEditPassword() {
      this.editingPassword.id_category = [];
      this.editingPassword.title = "";
      this.editingPassword.username = "";
      this.editingPassword.email = "";
      this.editingPassword.password = "";
      this.editingPassword.security = 0;
      this.editingPassword.notes = "";
      this.editingPassword.visits = 0;
      this.editingPassword.url = "";
      this.editingPassword.urlLogo = "";

      this.editPasswordDialog = false;
    },

    openDeletePassword() {
      this.deletePasswordDialog = true;
    },

    closeDeletePassword() {
      this.actualPassword.id_category = [];
      this.actualPassword.title = "";
      this.actualPassword.username = "";
      this.actualPassword.email = "";
      this.actualPassword.password = "";
      this.actualPassword.security = 0;
      this.actualPassword.notes = "";
      this.actualPassword.visits = 0;
      this.actualPassword.url = "";
      this.actualPassword.urlLogo = "";

      this.deletePasswordDialog = false;
    },

    async getPasswordsByCategory() {
      try {
        const id_user = await this.$store.getters.getIDUser,
          apiData = await this.axios.get(
            "category/" + id_user + "/" + this.$route.params.c
          );

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
            },
            apiData = await this.axios.post(
              "passwords/addPassword/",
              this.passwordsList,
              config
            );

          this.getPasswordsByCategory();

          this.$refs.form.reset();

          this.addPasswordDialog = false;
        } catch (error) {
          this.error = error.response.data.error;
          this.snackbarError = true;
        }
      }
    },

    async editPassword() {
      if (this.$refs.form.validate() && this.passwordEditFormValid) {
        try {
          let id_user = this.$store.getters.getIDUser,
            newPassword = this.editingPassword;
          const config = {
              headers: {
                "Content-Type": "application/json",
                AuthToken: this.$store.getters.getAuthToken,
              },
            },
            apiData = await this.axios.post(
              "passwords/editPassword/",
              { id_user, newPassword },
              config
            );

          this.getPasswordsByCategory();

          this.editingPassword.id_category = [];
          this.editingPassword.title = "";
          this.editingPassword.username = "";
          this.editingPassword.email = "";
          this.editingPassword.password = "";
          this.editingPassword.security = 0;
          this.editingPassword.notes = "";
          this.editingPassword.visits = 0;
          this.editingPassword.url = "";
          this.editingPassword.urlLogo = "";

          this.actualPassword.id_category = [];
          this.actualPassword.title = "";
          this.actualPassword.username = "";
          this.actualPassword.email = "";
          this.actualPassword.password = "";
          this.actualPassword.security = 0;
          this.actualPassword.notes = "";
          this.actualPassword.visits = 0;
          this.actualPassword.url = "";
          this.actualPassword.urlLogo = "";

          this.showPassword = false;
          this.seePasswordDialog = false;
          this.editPasswordDialog = false;
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
          },
          apiData = await this.axios.post(
            "passwords/deletePassword/",
            {
              id_user,
              id_password,
            },
            config
          );

        this.getPasswordsByCategory();

        this.actualPassword.id_category = [];
        this.actualPassword.title = "";
        this.actualPassword.username = "";
        this.actualPassword.email = "";
        this.actualPassword.password = "";
        this.actualPassword.security = 0;
        this.actualPassword.notes = "";
        this.actualPassword.visits = 0;
        this.actualPassword.url = "";
        this.actualPassword.urlLogo = "";

        this.seePasswordDialog = false;
        this.deletePasswordDialog = false;
      } catch (error) {
        this.error = error.response.data.error;
        this.snackbarError = true;
      }
    },

    async checkSecurity(password, isEdit) {
      try {
        const config = {
            headers: {
              "Content-Type": "application/json",
              AuthToken: this.$store.getters.getAuthToken,
            },
          },
          apiData = await this.axios.post(
            "passwords/checkPasswordSecurity/",
            { password },
            config
          );

        let security = apiData.data.data.security;

        if (security < 25) this.colorSecurity = "error";
        else if (security > 25 && security < 50) this.colorSecurity = "orange";
        else if (security > 50 && security < 75) this.colorSecurity = "accent";
        else if (security > 75) this.colorSecurity = "success";

        isEdit
          ? (this.editingPassword.security = security)
          : (this.passwordsList.passwordArray.security = security);
      } catch (error) {
        this.error = error.response.data.error;
        this.snackbarError = true;
      }
    },

    async encryptPassword(password) {
      try {
        this.decryptedPassword = password;

        const config = {
            headers: {
              "Content-Type": "application/json",
              AuthToken: this.$store.getters.getAuthToken,
            },
          },
          apiData = await this.axios.post(
            "passwords/encryptPassword/",
            { password },
            config
          );

        this.showPassword = false;
        this.actualPassword.password = apiData.data.data.encryptedPassword;
        /* setTimeout(() => {
          this.showPassword = false;
          this.actualPassword.password = password;
          this.decryptedPassword = "";
        }, 3000); */
      } catch (error) {
        this.error = error.response.data.error;
        this.snackbarError = true;
      }
    },

    async decryptPassword(password) {
      try {
        this.encryptedPassword = password;

        const config = {
            headers: {
              "Content-Type": "application/json",
              AuthToken: this.$store.getters.getAuthToken,
            },
          },
          apiData = await this.axios.post(
            "passwords/decryptPassword/",
            { password },
            config
          );

        this.showPassword = true;
        this.actualPassword.password = apiData.data.data.decryptedPassword;
        /* setTimeout(() => {
          this.showPassword = false;
          this.actualPassword.password = password;
          this.encryptedPassword = "";
        }, 3000); */
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
        const id_user = await this.$store.getters.getIDUser,
          apiData = await this.axios.get("category/" + id_user);

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
          const id_user = await this.$store.getters.getIDUser,
            category = this.category,
            apiData = await this.axios.post("category/addCategory/", {
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
