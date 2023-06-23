<template>
    <div class="login">
        <form class="loginform">
            <p>
                <label for="memberIdInput" />
                <input class="form__input" for="memberIdInput" type="text" ref="memberIdInput" v-model.trim="memberId" placeholder="ID">
            </p>
            <p>
                <label for="memberPasswordInput" />
                <input class="form__input" for="memberPasswordInput" type="password" ref="memberPasswordInput" v-model.trim="memberPassword" placeholder="PASSWORD">
            </p>
            <p class="buttons">
                <!--@click.prevent : form의 input에서 엔터키를 누를 때 form submit 되는 것을 막을 수 있음-->
                <button @click.prevent="doLogin" class="button blue">로그인</button>
                <button @click.prevent="doCancel" class="button">취소</button>
            </p>
        </form>
        <p>{{ errorMessage }}</p>
    </div>
</template>

<script>
export default {
    data: () => ({
        memberId: '',
        memberPassword: '',
        errorMessage: ''
    }),
    methods: {
        doLogin() {
            if (this.memberId == "") {
                alert("아이디를 입력하세요.");
                this.$refs.memberIdInput.focus();
                return;
            } else if (this.memberPassword == "") {
                alert("패스워드를 입력하세요.");
                this.$refs.memberPasswordInput.focus();
                return;
            }

            let memberInfo = { email: this.memberId, password: this.memberPassword };
            this.$store.dispatch("loginStore/doLogin", memberInfo).then(() => {
                const returnUrl = window.location.search.replace(/^\?returnUrl=/, "");
                this.$router.push(returnUrl);
            }).catch((err) => {
                this.errorMessage = err.response.data.errormessage;
            });
        },
        doCancel() {
            this.$router.push('../');
        }
    },
    mounted() {
        this.$refs.memberIdInput.focus();
    }
}
</script>

<style scoped lang="scss">
.login {
    width: 800px;
    margin: 20px auto;
}

.loginform {
    width: 400px;
    margin: 30px auto;
}

.loginform p>.form__input {
    background-color: transparent;
    border: 0;
    outline: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.7);
    width: 250px;
    height: 32px;
    font-size: 14px;
}

.buttons {
    position: relative;
    height: 32px;
    margin-top: 20px;
}

.buttons>.button {
    overflow: visible;
    cursor: pointer;
    min-width: 125px;
    height: 32px;
    margin: 0 2px;
    padding: 0 15px;
    line-height: 32px;
    font-size: 14px;
    border: 1px solid #dfdfdf;
    background: #fff;
    border-radius: 10px;
}

.buttons>.button.blue {
    color: #fff;
    border-color: #0099d2 !important;
    background: #0099d2 !important;
}
</style>