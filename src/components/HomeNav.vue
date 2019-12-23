<template>
    <div>
        <nav class="nav-wraper navbar-home navbar">
            <div class="container">
                <router-link to="/" class="brand-logo">IoT Agriculture</router-link>
                <a href="#" class="sidenav-trigger" data-target="mobile-links">
                    <i class="material-icons">menu</i>
                </a>
                <ul class="right  hide-on-med-and-down">
                    <li><router-link :to="{ name: 'home'}" class="waves-effect waves-light">{{ $t('home') }}</router-link></li>
                    <li><a href="#" class="waves-effect waves-light">{{ $t('about') }}</a></li>
                    <li><a href="#" class="waves-effect waves-light">Contact</a></li>
                    <li v-if="!isLogged"><router-link :to="{ name: 'auth'}" class="waves-effect waves-light">{{ $t('login') }}</router-link></li>
                    <li v-else><router-link :to="{ name: 'dashboard'}" class="waves-effect waves-light">{{ $t('dashboard') }}</router-link></li>
                </ul>
            </div>
        </nav>
        <ul class="sidenav" id="mobile-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#/auth">Login</a></li>
        </ul>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    export default {
        name: 'home',

        computed: {
            ...mapGetters([
                'isLogged'
            ])
        },
        mounted(){
            $('.sidenav').sidenav();

        }
    }
</script>
<i18n>
    {
    "en": {
    "home": "Home",
    "about": "About",
    "contact": "Contact",
    "login": "Login",
    "dashboard": "Dashboard"
    },
    "fr": {
    "home": "Accueil",
    "about": "A propos",
    "contact": "Contact",
    "login": "Connexion",
    "dashboard": "Dashboard"
    }
    }
</i18n>
