<template>
  <div class="d-flex flex-column justify-center ">
    <h1 class="my-5 mx-5">
      <div class="loading-container" v-if="loading">
        <Loader></Loader>
      </div>

      <v-btn class="rounded-pill" @click="openModal('list')">
        <v-icon icon="mdi-folder-edit-outline"></v-icon>
        <v-tooltip activator="parent" location="right"
          >Criar nova lista</v-tooltip
        >
      </v-btn>
      <TitleHome></TitleHome>

      
    </h1>
    <Lmodal
      :open="openModalType == 'list'"
      title="Criar nova lista"
      placeholder="Nome da lista"
      @create="createNewList"
      @closeModal="openModalType = ''"
    />

    <v-card
      v-for="(list, index) in toDoLists"
      :key="list.id"
      class="rounded-lg"
      color="black"
    >
      <v-card-title class="cardTitle">
        <div v-if="list.editing">
          <v-text-field v-model="list.title"></v-text-field>
          <v-btn
            icon="mdi-check"
            size="x-small"
            class="ms-5"
            color="green"
            @click="saveListTitle(list)"
          ></v-btn>
          <v-btn
            icon="mdi-close"
            size="x-small"
            class="ms-5"
            color="red"
            @click="!saveListTitle(list)"
          ></v-btn>
        </div>
        <div v-else class="d-flex w-100 justify-space-between">
      <div>
          <v-btn class="rounded-pill mr-0" @click="startEditing(list)">
            <v-icon icon="mdi-pencil-outline"></v-icon>
            <v-tooltip activator="parent" location="top"
              >Editar lista</v-tooltip
            >
          </v-btn>

          {{ list.title }}
        </div>
          <div class="">
          <v-btn class="rounded-pill ms-5" @click="toggleItems(index)">
            <v-icon icon="mdi-list-status"></v-icon>
            <v-tooltip activator="parent" location="top"
              >Abrir lista de tarefas</v-tooltip
            >
          </v-btn>

          <v-btn class="rounded-pill ms-5" @click="openModal('item', list.id)">
            <v-icon icon="mdi-folder-file-outline"></v-icon>
            <v-tooltip activator="parent" location="top"
              >Criar nova tarefa</v-tooltip
            >
          </v-btn>

          <Lmodal
            :open="openModalType == 'item'"
            title="Criar novo item para a lista atual"
            placeholder="Novo item"
            @create="createNewItem"
            @closeModal="openModalType = ''"
          />

          <v-btn class="rounded-pill ms-5" @click="removeList(list.id)">
            <v-icon icon="mdi-delete"></v-icon>
            <v-tooltip activator="parent" location="top"
              >Deletar lista</v-tooltip
            >
          </v-btn>
        </div>
        </div>
      </v-card-title>

      <v-card-text v-show="showItems === index" class="card-text">
        <v-list class="card-list">
          <v-list-item
            v-for="item in getItemsByListId(list.id)"
            :key="item.id"
            class="slide-item list-item"
          >
            <v-list-item-title>
              <div class="d-flex align-center">
                <span>
                  <v-checkbox
                    color="green"
                    v-model="item.done"
                    @change="changeStatus(item)"
                    hide-details
                  ></v-checkbox>
                </span>
                <span v-if="item.editing">
                  <v-text-field v-model="item.title"></v-text-field>
                  <v-btn
                    icon="mdi-check"
                    size="x-small"
                    class="ms-5"
                    color="green"
                    @click="saveItemTitle(item)"
                  ></v-btn>
                  <v-btn
                    icon="mdi-close"
                    size="x-small"
                    class="ms-5"
                    color="red"
                    @click="!saveItemTitle(item)"
                  ></v-btn>
                </span>

                <span v-else>{{ item.title }}</span>
                <v-btn
                  class="ms-5"
                  size="x-small"
                  color="blue darken-1"
                  @click="startEditing(item)"
                  >Editar</v-btn
                >
                <v-btn
                  class="ms-5"
                  size="x-small"
                  color="red darken-1"
                  @click="removeItem(item.id)"
                  >Deletar</v-btn
                >
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
import Loader from "@/components/Loader.vue";
import TitleHome from "@/components/TitleHome.vue";



export default {
  mixins: [toDoListsApiMixin, toDoItemsApiMixin],

  data() {
    return {
      toDoLists: [],
      listTitle: "",
      toDoItems: {},
      itemTitle: "",
      openModalType: "",
      showItems: null,
      selectedList: null,
      taskStatus: "",
      loading: false,
    };
  },

  components: {
    Lmodal,
    Loader,
    TitleHome,
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
        this.loading = true;
        const payload = {
          done: item.done,
        };
        await this.updateItem(item.id, payload);
        this.getTasks();
      } catch (err) {
        alert("Erro ao atualizar o status do item");
      } finally {
        this.loading = false;
      }
    },

    async getLists() {
      this.loading = true;
      try {
        const { data } = await this.list();
        this.toDoLists = data.map((list) => ({ ...list, editing: false }));
      } catch (err) {
        alert("Algo deu errado");
      } finally {
        this.loading = false;
      }
    },

    async createNewList(value) {
      this.loading = true;
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
      } finally {
        this.loading = false;
      }
    },

    async startEditing(list) {
      list.editing = true;
    },

    async saveListTitle(list) {
      this.loading = true;
      try {
        const payload = {
          title: list.title,
        };
        await this.updateList(list.id, payload);
        list.editing = false;
      } catch (err) {
        alert("Erro ao editar a lista");
      } finally {
        this.loading = false;
      }
    },

    cancelListEditing(list) {
      list.editing = false;
    },

    async removeList(id) {
      this.loading = true;
      try {
        await this.deleteList(id);
        this.getLists();
      } catch (err) {
        alert("Lista não pode ser excluída");
      } finally {
        this.loading = false;
      }
    },

    async getTasks() {
      this.loading = true;
      try {
        const { data } = await this.item();
        this.toDoItems = data;
      } catch (err) {
        alert("Algo deu errado");
      } finally {
        this.loading = false;
      }
    },

    getItemsByListId(listId) {
      return Object.values(this.toDoItems).filter(
        (item) => item.listId === listId
      );
    },

    async createNewItem(dataValue) {
      this.loading = true;
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
      } finally {
        this.loading = false;
      }
    },

    async saveItemTitle(item) {
      this.loading = true;
      try {
        const payload = {
          title: item.title,
        };
        await this.updateItem(item.id, payload);
        item.editing = false;
      } catch (err) {
        alert("Erro ao editar o item");
      } finally {
        this.loading = false;
      }
    },

    async removeItem(id) {
      this.loading = true;
      try {
        await this.deleteItem(id);
        this.getTasks();
      } catch (err) {
        alert("Item não pode ser excluído");
      } finally {
        this.loading = false;
      }
    },
  },

  mounted() {
    this.getLists();
    this.getTasks();
  },
};
</script>

<style scoped>
.slide-item {
  animation: slideIn 0.7s;
}

.cardTitle {
  border: 2px solid green;
  display: flex;
}

.list-item {
  background-color: rgb(31, 30, 30);
  margin: 0;
  padding: 0;
}

.card-text {
  padding: 0;
}

.content {
  position: relative;
  z-index: 1;
}

.loader {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
}

.card-list {
  padding: 0;
  background-color: rgb(194, 191, 191);
}

.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
