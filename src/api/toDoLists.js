import { privateApi } from "./index";

export const toDoListsApiMixin ={
    methods: {
        async list () {
            return await privateApi.get("/lists")
        },
        async createList(payload) {
            const res = await privateApi.post("/lists/new", payload);
            return res;
          },
    }
}