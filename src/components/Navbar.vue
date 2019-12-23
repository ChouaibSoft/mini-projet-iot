<template>
    <div>
        <!-- Start Navbar -->


        <div class="navbar-fixed">
            <nav class="navbar">
                <div class="container-fluid">
                    <div class="nav-wrapper">
                        <router-link :to="{ name: 'home'}" class="brand-logo left"><img src="../assets/images/logo1.png"/>
                            <span style="margin-left:5px">Agriculture</span></router-link>
                        <ul class="actions right">
                            <li>
                                <a class="dropdown-trigger drop-button waves-effect waves-light" data-target="lang" href="#!">
                                    {{ getLang }}
                                 </a>
                            </li>
                            <li><a class=" dropdown-trigger drop-button waves-effect waves-light" href="" data-target="dropdown1"><img src="../assets/images/header6.jpg" alt="profile-image"></a></li>
                        </ul>
                        <ul class="controls">
                            <li class="collapse-menu">
                                <a href="#!" class="sidenav-trigger waves-effect waves-light tooltipped"
                                   data-position="bottom" :data-tooltip="this.$t('tooltips.collapse-menu')">
                                    <span class="bars"></span>
                                    <span class="bars long"></span>
                                    <span class="bars"></span>
                                </a>
                            </li>
                            <li class="hide-on-med-and-down">
                                <a href="#"
                                   data-position="bottom" :data-tooltip="this.$t('tooltips.search')"
                                   class="waves-effect waves-light tooltipped"><i class="material-icons">search</i></a>
                            </li>
                            <li class="hide-on-med-and-down">
                                <a href="#" class="waves-effect waves-light tooltipped"
                                   data-position="bottom" :data-tooltip="this.$t('tooltips.notification')">
                                <i class="material-icons">notifications_active</i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>

        <!-- Dropdown Structure -->
        <ul id="dropdown1" class="dropdown-content">
            <li><a href="#!">one</a></li>
            <li><a href="#!">two</a></li>
            <li class="divider"></li>
            <li><a href="#!">three</a></li>
        </ul>

        <ul id="lang" class="dropdown-content" style="padding: 0" >
            <li v-for="entry in languages" :key="entry.title" @click="changeLocale(entry)" style="padding-top:10px; min-height: 30px !important;">
                <p><flag style="width: 35px; height: 20px;" :iso="entry.flag" v-bind:squared=false /> {{entry.title}}</p>
            </li>
        </ul>

        <!-- End Navbar -->

        <!-- new Channel Floating Button -->
        <div class="fixed-action-btn">
            <router-link :to="{ name: 'new-channel'}" class="tooltipped btn-floating  waves-effect waves-light btn-large teal lighten-1"
                         data-position="left" :data-tooltip="this.$t('tooltips.add-channel')">
                <i class="large material-icons">add</i>
            </router-link>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "Navbar",
        data() {
            return {
                languages: [
                    { flag: 'us', language: 'en', title: 'English', selected: true},
                    { flag: 'fr', language: 'fr', title: 'Français', selected: false}
                ]
            }
        },
        computed: {
            ...mapGetters(['getLang'])
        },
        methods: {
            changeLocale(locale) {
                this.$store.dispatch('changeLocale', locale);
            },
        },
        mounted(){
            $(".drop-button").dropdown();
            $('.sidenav').sidenav();
            $('.tooltipped').tooltip();

            // Fixed Menu
            $(".collapse-menu").on("click", function(){
                var aside = $("aside"),
                    mainAside = $(".main-menu"),
                    dashArea = $(".dash-area"),
                    navbar = $(".navbar"),
                    windowsSize = window.innerWidth;
                if(windowsSize > 992){
                    if(aside.hasClass("collapse")){
                        dashArea.animate({
                            paddingLeft: "340px"
                        }, 0);
                        dashArea.removeClass("full-size");
                        aside.removeClass("collapse");
                        navbar.removeClass("collapse-nav");
                    }else{
                        dashArea.animate({
                            paddingLeft: "150px",
                            width: "100%"
                        }, 0);
                        dashArea.addClass("full-size");
                        aside.addClass("collapse");
                        navbar.addClass("collapse-nav");
                    }
                }else{
                    aside.removeClass("collapse");
                    if(mainAside.hasClass("is-visible")){
                        mainAside.animate({
                            left: "-255px",
                        }, 300);
                        mainAside.removeClass("is-visible");
                        navbar.addClass("collapse-nav");
                    }else{
                        mainAside.animate({
                            left: "0",
                        }, 300);
                        mainAside.addClass("is-visible");
                        navbar.addClass("collapse-nav");
                    }
                }
            });
        }
    }
</script>

<style scoped>

</style>
