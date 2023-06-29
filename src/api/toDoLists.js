import { privateApi } from "./index";

export const toDoListsApiMixin = {
  methods: {
    async list() {
      return await privateApi.get("/lists");
    },
    async createList(payload) {
      const res = await privateApi.post("/lists/new", payload);
      return res;
    },
    async updateList(id, payload) {
      const res = await privateApi.patch(`/lists/${id}`, payload);
      return res;
    },

    async deleteList(id) {
      const res = await privateApi.delete(`/lists/${id}`);
      return res;
    },
  },
};
