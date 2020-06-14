<template>
    <div class="carousel">
        <button v-if="index>0" class="carousel-button left" @click="prev">
            <i class="fas fa-chevron-left"></i>
        </button>
        <div class="carousel-main">
            <ul class="carousel-content">
                <li v-for="(image, i) in images"
                    class="carousel-image"
                    :class="{current : index===i}"
                    :key="image + i">
                    <img :src="image">
                </li>
            </ul>
        </div>
        <button v-if="index<images.length-1" class="carousel-button right" @click="next">
            <i class="fas fa-chevron-right"></i>
        </button>
    </div>
</template>

<script>
    import '@fortawesome/fontawesome-free/css/all.css'
    import '@fortawesome/fontawesome-free/js/all.js'
    export default {
        name: "Carousel",
        props: {
            images: {
                Type: Array,
                required: true
            }
        },
        methods: {
            next: function () {
                this.shiftTo(document.querySelector(".current").nextElementSibling);
                this.index++;
            },
            prev: function () {
                this.shiftTo(document.querySelector(".current").previousElementSibling);
                this.index--;
            },
            shiftTo(target) {
                document.querySelector(".carousel-content").style.transform = 'translateX(-' + target.style.left + ')';
            }
        },
        mounted() {
            const images = document.querySelectorAll(".carousel-image");
            let shift = 0;
            images.forEach(i => {
                i.style.left = shift + 'px';
                shift += i.getBoundingClientRect().width;
            });
        },
        data(){
            return {
                index: 0,
                shift: 0
            }
        }
    }
</script>

<style lang="less">
    .carousel{
        position: relative;
        width: 30vw;
        height: 30vh;
        margin: 0 auto;

        .carousel-main{
            position: relative;
            height: 100%;
            overflow: hidden;

            .carousel-content{
                position: relative;
                height: 100%;
                transition: transform 250ms ease-in;

                .carousel-image{
                    width: 100%;
                    list-style: none;
                    position: absolute;
                    top: 0;
                    left: 0;
                }
            }
        }

        .carousel-button{
            position: absolute;
            top: 50%;
            font-size: xx-large;
            cursor: pointer;
            background: none;
            border: none;
            outline: none;
        }

        .left{
            left: -4vw;
        }

        .right{
            right: -4vw;
        }
    }
</style>