<template>
    <resource-form :resource="resource" submit-text="update" :action="formAction" :redirect-to-resources="false"
                   v-on:success="onSuccess">
        <input type="hidden" name="_method" value="put">
        <slot></slot>
    </resource-form>
</template>
<script>
    export default {
        props: {
            resource: {
                type: String,
                required: true
            },
            id: {
                type: Number,
                required: true
            },
            reloadOnSuccess: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                model: Object
            }
        },
        computed: {
            formAction(){
                return '/api/' + this.resource + '/' + this.id;
            }
        },
        methods: {
            onSuccess(data){
                if (this.reloadOnSuccess) {
                    location.reload();
                }
            }
        }
    }
</script>