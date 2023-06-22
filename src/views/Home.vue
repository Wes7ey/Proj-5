<template>
  <p>Welcome asd</p>
</template>

<script>
import { toDoListsApiMixin } from "@/api/toDoLists";
export default {
  mixins: [toDoListsApiMixin],
  methods: {
    async getLists() {
      try {
        const { data } = await this.list();
        console.log( data);
      } catch (err) {
        alert("Algo deu errado");
      }
    },
  },
  mounted() {
    this.getLists();
  },
};
</script>
