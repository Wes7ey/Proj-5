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
  <v-form @submit.prevent v-model="isFormValid">
    <v-text-field
      v-model="user"
      label="Nome de Usuário"
      :rules="userRules"
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
    ></v-text-field>

    <v-text-field
      v-model="password"
      label="Senha"
      :rules="rulesPass"
      required
    ></v-text-field>

    <v-text-field
      v-model="confirmPassword"
      :rules=[isPasswordMatch]
      label= "Confirmar Senha"
      required
    ></v-text-field>

    <v-btn class="me-4" type="submit" :disabled="!isFormValid">
      Cadastrar
    </v-btn>
    
  </v-form>
</template>
