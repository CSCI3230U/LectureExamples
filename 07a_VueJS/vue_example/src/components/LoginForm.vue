<template>
<div id="login">
    <div v-if="errorMessage">{{errorMessage}}</div>
    <form @submit.prevent="login">
        <label for="username">Username:</label>
        <input type="text" v-model="username" name="username" placeholder="Username" />

        <label for="password">Password:</label>
        <input type="password" v-model="password" name="password" placeholder="Password" />

        <button class="btn">Login</button>
    </form>
</div>
</template>

<script>
import auth from '../auth';

export default {
    name: 'LoginForm',

    data() {
        return {
            username: 'Bret',
            password: 'Sincere@april.biz',
            errorMessage: ''
        };
    },

    methods: {
        login() {
            console.log('login()');
            auth.login(this.username, this.password, (response) => {
                if (response.authenticated) {
                    // login successful, redirect to index page
                    this.$router.replace(this.$route.query.redirect || '/');
                } else {
                    // login failed, display error message
                    this.errorMessage = 'Login Incorrect';
                }
            });
        }
    }
};
</script>

<style scoped lang="scss">
form {
    width: 60%;
    display: grid;
    grid-template-columns: 200px 1fr;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

label, input[type="text"], input[type="password"], button {
    margin: 1rem;
}

button {
    grid-column: 2;
}
</style>