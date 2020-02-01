<script>
    import feather from "feather-icons";

    export default {
        name: "FeatherIcon",
        props: {
            name: {
                type: String,
                required: true
            },
            size: {
                type: Number,
                default: 16
            }
        },
        render(createElement, context) {
            const attributes = Object.assign({class: "align-middle", width: this.size}, this.$attrs);

            return createElement("span", {
                class: {
                    "feather-icon": true
                },
                domProps: {
                    innerHTML: feather.icons[this.name].toSvg(attributes)
                }
            });
        }
    };
</script>