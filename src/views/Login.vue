<script>
  export default {
    data: () => ({
      rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
      ],
    }),
  }
</script>

<template>


  <div>
    <v-text-field
      label="Insira aqui seu e-mail@exemple.com"
      :rules="rules"
      hide-details="auto"
    ></v-text-field>
    <v-text-field label="Senha"></v-text-field>
  </div>

  <v-btn>
  Logar
</v-btn>

</template>