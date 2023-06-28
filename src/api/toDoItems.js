  import { privateApi } from "./index";

  export const toDoItemsApiMixin = {
    methods: {
      async item() {
        return await privateApi.get("/items");
      },
    async createItem(payload) {
      return await privateApi.post("/items/new", payload);
    },

    async updateItem(id, payload) {
      const res = await privateApi.patch(`/items/${id}`, payload);
      return res;
    },

    async deleteItem(id) {
      const res = await privateApi.delete(`/items/${id}`);
      return res;
    },
  },
};