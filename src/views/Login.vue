<script>
export default {
  data: () => ({
    isFormValid: true,
    email: "",
    password: "",
    emailRules: [(v) => /.+@.+\..+/.test(v) || "E-mail inválido"],
    rulesPass: [
      (value) => (value && value.length >= 8) || "Min 8 characters",
      (v) =>
        /^(?=.*\d)(?=.*[!@#$%^&*])/.test(v) ||
        "A senha deve conter pelo menos um número e um caractere especial",
    ],
  }),
  }
</script>

<template>
  <v-form @submit.prevent v-model="isFormValid">
    <div>
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
    </div>
  </v-form>

  <v-btn :disabled="!isFormValid"> Logar </v-btn>
</template>
