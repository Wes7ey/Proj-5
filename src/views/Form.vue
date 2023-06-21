<script>
import inputfield from "@/components/Input.vue";

export default {
  components: {
    inputfield,
  },
  data: () => ({
    isFormValid: true,
    user: "",
    email: "",
    password: "",
    confirmPassword: "",

    userRules: [
      (value) => !/\s/.test(value) || "Usuário inválido",
      (value) =>
        !/[A-Z]/.test(value) || "Usuário inválidos",
    ],

    emailRules: [(v) => /.+@.+\..+/.test(v) || "E-mail inválido"],

    rulesPass: [
      (value) => (value && value.length >= 8) || "E-mail inválido",
      (v) =>
        /^(?=.*\d)(?=.*[! " # $ % & ' ( ) * + , - . / : ; < = > ? @   ^ _` { | } ~ ])/.test(
          v
        ) || "E-mail inválido",
    ],
  }),
  computed: {
    isFormValid() {
      return (
        this.user !== "" &&
        this.email !== "" &&
        this.password !== "" &&
        this.confirmPassword !== "" &&
        this.isPasswordMatch(this.confirmPassword) === true
      );
    },
    isPasswordMatch() {
      return (value) => value === this.password || "As senhas não coincidem.";
    },
  },
};
</script>

<template>
  <main class="d-flex flex-column justify-center align-center h-100">
    <div
      class="d-flex flex-column justify-center align-center pa-8 rounded-lg bg-white"
    >
      <h1 class="text-black">DADOS PARA CADASTRO</h1>
      <v-form
        @submit.prevent
        v-model="isFormValid"
        class="d-flex flex-column align-center"
      >
        <inputfield
          v-model="user"
          label="Nome de Usuário (Apenas letras minúsculas e sem espaços)"
          :rules="userRules"
          autofocus
        >
        </inputfield>

        <inputfield
          v-model="email"
          label="E-mail (exemplo@123.com)"
          :rules="emailRules"
        >
        </inputfield>

        <inputfield
          v-model="password"
          label="Senha (No mínimo 8 dígitos e 1 caractere especial)"
          :rules="rulesPass"
        >
        </inputfield>

        <inputfield
          v-model="confirmPassword"
          label="Confirmar Senha"
          :rules="[isPasswordMatch]"
        >
        </inputfield>
      </v-form>

      <v-btn class="me-4" type="submit" :disabled="!isFormValid">
        Cadastrar
      </v-btn>
    </div>
  </main>
</template>
