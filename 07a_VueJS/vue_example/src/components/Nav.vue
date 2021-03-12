<template>
<div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/contacts">Contacts</router-link>
    <router-link to="/about">About</router-link>
    <router-link v-if="!loggedIn" to="/login">Log In</router-link>
    <a v-if="loggedIn" v-on:click="logout">Log Out</a>
</div>
</template>

<script>
import auth from '../auth';

export default {
    name: 'Nav',
    data() {
        return { loggedIn: auth.loggedIn() };
    },
    created() {
        auth.onLoginStatusChanged = loggedIn => {
            this.loggedIn = loggedIn;
        }
    },
    methods: {
        logout: function() {
            auth.logout(() => {});
        }
    }
};
</script>

<style scoped lang="scss">
#nav {
    text-align: center;
    background-color: #061921;
    padding-bottom: 2rem;
    padding-top: 0;

    a {
        padding: 1rem;
        text-decoration: none;
        cursor: pointer;
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #1673bd;
        }
    }
}
</style>
