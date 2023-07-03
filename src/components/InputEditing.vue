<script>
export default {
  data() {
    return {
      type: String,
      placeholder: String,
    };
  },
};
</script>

<template>
  <v-text-field
    v-model="type"
    class="input-field"
  ></v-text-field>
</template>

<style scoped>

.input-field {
    background-color: white;
  width: 400px;
  height: 50px;
  margin: 30px;
  color: black;
}

.input-field :deep(.v-input__append) {
  margin: 0;
  background-color: rgb(233, 233, 233);
  padding-inline: 12px;
  border: solid 1px rgb(139, 139, 139);
}
</style>