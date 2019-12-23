<template>
    <div id="content">
        <div class="row page-title-path">
            <div class="col">
                <h2>{{ $t('main-title') }}</h2>
            </div>
            <div class="col right">
                <p>Home > <span></span></p>
            </div>
        </div>
        <section class="component-section">
            <div v-if="!(this.getCanals === null) " class="row">
                <div class="col s12 l8">
                    <table class = "striped bordered">
                        <thead>
                        <tr>
                            <th style="width: 4%">{{ $t('table.num') }}</th>
                            <th>{{ $t('table.name') }}</th>
                            <th>{{ $t('table.description') }}</th>
                            <th>{{ $t('table.actions') }}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(canal, index) in displayChannels"  :key="index" :data-url="'/dashboard/fields/' + canal.fieldId +  '/view'">
                            <td>{{ index + 1 }}</td>
                            <td>{{canal.nom}}</td>
                            <td>{{canal.description.length > 40 ? canal.description.substring(1, 50) + '...': canal.description }}</td>
                            <td class="action not-allowed">
                                <router-link :to="{ name: 'view', params: { id: canal.fieldId}}">
                                    <i class="fa fa-chart-bar"></i>
                                </router-link>
                                <a href="#">
                                    <i class="material-icons prefix red-text lighten-2">delete</i>
                                </a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="right">
                        <ul v-if="pages.length > 1" class="pagination">
                            <li v-if="page != 1" @click="page--"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
                            <li v-for="pageNumber in pages.slice(page-1, page+5)" :key="pageNumber" @click="page = pageNumber" :class="{active: page == pageNumber }"><a href="#!">{{pageNumber}}</a></li>
                            <li class="waves-effect"  @click="page++" v-if="page < pages.length"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
                        </ul>
                    </div>
                </div>
                <div class="col l4 s12">
                    <div class="help">
                        <h4>{{ $t('help') }}</h4>
                        <p v-html="this.$t('text')"></p>
                    </div>
                </div>
            </div>
            <div v-else class="row">
                <div  class="col s12">
                    <div class="alert alert-info" role="alert">
                        {{ $t('no-channel') }}
                    </div>
                    <router-link :to="{ name: 'new-channel' }" class="waves-effect waves-light btn">
                        {{ $t('add-channel') }}
                    </router-link>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: "my-channels",
        data(){
            return{
                CreatedDate: '',
                page: 1,
                perPage: 3,
                pages: [],
            }
        },
        computed: {
            ...mapGetters(['getCanals', 'getUserId']),
            displayChannels () {
                return this.paginate(this.getCanals);
            }
        },
        methods:{
            ...mapActions(['deleteRequest']),
            getDateCreated(data){
                return data.substring(0,10);
            },
            setPages () {
                this.pages = [];
                let numberOfPages = Math.ceil(this.getCanals.length / this.perPage);
                for (let index = 1; index <= numberOfPages; index++) {
                    this.pages.push(index);
                }
            },
            paginate (channels) {
                let page = this.page;
                let perPage = this.perPage;
                let from = (page * perPage) - perPage;
                let to = (page * perPage);
                return  channels.slice(from, to);
            }
        },
        watch: {
            getCanals() {
                this.setPages();
            }
        },
        created() {
            var payload = {
                'link': '/aquisition-service/getField/'+ this.getUserId,
                'mutation': 'setCanals'
                    
            };
            this.$store.dispatch('getRequest', payload);
        },
        mounted(){
            $("tr").find("td").click(function(){
                if (!($(this).hasClass("not-allowed"))){
                    window.location = $(this).parent("tr").data('url');
                }
            });
        }
    }
</script>
<i18n>
    {
    "en": {
    "main-title": "My Fileds",
    "no-channel": "No Channel to displayed",
    "add-channel": "New Channel",
    "help": "Help",
    "text": "Collect data in a Iot-Platform ESI-SBA fields from a device, from another channel, or from the web. <br>Click <strong>New Channel </strong> to create a new Iot-Platform ESI-SBA channel. <br>Click on the column headers of the table to sort by the entries in that column or click on a tag to show channels with that tag.",
    "table": {
    "num": "#",
    "name": "Name",
    "description": "Description",
    "actions": "Actions"
    }
    },
    "fr": {
    "main-title": "Mes Fields",
    "no-channel": "Aucun Field à Afficher",
    "add-channel": "Nouveau Field",
    "help": "Aide",
    "text": "Collectez des données sur un field ESI-SBA Iot-Platform à partir d'un périphérique, d'un autre canal ou du Web. <br> Cliquez sur <strong> Nouveau canal </strong> pour créer un nouveau canal ESI-SBA Iot-Platform. <br> Cliquez sur les en-têtes de colonne du tableau pour trier les entrées de cette colonne ou cliquez sur une balise pour afficher les canaux avec cette balise.",
    "table": {
    "num": "#",
    "name": "Nom",
    "description": "Description",
    "actions": "Actions"
    }
    }
    }
</i18n>
