<template>
    <div class="content">
        <h1>Carousel</h1>
        <h4>Dear, friend, we gladly represent you our newest carousel component for your Vue projects.
            We hope that it will satisfy your requirements and will serve you well
        </h4>
        <p>Carousel is an component that allows showing different pictures with sliding animation.
            These pictures are previously loaded into carousel and page as well.
            Pictures are displayed in the same order as they are put in the array (see example below).
            Click on the left arrow to display previous image or click on the right arrow to display next image.
            If the first of last image is shown, the corresponding arrow will disappear meaning that you cannot shift carousel to that direction.<br>
            <b>Unfortunately, only single carousel on the page is supported. Please, don't use &lt;Carousel> component more than once on the page</b>
        </p>
        <h2>Properties</h2>
        <p>On the moment there is a single prop can be specified:</p>
        <DataTable name="props_carousel"
                   :columns="propcolumns"
                   :entries="properties"
                   :static="true">
        </DataTable>
        <h2>Images</h2>
        <p>Carousel is a pretty simple and very beautiful component.
            You just need to enter array which contains links to the images in order to make carousel workable.<br>
            In the example below we used <b>config</b> variable as a source of initial data.
        </p>
        <Carousel :images="config"></Carousel>
        <div class="code">
            &lt;Carousel :images="config">&lt;/Carousel>
        </div>
        <p>Where <b>config</b> is a variable stored in the component's data:</p>
        <pre class="code">
    data() {
            return {
                config : ["https://loremflickr.com/320/240",
                    "https://loremflickr.com/320/240/dog",
                    "https://loremflickr.com/320/240/paris,girl/all"]
                }
            }</pre>
        <h2>That's it, friend. Enjoy carousels by Chameleon Inc ;)</h2>
    </div>
</template>

<script>
    import DataTable from "../components/DataTable.vue";
    import Carousel from "../components/Carousel.vue";
    export default {
        name: "MyCarousel",
        components: {
            DataTable,
            Carousel
        },
        data() {
            return {
                config : ["https://loremflickr.com/320/240",
                    "https://loremflickr.com/320/240/dog",
                    "https://loremflickr.com/320/240/paris,girl/all"],
                propcolumns: [
                    {title: "Name", value: "name", sortable: true},
                    {title: "Type", value: "type"},
                    {title: "Default value", value: "default"},
                    {title: "Required", value: "required"},
                    {title: "Description", value: "description"}
                ],
                properties: [
                    {name: "images", type: "Array", default: "-", required: "+", description: "Array consisting of the links to the images to be displayed in carousel. Display order is equal to order of links in array"},
                ],
            }
        }
    }
</script>

<style lang="less"></style>