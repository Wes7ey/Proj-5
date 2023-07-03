export default {
  methods: {
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
      list.originaTitle = list.title;
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
    cancelEditing(list){
      list.title=list.originaTitle
      list.editing=false;
    }
  },
};
