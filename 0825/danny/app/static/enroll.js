const { createApp } = Vue;

const EnrollApp = {
  data() {
    return {
      enroll: {
        name: "",
        email: "",
      },
      errors: {},
    };
  },
  async created() {},
  methods: {
    async createEnroll() {
      const baseUrl = window.location.origin;
      const apiUrl = `${baseUrl}/api/enroll`;
      const csrfToken = document.querySelector(
        'input[name="csrf_token"]'
      ).value;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify(this.enroll),
      });
      if (response.ok) {
        window.location.href = `${baseUrl}/enrolls`;
      } else {
        const data = await response.json();
        this.errors = data.errors || {};
      }
    },
  },
  delimiters: ["{", "}"],
};

createApp(EnrollApp).mount("#app");
