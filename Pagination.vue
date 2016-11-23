<template>
    <div class="clearfix">
        <div class="pull-left">
            <button type="button" @click="firstPage" class="btn btn-info"
                    :disabled="page == 1">
                First
            </button>
            <button type="button" @click="prevPage" class="btn btn-default"
                    :disabled="page == 1">
                Previous
            </button>
        </div>

        <div class="pull-right">
            <button type="button" @click="nextPage" class="btn btn-default"
                    :disabled="page == totalPage || totalPage == 0">
                Next
            </button>
            <button type="button" @click="lastPage" class="btn btn-info"
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
                page: 1
            }
        },
        props: {
            totalPage: {
                type: Number,
                default: 1
            }
        },
//        watch: {
//            page(){
//                console.log(this.page);
//            }
//        },
        methods: {
            firstPage(){
                this.page = 1;

                this.$emit('page-changed', this.page);
            },
            lastPage(){
                this.page = this.totalPage;

                this.$emit('page-changed', this.page);
            },
            nextPage(){
                this.page++;

                this.$emit('page-changed', this.page);
            },
            prevPage(){
                this.page--;

                this.$emit('page-changed', this.page);
            }
        }
    }
</script>