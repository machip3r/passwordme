import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import es from "vuetify/lib/locale/es";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#031B62",
        secondary: "#D1D1D1",
        accent: "#0050BC",
        error: "#FF5252",
        info: "#2196F3",
        success: "#50BC00",
        warning: "#FFAF43",
        background: "#F5F1E8",
      },
    },
  },
  lang: {
    locales: { es },
    current: "es",
  },
  icons: {
    iconfont: "fa",
  },
});
