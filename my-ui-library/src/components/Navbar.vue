<template>
    <div class="nav-menu" :style="{backgroundColor : background}">
        <span class="brand">
            <span class="burger" @click="changeState">
                <span class="icon" :style="{visibility: isFolded ? 'hidden' : 'visible'}"><i class="fas fa-times"></i></span>
                <span class="icon" :style="{visibility: !isFolded ? 'hidden' : 'visible'}"><i class="fas fa-align-justify"></i></span>
            </span>
            <slot name="brand"></slot></span>
        <span class="menu" :style="{display: isFolded ? 'none' : 'flex'}"><slot name="menu"></slot></span>
    </div>
</template>

<script>
    export default {
        name: "Navbar",
        props: {
            background: {
                default: 'blue',
                required: false
            }
        },
        methods: {
            changeState: function () {
                this.isFolded = !this.isFolded;
                this.$emit('click');
            }
        },
        data() {
            return {
                isFolded: false
            }
        }
    }
</script>

<style lang="less">
    .nav-menu{
        text-align: center;
        display: flex;
        justify-content: space-between;
        vertical-align: center;
        flex-direction: row;

        @media screen and (max-width: 768px){
            flex-direction: column;
        }

        .brand{
            vertical-align: center;
            font-weight: bolder;
            color: white;
            padding: 1vh 0;
        }

        .burger{
            display: none;
            position: absolute;

            @media screen and (max-width: 768px){
                display: block;
            }

            :hover{
                cursor: pointer;
            }

            .icon{
                position: absolute;
            }
        }
        .menu{
            width: 100%;
            vertical-align: center;
            display: flex;
            justify-content: space-around;
            flex-direction: row;

            @media screen and (max-width: 768px){
                flex-direction: column;
            }

            a{
                width: 100%;
                text-decoration: none;
                color: white;
                font-weight: bold;
                padding: 1vh 0;

                @media screen and (max-width: 768px){
                    box-shadow: 0 0 5px white;
                }
            }
        }
    }
</style>