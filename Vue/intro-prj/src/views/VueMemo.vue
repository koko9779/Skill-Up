<template>
    <div>
        <h1 class="title">TODO Components 처리</h1>
        <form class="form">
            <input 
              ref="todoInput" 
              type="text" 
              class="form__input" 
              placeholder="추가할 리스트를 입력하여 주세요 !" 
              v-model="inputText" />
            <Button type="submit" name="추가하기" @click="addToDo" />
        </form>
        <ul>
            <ToDoItem 
              v-for="todo in todos" 
              :key="todo.id" 
              :todo="todo" 
              @onComplete="onComplete" 
              @onDelete="onDelete" />
        </ul>
    </div>
</template>
<script>
import ToDoItem from './ToDoItem.vue';
import Button from './VueButton.vue';

export default {
    name: 'ToDoList',
    components: { ToDoItem, Button },
    data: () => ({
        inputText: '',
        todos: [
                {id: Date.now(), content: 'View 입문하기', isCompleted: false}
              ]
    }),
    methods: {
        addToDo(e) {
            e.preventDefault();
            const todo = {
                id: Date.now(),
                content: this.inputText,
                isCompleted: false
            }
            this.todos = [...this.todos, todo];
            this.inputText = '';
            this.$refs.todoInput.focus();
        },
        onComplete(id) {
            this.todos = this.todos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, isCompleted: !todo.isCompleted };
                }
                return todo;
            })
        },
        onDelete(id) {
            this.todos = this.todos.filter((todo) => todo.id !== id);
        }
    }
}
</script>
<style scoped>
.title {
  margin-bottom: 50px;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
}
.form {
  display: flex;
  width: 400px;
  height: 40px;
  margin-bottom: 20px;
}
.form__input {
  margin-right: 5px;
  background-color: transparent;
  border: 0;
  outline: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.7);
  flex: 1;
}
</style>