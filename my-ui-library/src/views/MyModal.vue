<template>
    <div class="content">
        <h1>Modal window</h1>
        <h4>Dear, friend, we gladly represent you our newest modal window components for your Vue projects.
            We hope that it will satisfy your requirements and will serve you well
        </h4>
        <p>Modal window is an element that occurs on the page after clicking its trigger element.
            Usually, modal widows are used together with forms, for example, to ask user to fill some missing fields or to show some important message</p>
        Modal window component consists of many parts and you have to consider following aspects of its usage:<br>
        <ul>
            <li>Every window will be put on the layer above its trigger. Everything around modal window will be covered by semi-opaque background;</li>
            <li>Header of the modal window will differ stylistically from content or footer and always will be located at the top;</li>
            <li>In the right corner of the header of the modal window cross button will be automatically created.
                By clicking onto this button you can hide modal window</li>
        </ul>
        <h2>Properties</h2>
        <p>On the moment there is a single prop can be specified:</p>
        <DataTable
                name="props_modal"
                :columns="propcolumns"
                :entries="properties"
                :static="true">
        </DataTable>
        <h2>Size</h2>
        <p>Modal window is always displayed in the center of your screen, but you can manage the width of it.
            There are 6 available options depending on the specified prop value.
            If you didn't specify any, the modal window width will depend on width of its content.
            Otherwise it will have fixed width:
        </p>
        <ul>
            <li>xs - 20vw</li>
            <li>sm - 40vw</li>
            <li>md - 60vw</li>
            <li>lg - 80vw</li>
            <li>fs - 100vw</li>
        </ul>
        <h2>Slots</h2>
        <p>One of the best features of our modal window is variety of slots.
            You can put your custom elements in any part of modal window:</p>
        <ul>
            <li>Modal window trigger (you can put there any HTML content, click on which will make modal window visible):
                <div class="code">
                &lt;template v-slot:trigger>&lt;button>This will open modal&lt;/button>&lt;/template>
            </div></li>
            <li>Modal window heading:<div class="code">
                &lt;template v-slot:modal-heading>
                    This comes to the heading
                &lt;/template>
            </div></li>
            <li>Modal window content:<div class="code">
                &lt;Modal>Everything here comes in general slot&lt;/Modal>
            </div></li>
            <li>Modal window footer:<div class="code">
                &lt;template v-slot:modal-footer>
                    This comes to the footer
                &lt;/template>
            </div></li>
        </ul>
        <p>Let's consider an examples where all slots are set:</p>
        <Modal>
            <template v-slot:trigger><button>Modal trigger</button></template>
            <template v-slot:modal-heading>
                Hi, I'm Modal Header
            </template>
            I'm Modal Body. I'm your content<br>
            Put everything you want in me
            <template v-slot:modal-footer>
                And I'm - Modal Footer
            </template>
        </Modal>
        <pre class="code">
    &lt;Modal>
        &lt;template v-slot:trigger>
            &lt;button>Modal trigger&lt;/button>
        &lt;/template>
        &lt;template v-slot:modal-heading>
            Hi, I'm Modal Header
        &lt;/template>
        I'm Modal Body. I'm your content
        Put everything you want in me
        &lt;template v-slot:modal-footer>
            And I'm - Modal Footer
        &lt;/template>
    &lt;/Modal>
        </pre>
        <h2>Events</h2>
        <p>There are 2 events can be emitted due to the nature of modal window:</p>
        <DataTable
                name="events_modal"
                :columns="eventcolumns"
                :entries="events"
                :static="true">
        </DataTable>
        <h3>Open</h3>
        This event is emitted when you click on the element put in the <b>trigger</b> slot.
        After that modal window becomes visible and all other elements on the page become not clickable until you close the modal window
        <h3>Close</h3>
        This event is emitted when you click closing cross in the upper right corner of the modal window or anything outside of the modal window.
        In this case in order to open this window you have to click <b>trigger</b> once again.
        All the content of the modal window isn't getting cleared after it's getting closed
        <h2>That's it, friend. Enjoy modal windows by Chameleon Inc ;)</h2>
    </div>
</template>

<script>
    import Modal from "../components/Modal.vue";
    import DataTable from "../components/DataTable.vue";
    export default {
        name: "MyModal",
        components: {
            DataTable,
            Modal
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
                    {name: "Size", type: "String", default: "md", required: "-", description: "Sets size of the modal window (each size differs from the next one by 20vw)"},
                ],
                eventcolumns: [
                    {title: "Type", value: "type", sortable: true},
                    {title: "Transmitted value", value: "value"},
                    {title: "Description", value: "description"}
                ],
                events: [
                    {type: "open", value: "-", description: "This event occurs when the element in the trigger slot is getting clicked on. After that the modal window becomes visible"},
                    {type: "close", value: "-", description: "This event occurs when the cross or background is getting clicked on. After that the modal window becomes invisible, but doesn't lose information or states"}
                ]
            }
        }
    }
</script>

<style lang="less"></style>