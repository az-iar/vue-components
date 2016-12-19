<template>
    <form :action="formAction" enctype="multipart/form-data" @submit.prevent="submit">
        <div class="panel panel-default">
            <div class="panel-body">
                <slot></slot>
            </div>
            <div class="panel-footer">
                <button type="submit" class="btn btn-primary" :disabled="processing" v-if="!readOnly">
                    <span v-if="processing"><i class="fa fa-spinner fa-spin"></i> Processing..</span>
                    <span v-else>{{ submitText }}</span>
                </button>
                <a :href="'/' + resource" class="btn btn-default">Back</a>
            </div>
        </div>
    </form>
</template>
<style>
    .btn {
        text-transform: capitalize;
    }
</style>
<script>
    import pluralize from 'pluralize';
    import capitalize from 'capitalize';

    export default {
        props: {
            resource: {
                type: String,
                required: true
            },
            submitText: {
                type: String,
                default: 'create'
            },
            action: String,
            redirectToResources: {
                type: Boolean,
                default: true
            },
            refreshAfterSubmit: {
                type: Boolean,
                default: false
            },
            readOnly: {
                type: Boolean,
                default: false
            },
        },
        data(){
            return {
                processing: false
            }
        },
        computed: {
            formAction(){
                return this.action ? this.action : '/api/' + this.resource;
            }
        },
        methods: {
            submit(e){
                let vm = this;
                let form = e.target;
                let formData = new FormData(form);

                vm.processing = true;

                this.$http.post(form.action, formData).then(function (response) {
                    vm.processing = false;

                    response.json().then(function (res) {
                        vm.$emit('success', res.data);
                    });

                    toastr.success(pluralize(capitalize(this.resource), 1) + ' ' + vm.submitText + 'd successfully.');

                    if (vm.redirectToResources) {
                        setTimeout(function () {
                            window.location = '/' + vm.resource;
                        }, 1000);
                    }
                }).catch(function (response) {
                    vm.processing = false;

                    vm.$root.handleResponseError(response);
                });
            }
        }
    }
</script>