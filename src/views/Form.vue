<script>
export default {
  data: () => ({
    isFormValid: true,
    user: "",
    email: "",
    password: "",
    confirmPassword: "",

    userRules: [
      (value) => !/\s/.test(value) || "O usuário não pode conter espaços",
      (value) =>
        !/[A-Z]/.test(value) || "O usuário não pode conter letras maiúsculas",
    ],

    emailRules: [(v) => /.+@.+\..+/.test(v) || "E-mail inválido"],

    rulesPass: [
      (value) => (value && value.length >= 8) || "Min 8 characters",
      (v) =>
        /^(?=.*\d)(?=.*[! " # $ % & ' ( ) * + , - . / : ; < = > ? @   ^ _` { | } ~ ])/.test(
          v
        ) || "A senha deve conter pelo menos um número e um caractere especial",
    ],
  }),
  methods: {
    isPasswordMatch(value) {
      return value === this.password || "As senhas não coincidem";
    },
  },
};
</script>

<template>
  <main class="d-flex flex-column justify-center align-center h-100">
    <div
      class="d-flex flex-column justify-center align-center pa-8 w-80% rounded-lg bg-white"
    >
      <h1 class="text-black">DADOS PARA CADASTRO</h1>
      <v-form @submit.prevent v-model="isFormValid">
        <v-text-field
          v-model="user"
          label="Nome de Usuário"
          :rules="userRules"
          class="input-field"
          autofocus
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          class="input-field"
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Senha"
          :rules="rulesPass"
          required
          class="input-field"
        ></v-text-field>

        <v-text-field
          v-model="confirmPassword"
          :rules="[isPasswordMatch]"
          label="Confirmar Senha"
          class="input-field"
          required
        ></v-text-field>
      </v-form>

      <v-btn class="me-4" type="submit" :disabled="!isFormValid">
        Cadastrar
      </v-btn>
    </div>
  </main>
</template>

<style scoped>
.input-field {
  background-color: #e7f1d5;
  width: 600px;
  height: 50px;
  margin: 40px;
  color: black;
}
</style>
