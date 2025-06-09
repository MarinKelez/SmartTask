<template>
    <Header></Header>
    <main>
        <h1>Hi there!</h1>
        <h3>Please log in to continue, if you are new here, feel free to sign up!</h3>
        <LoginContainer @redirect="performRedirect"></LoginContainer>
    </main>
</template>

<script setup>
    import Header from './../Layout/Header.vue'
    import LoginContainer from './LoginContainer.vue'
    import { useRouter } from 'vue-router'
    const router = useRouter()

    const performRedirect = (user) => {
        router.push(`/home/${user.id}/${user.username}`);
    }
</script>