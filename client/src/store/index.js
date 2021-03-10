import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: []
  },

  mutations: {
    FETCH_TODOS: function(state, payload){
      state.todos = payload;
    },

    ADD_TODO: function(state, payload){
      state.todos = [
        ...state.todos,
        payload
      ]
    },

    MARK_AS_DONE: function(state, payload){
      state.todos.map(k => k.id === payload.id ? k.isDone = !k.isDone: k)
    },

    DELETE_TODO: function(state, payload){
      state.todos = state.todos.filter(k => k.id !== payload.id)
    }
  },

  actions: {
    fetchTodos: function(context){  //auto triggering when app component is mounted. 
      axios.get('http://localhost:5000/')
      .then(data => {
        console.log(data.data)
        context.commit("FETCH_TODOS", data.data);
      })
      .catch(err => console.error(err));
    },

    addTodo: function(context, payload){
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/add', {credential: payload}, { withCredentials: true })
          .then(res => {
            const newTodo = Object.assign({}, res.data, payload); // create new object contain an id reponse back from server
            context.commit("ADD_TODO", newTodo) // add todo in local Vuex.
            resolve(res)
          })
          .catch(err => reject(err));
      })
    },

    markAsDone: function(context, payload){
      context.commit("MARK_AS_DONE", payload)
    },

    deleteTodo: function(context, payload){
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios.delete('http://localhost:5000/delete', { params: {credential: payload.id}, headers: { "Authorization": "authorizationToken" }})
          .then(res => {
            context.commit("DELETE_TODO", payload);
            resolve(res);
          })
          .catch(err => reject(err));
      })
    }
  },
})
