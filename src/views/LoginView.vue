<template>
  <div class="container-all-login-view">
    <div class="container-login" v-if="isLoginView">
      <div class="left-color-login">
        <h1>
          Mantén tus <br />
          credenciales seguras
        </h1>
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
              outlined
              clearable
              required
            ></v-text-field>
            <v-btn
              class="button-login"
              :disabled="!loginFormValid"
              @click="login()"
            >
              Entrar
            </v-btn>
          </v-form>
        </div>
      </div>
    </div>
    <div class="container-register" v-else>
      <div class="left-color-register"></div>
      <div class="right-color-register"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",

  data: () => ({
    isLoginView: true,
    loginFormValid: true,

    usernameRules: [
      (value) => !!value || "Escribe tu usuario",
      (value) =>
        (value && value.length <= 8) ||
        "El usuario debe ser de al menos 8 caracteres",
    ],
    emailRules: [
      (value) => !!value || "Escribe tu correo electrónico",
      (value) =>
        (value && value.length <= 10) ||
        "El correo electrónico debe ser de al menos 10 caracteres",
      (value) => /.+@.+\..+/.test(value) || "Correo electrónico inválido",
    ],
    passwordRules: [
      (value) => !!value || "Escribe tu contraseña",
      (value) =>
        (value && value.length <= 10) ||
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
  methods: {
    async login() {
      if (this.$refs.form.validate() && this.loginFormValid) {
        console.log("entrando");
      } else {
        console.log("nop");
      }
    },
  },
};
</script>
