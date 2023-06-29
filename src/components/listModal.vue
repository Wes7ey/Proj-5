<template>
  <v-dialog :model-value="open" @click:outside="closeModal">
    <v-card>
      <v-card-title>
        <span>{{ title }}</span>
      </v-card-title>

      <v-card-text>
        <v-form>
          <v-text-field
            v-model="info"
            :placeholder="placeholder"
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="create">Criar</v-btn>
        <v-btn @click="closeModal">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    open: Boolean,
    title: String,
    placeholder: String,
  },

  data() {
    return {
      info: "",
    };
  },

  methods: {
    closeModal() {
      this.$emit("close-modal");
    },

    create() {
      this.$emit("create", this.info);
      this.info = "";
      this.closeModal();
    },
  },
};
</script>
