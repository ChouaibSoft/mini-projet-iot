<template>
    <div id="sign-in" class="col s12">
        <form v-if="!forgetPassword" class="col s12 form"  @submit.prevent="login">
            <div class="form-container">
                <h4>{{ $t('auth.welcome') }}</h4>
                <generic-form>
                    <div slot="form-fields">
                        <div class="row">
                            <div class="input-field col s12">
                                <i class="material-icons prefix">account_circle</i>
                                <input
                                        id="email"
                                        type="text"
                                        class="validate"
                                        required
                                        v-model="email"
                                        @input="$v.email.$touch()">
                                <label for="email">{{ $t('auth.email') }}</label>
                                <div v-if="$v.email.$dirty">
                                    <p class="error-message red-text " v-if="!$v.email.required">
                                        {{ $t('errors.required') }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <i class="material-icons prefix">lock</i>
                                <input
                                        id="password"
                                        type="password"
                                        class="validate"
                                        required
                                        v-model="password"
                                        @input="$v.password.$touch()">
                                <label for="password">{{ $t('auth.password') }}</label>
                                <div v-if="$v.password.$dirty">
                                    <p class="error-message red-text " v-if="!$v.password.required">
                                        {{ $t('errors.required') }}
                                    </p>
                                </div>
                                <a href="#" class="forget-password" @click="forgetPassword = !forgetPassword">{{ $t('auth.forgot-password') }}</a>
                            </div>
                        </div>
                    </div>
                    <div slot="form-controls">
                        <center>
                            <button :disabled="look === true" class="btn waves-effect waves-light  submit" type="submit" name="action">{{ $t('auth.sign-in') }}</button>
                        </center>
                    </div>
                </generic-form>
            </div>
        </form>
        <form v-else class="col s12"  @submit.prevent="forgetPassword">
            <div class="form-container form">
                <h5>{{ $t('auth.forgot-password') }}</h5>
                <generic-form>
                    <div slot="form-fields">
                        <div class="row">
                            <div class="input-field col s12">
                                <i class="material-icons prefix">email</i>
                                <input
                                        id="email-2"
                                        type="text"
                                        class="validate"
                                        required
                                        v-model="email"
                                        @input="$v.email.$touch()">
                                <label for="email-2">{{ $t('auth.email') }}</label>
                                <div v-if="$v.email.$dirty">
                                    <p class="error-message red-text " v-if="!$v.email.required">
                                        {{ $t('errors.required') }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>o
                    <div slot="form-controls">
                        <center>
                            <a @click="forgetPassword= !forgetPassword" class="btn waves-effect waves-light" name="action">{{ $t('auth.cancel') }}</a>
                            <a :disabled="look === true" style="margin-left: 50px" class="btn waves-effect waves-light  submit" type="submit" name="action">{{ $t('auth.submit') }}</a>
                        </center>
                    </div>
                </generic-form>
            </div>
        </form>
    </div>
</template>

<script>
    import Form from "@/components/Form";
    import { required } from 'vuelidate/lib/validators'
    import {  mapActions, mapGetters } from 'vuex';

    export default {
        name: "SignIn",
        components: {
            'generic-form': Form
        },
        data() {
            return {
                component: 'sign-in',
                selected: 1,
                email: '',
                password: '',
                forgetPassword: false,
                look : false
            }
        },
        computed: {
            ...mapGetters(['getApiUrl'])
        },
        methods: {
            ...mapActions([
                'switchProgress',
                'postRequest'
            ]),
            login() {
                var postData = {
                    email: this.email,
                    password: this.password
                };
                var payload = {
                    'data': postData,
                    'link': '/authentification-service/login'
                };
                this.switchProgress();
                this.look = true;
                this.postRequest(payload).then(request => this.loginSuccessful(request))
                    .catch( ()=> {
                        this.switchProgress();
                        this.look = false;
                        this.flash(this.$t('auth.login-failed'), 'error')
                    })
            },
            loginSuccessful(req) {
                if (req.headers) {
                    this.$store.dispatch('saveUserToken', req.headers.authorization);
                    this.$http.get( this.getApiUrl +  '/authentification-service/id',{
                            headers:{
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer '+ this.$store.state.token
                            }
                        }
                    ).then(request=>{
                        this.$store.dispatch('saveUserId', request.data)
                        this.switchProgress();
                        this.look = false;
                        this.$router.push('/dashboard');

                    })
                    return false;
                }
            },
        },
        validations: {
            email: {
                required,
            },
            password: {
                required,
            }
        },
    }
</script>

<style scoped>

</style>
