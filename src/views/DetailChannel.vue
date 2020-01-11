<template>
    <div id="content">
        <div class="row page-title-path">
            <div class="col">
                <h2>{{ $t('main-title') }}</h2>
            </div>
            <div class="col right">
                <p>Home > <span> My Fields</span></p>
            </div>

        </div>
        <section class="component-section">
            <div class="row">
                <div class="col s12 l12">
                    <div class="channel-head">
                        <p><strong>{{ $t('channel-name') }}</strong>{{ getCanal.nom }}</p>
                        <p class="description"><strong>{{ $t('description')}}</strong>{{ getCanal.description }}</p>
                        <p><strong>{{ $t('channel-owner')}}</strong>@chouaib</p>
                    </div>
                </div>
                <div class="col s12 l12">
                    <div class="channel-head ch-head-2" style="border-left: 1px solid #9e9e9e; padding: 0 20px 5px 30px">
                        <p><strong>{{ $t('write-key') }}</strong>
                            <span class="red-text">{{ this.getApiUrl  }}/aquisition-service/record?</span>
                            <span class="teal-text lighten-2">
                            key={{ getCanal.cleEcriture }}&feild={{ getCanal.nom }}
                            </span>
                        </p>
                        <p><strong>{{ $t('read-key') }}</strong>
                            <span class="red-text">{{ this.getApiUrl  }}/aquisition-service/read?</span>
                            <span class="teal-text lighten-2">
                            key={{ getCanal.cleLecture }}&feild={{ getCanal.nom }}
                            </span>
                        </p>                        <div>
                            <a class="waves-effect waves-light btn delete-channel">
                                <i class="fa fa-trash fa-small"></i>
                                {{ $t('delete-channel') }}
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col s12">
                    <div class="actions">
                        <div class="row">
                            <div class="col s12">
                                <ul class="tabs" id="tabs-swipe-demo">
                                    <li class="tab col s4">
                                        <router-link  :to="{ name: 'view', params: { id: getCanal.id}}"
                                                      exact-active-class="active">
                                            {{ $t('component-toggle.view') }}
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                            <div  class="col s12 call-component">
                                <router-view></router-view>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: "detail-channel",
        data() {
            return {
            }
        },
        computed: {
            ...mapGetters(['getCanal', 'getUserId', 'getApiUrl'])
        },
        methods: {
            ...mapActions(['deleteRequest'])
        },
        mounted(){
            let fieldId = this.$route.params.id;
            let payloadA = {
                'link': '/aquisition-service/getOneField/'+ fieldId,
                'mutation': 'setCanal'
            };
            this.$store.dispatch('getRequest', payloadA);
            $('.tabs').tabs();
        }
    }
</script>
<style scoped>

</style>
<i18n>
    {
    "en": {
    "main-title": "Field Detail :",
    "channel-name": "Field Name :",
    "channel-id": "Field ID :",
    "channel-owner": "Owner :",
    "description": "Description :",
    "delete-channel": "Channel",
    "read-key": "Read Key :",
    "write-key": "Write Key :",
    "component-toggle": {
    "view": "Visualisation",
    "api-keys": "API keys",
    "channel-settings": "Field Settings",
    "import-export": "Data import / export"
    }
    },
    "fr": {
    "main-title": "Detail du Field",
    "channel-name": "Nom du Field :",
    "channel-id": "ID du Field :",
    "read-key": "Clé de lecture :",
    "write-key": "Clé d'écriture :",
    "channel-owner": "Propriétaire :",
    "description": "Description :",
    "delete-channel": "Field",
    "component-toggle": {
    "view": "Visualisation",
    "api-keys": "API keys",
    "channel-settings": "Paramètres",
    "import-export": "Import / Export de données"
    }
    }
    }
</i18n>
