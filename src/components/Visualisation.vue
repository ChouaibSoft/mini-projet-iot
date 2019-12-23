<template>
    <div id="view">
        <div class="row">
<div id="field-chart" class="field-chart">
        <ul class="collapsible">
            <li>
                <div class="collapsible-header chart" style="opacity: 1">
                    <i class="material-icons">filter_drama</i>{{ $t('canal.fieldX', {num: ''}) }} : <span class="teal-text lighten-1">{{ this.nameField }}</span>
                    <ul class="right">
                        <li>
                            <label :for="nameField">
                                <a class="btn-floating  grey darken-1 tooltipped"
                                   data-position="bottm" :data-tooltip="this.$t('tooltips.import')">
                                    <i  class="material-icons">attach_file</i></a>
                            </label>
                            <input :id="nameField" type="file" accept=".csv" @change="processFile($event)">
                        </li>
                        <li><a class="btn-floating publish tooltipped"
                               data-position="bottom" :data-tooltip="this.$t('tooltips.export')"
                               :href=" this.getApiUrl +  '/canal-service/export-data/' + this.idField">
                            <i class="material-icons">publish</i></a>
                        </li>
                    </ul>
                </div>
                <div class="collapsible-body"
                     style="display: block; position:relative; height: 290px !important; overflow: hidden">
                    <div :id="this.id" width="100%" height="100%"
                         style="display: block; position: absolute; width: 100%; height: 300px !important; top:0; left:0;"></div>
                </div>
            </li>
        </ul>
    </div>
        </div>
    </div>
</template>


<script>
    import axios from 'axios';
    import Pusher from 'pusher-js'
    import Plotly from 'plotly.js'
    import { mapGetters } from 'vuex';

    export default {
        name: "View",
        data() {
            return {
                valeur: null,
                date: null,
                chart: null,
                id: '',
                file: null,
                idfield: null,
            }
        },
        computed: {
            ...mapGetters(['getApiUrl', 'getCanal', 'getToken'])
        },
        props: ['nameField', 'idField'],
        created() {
            this.id = this.nameField + '-' + this.idField;
            //   Pusher.logToConsole = true;
            var key = this.getCanal.cleLecture,
                keyWrite = this.getCanal.cleEcriture,
                token = this.getToken,
                nameF = this.getCanal.nom,
                idChart = this.id;
            var pusher = new Pusher('84bee67aad46ed497369', {
                cluster: 'eu',
                forceTLS: true
            });
            var channel = pusher.subscribe('my-channel'),
                apiUrl  =  this.getApiUrl;
            channel.bind('my-event', function (data) {
                if (data['data'] === keyWrite) {
                    axios.get( apiUrl +  '/aquisition-service/read?key=' + key + '&field=' + nameF, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        }
                    })
                        .then(response => {
                            let results = response.data;
                            let dateresult = results.map(a => a.date);
                            let valueresult = results.map(a => a.valeur);
                            this.valeur = valueresult;
                            this.date = dateresult;
                            let x = [];
                            for (let i = 0; i < dateresult.length; i++) {
                                x.push(i);
                            }
                            var layout = {
                                title: nameF,
                                xaxis: {
                                    title: 'Date',
                                    showticklabels: false,
                                    tickangle: 'auto',
                                    tickvals: x,
                                    ticktext: dateresult
                                },
                                yaxis: {
                                    title: 'Values',
                                    showticklabels: true,
                                }
                            };
                            Plotly.newPlot(idChart, [{y: valueresult}], layout);
                        })
                        .catch(error => {
                        })
                }
            });
        },
        mounted() {
            $('.tooltipped').tooltip();
            this.getData();
            $('.fixed-action-btn').floatingActionButton({
                hoverEnabled: false,
                direction: 'left',
            });
        },
        methods: {
            getData() {
                var key = this.getCanal.cleLecture,
                    token = this.getToken,
                    nameF = this.getCanal.nom,
                    apiUrl  =  this.getApiUrl,
                    idChart = this.id;
                axios.get( apiUrl +  '/aquisition-service/read?key=' + key + '&field=' + nameF, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                })
                    .then(response => {
                        let results = response.data;
                        let dateresult = results.map(a => a.date);
                        let valueresult = results.map(a => a.valeur);
                        this.valeur = valueresult;
                        this.date = dateresult;
                        let x = [];
                        for (let i = 0; i < dateresult.length; i++) {
                            x.push(i);
                        }
                        var layout = {
                            //title: nameF,
                            xaxis: {
                                title: 'Date',
                                showticklabels: false,
                                tickangle: 'auto',
                                tickvals: x,
                                ticktext: dateresult
                            },
                            yaxis: {
                                title: 'Values',
                                showticklabels: true,
                            }
                        };
                        Plotly.newPlot(idChart, [{y: valueresult}], layout);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            // import
            processFile(event) {
                this.file = event.target.files[0];
                this.importCSV();
            },
            importCSV: function () {
                if (this.file.type == "application/vnd.ms-excel") {
                    let formData = new FormData();
                    let apiUrl  =  this.getApiUrl;
                    let token = localStorage.getItem('userToken');
                    formData.append('file', this.file);
                    axios.post( apiUrl +  '/aquisition-service/import-data/' + this.idField, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': 'Bearer ' + token,
                        }
                    }).then(function () {
                        //console.log('SUCCESS!!');
                    }).catch(function () {
                        //console.log('FAILURE!!');
                    });
                }
            },
        }
    }
</script>

<style scoped>
</style>
