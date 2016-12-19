<template>
    <div class="google-map">
        <input type="text" name="search" id="search" class="form-control"
               placeholder="Type and click Enter to search"
               style="margin-bottom: 10px;" @keydown.enter.prevent="search">
        <div :id="id" style="width: 100%; height: 300px;"></div>
        <div style="display: none;">
            <input type="hidden" name="lat" v-model="markerLat">
            <input type="hidden" name="lng" v-model="markerLng">
        </div>
    </div>
</template>
<script type="text/babel">
    import * as GoogleMapsLoader from 'google-maps';

    let navigator = window.navigator;

    export default {
        props: {
            id: {
                type: String,
                required: true
            },
            latName: 'lat',
            lngName: 'lng',
            lat: null,
            lng: null,
            config: {
                required: true,
            }
        },
        computed: {
            markerLat(){
                return this.marker ? this.marker.getPosition().lat() : this.lat;
            },
            markerLng(){
                return this.marker ? this.marker.getPosition().lng() : this.lng;
            }
        },
        data(){
            return {
                google: null,
                map: null,
                marker: null,
            }
        },
        methods: {
            initMap() {
                if (!this.map) {
                    this.map = new this.google.maps.Map(document.getElementById('map'), {
                        zoom: 14,
                        center: {
                            lat: 3.1098429,
                            lng: 101.5820732
                        },
                        scrollwheel: false
                        //disableDefaultUI: true
                    });
                }
            },
            setMarker(pos){
                if (!this.marker) {
                    this.marker = new this.google.maps.Marker({
                        position: pos,
                        map: this.map,
                        draggable: true
                    });
                } else {
                    this.marker.setPosition(pos);
                }

                this.marker.addListener('dragend', () => {
                    this.centerMap({
                        lat: this.marker.getPosition().lat(),
                        lng: this.marker.getPosition().lng(),
                    })
                })
            },
            centerMap(pos){
                this.map.setCenter(pos);
            },
            search(e){
                let searchText = e.target.value;

                let service = new this.google.maps.places.PlacesService(this.map);

                service.textSearch({
                    query: searchText
                }, (results, status) => {
                    if (status == this.google.maps.places.PlacesServiceStatus.OK) {
                        let place = results[0];
                        let pos = {
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng(),
                        };

                        this.setMarker(pos);
                        this.centerMap(pos);
                    } else {
                        toastr.error('Location not found!');
                    }
                });
            }
        },
        mounted(){
            GoogleMapsLoader.KEY = this.config.apiKey;
            GoogleMapsLoader.LIBRARIES = this.config.libraries;
            GoogleMapsLoader.REGION = this.config.region;

            GoogleMapsLoader.load((google) => {
                this.google = google;

                this.initMap();

                if (!this.lat || !this.lng) {
                    // Try HTML5 geolocation.
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition((position) => {
                            let pos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            };

                            this.setMarker(pos);
                            this.centerMap(pos);
                        }, console.log('Unable to check location!'));
                    } else {
                        console.log('Browser doesn\'t support Geolocation!');
                    }
                } else {
                    let pos = {lat: this.lat, lng: this.lng};

                    this.setMarker(pos);
                    this.centerMap(pos);
                }
            });
        }
    }
</script>