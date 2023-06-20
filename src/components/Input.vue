<script>
export default {
  data() {
    return {
      type: String,
      placeholder: String,
      rule: [],
    };
  },
};
</script>

<template>
  <v-text-field
    v-model="type"
    label="placeholder"
    :rules="rule"
    required
    class="input-field"
  ></v-text-field>
</template>

<style scoped>
.input-field {
  background-color: #e7f1d5;
  width: 475px;
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
