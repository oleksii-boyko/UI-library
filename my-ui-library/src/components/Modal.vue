<template>
    <div>
        <span @click="open"><slot name="trigger"></slot></span>
        <div class="modal" :style="{visibility : isVisible ? 'visible' : 'hidden'}">
            <div class="background" @click="close"></div>
            <div class="modal-heading">
                <slot name="modal-heading"></slot>
                <button class="cross" @click="close">X</button>
            </div>
            <div class="modal-main">
                <slot></slot>
            </div>
            <div class="modal-footer">
                <slot name="modal-footer"></slot>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Modal",
        props: {
            size: {
                type: String
            }
        },
        methods: {
            close: function () {
                this.isVisible = false;
                this.$emit('close');
            },
            open: function () {
                this.isVisible = true;
                this.$emit('open')
            }
        },
        data(){
            return {
                isVisible: false
            }
        }
    }
</script>

<style lang="less">
    .visible{
        visibility: visible;
    }

    .hidden{
        visibility: hidden;
    }

    .modal{
        top: 20vh;
        left: 20vw;
        background-color: white;
        box-shadow: 0 0 3px black;
        width: 60vw;
        position: fixed;
        z-index: 1;

        button:hover{
            cursor: pointer;
        }

        .modal-heading{
            color: white;
            background-color: rgba(0, 0, 255, 0.4);
            font-weight: bold;
        }

        .modal-main{
            background-color: white;

            .modal-line{
                display: grid;
            }
        }

        .modal-footer{
            background-color: white;
        }
    }

    .cross{
        padding: 0;
        border: 2px solid;
        font-weight: bold;
        float: right;
        background: rgba(0, 0, 0, 0);
        border-radius: 20%;
        color: white;
    }

    .background{
        background: rgba(0, 0, 0, 0.3);
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: -1;
    }

    @max_shift: 9;
    @sizes: xs, sm, md, lg, fs;

    .generateSizes(@sizes, @index) when (@index > 0){
        @size: extract(@sizes, @index);
        .@{size}{
        width: @index * 20vw;
    }
        .generateSizes(@sizes, @index - 1);
    }
    .generateSizes(@sizes, length(@sizes));
</style>