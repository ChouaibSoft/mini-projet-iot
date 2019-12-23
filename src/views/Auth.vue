<template xmlns:active="http://www.w3.org/1999/xhtml">
    <div id="auth">
        <home-nav/>
        <div class="container auth white z-depth-2">
            <ul class="tabs">
                <li class="tab col l6 waves-effect waves-light  white-text"
                    @click="component = 'sign-in', selected = 1"
                    v-bind:class="{active:selected == 1}"
                >{{ $t('auth.sign-in') }}</li>
                <li class="tab col l6 waves-effect waves-light  white-text"
                    @click="component = 'sign-up', selected = 2"
                    v-bind:class="{active:selected == 2}"
                >{{ $t('auth.sign-up') }}</li>
            </ul>
            <ul style="margin-top: -8px">
                <div  v-if="progress" class="progress">
                    <div class="indeterminate"></div>
                </div>
            </ul>
            <ul style="margin-top: 9px">
                <flash-message class="center-align"></flash-message>
            </ul>
            <component v-bind:is="component"></component>
        </div>
    </div>
</template>

<script>
    import homeNav from '@/components/HomeNav'
    import singnIn from '@/components/SignIn'
    import signUp from '@/components/SignUp'
    import Form from "@/components/Form";

    import { mapState } from 'vuex';

    export default {
        name : 'auth',
        components : {
            'home-nav': homeNav,
            'sign-in': singnIn,
            'sign-up': signUp,
            'generic-form': Form
        },
        computed: {
            ...mapState(['progress'])

        },
        data() {
            return {
                component: 'sign-in',
                selected: 1,
            }
        },
        methods: {

        }

    }
</script>

