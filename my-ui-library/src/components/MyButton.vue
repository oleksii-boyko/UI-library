<template>
    <button :id="id" :class=classes @click="makeClick($event.target)">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: "MyButton",
        props: {
            size: {
                type: String,
                default: "medium",
                validator: function (size) {
                    return ["small", "medium", "large"].includes(size);
                }
            },
            variant: {
                type: String,
                default: "secondary",
                validator: function (variant) {
                    return ["primary", "secondary", "success", "danger", "warning", "info",
                        "light", "dark", "link"].includes(variant);
                }
            }
        },
        methods : {
            makeClick(target) {
                this.$emit('click', target);
            }
        },
        data() {
            return {
                classes: this.size + " " + this.variant
        }
        }
    }
</script>

<style lang="less" scoped>
    button {
        color: black;
        background: whitesmoke;
        opacity: 0.85;
        border-radius: 5px;
        padding: 0.5vh 1vw 1vh;
        text-align: center;
        vertical-align: middle;
        font-family: Arial, Helvetica, sans-serif;
        cursor: default;
        display: inline-block;
        text-decoration: none;

        &:visited {
            opacity: 1;
        }

        &:hover {
            cursor: pointer;
            opacity: 0.7;
        }

        &:active {
            opacity: 1;
        }
    }

    @colors: blue, gray, green, red, yellow, cyan, silver, black, white;
    @text_colors: white, white, white, white, black, white, black, white, blue;
    @names: primary, secondary, success, danger, warning, info, light, dark, link;
    @styles: length(@colors);

    @sizes_names: small, medium, large;
    @sizes: 1, 1.5, 2;
    @sizes_num: length(@sizes);

    .styles(@names, @colors, @text_colors, @index) when (@index > 0) {

        @name: extract(@names, @index);
        @color: extract(@colors, @index);
        @text_color: extract(@text_colors, @index);

        .@{name} {
            color: @text_color;
            background-color: @color;

            &:visited when ('@{name}'="link") {
                color: blueviolet;
                text-decoration: underline;
            }

            &:hover {
                box-shadow: 0 0 10px lighten(@color, 10%);
            }

            &:hover when ('@{name}'="link") {
                text-decoration: underline;
            }

            &:active when ('@{name}'="link") {
                color: blueviolet;
                text-decoration: underline;
            }
        }
        .styles(@names, @colors, @text_colors, @index - 1)
    }

    .styles(@names, @colors, @text_colors, @styles);

    .sizes(@sizes_names, @sizes, @index) when (@index > 0) {

        @name: extract(@sizes_names, @index);
        @size: extract(@sizes, @index);

        .@{name} {
            font-size: 75% * @size;
        }

        .sizes(@sizes_names, @sizes, @index - 1);
    }

    .sizes(@sizes_names, @sizes, @sizes_num);

</style>