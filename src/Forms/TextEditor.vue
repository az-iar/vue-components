<template>
    <textarea
        v-model="content"
        :name="name"
        v-bind="attributes"
    ></textarea>
</template>
<script>
    export default {
        props: {
            value: {
                type: String,
                default: null
            }
        },
        computed: {
            content: {
                get() {
                    return this.value;
                },
                set(value) {
                    this.$emit("input", value);
                }
            },
            attributes() {
                return this.$attrs;
            }
        }
    };
</script>
