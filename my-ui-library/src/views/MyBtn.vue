<template>
    <div class="content">
        <h1>Button</h1>
        <h4>Dear, friend, we gladly represent you our newest button component for your Vue projects.
            We hope that it will satisfy your requirements and will serve you well
        </h4>
        <p>Button component provides you simple and handy set of buttons that you can use at any vue projects.<br>
        It generates &ltbutton> element with the everything you put in a default slot inside. For example:</p>
        <MyButton><span>Text</span></MyButton>
        <div class="code">
            &lt;MyButton>Text&lt;/MyButton>
        </div>
        <p>In this case will be generated such HTML code:</p>
        <div class="code">
            &lt;button class="my-button medium secondary rounded">&lt;span>Text&lt/span>&lt/button>
        </div>
        <h2>Properties</h2>
        <p>On the moment, there are 3 props that can be specified:</p>
        <DataTable
                name="props_btn"
                :entries="properties"
                :columns="propcolumns"
                :static="true">
        </DataTable>
        <h3>Size</h3>
        <p>Prop <b>size</b> specifies font size of the text inside the button.
            So, it does not affect the size of the block-type content put in the slot.
            There 3 different sizes of buttons available:</p>
        <MyButton size="small">Small</MyButton>
        <MyButton>Medium</MyButton>
        <MyButton size="large">Large</MyButton>
        <div class="code">
            &lt;MyButton size="small">Small&lt;/MyButton><br>
            &lt;MyButton size="medium">Medium&lt;/MyButton><br>
            &lt;MyButton size="large">Large&lt;/MyButton>
        </div>
        <p>As you see, you can neglect setting <b>medium</b> as prop value because it's taken as default one</p>
        <h3>Variant</h3>
        <p>Prop <b>variant</b> specifies the style theme of the button.
            Style theme defines background color, text color, shadow, glowing color,
            change of the pointer and button opacity when the mouse cursor is hovered over the button or the button is pressed.
            There are 9 different button styles available:</p>
        <MyButton>Secondary</MyButton>
        <MyButton variant="primary">Primary</MyButton>
        <MyButton variant="warning">Warning</MyButton>
        <MyButton variant="danger">Danger</MyButton>
        <MyButton variant="success">Success</MyButton>
        <MyButton variant="info">Info</MyButton>
        <MyButton variant="light">Light</MyButton>
        <MyButton variant="dark">Dark</MyButton>
        <MyButton variant="link">Link</MyButton>
        <div class="code">
            &lt;MyButton>Secondary&lt;/MyButton><br>
            &lt;MyButton variant="primary">Primary&lt;/MyButton><br>
            &lt;MyButton variant="warning">Warning&lt;/MyButton><br>
            &lt;MyButton variant="danger">Danger&lt;/MyButton><br>
            &lt;MyButton variant="success">Success&lt;/MyButton><br>
            &lt;MyButton variant="info">Info&lt;/MyButton><br>
            &lt;MyButton variant="light">Light&lt;/MyButton><br>
            &lt;MyButton variant="dark">Dark&lt;/MyButton><br>
            &lt;MyButton variant="link">Link&lt;/MyButton>
        </div>
        <p>As you see, you can neglect setting <b>secondary</b> as prop value because it's taken as default one</p>
        <h3>Shape</h3>
        <MyButton shape="round">Round</MyButton>
        <MyButton shape="square">Square</MyButton>
        <MyButton>Rounded</MyButton>
        <div class="code">
            &lt;MyButton shape="round">Round&lt;/MyButton>
            &lt;MyButton shape="square">Square&lt;/MyButton>
            &lt;MyButton>Rounded&lt;/MyButton>
        </div>
        <p>As you see, you can neglect setting <b>rounded</b> as prop value because it's taken as default one</p>
        <h2>Events</h2>
        <p>Button is a quite simple component, that's why it emits only single event:</p>
        <DataTable
                name="events_btn"
                :entries="events"
                :columns="eventcolumns"
                :static="true">
        </DataTable>
        <h3>Click</h3>
        <p>When the button is getting clicked the <b>'click'</b> event is getting emitted.
            As a value passed with it the DOM element which triggered the event is used</p>
        <h2>That's it, friend. Enjoy buttons by Chameleon Inc ;)</h2>
    </div>
</template>

<script>
    import DataTable from "../components/DataTable.vue";
    import MyButton from "../components/MyButton.vue";

    export default {
        name: "ButtonEx",
        components: {
            DataTable,
            MyButton
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
                    {name: "Size", type: "String", default: "medium", required: "-", description: "Sets font size inside button (small, medium or large)"},
                    {name: "Variant", type: "String", default: "secondary", required: "-", description: "Applies specified style theme to the component"},
                    {name: "Shape", type: "String", default: "rounded", required: "-", description: "Sets the shape of the button element"}
                ],
                eventcolumns: [
                    {title: "Type", value: "type"},
                    {title: "Transmitted value", value: "value"},
                    {title: "Description", value: "description"}
                ],
                events: [
                    {type: "click", value: "button HTML element", description: "This event occurs when the button is getting clicked on"}
                ]
            }
        }
    }
</script>

<style lang="less">
    .content{
        margin: 0 auto;
        @media screen and (max-width: 1600px){
            width: 900px
        }
        @media screen and (max-width: 768px){
            width: 600px;
        }
        @media screen and (max-width: 411px){
            width: 100vw;
        }
    }

    .code{
        margin-top: 5px;
        background-color: aliceblue;
        font-weight: bold;
        padding: 2px;
        box-shadow: 0 0 1px black;
    }
</style>