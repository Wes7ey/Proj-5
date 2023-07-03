<template>
  <aside
    class="sidebar bg-black d-flex flex-column justify-center align-center"
  >
    <h2>Crie sua lista aqui =]</h2>
    <v-btn class="rounded-pill mb-3" size="x-large" @click="openModal(`list`)">
      <v-icon
        icon="mdi-folder-arrow-up-outline
"
      ></v-icon>
      <v-tooltip activator="parent" location="top">Criar lista</v-tooltip>
    </v-btn>
  </aside>

  <main class="main align-self-end max-width-400">
    <div class="flex-column justify-center align-center" style="width: 80%">
      <div class="flex-column justify-center align-center">
        <div class="loading-container" v-if="loading">
          <Loader></Loader>
        </div>

        <div>
          <header class="my-5 mx-5 d-flex justify-around align-center">
            <v-img
              :width="120"
              aspect-ratio="16/9"
              cover
              src="https://media3.giphy.com/media/ibolLe3mOqHE3PQTtk/200w.gif?cid=6c09b9523ojtap5u32zy30fxkm6rly5bqrjrztvnjw2ka40j&ep=v1_gifs_search&rid=200w.gif&ct=g"
            ></v-img>
            <h1 class="w-100 mb-7"><TitleHome></TitleHome></h1>
            <v-icon
              icon="mdi-power
"
            ></v-icon>
          </header>

          <Lmodal
            :open="openModalType == 'list'"
            title="Criar nova lista"
            placeholder="Nome da lista"
            @create="createNewList"
            @closeModal="openModalType = ''"
          />
          <div class="custom-scroll">
            <v-card
              v-for="(list, index) in toDoLists"
              :key="list.id"
              class="rounded-lg list-card"
              color="black"
              @click="toggleItems(index)"
            >
              <v-card-title class="cardTitle">
                <div v-if="list.editing">
                  <InputEditing v-model="list.title"></InputEditing>
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
                    @click="cancelEditing(list)"
                  ></v-btn>
                </div>
                <div v-else class="d-flex w-100 justify-space-between">
                  <div>
                    <v-btn
                      class="rounded-pill mr-0"
                      @click="startEditing(list)"
                    >
                      <v-icon icon="mdi-pencil-outline"></v-icon>
                      <v-tooltip activator="parent" location="right"
                        >Editar lista</v-tooltip
                      >
                    </v-btn>

                    {{ list.title }}
                  </div>
                  <div class="">
                    <v-btn
                      class="rounded-pill ms-5"
                      @click="openModal('item', list.id)"
                    >
                      <v-icon icon="mdi-folder-file-outline"></v-icon>
                      <v-tooltip activator="parent" location="right"
                        >Criar nova tarefa</v-tooltip
                      >
                    </v-btn>

                    <Lmodal
                      :open="openModalType == 'item'"
                      title="Criar novo item para a lista atual"
                      placeholder="Novo item"
                      @create="createNewItem"
                      @closeModal="openModalType = ''"
                      @closed="toggleItemsAfterModalClosed"
                    />

                    <v-btn
                      class="rounded-pill ms-5"
                      @click="removeList(list.id)"
                    >
                      <v-icon icon="mdi-delete"></v-icon>
                      <v-tooltip activator="parent" location="right"
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
                    @click.stop
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
                          <InputEditing v-model="item.title"></InputEditing>
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
                            @click="cancelEditing(item)"
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
                          @click="removeItem(item.id), toggleItems(index)"
                          >Deletar</v-btn
                        >
                      </div>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { toDoListsApiMixin } from "@/api/toDoLists";
import { toDoItemsApiMixin } from "@/api/toDoItems";
import Lmodal from "@/components/listModal.vue";
import Loader from "@/components/Loader.vue";
import TitleHome from "@/components/TitleHome.vue";
import apiMixin from "@/Mixins/apiMixins.js";
import InputEditing from "@/components/InputEditing.vue";


export default {
  mixins: [toDoListsApiMixin, toDoItemsApiMixin, apiMixin],

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
      originalTitle: "",
      editing: false,
    };
  },

  components: {
    Lmodal,
    Loader,
    TitleHome,
    InputEditing
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
    toggleItemsAfterModalClosed() {
      if (this.toDoLists.length > 0) {
        const lastIndex = this.toDoLists.length - 1;
        this.toggleItems(lastIndex);
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
.list-card:hover {
  zoom: 110%;
}

.main {
  min-width: 90%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-end;
  padding-right: 100px;
}
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

.card-list {
  padding: 0;
  background-color: rgb(194, 191, 191);
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 15%;
  background-color: lightgray;
  padding: 10px;
  border-right: 3px solid green;
}

.sidebar h2 {
  margin-bottom: 10px;
}

.sidebar input {
  width: 100%;
  height: 40%;
  padding: 5px;
  margin-bottom: 10px;
  border: 1px solid green;
}

.sidebar button {
  width: 100%;
  padding: 5px;
}

.logoutIcon {
  position: fixed;
  display: flex;
}

.custom-scroll {
  height: 700px;
  overflow-y: auto;
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
