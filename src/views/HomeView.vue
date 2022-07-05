<template>
  <div class="container-mac container-home">
    <div class="top-bar-home">
      <h1>Bienvenido, B</h1>
      <div class="search-bar-home">
        <v-text-field
          label="Buscar"
          prepend-inner-icon="fas fa-search"
          class="input-search"
          background-color="secondary"
          filled
          rounded
          dense
        ></v-text-field>
      </div>
    </div>
    <div class="container-status-home">
      <v-progress-circular
        class="progress-bar-home"
        value="85"
        color="primary"
        size="300"
        width="30"
      >
        <h1>85%</h1>
      </v-progress-circular>
      <div class="container-securities">
        <div class="security very-weak">
          <h4>10</h4>
          <p>Muy débil</p>
        </div>
        <div class="security weak">
          <h4>10</h4>
          <p>Muy débil</p>
        </div>
        <div class="security normal">
          <h4>10</h4>
          <p>Muy débil</p>
        </div>
        <div class="security secure">
          <h4>10</h4>
          <p>Muy débil</p>
        </div>
      </div>
    </div>
    <div class="container-most-forget-home">
      <h4>Más olvidadas</h4>
      <v-slide-group class="pa-4" show-arrows>
        <v-slide-item v-for="n in 5" :key="n">
          <v-card class="mx-3" max-width="200" color="info">
            <v-img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Grey_close_x.svg/1024px-Grey_close_x.svg.png"
              height="100px"
            ></v-img>
            <v-card-title class="background--text">Cuenta Google</v-card-title>
            <v-card-subtitle class="background--text"
              >Buscado 7 veces</v-card-subtitle
            >
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </div>
    <div class="container-categories-home">
      <h4>Etiquetas</h4>
      <v-slide-group class="pa-4" show-arrows>
        <v-slide-item v-for="n in 5" :key="n">
          <v-card class="mx-3" max-width="200" color="info">
            <v-icon color="background" class="mt-1 ml-1">fas fa-tag</v-icon>
            <v-card-title class="background--text">Categoria 1</v-card-title>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",

  data: () => ({}),
  methods: {},
};
</script>
