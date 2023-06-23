<template>
  <div class="hello">
    <h1 class="hello-text">{{ msg }}</h1>
    <button class="btn" @click="openAlert">open alert</button>
    <button class="btn" @click="openPrompt()">update message</button>
    <button class="btn" @click="reverseMessage">메세지 뒤집기</button>
    <p v-if="seen">seen을 true처리하면 보인다</p>
    <p v-else>seen을 false 처리하면 보인다</p>
    <div>
        <button class="btn" @click="addTodo">Todo 추가</button>
        <ol>
            <!--2.2.0 이상에서 v-for을 사용할 때, key값은 필수로 요구된다-->
            <li v-for="(todo, index) in todos" v-bind:key="todo">
                {{index}} -{{ todo.text }}
            </li>
        </ol>
        <ol>
            <!--v-if 와 v-for 를 동시에 사용하는 것을 추천하지 않습니다
                v-for가 v-if보다 높은 우선순위를 갖습니다
                즉, v-if는 루프가 반복될 때마다 실행됩니다             -->
            <li v-for="todo in todos" v-bind:key="todo" v-bind:todo="todo">
                {{ todo.text }}
            </li>
        </ol>
    </div>

    <h1>Fruits</h1>
    <p>{{ filteredFruits }}</p>
    <!--v-model:양식에 대한 입력과 앱 상태를 양방향으로 바인딩-->
    <input type="text" v-model="newFruit" v-on:keyup.enter="addFruit"/>
    <button class="btn" @click="addFruit">저장</button>
    <p>{{ isTyping? '입력중...' : '' }}</p>
    <div>
        <button class="btn" v-on:click="say('hi')">Say hi</button>
        <button class="btn" v-on:click="say('what')">Say what</button>
    </div>
    <div>
        <input type="checkbox" value ="Jack" v-model="checkedNames"/>
        <label for="jack">Jack</label>
        <input type="checkbox" value ="John" v-model="checkedNames"/>
        <label for="John">John</label>
        <input type="checkbox" value ="Mike" v-model="checkedNames"/>
        <label for="Mike">Mike</label>
        <br/>
        <span>체크한 이름: {{ checkedNames }}</span>
    </div>
    <div>
        <select v-model="selected">
            <option disabled value="">Please select one</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
        </select>
        <span>선택함: {{ selected }}</span>
    </div>
  </div>
</template>
<script>
export default {
    name:'VueAbout',
    data: () => ({
        msg: 'Vue.js 시작하기',
        seen: false,
        todos:[
            {text:'JavaScript 배우기'},
            {text:'Vue 배우기'},
            {text:'무언가 멋진 것을 만들기'}
        ],
        fruits:['apple', 'orange', 'grape', 'banana'],
        isTyping:false,
        newFruit:'',
        inputText:'',
        checkedNames : [],
        selected: ''
    }),
    //computed 데이터 캐싱을 통해 참조. data(여기서는 fruits)가 변경되지 않는 이상 연산한 후 저장한 data를 return. 렌더링할때마다 연산 X
    computed: {
        filteredFruits() {
            return this.fruits
                .filter(fruit => fruit != 'grape')
                .join(' and ')
        }
    },
    methods: {
        openAlert() {
            alert('open')
        },
        openPrompt(){
            const newMsg = prompt('open')
            //changeMessage method를 호출
            this.changeMessage(newMsg)
        },
        reverseMessage(){
            this.msg = this.msg.split('').reverse().join('')
        },
        changeMessage(newMsg){
            //data의 msg를 인자로 받은 새로운 value로 update
            this.msg = newMsg
        },
        addTodo(){
            this.todos.push({text:'New item'})
        },
        addFruit(){
            this.fruits.push(this.newFruit)
            this.newFruit = ''
        },
        say(message){
            alert(message);
        }
    },
    //watch: data의 변경을 감지하여 변경될 때마다 실행할 함수를 설정할 수 있도록 하는 속성
    watch: {
        newFruit: {
            handler (){
                if(this.newFruit !== ''){
                    this.isTyping = true
                }
                else{
                    this.isTyping = false
                }
            }
        }
    }
}
</script>

<style scoped lang="scss">
    .hello{
        &-text {
            color: green;
        }
    }
    input,select{
        border: 2px solid #000000;
    }
</style>