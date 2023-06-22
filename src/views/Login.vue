<script>
import inputfield from "@/components/Input.vue";
import { authApiMixin } from "@/api/auth";
import { setupPrivateApi } from "@/api";


export default {
  mixins: [authApiMixin],
  components: {
    inputfield,
  },
  data: () => ({
    snackbar: false,
    show1: true,
    show2: false,
    isFormValid: true,
    email: "",
    password: "",
    user: "",
    emailRules: [(v) => /.+@.+\..+/.test(v) || "E-mail inválido"],
    rulesPass: [(value) => !!value || "Senha inválida"],
  }),

  methods: {
    async handleSubmit() {
      const payload = {
        email: this.email,
        password: this.password,
      };
      try {
        const { data } = await this.login(payload);
        this.snackbar = true;
        const { access_token } = data;
        setupPrivateApi(access_token, access_token);
        localStorage.setItem("access_token", access_token);
        this.$router.push("/home");
      } catch (err) {
        alert("Algo deu errado");
      }
    },
  },
};
</script>

<template>
  <main class="d-flex flex-column justify-center align-center h-100">
    <v-container
      class="display d-flex flex-column justify-center align-center rounded-xl w-auto bg-white"
    >
      <h1>FAÇA SEU LOGIN</h1>
      <v-form @submit.prevent v-model="isFormValid">
        <inputfield
          v-model="email"
          label="E-mail"
          :rules="emailRules"
          autofocus
        >
        </inputfield>

        <inputfield
          v-model="password"
          label="Senha"
          :rules="rulesPass"
          :append-icon="show2 ? 'mdi-eye-off' : 'mdi-eye'"
          :type="show2 ? 'text' : 'password'"
          name="input-10-2"
          @click:append="show2 = !show2"
        >
        </inputfield>
      </v-form>

      <v-btn :disabled="!isFormValid" elevation="8" @click="handleSubmit"
        >Logar</v-btn
      >
    </v-container>

    <v-snackbar
      class="d-flex justify-center"
      top
      color="green"
      v-model="snackbar"
    >
      You have successfully logged in. Welcome back!
    </v-snackbar>
  </main>
</template>
