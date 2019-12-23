<template>
    <div id="content">
        <div class="row page-title-path">
            <div class="col">
                <h2>{{ $t('main-title') }}</h2>
            </div>
            <div class="col right">
                <p>Home > <span> Ajouter Field</span></p>
            </div>

        </div>
        <section class="component-section">
            <div class="row">
                <div class="col s12 l5">
                    <form class="form" id="add-canal" @submit.prevent="addCanal">
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
                                        <label for="name">{{ $t('canal.name') }}</label>
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
                                <div class="row">
                                    <div class="input-field col s12">
                                        <textarea
                                                id="description"
                                                data-length="120"
                                                class="materialize-textarea validate"
                                                required
                                                minlength="5"
                                                v-model="description"
                                                @input="$v.description.$touch()">
                                        </textarea>
                                        <label for="description">{{ $t('canal.description') }}</label>
                                        <div v-if="$v.description.$dirty">
                                            <p class="error-message red-text " v-if="!$v.description.required">
                                                {{ $t('errors.required') }}
                                            </p>
                                            <p class="error-message red-text " v-if="!$v.description.minLength">
                                                {{ $t('errors.min-length', {minLength: 5}) }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div slot="form-controls">
                                <div>
                                    <div class="row">
                                        <div class="col right">
                                            <button :disabled="this.look === true" type="submit" class="button waves-effect waves-light btn">
                                                {{ $t('canal.add') }}
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
                    <div class="help">
                        <h4>{{ $t('help') }}</h4>
                        <h5>{{ $t('channel-settings') }}</h5>
                        <ul class="help-list">
                            <li>
                                <p><strong>{{ $t('settings.name') }}</strong>{{ $t('settings.name-det') }}</p>
                            </li>
                            <li>
                                <p><strong>{{ $t('settings.description') }}</strong>{{ $t('settings.description-det') }}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import { mapState, mapActions,mapGetters } from 'vuex';
    import { required, minLength } from 'vuelidate/lib/validators'
    import Form from "@/components/Form";

    export default {
        name: "add-channel",
        components: {
            'generic-form': Form
        },
        data (){
            return{
                name: '',
                description: '',
                id: '',
                iduser:'',
                look : false
            }
        },
        computed:{
            ...mapGetters(['getUserId'])

        },
        methods: {
            ...mapActions(['postRequest']),

            addCanal: function () {
                this.look = true;
                let postData = {
                    nom: this.name,
                    description: this.description,
                    userId: this.getUserId
                };

                let payload = {
                    'data': postData,
                    'link': '/aquisition-service/add-field'};
                this.postRequest(payload).then(() => {
                    this.flash(this.$t('canal.add-success'), 'success');
                    this.$router.push('/dashboard/channels');
                    this.look = false;
                }).catch(() => {
                    this.flash(this.$t('canal.add-error'), 'error');
                    this.look = false;
                })
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
            description: {
                required,
                minLength: minLength(5),
            },
            fields: {
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
    "main-title": "New Field",
    "channel": "Field",
    "channel-des": "Channels store all the data that a Iot-Platform ESI-SBA application collects. Each channel includes eight fields that can hold any type of data, plus three fields for location data and one for status data. Once you collect data in a channel, you can use ThingSpeak apps to analyze and visualize it.",
    "channel-settings": "Channel Settings",
    "settings": {
    "name": "Field Name : ",
    "name-det": "Enter a unique name for the Iot Agriculture field.",
    "description": "Description : ",
    "description-det": "Enter a description of the IoT Agriculture  filed."
    }
    },
    "fr": {
    "main-title": "Nouveau Field",
    "channel": "Field",
    "channel-des": "Les canaux stockent toutes les données collectées par une application Iot-Platform ESI-SBA. Chaque canal comprend huit champs pouvant contenir tout type de données, ainsi que trois champs pour les données de localisation et un pour les données d'état. , vous pouvez utiliser les applications ThingSpeak pour l’analyser et le visualiser. ",
    "channel-settings": "Paramètres de Field",
    "settings": {
    "name": "Nom du Field : ",
    "name-det": "Enter a unique name for the Iot Agriculture field.",
    "description": "Description : ",
    "description-det": "Entrez une description pour le Field Iot Agriculte"
    }
    }
    }
</i18n>
