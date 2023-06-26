<template>
  <div>
    <v-form class="my-5">
      <v-text-field v-model="listTitle" placeholder="Nome da lista"></v-text-field>
      <v-btn @click="createNewList">Criar lista</v-btn>
    </v-form>

    <v-card v-for="list in toDoLists" :key="list.id">
      <v-card-title>
        <div v-if="list.editing">
 <v-text-field v-model="list.title"></v-text-field>
          <v-btn icon="mdi-check" class="ms-5" @click="saveListTitle(list)"></v-btn>
        </div>
        <div v-else>
 <span>{{ list.title }}</span>
          <v-btn icon="mdi-pencil-outline" class="ms-5" @click="startListEditing(list)" ></v-btn>
          <v-btn icon="mdi-close" class="ms-5" @click="removeList(list.id)" ></v-btn>
        </div>
</v-card-title>
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
      id: "",
    };
  },

  methods: {
    async getLists() {
      try {
        const { data } = await this.list();
        this.toDoLists = data.map((list) => ({ ...list, editing: false }));
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
 async startListEditing(list) {
      list.editing = true;
    },

    async saveListTitle(list) {
      try {
        const payload = {
          title: list.title,
        };
        await this.updateList(list.id, payload);
        list.editing = false;
      } catch (err) {
        alert("Erro ao editar a lista");
      }
    },

    async removeList(id) {
      try {
        await this.deleteList(id);
        this.getLists();
      } catch (err) {
        alert("Lista não pode ser excluída");
      }
    },
  },

  mounted() {
    this.getLists();
  },
};
</script>
