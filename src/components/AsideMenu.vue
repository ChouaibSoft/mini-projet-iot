<template>
    <aside>
    <div class="main-menu" id="items">
        <ul>
            <li class="small-cap">
                <span>{{ $t('home') }}</span>
            </li>
            <li class="item-header">
                <router-link :to="{ name: 'dashboard'}" class="group-name">
                    <i class="fa fa-home"></i>
                    <span class="nav-text">{{ $t('page-title.dashboard') }}</span>
                </router-link>
            </li>
            <li class="small-cap">
                <span>Business</span>
            </li>
            <li class="item-header">
                <a href="#!" class="group-name has-arrow">
                    <i class="fa fa-chart-bar"></i>
                    <span class="nav-text">{{ $t('channel') }}</span>
                </a>
                <div>
                    <ul class="items-group">
                        <li>
                            <router-link :to="{ name: 'my-channels'}">
                                <i class="fa fa-dot-circle"></i>
                                <span>{{ $t('page-title.my-channels') }}</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'new-channel'}">
                                <i class="fa fa-dot-circle"></i>
                                <span>{{ $t('page-title.new-channel') }}</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </li>
            <li class="small-cap">
                <span>{{ $t('help') }}</span>
            </li>
            <li class="item-header">
                <a href=""   class="group-name">
                    <i class="fa fa-question-circle"></i>
                    <span class="nav-text">FAQ</span>
                </a>
            </li>
            <li class="small-cap">
                <span>{{ $t('close') }}</span>
            </li>
            <li class="item-header">
                <a href=""  @click="logout" class="group-name">
                    <i class="fa fa-power-off"></i>
                    <span class="nav-text">{{ $t('logout') }}</span>
                </a>
            </li>
        </ul>
    </div>
    </aside>
</template>

<script>
    import {  mapActions } from 'vuex';
    export default {
        name: "AsideMenu",
        data(){
            return{
                selected: 'item1'
            }
        },
        methods: {
            ...mapActions([
                'logout'
            ])
        },
        mounted(){
            var aside = $("aside"),
                mainAside = $(".main-menu"),
                navbar = $(".navbar"),
                dashArea = $(".dash-area");
            if (window.innerWidth < 992) {
                aside.addeClass("collapse");
                mainAside.animate({
                    left: "-256px"
                }, 500);
                dashArea.animate({
                    width: "100%",
                    paddingLeft: "15px"
                }, 0);
            }else{
                mainAside.addClass("is-visible");
                dashArea.removeClass("full-size");
                navbar.removeClass("collapse-nav");
            }
            // Adjust Aside Menu During Window Resize
            $(window).resize(function () {
                if (window.innerWidth > 992) {
                    aside.removeClass("collapse");
                    navbar.removeClass("collapse-nav");
                    if (!(mainAside.hasClass("is-visible"))) {
                        mainAside.animate({
                            left: '0'
                        }, 500);
                        mainAside.addClass("is-visible");
                        if(dashArea.hasClass("full-size")){
                            dashArea.animate({
                                paddingLeft: "340px",
                            }, 0);
                            dashArea.removeClass("full-size");
                        }
                    } else {
                        if (dashArea.hasClass("full-size")) {
                            dashArea.animate({
                                paddingLeft: "340px",
                            }, 0);
                            mainAside.addClass("is-visible");
                            dashArea.removeClass("full-size");
                        }
                    }
                } else {
                    navbar.addClass("collapse-nav");
                    aside.removeClass("collapse");
                    mainAside.animate({
                        left: "-256px"
                    }, 500);
                    dashArea.animate({
                        width: "100%",
                        paddingLeft: "15px"
                    }, 0);
                    mainAside.removeClass("is-visible");
                    dashArea.addClass("full-size");
                }
            });

            //Remove Collapse when hover on aside menu
            $("#items").on({
                mouseleave: function(event) {
                    if(window.innerWidth > 992){
                        if(!(aside.hasClass("collapse"))){
                            if(dashArea.hasClass("full-size")){
                                aside.addClass("collapse");
                                event.stopPropagation();
                            }
                        }
                    }
                },
                mouseover: function(event) {
                    if(window.innerWidth > 992){
                        if((aside.hasClass("collapse"))){
                            aside.removeClass("collapse");
                            event.stopPropagation();
                        }
                    }
                }
            });


            // Add now class to active dropdow list
            $(".item-header").on('click', function() {
                $(this).addClass("now").siblings().removeClass("now").end()
                    .find('.items-group').slideDown(300).end()
                    .siblings('.item-header').find('.items-group').slideUp(300);
            });
        }
    }
</script>

<style scoped>

</style>
<i18n>
    {
    "en": {
    "channel": "Field",
    "logout": "Log out",
    "close": "close",
    "home": "home"
    },
    "fr": {
    "channel": "Field",
    "logout": "Deconnexion",
    "close": "fermer",
    "home": "acceuil"
    }
    }
</i18n>
