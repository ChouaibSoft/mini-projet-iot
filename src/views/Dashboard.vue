<template>
    <div id="dashboard">
        <!-- Start Global -->
        <navbar></navbar>
        <section class="dashboard">
            <div class="container-fluid">
                <div class="row">
                    <div class="col l3" style="padding: 0 !important;">
                        <aside-menu></aside-menu>
                    </div>
                    <div class="col l9 s12 dash-area">
                        <section class="content">
                            <div v-show="false" class="account-not-activated">{{ $t('auth.account-not-activated') }}</div>
                            <div class="row">
                                <flash-message></flash-message>
                            </div>
                            <!-- Start Main Content -->
                            <router-view></router-view>
                            <!-- End Main Content -->
                        </section>
                    </div>
                </div>
            </div>
        </section>

        <!-- End Global -->
    </div>
</template>

<script>
    import AsideMenu from "@/components/AsideMenu";
    import Navbar from "@/components/Navbar";
    export default {
        name: "Dashboard",
        date(){
            return{
                langs: ['en', 'fr']
            }
        },
        components: {
            'aside-menu': AsideMenu,
            'navbar': Navbar
        },
        methods: {
        }
    }
</script>
