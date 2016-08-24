(function() {
  'use strict';

  angular
    .module('todoApp', [])
    .constant('API', {
      get: '/api/todos',
      post: '/api/todos'
    })
    .controller('TodoController', TodoController)
    .factory('TodoFactory', TodoFactory);

  /**
   * TodoController
   *
   */
  TodoController.$inject = ['TodoFactory'];

  function TodoController (TodoFactory) {
    var vm = this;
    vm.addTodo = addTodo;
    vm.deleteTodo = deleteTodo;
    vm.markAsCompleted = markAsCompleted;
    vm.todos;

    activate();

    function activate() {
      TodoFactory.getTodos().then(function(data) {
        vm.todos = data;
      });
    }

    function addTodo() {
      // vm.todos.push({description: vm.newtodo, completed: false});
      TodoFactory.addTodo({description: vm.newtodo, completed: false}).then(function(data) {
        vm.todos = data;
      });
    }

    function deleteTodo(index) {
      // vm.todos.splice(index, 1);
      TodoFactory.deleteTodo(vm.todos[index].id).then(function(data) {
        vm.todos = data;
      });
    }

    function markAsCompleted(index) {
      // vm.todos[index].completed = !vm.todos[index].completed;
      TodoFactory.editTodo(vm.todos[index].id).then(function(data) {
        vm.todos = data;
      });
    }
  }

  /**
   * TodoFactory
   *
   */
  TodoFactory.$inject = ['API', '$http'];

  function TodoFactory (API, $http) {
    return {
      getTodos: getTodos,
      addTodo: addTodo,
      editTodo: editTodo,
      deleteTodo: deleteTodo
    };

    // get
    function getTodos() {
      return $http.get(API.get)
        .then(getTodosComplete)
        .catch(getTodosFailed);

      function getTodosComplete(res) {
        return res.data;
      }

      function getTodosFailed(err) {
        console.log(err.data);
      }
    }

    // post
    function addTodo(data) {
      return $http.post(API.post, data)
        .then(addTodoComplete)
        .catch(addTodoError);

      function addTodoComplete(res) {
        return res.data;
      }

      function addTodoError(err) {
        console.log(err.data);
      }
    }

    // post
    function editTodo(id) {
      return $http.get(API.post + '/' + id + '/edit')
        .then(addTodoComplete)
        .catch(addTodoError);

      function addTodoComplete(res) {
        return res.data;
      }

      function addTodoError(err) {
        console.log(err.data);
      }
    }

    // delete
    function deleteTodo(id) {
      return $http.delete(API.get + '/' + id)
        .then(deleteTodoComplete)
        .catch(deleteTodoError);

      function deleteTodoComplete(res) {
        return res.data;
      }

      function deleteTodoError(err) {
        console.log(err.data);
      }
    }
  }

})();