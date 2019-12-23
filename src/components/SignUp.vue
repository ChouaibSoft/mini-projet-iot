<template>
    <div id="sign-up" class="col s12">
        <form class="form col s12" @submit.prevent="register">
            <div class="form-container">
                <h4>{{ $t('auth.welcome') }}</h4>
                <generic-form>
                    <div slot="form-fields">
                        <div class="row">
                            <div class="input-field col s12">
                                <i class="material-icons prefix">account_circle</i>
                                <input
                                        id="username"
                                        type="text"
                                        class="validate"
                                        required v-model="username"
                                        @input="$v.username.$touch()">
                                <label for="username">{{ $t('auth.username') }}</label>
                                <div v-if="$v.username.$dirty">
                                    <p class="error-message red-text " v-if="!$v.username.required">
                                        {{ $t('errors.required') }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <i class="material-icons prefix">email</i>
                                <input
                                        id="email"
                                        type="email"
                                        class="validate"
                                        required v-model="email"
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
                            <div class="input-field col s6">
                                <i class="material-icons prefix">lock</i>
                                <input
                                        id="password"
                                        type="password"
                                        class="validate"
                                        required
                                        minlength="8"
                                        v-model="password"
                                        @input="$v.password.$touch()">
                                <label for="password">{{ $t('auth.password') }}</label>
                            </div>
                            <div class="input-field col s6">
                                <input
                                        id="passwordCheck"
                                        type="password"
                                        class="validate"
                                        required
                                        minlength="8"
                                        v-model="confpass"
                                        @input="$v.confpass.$touch()">
                                <label for="passwordCheck">{{ $t('auth.conf-password') }}</label>
                            </div>
                            <div class="col s12">
                                <div v-if="$v.password.$dirty">
                                    <p class="error-message red-text " v-if="!$v.password.required || !$v.confpass.required">
                                        {{ $t('errors.required') }}
                                    </p>
                                    <p class="error-message red-text " v-if="!$v.password.minLength">
                                        {{ $t('errors.min-length-password', {minLength: 8}) }}
                                    </p>
                                </div>
                                <div v-if="$v.confpass.$dirty">
                                    <p class="error-message red-text " v-if="!$v.confpass.sameAsPassword">
                                        {{ $t('errors.same-as') }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div slot="form-controls">
                        <center>
                            <button :disabled="look === true" class="btn waves-effect waves-light  submit" type="submit" name="action">{{ $t('auth.sign-up') }}</button>
                        </center>
                    </div>
                </generic-form>
            </div>
        </form>
    </div>
</template>

<script>
    import {  mapActions } from 'vuex';
    import { required, minLength, sameAs } from 'vuelidate/lib/validators'
    import Form from "@/components/Form";
    export default {
        name: "SignUp",
        components: {
            'generic-form': Form
        },
        data() {
            return {
                component: 'sign-up',
                selected: 1,
                username: '',
                email: '',
                password: '',
                confpass:'',
                look: false
            }
        },
        methods: {
            ...mapActions([
                'switchProgress',
                'postRequest'
            ]),
            register(){
                this.look = true;
                var postData = {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    passwordConfirmed: this.confpass
                };
                var payload = {
                    'data': postData,
                    'link': '/authentification-service/register'
                };
                this.postRequest(payload).then(() => {
                    this.flash(this.$t('auth.success'), 'success');
                    this.look = false;
                }).catch( ()=> {
                    this.flash(this.$t('auth.error'), 'error');
                    this.look = true;
                });
            }
        },
        validations: {
            username: {
                required,
            },
            email: {
                required,
            },
            password: {
                required,
                minLength: minLength(8),
            },
            confpass: {
                required,
                sameAsPassword: sameAs('password')
            }
        },
    }
</script>

<style scoped>


</style>
