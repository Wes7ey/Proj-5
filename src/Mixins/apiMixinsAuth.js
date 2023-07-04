import { setupPrivateApi } from "@/api";

export default {
  methods: {
    handleLogout() {
      setupPrivateApi(null);
      localStorage.removeItem("access_token");
      this.$router.push("/");
    },
  },
};
