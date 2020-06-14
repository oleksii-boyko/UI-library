<template>
    <div class="content">
        <h1>Grid</h1>
        <h4>Dear, friend, we gladly represent you our newest grid components for your Vue projects.
            We hope that it will satisfy your requirements and will serve you well
        </h4>
        <p>The main idea of grid is to create specifically positioned containers for elements. <br>
            Grid consists of 2 main components:</p>
        <ul>
            <li>Rows</li>
            <li>Columns</li>
        </ul>
        <p>Only proper combination of these components will result in a required grid.
            In the examples below additional classes were used for making grid elements more expressive.
            By default grid elements have no borders or special colors!)
            Let's consider these examples more precisely</p>
        <h3>Row</h3>
        <p>Row is the flexible container that will occupy full width of the parent element.
            In general layout each row is getting split on 12 columns.
            But since it utilizes flexbox technology it can contain more than 12 columns.
            In such case widths of all the columns are gonna be recalculated to fit row properly (see examples below).
            Let's create a single row without specified columns:
        </p>
        <Row class="bordered">Row content</Row>
        <div class="code">
            &lt;Row>Row content&lt;/Row>
        </div>
        <p>As we see, the <b>&lt;Row></b> element occupies the full width of the parent component and it's content is always centered</p>
        <h3>Column</h3>
        <p>Column is the single cell of the grid system.
            Column occupies the parent component's space in the specified proportion.
            For example, we have general layout and specified size of the column to 2.
            This means that the container of 2/12 width of the parent's width will be created inside the row
        <h2>Properties</h2>
        <p>On the moment there are 4 props for column can be specified:</p>
        <DataTable
                name="props_grid"
                :columns="propcolumns"
                :entries="properties"
                :static="true">
        </DataTable>
        <p>To be fully functional columns have to be covered by rows like in the code below:</p>
        <pre class="code">
    &lt;Row>
        &lt;Column lg="3">3&lt;/Column>
        &lt;Column lg="4">4&lt;/Column>
        &lt;Column lg="5">5&lt;/Column>
    &lt;/Row></pre>
        <p>On the example above we created a row which contains 3 columns.
            Each column occupies it's own specified number of cells (first occupies 3 cells, second - 4 and third - 5).
            In total all three columns occupy 12 cells or a full row
        </p>
        <h2>Size</h2>
        <p>Size of each column can be specified separately for different screen sizes.
             There are 4 screen sizes derived: xs (extra-small), sm (small), md (medium) and lg (large).
            Important note is that you have to specify at least one correct prop value for column to be displayed.
            Props require integer numbers from 0 to 12.<br>
            In the example below column will occupy 3 cells on large screens, 4 on medium and 6 on small ones (try to change screen width in the inspector):</p>
        <Row class="bordered">
            <Column lg="3" md="4" sm="6" class="red_square">Adaptive column</Column>
        </Row>
        <pre class="code">
    &lt;Row>
        &lt;Column lg="3" md="4" sm="6">Adaptive column&lt;/Column>
    &lt;/Row></pre>
        <h2>Examples of use</h2>
        <p>Grid is a pretty straight forward components' system, but for better understanding we've provided few examples of it's use.<br>
            Totally, there are 12 cells available and below the case when all of them are used is shown:
        </p>
        <Row class="bordered">
            <Column lg="1" class="red_square">1 cell</Column>
            <Column lg="5" class="red_square">5 cells</Column>
            <Column lg="6" class="red_square">6 cells</Column>
        </Row>
        <pre class="code">
    &lt;Row>
        &lt;Column lg="1">1 cell&lt;/Column>
        &lt;Column lg="5">5 cells&lt;/Column>
        &lt;Column lg="6">6 cells&lt;/Column>
    &lt;/Row></pre>
        <p>But what happens when the total number of cells is not 12?
            Thankfully, our grid utilizes flexbox and if we have, for example, only 8 cells out of 12 occupied,
            only the space required for 8 columns will be used. Columns are always grouped together in the middle of the row:
        </p>
        <Row class="bordered">
            <Column class="red_square" lg="4">4 cells</Column>
            <Column class="red_square" lg="4">4 cells</Column>
        </Row>
        <pre class="code">
    &lt;Row>
        &lt;Column lg="4">4 cells&lt;/Column>
        &lt;Column lg="4">4 cells&lt;/Column>
    &lt;/Row></pre>
        <p>On other hand, when total number of cells used is more than 12, width of each column will be recalculated proportionally as in the example below:</p>
        <Row class="bordered">
            <Column class="red_square" lg="6">6 cells</Column>
            <Column class="red_square" lg="6">6 cells</Column>
            <Column class="red_square" lg="3">3 cells</Column>
        </Row>
        <pre class="code">
    &lt;Row>
        &lt;Column lg="6">6 cells&lt;/Column>
        &lt;Column lg="6">6 cells&lt;/Column>
        &lt;Column lg="3">3 cells&lt;/Column>
    &lt;/Row></pre>
        <p>Also our grid supports splitting the column on smaller ones.
            This can be carried out in the similar way:</p>
        <Row class="bordered">
            <Column lg="6">
                <Row>
                    <Column class="red_square" lg="1">1/24</Column>
                    <Column class="red_square" lg="7">7/24</Column>
                    <Column class="red_square" lg="4">1/6</Column>
                </Row>
            </Column>
            <Column class="red_square" lg="6">1/2</Column>
        </Row>
        <pre class="code">
    &lt;Row>
        &lt;Column lg="6">
            &lt;Row>
                &lt;Column lg="1">1/24&lt;/Column>
                &lt;Column lg="7">7/24&lt;/Column>
                &lt;Column lg="4">1/6&lt;/Column>
            &lt;/Row>
        &lt;/Column>
        &lt;Column lg="6">1/2&lt;/Column>
    &lt;/Row></pre>
        <p>The last problem we want to consider is what happens when the column content is too big for it.
            The answer is pretty straight forward:</p>
        <Row class="bordered">
            <Column class="red_square" lg="1">I'm really large text for this column</Column>
            <Column class="red_square" lg="1"><div style="width: 200px">I'm big div</div></Column>
        </Row>
        <p>As we see, if it's possible, elements will placed in the way to occupy maximally possible space inside column.
            But sometimes there are elements like <b>&lt;div></b> from the example above width of which is larger than width of a single column.
            For such cases our columns utilize scrollable overflow</p>
        <h2>That's it, friend. Enjoy grids by Chameleon Inc ;)</h2>
    </div>
