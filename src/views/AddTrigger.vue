<template>
    <div id="content">
        <div class="row page-title-path">
            <div class="col">
                <h2>{{ $t('main-title') }}</h2>
            </div>
            <div class="col right">
                <p>Home > <span> {{ $t('main-title') }}</span></p>
            </div>
        </div>
        <section class="component-section">
            <div class="row">
                <div class="col s12 l5">
                    <form class="form" id="add-canal" @submit.prevent="addTrigger">
                        <generic-form>
                            <div slot="form-fields">
                                <div class="row">
                                    <div class="input-field col s12">
                                        <input
                                                id="name"
                                                type="text"
                                                required
                                                minlength="3"
                                                class="validate"
                                                v-model="name"
                                                @input="$v.name.$touch()">
                                        <label for="name">{{ $t('trigger.commandX') }}</label>
                                        <div v-if="$v.name.$dirty">
                                            <p class="error-message red-text " v-if="!$v.name.required">
                                                {{ $t('errors.required') }}
                                            </p>
                                            <p class="error-message red-text " v-if="!$v.name.minLength">
                                                {{ $t('errors.min-length', {minLength: 3}) }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div slot="form-controls">
                                <div>
                                    <div class="row">
                                        <div class="col right">
                                            <button type="submit" :disabled="lock === true" class="button waves-effect waves-light btn">
                                                {{ $t('trigger.add') }}
                                                <i class="material-icons right">send</i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </generic-form>
                    </form>
                </div>
                <div class="col l7 s12">
                    <h4>{{ $t('help') }}</h4>
                    <p>{{ $t('trigger-des') }}</p>
                    <h5>{{ $t('trigger-settings') }}</h5>
                    <ul class="help-list">
                        <li>
                            <p><strong>{{ $t('settings.name') }}</strong>{{ $t('settings.name-det') }}</p>
                        </li>
                        <li>
                            <p v-html="this.$t('settings.command-det')"></p>
                        </li>
                    </ul>

                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import { mapState, mapActions, mapGetters } from 'vuex';
    import { required, minLength } from 'vuelidate/lib/validators'
    import Form from "@/components/Form";
    export default {
        name: "new-trigger",
        components: {
            'generic-form': Form
        },
        data (){
            return{
                name: '',
                id: '',
                iduser:'',
                lock: false
            }
        },
        computed:{
            ...mapGetters(['getUserId'])
        },
        methods: {
            ...mapActions(['postRequest']),
            addTrigger: function () {
                this.lock = true;
                var postData = {
                    value: this.name
                    
                };
                var payload = {
                    'data': postData,
                    'link': '/aquisition-service/commands/' + this.getUserId
                };
                this.postRequest(payload).then(() => {
                    this.flash(this.$t('trigger.add-success'), 'success');
                    this.name = "";
                    this.lock = false;
                }).catch(() => {
                    this.flash(this.$t('trigger.add-error'), 'error');
                })
            },
            addCommande: function () {
                var commande = "Commande" + (this.commandes.length + 1);
                this.commandes.push({
                    name: commande,
                    value: ''
                });
            },
            deleteCommande: function (index) {
                this.commandes.splice(index, 1);
            }
        },
        mounted(){
            $('textarea#description').characterCounter();

        },
        validations: {
            name: {
                required,
                minLength: minLength(3)
            },
            commandes: {
                minLength: minLength(3)
            }
        },
    }
</script>

<style scoped lang="scss">
</style>
<i18n>
    {
    "en": {
    "main-title": "New Action",
    "trigger-des": "Use the TalkBack app to send new commands to any device.",
    "trigger-settings": "Action Settings",
    "settings": {
    "name": "Action Name : ",
    "name-det": "Enter a unique name for your Action.",
    "command": "Commands",
    "command-det": "<strong>Commands : </strong> Click  <strong>+ command </strong> to queue new commands to your TalkBack. You can also queue up commands using the Action API."
    }

    },
    "fr": {
    "main-title": "Nouveau Action",
    "trigger-settings": "Paramètres de Action",
    "settings": {
    "name": "Nom du Action : ",
    "name-det": "Entrez un nom unique pour votre Actions.",
    "command": "Commandes",
    "command-det": "<strong>Commandes : </strong> Cliquez sur  <strong>+ commande </strong> pour ajouter une nouvelle commande pour votre Action"
    }
    }
    }
</i18n>
