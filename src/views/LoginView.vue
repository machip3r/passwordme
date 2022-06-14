<template>
  <div class="container-all-login-view">
    <div class="container-login" v-if="isLoginView">
      <div class="left-color-login">
        <h1>Mantén tus credenciales seguras</h1>
        <img src="../assets/register-img.png" alt="security" />
      </div>
      <div class="right-color-login">
        <div class="container-form-login">
          <v-icon class="mb-1" size="100" color="primary">fas fa-lock</v-icon>
          <h1 class="mb-3">PasswordMe</h1>
          <v-form ref="form" v-model="loginFormValid" lazy-validation>
            <v-text-field
              v-model="userLogin.username"
              prepend-inner-icon="fas fa-laugh"
              label="Usuario"
              :rules="usernameRules"
              outlined
              clearable
              required
            ></v-text-field>
            <v-text-field
              v-model="userLogin.password"
              prepend-inner-icon="fas fa-lock"
              label="Contraseña"
              :rules="passwordRules"
              type="password"
              outlined
              clearable
              required
            ></v-text-field>
            <v-btn class="button-login" @click="login()"> Entrar </v-btn>
          </v-form>
          <p>¿No tienes cuenta? <a @click="changeView()">Registrate Aquí</a></p>
          <v-snackbar v-model="snackbarErrorLogin" timeout="3000">
            {{ errorLogin }}
            <template v-slot:action="{ attrs }">
              <v-btn
                color="blue"
                text
                v-bind="attrs"
                @click="snackbarErrorLogin = false"
              >
                Cerrar
              </v-btn>
            </template>
          </v-snackbar>
        </div>
      </div>
    </div>
    <div class="container-register" v-else>
      <div class="left-color-register">
        <h1>Mantén tus credenciales seguras</h1>
        <img src="../assets/register-img.png" alt="security" />
      </div>
      <div class="right-color-register">
        <div class="container-form-register">
          <v-icon class="mb-1" size="100" color="background">
            fas fa-lock
          </v-icon>
          <h1 class="mb-3">PasswordMe</h1>
          <v-form ref="form" v-model="registerFormValid" lazy-validation>
            <v-text-field
              v-model="userRegister.username"
              prepend-inner-icon="fas fa-laugh"
              label="Usuario"
              :rules="usernameRules"
              outlined
              clearable
              required
            ></v-text-field>
            <v-text-field
              v-model="userRegister.email"
              prepend-inner-icon="fas fa-at"
              label="Correo electrónico"
              :rules="emailRules"
              outlined
              clearable
              required
            ></v-text-field>
            <v-text-field
              v-model="userRegister.password"
              prepend-inner-icon="fas fa-lock"
              label="Contraseña"
              :rules="passwordRules"
              type="password"
              outlined
              clearable
              required
            ></v-text-field>
            <v-btn class="button-register" @click="register()">
              Registrarse
            </v-btn>
          </v-form>
          <p>¿Tienes cuenta? <a @click="changeView()">Ingresa Aquí</a></p>
          <v-snackbar v-model="snackbarErrorRegister" timeout="3000">
            {{ errorRegister }}
            <template v-slot:action="{ attrs }">
              <v-btn
                color="blue"
                text
                v-bind="attrs"
                @click="snackbarErrorRegister = false"
              >
                Cerrar
              </v-btn>
            </template>
          </v-snackbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",

  data: () => ({
    isLoginView: true,

    snackbarErrorLogin: false,
    snackbarErrorRegister: false,
    errorLogin: "",
    errorRegister: "",

    loginFormValid: true,
    registerFormValid: true,

    usernameRules: [
      (value) => !!value || "Escribe tu usuario",
      (value) =>
        (value && value.length > 7) ||
        "El usuario debe ser de al menos 8 caracteres",
    ],
    emailRules: [
      (value) => !!value || "Escribe tu correo electrónico",
      (value) =>
        (value && value.length > 9) ||
        "El correo electrónico debe ser de al menos 10 caracteres",
      (value) => /.+@.+\..+/.test(value) || "Correo electrónico inválido",
    ],
    passwordRules: [
      (value) => !!value || "Escribe tu contraseña",
      (value) =>
        (value && value.length > 9) ||
        "La contraseña debe ser de al menos 10 caracteres",
    ],

    userLogin: {
      username: "",
      password: "",
    },
    userRegister: {
      username: "",
      email: "",
      password: "",
    },
  }),

  created() {
    this.isLoginView = true;
  },

  methods: {
    async login() {
      if (this.$refs.form.validate() && this.loginFormValid) {
        try {
          const apiData = await this.axios.post("user/login/", this.userLogin);

          await this.$store.commit("setSession", apiData.data.data);

          window.location.reload();
        } catch (error) {
          this.errorLogin = error.response.data.error;
          this.snackbarErrorLogin = true;
          // console.log(error.response.data.error);
        }
      }
    },

    async register() {
      if (this.$refs.form.validate() && this.registerFormValid) {
        try {
          const apiData = await this.axios.post(
            "user/register/",
            this.userRegister
          );

          await this.$store.commit("setSession", apiData.data.data);

          window.location.reload();
        } catch (error) {
          this.errorRegister = error.response.data.error;
          this.snackbarErrorRegister = true;
          // console.log(error.response.data.error);
        }
      }
    },

    changeView() {
      this.$refs.form.reset();
      this.isLoginView = !this.isLoginView;
    },
  },
};
</script>