</template>

<script>
    import Row from "../components/grid/Row.vue";
    import Column from "../components/grid/Column.vue";
    import DataTable from "../components/DataTable.vue";

    export default {
        name: "MyGrid",
        components: {
            DataTable,
            Row,
            Column
        },
        data() {
            return {
                propcolumns: [
                    {title: "Name", value: "name", sortable: true},
                    {title: "Type", value: "type"},
                    {title: "Default value", value: "default"},
                    {title: "Required", value: "required"},
                    {title: "Description", value: "description"}
                ],
                properties: [
                    {name: "xs", type: "String", default: "-", required: "-", description: "Sets the number of columns occupied for the extra-small screens (less than 768 pixels)"},
                    {name: "sm", type: "String", default: "-", required: "-", description: "Sets the number of columns occupied for the small screens (less than 992 pixels)"},
                    {name: "md", type: "String", default: "-", required: "-", description: "Sets the number of columns occupied for the medium screens (less than 1200 pixels)"},
                    {name: "lg", type: "String", default: "-", required: "-", description: "Sets the number of columns occupied for the large screens (less than 1600 pixels)"}
                ],
            }
        }
    }
</script>

<style lang="less">
    .bordered{
        border: 1px solid black;
    }

    .red_square{
        background-color: red;
        color: yellow;
        padding-top: 10px;
        padding-bottom: 10px;
    }
</style>