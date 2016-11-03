<template>
    <div class="clearfix">
        <div class="pull-left">
            <button type="button" @click="getData(1)" class="btn btn-info"
                    :disabled="page == 1">
                First
            </button>
            <button type="button" @click="getData(page - 1)" class="btn btn-default"
                    :disabled="page == 1">
                Previous
            </button>
        </div>

        <div class="pull-right">
            <button type="button" @click="getData(page + 1)" class="btn btn-default"
                    :disabled="page == totalPage || totalPage == 0">
                Next
            </button>
            <button type="button" @click="getData(totalPage)" class="btn btn-info"
                    :disabled="page == totalPage || totalPage == 0">
                Last
            </button>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                page: 1,
                totalPage: 1,
                data: []
            }
        },
        props: ['url', 'urlParams'],
        methods: {
            getData(page){
                let vm = this;

                this.$http.get(this.url, {
                    params: {
                        page: page ? page : this.page
                    }
                }).then(function (response) {
                    response.json().then(function (res) {
                        vm.data = res.data;
                        vm.page = res.meta.pagination.current_page;
                        vm.totalPage = res.meta.pagination.total_pages;
                        vm.$emit('data-changed', vm.data);
                    });
                });
            }
        },
        mounted(){
            this.getData();
        }
    }
</script>