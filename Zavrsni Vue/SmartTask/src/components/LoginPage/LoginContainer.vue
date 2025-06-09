<template>
    <div id="logInContainer" class="flex">
        <h2>Log In</h2>

        <label for="username"> Username </label>
        <input type="text" id="username" v-model="info.username"/>

        <label for="password"> Password </label>
        <input type="password" id="password" v-model="info.password"/>

        <span id="loginWarning">{{ responseMessage }}</span>
        <button id="login" @click="performLogin">Log In</button>
        <button id="signup" @click="performSignup">Sign Up</button>
    </div>
</template>


<script setup>
    import axios from 'axios';
    import { ref } from 'vue';
    const info = ref({
        username: "",
        password: ""
    });
    let responseMessage = ref("");
    const emit = defineEmits(['redirect'])
    const performLogin = () => {
        axios.post('http://localhost:3000/api/login', info.value)
             .then(res => {
                emit('redirect', res.data.user)
             })
             .catch(err =>  {
                responseMessage.value = "Username or password is incorrect, try again!";
                console.error(err);
    });
    }
    const performSignup = () => {
        axios.post('http://localhost:3000/api/signup', info.value)
             .then(res => {
                responseMessage.value = "Sign up is succesfull, feel free to log in!";
             })
             .catch(err => {
                responseMessage.value = "Something went wrong, please try again!";
                console.error(err);
    });
    }
</script>