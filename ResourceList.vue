<template>
    <div class="panel panel-default">
        <!--<div class="panel-heading"><strong>{{ resource }}</strong></div>-->
        <table class="table table-striped">
            <thead>
            <tr>
                <th v-for="column of columns">{{ column.title }}</th>
                <th v-if="hasAction" style="width: 100px;"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="row of resources">
                <td v-for="column of columns" v-html="prepColumnContent(row[column.name])"></td>
                <td v-if="hasAction" class="text-center">
                    <a :href="'/' + resource + '/' + row.id" v-if="editable">
                        <i class="fa fa-edit"></i>
                    </a>
                    <span v-if="editable && deletable"> | </span>
                    <a href="#" class="text-danger" @click.prevent="deleteRow(row)" v-if="deletable">
                        <i class="fa fa-trash"></i>
                    </a>
                </td>
            </tr>
            <tr v-if="resources.length == 0">
                <td :colspan="columnCount">No data</td>
            </tr>
            </tbody>
        </table>
        <div class="panel-body" v-if="paginate">
            <pagination v-on:page-changed="pageChanged" :total-page="pagination.totalPage"
                        ref="pagination"></pagination>
        </div>
    </div>
</template>
<style>
    .panel-heading {
        text-transform: capitalize;
    }
</style>
<script>
    import AutoLinker from 'autolinker';

    export default {
        props: {
            resource: String,
            columns: {
                type: Array,
                required: true
            },
            editable: {
                type: Boolean,
                default: true
            },
            deletable: {
                type: Boolean,
                default: true
            },
            paginate: {
                type: Boolean,
                default: true
            }
        },
        data(){
            return {
                resources: [],
                pagination: {
                    page: 1,
                    totalPage: 1
                }
            }
        },
        computed: {
            columnCount(){
                return this.columns.length + (this.hasAction ? 1 : 0)
            },
            hasAction(){
                return this.editable || this.deletable;
            },
            resourceUrl(){
                return '/api/' + this.resource;
            }
        },
        methods: {
            getData(page){
                let vm = this;

                this.$http.get(this.resourceUrl, {
                    params: {
                        page: page ? page : vm.pagination.page
                    }
                }).then(function (response) {
                    response.json().then(function (res) {
                        vm.resources = res.data;
                        vm.pagination.page = res.meta.pagination.current_page;
                        vm.pagination.totalPage = res.meta.pagination.total_pages;
                    }, function (res) {
                        toastr.error(res.message);
                    });
                });
            },
            pageChanged(page){
                this.getData(page);
            },
            deleteRow(row){
                if (!confirm('Delete data?')) {
                    return;
                }

                this.$http.delete('/api/' + this.resource + '/' + row.id).then(function (response) {
                    this.getData(this.pagination.page);

                    toastr.success('Data deleted successfully.');
                }, this.$root.handleResponseError);
            },
            prepColumnContent(content){
                return AutoLinker.link(content);
            }
        },
        mounted(){
            this.getData();
        }
    }
</script>