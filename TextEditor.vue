<template>
    <textarea :name="name" cols="30" rows="10" class="trumbowed form-control" :placeholder="placeholder"
              v-model="content"></textarea>
</template>
<script>
    import $ from 'jquery';
    import 'trumbowyg';

    export default {
        props: ['name', 'content', 'placeholder'],
        mounted(){
            let vm = this;

            $('.trumbowed').trumbowyg({
                svgPath: '/images/icons/trumbowyg.svg'
            }).on('tbwchange', function (e) {
                vm.$emit('changed', e.target.value);
            });
        }
    }
</script>
