const { createApp } = Vue;

const EnrollApp = {
  data() {
    return {
      message: "Hello Vue 3!",
    };
  },
  delimiters: ["{", "}"],
};

createApp(EnrollApp).mount("#app");
