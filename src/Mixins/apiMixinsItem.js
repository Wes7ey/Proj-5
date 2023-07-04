export default {
  methods: {
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
    getItemsByListId(listId) {
      return Object.values(this.toDoItems).filter(
        (item) => item.listId === listId
      );
    },
  },
};
