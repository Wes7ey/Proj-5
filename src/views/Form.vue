<script>
import inputfield from "@/components/Input.vue";
import { authApiMixin } from "@/api/auth";

export default {
  mixins: [authApiMixin],
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
      (value) => !/[A-Z]/.test(value) || "Usuário inválido",
      (value) => /[a-z]/.test(value) || "Usuário inválido",
    ],

    emailRules: [(v) => /.+@.+\..+/.test(v) || "E-mail inválido"],

    rulesPass: [
      (value) => (value && value.length >= 8) || "Senha inválida",
      (v) =>
        /^(?=.*\d)(?=.*[! " # $ % & ' ( ) * + , - . / : ; < = > ? @   ^ _` { | } ~ ])/.test(
          v
        ) || "Senha inválida",
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
  methods: {
    async handleSubmit() {
      const payload = {
        username: this.user,
        email: this.email,
        password: this.password,
      };
      try {
        await this.register(payload);
        alert("Usuário criado com sucesso");
        this.$router.push("/");
      } catch (err) {
        const status = err.response.status;
        if (status >= 500 && status < 600) {
          alert("Ocorreu um erro no servidor");
        } else {
          alert("Algo deu errado");
        }
      }
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

      <v-btn
        class="me-4"
        type="submit"
        :disabled="!isFormValid"
        @Click="handleSubmit"
      >
        Cadastrar
      </v-btn>
    </div>
  </main>
</template>
