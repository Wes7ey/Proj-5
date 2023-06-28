<template>
  <div>
    <h1 class="my-5 mx-5">
      Tarefas
      <v-btn icon="mdi-folder-plus" size="small" @click="openModal('list')"></v-btn>
    </h1>
    <Lmodal :open="openModalType == 'list'" title="Criar nova lista" placeholder="Nome da lista"
      @create="createNewList"
      @closeModal="openModalType = ''" />

    <v-card v-for="(list, index) in toDoLists" :key="list.id">
      <v-card-title>
        <div v-if="list.editing">
          <v-text-field v-model="list.title"></v-text-field>
          <v-btn icon="mdi-check" class="ms-5" @click="saveListTitle(list)" ></v-btn>
          <v-btn icon="mdi-close" class="ms-5" @click="!saveListTitle(list)"></v-btn>
        </div>
        <div v-else>
          <span>
            <v-icon @click="toggleItems(index)">mdi-circle-medium</v-icon>
            {{ list.title }}
          </span>

          <v-btn class="ms-5" size="x-small" color="secondary" @click="openModal('item', list.id)">Nova tarefa</v-btn>
          <Lmodal :open="openModalType == 'item'" title="Criar novo item para a lista atual" placeholder="Novo item"
            @create="createNewItem"
            @closeModal="openModalType = ''"/>

          <v-btn icon="mdi-pencil-outline" class="ms-5" size="small" @click="startEditing(list)"></v-btn>

          <v-btn icon="mdi-delete" class="ms-5" size="small" @click="removeList(list.id)"></v-btn>
        </div>
      </v-card-title>

      <v-card-text v-show="showItems === index">
        <v-list>
          <v-list-item v-for="item in getItemsByListId(list.id)" :key="item.id">
            <v-list-item-title>
              <div class="d-flex align-center">
                <span>
                  <v-checkbox color="success" v-model="item.done" @change="changeStatus(item)" hide-details></v-checkbox>
                </span>
                <span v-if="item.editing">
                  <v-text-field v-model="item.title"></v-text-field>
                  <v-btn class="ms-5" size="x-small" color="green" @click="saveItemTitle(item)">Salvar</v-btn>
                  <v-btn class="ms-5" size="x-small" color="pink" @click="!saveItemTitle(item)">Cancelar</v-btn>
                </span>

                <span v-else>{{ item.title }}</span>
                <v-btn class="ms-5" size="x-small" color="purple-darken-1" @click="startEditing(item)" >Editar</v-btn>
                <v-btn class="ms-5" size="x-small" color="red-darken-1" @click="removeItem(item.id)">Deletar</v-btn>
              </div>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { toDoListsApiMixin } from "@/api/toDoLists";
import { toDoItemsApiMixin } from "@/api/toDoItems";
import Lmodal from "@/components/listModal.vue";

export default {
  mixins: [toDoListsApiMixin, toDoItemsApiMixin],

  data() {
    return {
      toDoLists: [],
      listTitle: "",
      toDoItems: {},
      itemTitle: "",
      openModalType: "",
      showItems: false,
      selectedList: null,
      taskStatus: "",
    };
  },

  components: {
    Lmodal,
  },

  methods: {
    openModal(type, listId) {
      this.selectedList = listId;
      this.openModalType = type;
    },
    toggleItems(index) {
      if (this.showItems === index) {
        this.showItems = null;
      } else {
        this.showItems = index;
      }
    },
    async changeStatus(item) {
  try {
    let payload = {
      done: item.done,
    };
    await this.updateItem(item.id, payload);
    this.getTasks();
  } catch (err) {
    alert("Erro ao atualizar o status do item");
  }
},

    async getLists() {
      try {
        const { data } = await this.list();
        this.toDoLists = data.map((list) => ({ ...list, editing: false }));
      } catch (err) {
        alert("Algo deu errado");
      }
    },

    async createNewList(value) {
      console.log(value);
      try {
        const payload = {
          title: value,
        };
        await this.createList(payload);
        this.openModalType = "";
        this.listTitle = "";
        this.getLists();
        this.showItems = true;
      } catch (err) {
        alert("Erro ao criar a lista");
      }
    },

    async startEditing(list) {
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

    async getTasks() {
      try {
        const { data } = await this.item();
        this.toDoItems = data;
      } catch (err) {
        alert("Algo deu errado");
      }
    },

    getItemsByListId(listId) {
      return Object.values(this.toDoItems).filter(
        (item) => item.listId === listId
      );
    },

    async createNewItem(dataValue) {
      try {
        const payload = {
          title: dataValue,
          listId: this.selectedList,
        };
        await this.createItem(payload);
        this.itemTitle = "";
        this.getTasks();
      } catch (err) {
        alert("Erro ao criar o item");
      }
    },
    async saveItemTitle(item){
      try {
        const payload = {
          title: item.title,
        };
        await this.updateItem(item.id, payload);
        item.editing = false;
      } catch (err) {
        alert("Erro ao editar o item");
      }
    },

    async removeItem(id) {
      try {
        await this.deleteItem(id);
        this.getTasks();
      } catch (err) {
        alert("Item não pode ser excluído");
      }
    },
  },
  mounted() {
    this.getLists();
    this.getTasks();
  },
};
</script>
