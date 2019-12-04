<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-alert v-model="alert.show" :type="alert.type || 'info'">{{ alert.message }}</v-alert>

            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Inicio de sesion</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field label="Email" v-model="email" name="login" type="text"></v-text-field>

                  <v-text-field
                    id="password"
                    label="Clave"
                    v-model="password"
                    name="password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn @click="makeAuth()" color="primary">Entrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    drawer: null,
    email: "",
    password: ""
  }),
  methods: {
    makeAuth() {
      let email = this.email;
      let password = this.password;
      this.$store.dispatch("auth/authentication", {
        email,
        password
      });
    }
  },
  computed: {
    alert() {
      return this.$store.getters["notifications/notification"];
    }
  }
};
</script>