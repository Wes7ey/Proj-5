<template>
  <div>
    <v-form class="my-5">
      <v-text-field v-model="listTitle" placeholder="Nome da lista"></v-text-field>
      <v-btn @click="createNewList">Criar lista</v-btn>
    </v-form>

    <v-card v-for="list in toDoLists" :key="list.id">
      <v-card-title>{{ list.title }}</v-card-title>
    </v-card>

  </div>
</template>

<script>
import { toDoListsApiMixin } from "@/api/toDoLists";

export default {
  mixins: [toDoListsApiMixin],

  data() {
    return {
      toDoLists: [],
      listTitle: "",
    };
  },

  methods: {
    async getLists() {
      try {
        const { data } = await this.list();
        this.toDoLists = data;
      } catch (err) {
        alert("Algo deu errado");
      }
    },

    async createNewList() {
      try {
      const payload = {
        title: this.listTitle,
      };
        await this.createList(payload);
        this.listTitle = "";
        this.getLists();
      } catch (err) {
        alert("Erro ao criar a lista");
      }
    },
  },

  mounted() {
    this.getLists();
  },
};
</script>
