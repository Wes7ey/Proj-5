export default {
  methods: {
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
  },
};
