<template>
  <div class="home">
    <Todos msg="Welcome to Your Vue.js App" />
    <AddTodo />
  </div>
</template>

<script>
// @ is an alias to /src
import Todos from "@/components/Todos.vue";
import AddTodo from "../components/AddTodo";

export default {
  name: "Home",
  components: {
    Todos,
    AddTodo,
  },
  data: () => ({}),
  created: function() {
    // make async fetch todo from server
    this.$store.dispatch("todos/retreiveTodos");
  },
};
</script>
