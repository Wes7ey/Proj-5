export default {
  methods: {
    async startEditing(list) {
      list.originaTitle = list.title;
      list.editing = true;
    },

    cancelEditing(list) {
      list.title = list.originaTitle;
      list.editing = false;
    },
  },
};
