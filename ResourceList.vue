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
                <td v-for="column of columns">{{ row[column.name] }}</td>
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
        <div class="panel-body">
            <pagination :url="'/api/' + resource" v-on:data-changed="dataChanged" ref="pagination"></pagination>
        </div>
    </div>
</template>
<style>
    .panel-heading {
        text-transform: capitalize;
    }
</style>
<script>
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
        },
        data(){
            return {
                resources: []
            }
        },
        computed: {
            columnCount(){
                return this.columns.length + (this.hasAction ? 1 : 0)
            },
            hasAction(){
                return this.editable || this.deletable;
            }
        },
        methods: {
            dataChanged(data){
                this.resources = data;
            },
            deleteRow(row){
                if (!confirm('Delete data?')) {
                    return;
                }

                this.$http.delete('/api/' + this.resource + '/' + row.id).then(function (response) {
                    this.$refs.pagination.getData();

                    toastr.success('Data deleted successfully.');
                }, this.$root.handleResponseError);
            }
        }
    }
</script>