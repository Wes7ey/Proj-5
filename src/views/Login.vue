<script>
import inputfield from "@/components/Input.vue";

export default {
  components: {
    inputfield,
  },
  data: () => ({
    show1: true,
    show2: false,
    isFormValid: true,
    email: "",
    password: "",
    emailRules: [(v) => /.+@.+\..+/.test(v) || "E-mail inválido"],
    rulesPass: [(value) => !!value || "Senha inválida"],
  }),
  mounted() {
    this.isFirstFieldFocused = true;
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
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show2 ? 'text' : 'password'"
          name="input-10-2"
          @click:append="show2 = !show2"
        >
        </inputfield>
      </v-form>

      <v-btn :disabled="!isFormValid" elevation="8">Logar</v-btn>
    </v-container>
  </main>
</template>
