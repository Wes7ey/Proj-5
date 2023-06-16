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
        /^(?=.*\d)(?=.*[! " # $ % & ' ( ) * + , - . / : ; < = > ? @   ^ _` { | } ~ ])/.test(v) ||
        "A senha deve conter pelo menos um número e um caractere especial",
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
  <div class="container">
    <h1>Dados para cadastro</h1>
  <v-form @submit.prevent v-model="isFormValid">
    <v-text-field
      v-model="user"
      label="Nome de Usuário"
      :rules="userRules"
      class="input-field "
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      class="input-field "
    ></v-text-field>

    <v-text-field
      v-model="password"
      label="Senha"
      :rules="rulesPass"
      class="input-field "
      required
    ></v-text-field>

    <v-text-field
      v-model="confirmPassword"
      :rules=[isPasswordMatch]
      label= "Confirmar Senha"
      class="input-field"
      required
    ></v-text-field>
  </v-form>

  <v-btn class="me-4" type="submit" :disabled="!isFormValid">
      Cadastrar
    </v-btn>

</div>

</template>

<style scoped>

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-inline: 400px;
    margin-top: 100px;
    background-color: white;
    padding: 20px;
  }
.input-field
{
  background-color: #E7F1D5;
  width: 600px;
  height: 50px;
  margin: 40px;
  color: black;
}

</style>