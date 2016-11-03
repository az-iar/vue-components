<template>
    <textarea :name="name" cols="30" rows="10" class="trumbowed form-control" :placeholder="placeholder"><slot></slot></textarea>
</template>
<script>
    let $ = window.jQuery;
    import 'trumbowyg';

    export default {
        props: ['name', 'placeholder'],
        mounted(){
            let vm = this;

            $.trumbowyg.svgPath = '/images/trumbowyg-icons.svg';

            $('.trumbowed').trumbowyg().on('tbwchange', function (e) {
                vm.$emit('changed', e.target.value);
            });
        }
    }
</script>