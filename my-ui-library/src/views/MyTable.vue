<template>
    <div class="content">
        <h1>Table</h1>
        <h4>Dear, friend, we gladly represent you our newest table component for your Vue projects.
            We hope that it will satisfy your requirements and will serve you well
        </h4>
        <p>Tables are widely used nowadays, that's why we've created such Vue component that could be adapted to different tasks.
            Since table has many important aspects to explain, this article will slightly differ from other ones providing more detailed information</p>
        <h2>Properties</h2>
        <p>On the moment there are 5 props can be specified:</p>
        <DataTable
                name="props_table"
                :columns="propcolumns"
                :entries="properties"
                :static="true">
        </DataTable>
        <h3>Name</h3>
        Table <b>name</b> is a unique table identifier that serves role similar to id.
        Using table <b>name</b> we distinguish certain table from other ones on the page.
        That's why it is important to use different names for tables on the page,
        if you use same table name for more than one table, you can lose some important data.
        This prop can take any string value, but we recommend you to use words in camel or kebab case for 100% proper work.
        <h3>Columns</h3>
        <p>Columns are the basic and most important parts of the table. Without columns specified, table cannot be built.
            <b>Columns</b> is an array consisting of objects.
            These objects are allowed to have any fields, but there ones that are used for the table:</p>
        <DataTable
                name="cols_table"
                :columns="columnpars"
                :entries="parameters"
                :static="true">
        </DataTable>
        <p>Let's consider an example:</p>
        <DataTable
                name="cols_example"
                :columns="columns"
                :entries="mails"
                :static="true">
        </DataTable>
        <pre class="code">
    &lt;DataTable
            name="cols_example"
            :columns="columns"
            :entries="mails"
            :static="true">
    &lt;/DataTable>
    ...
    data() {
        return {
            columns: [
                {title: '№', value: 'index', editable: false},
                {title: 'Topic', value: 'subject', sortable: true},
                {title: 'Body', value: 'body'},
                {title: 'E-mail', value: 'senderEmail', sortable: true, type: 'email'},
                {title: 'Avatar', value: 'senderAvatar', type: 'url'},
            ],
            mails: [
                {id: 0, subject: "Ho-ho", body: "Bd", senderEmail: "a@mail.ru", senderAvatar: "a.jpg"},
                {id: 1, subject: "Ho-ho-ho", body: "Bdy", senderEmail: "b@gmail.com", senderAvatar: "b.jpg"},
                {id: 2, subject: "Ho-ho-ho-ho", body: "Body", senderEmail: "c@ukr.net", senderAvatar: "c.jpg"}
            ]
        }
    }</pre>
        <p>In this example we created table with 5 columns, where 2 fields (<b>Topic</b> and <b>E-mail</b>) are sortable,
            field <b>№</b> is not editable and fields <b>E-mail</b> and <b>Avatar</b> have specified types.
            As you noticed, entries don't have <b>index</b> field, but it is shown in the table.
            It's because index is automatically added to table entries and can be displayed if it is specified in some column's value</p>
        <h3>Entries</h3>
        <p>Entries are the values to be displayed in the table's body.
            It is recommended to specify entries that have all the values specified in columns.
            But if some value is missing, there will be blank space instead:</p>
        <DataTable
                name="cols_example"
                :columns="columns"
                :entries="[...mails, {id: 3, subject: 'S', senderEmail: 'd@ukr.net'}]"
                :static="true">
        </DataTable>
        <pre class="code">
    &lt;DataTable
            name="cols_example"
            :columns="columns"
            :entries="mails"
            :static="true">
    &lt;/DataTable>
    ...
    data() {
        return {
            columns: [
                {title: '№', value: 'index', editable: false},
                {title: 'Topic', value: 'subject', sortable: true},
                {title: 'Body', value: 'body'},
                {title: 'E-mail', value: 'senderEmail', sortable: true, type: 'email'},
                {title: 'Avatar', value: 'senderAvatar', type: 'url'},
            ],
            mails: [
                {id: 0, subject: "Ho-ho", body: "Bd", senderEmail: "a@mail.ru", senderAvatar: "a.jpg"},
                {id: 1, subject: "Ho-ho-ho", body: "Bdy", senderEmail: "b@gmail.com", senderAvatar: "b.jpg"},
                {id: 2, subject: "Ho-ho-ho-ho", body: "Body", senderEmail: "c@ukr.net", senderAvatar: "c.jpg"},
                {id: 3, subject: 'S', senderEmail: 'd@ukr.net'}
            ]
        }
    }</pre>
        <h3>Sorting</h3>
        <p>You can apply sorting to any column. If you specified <b>sortable: true</b> in your column properties,
        near the column title will be generated sorting button.
            Most of the time string sorting is used.
            But if you specified <b>number</b> as column <b>type</b>, numeric one will be used:</p>
        <DataTable
                name="sort_example"
                :columns="sortCols"
                :entries="sortEntries"
                :static="true">
        </DataTable>
        <pre class="code">
    &lt;DataTable
            name="sort_example"
            :columns="sortCols"
            :entries="sortEntries"
            :static="true">
    &lt;/DataTable>
    ...
    data() {
        return {
            sortCols: [
                {title: 'String', value: 'string', sortable: true},
                {title: 'Numeric', value: 'numeric', type: 'number', sortable: true}
            ],
            sortEntries: [
                {string: "1", numeric: 1},
                {string: "10", numeric: 10},
                {string: "2", numeric: 2},
                {string: "five", numeric: 5},
                {string: "hundred", numeric: 100},
                {string: "!", numeric: -1}
            ]
        }
    }</pre>
        <p>There are 3 sorting states available:</p>
        <ul>
            <li>no sorting</li>
            <li>ascending</li>
            <li>descending</li>
        </ul>
        <p>Icon shows the current sorting direction</p>
        <h3>Search</h3>
        <p>If you want to add search bar to your table, just specify any non-null value to <b>search</b> prop.
            Search mechanism can be easily tuned by setting necessary fields of <b>search</b> prop:</p>
        <DataTable
                name="search_fields"
                :columns="columnpars"
                :entries="searchFields"
                :static="true">

        </DataTable>
        <p>By default, the search is carried out for all columns and it looks for direct match using <b>string.includes()</b>:</p>
        <DataTable
                name="search_example"
                :columns="searchCols"
                :entries="searchEntries"
                :search="{}"
                :static="true">
        </DataTable>
        <pre class="code">
    &lt;DataTable
            name="search_example"
            :columns="searchCols"
            :entries="searchEntries"
            :search="{}"
            :static="true">
    &lt;/DataTable>
    ...
    data() {
        return {
            searchCols: [
                {title: 'Text', value: 'text'},
                {title: 'Number', value: 'number', type: 'number'},
                {title: 'Link', value: 'link'}
            ],
            searchEntries: [
                {text: "Arg", number: 0, link: "23.org"},
                {text: "rg", number: 10, link: ""},
                {text: "Ar", number: 2, link: "link.link"},
                {text: "", number: -1, link: "T-h@u.net"},
                {text: "0 in text", number: 0, link: "AR.g"},
                {text: "TEXT", link: "s.com"},
                {text: "text", number: 23, link: "abc.ru"},
            ]
        }
    }</pre>
        <h4>Fields</h4>
        <p>You can specify for which fields search will be carried out.
            For example, let's restrict search only for <b>link</b> field:</p>
        <DataTable
                name="search_example"
                :columns="searchCols"
                :entries="searchEntries"
                :search="{fields: ['link']}"
                :static="true">
        </DataTable>
        <p>For such purpose we only modified <b>search</b> prop:</p>
        <pre class="code">
    &lt;DataTable
            name="search_example"
            :columns="searchCols"
            :entries="searchEntries"
            :search="{ fields: ['link'] }"
            :static="true">
    &lt;/DataTable></pre>
        <h4>Filters</h4>
        <p>Also we can either restrict or expand search by applying filters.
            In the example above we were looking for strict match.
            Now let's make capital and small letters equal by applying <b>.toLowerCase()</b> filter:</p>
        <DataTable
                name="search_example"
                :columns="searchCols"
                :entries="searchEntries"
                :search="{ filters: [ v => v.toLowerCase()] }"
                :static="true">
        </DataTable>
        <p>You can mix different filters altogether because they all will be applied both to the entry and search value.
            The best way to specify filters is to use arrow functions:</p>
        <pre class="code">
    &lt;DataTable
            name="search_example"
            :columns="searchCols"
            :entries="searchEntries"
            :search="{ filters: [ v => v.toLowerCase()] }"
            :static="true">
    &lt;/DataTable></pre>
        <h3>Static</h3>
        <p><b>Static</b> prop defines whether the table content would be editable.
        If you set <b>static</b> to <b>true</b>, automatically to you table will be added such components:</p>
        <ul>
            <li>ADD button at the top of the table;</li>
            <li>Column 'Actions' at the right side of the table;</li>
            <li>Each entry will have 2 buttons in 'Actions' columns: EDIT and DELETE</li>
        </ul>
        In other words, your table gains support of C-R-U-D operations
        <h3>ApiUrl</h3>
        <p>ApiUrl is used when the table content has to be loaded from backend.
            In such cases you have to leave <b>entry</b> prop empty and specify the link to backend in <b>apiurl</b> prop</p>
        <DataTable
                name="api_example"
                :columns="columns"
                apiurl="https://5e938231c7393c0016de48e6.mockapi.io/api/ps5/emails">
        </DataTable>
        <pre class="code">
    &lt;DataTable
            name="api_example"
            :columns="columns"
            apiurl="https://5e938231c7393c0016de48e6.mockapi.io/api/ps5/emails">
    &lt;/DataTable></pre>
        <p>Every changes applied to this table are sent to backend by specified url,
            and resultant table is displayed using response from backend</p>
        <h3>C-R-U-D</h3>
        <p>For non-static tables set of C-R-U-D is supported.
            It means that you can modify the content of the table in real time.
            The only difference is in the source of your data.
            If the data is transmitted using <b>entries</b> prop,
            the local storage is used to store and update real time state of the table.
            Otherwise, data will be taken from backend by specified <b>apiurl</b> link.
            For local data storage update is not supported,
            it means that all the changes will be applied to current session(!)</p>
        <h4>Create</h4>
        <p>For creation of the new entries the 'ADD' button was added.
            After clicking on it, modal window with all possible fields to be filled will be opened.
            Even if you closed this window, your entered values will be saved until you start other operation</p>
        <h4>Read</h4>
        <p>After each operation data is synchronized with either vuex storage or backend.
            In such way only proper real-time data will be displayed</p>
        <h4>Update</h4>
        <p>Update is carried out by using 'EDIT' button in the 'Actions' column.
            After clicking on it, the modal window with all editable fields is shown.
            Also, these fields will be filled by current values of the entry</p>
        <h4>Delete</h4>
        <p>Deletion of elements is carried out momentarily after clicking on 'DELETE' button in 'Actions' column.
            After that entry will not be present in vuex store or on backend depending on the source of table data.
            There is no forms to fill or ways to cancel this operation</p>
        <h2>Events</h2>
        <DataTable
                name="table_events"
                :columns="eventcolumns"
                :entries="events"
                :static="true">

        </DataTable>
        <p>All the C-R-U-D events are emitted immediately after clicking the button which triggers the table data update ('Save' and 'DELETE').</p>
        <h2>That's it, friend. Enjoy tables by Chameleon Inc ;)</h2>
    </div>
</template>

<script>
    import DataTable from "../components/DataTable";
    export default {
        name: "MyTable",
        components: {
            DataTable
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
                    {name: "Name", type: "String", default: "-", required: "+", description: "Unique name of the table to be stored by"},
                    {name: "Entries", type: "Array of Objects", default: "Empty array object", required: "-", description: "Data to be displayed in the table. For more detailed info, please, read the article about this prop"},
                    {name: "Columns", type: "Array of Objects", default: "-", required: "+", description: "List of columns of the table. For more detailed info, please, read the article about this prop"},
                    {name: "Search", type: "Array of Objects", default: "null", required: "-", description: "List of properties of the search field. For more detailed info, please, read the article about this prop"},
                    {name: "Static", type: "Boolean", default: "false", required: "-", description: "Specifies whether the table content can be modified or not"},
                    {name: "ApiUrl", type: "String", default: "-", required: "-", description: "Link to the backend from which data for table will always be taken"},
                ],
                columnpars: [
                    {title: "Name", value: "name"},
                    {title: "Type", value: "type"},
                    {title: "Required", value: "required"},
                    {title: "Description", value: "description"}
                ],
                parameters: [
                    {name: "title", type: "String", required: "+", description: "Text to be shown in corresponding table head cell"},
                    {name: "value", type: "String", required: "+", description: "Name of the variable or function which will be displayed in the table body"},
                    {name: "type", type: "String", required: "-", description: "Data type of the column content"},
                    {name: "sortable", type: "Boolean", required: "-", description: "Set true to make possible sorting table entries by this column"},
                    {name: "editable", type: "Boolean", required: "-", description: "Set true to make field value editable for this column"}
                ],
                eventcolumns: [
                    {title: "Type", value: "type", sortable: true},
                    {title: "Transmitted value", value: "value"},
                    {title: "Description", value: "description"}
                ],
                events: [
                    {type: "sort", value: "Column object", description: "This event occurs when the element in the trigger slot is getting clicked on. After that the modal window becomes visible"},
                    {type: "input", value: "Search value", description: "This event occurs when the cross or background is getting clicked on. After that the modal window becomes invisible, but doesn't lose information or states"},
                    {type: "post", value: "Object that was put", description: "This event occurs when the cross or background is getting clicked on. After that the modal window becomes invisible, but doesn't lose information or states"},
                    {type: "remove", value: "Object that was removed", description: "This event occurs when the cross or background is getting clicked on. After that the modal window becomes invisible, but doesn't lose information or states"},
                    {type: "put", value: "Object that was edited", description: "This event occurs when the cross or background is getting clicked on. After that the modal window becomes invisible, but doesn't lose information or states"}
                ],
                columns: [
                    {title: '№', value: 'index', editable: false},
                    {title: 'Topic', value: 'subject', sortable: true},
                    {title: 'Body', value: 'body'},
                    {title: 'E-mail', value: 'senderEmail', sortable: true, type: 'email'},
                    {title: 'Avatar', value: 'senderAvatar', type: 'url'},
                ],
                search: {
                    fields: ['subject', 'senderEmail'],
                    filters: [
                        v => v.toLowerCase()
                    ]
                },
                apiURL: "https://5e938231c7393c0016de48e6.mockapi.io/api/ps5/emails",
                mails: [
                    {id: 0, subject: "Ho-ho", body: "Bd", senderEmail: "a@mail.ru", senderAvatar: "a.jpg", receivedAt: "2020-05-01T06:13:49.872"},
                    {id: 1, subject: "Ho-ho-ho", body: "Bdy", senderEmail: "b@gmail.com", senderAvatar: "b.jpg", receivedAt: "2020-04-01T06:13:49.872"},
                    {id: 2, subject: "Ho-ho-ho-ho", body: "Body", senderEmail: "c@ukr.net", senderAvatar: "c.jpg", receivedAt: "2020-03-01T06:13:49.872"}
                ],
                sortCols: [
                    {title: 'String', value: 'string', sortable: true},
                    {title: 'Numeric', value: 'numeric', type: 'number', sortable: true}
                ],
                sortEntries: [
                    {string: "1", numeric: 1},
                    {string: "10", numeric: 10},
                    {string: "2", numeric: 2},
                    {string: "five", numeric: 5},
                    {string: "hundred", numeric: 100},
                    {string: "!", numeric: -1}
                ],
                searchCols: [
                    {title: 'Text', value: 'text'},
                    {title: 'Number', value: 'number', type: 'number'},
                    {title: 'Link', value: 'link'}
                ],
                searchEntries: [
                    {text: "Arg", number: 0, link: "23.org"},
                    {text: "rg", number: 10, link: ""},
                    {text: "Ar", number: 2, link: "link.link"},
                    {text: "", number: -1, link: "T-h@u.net"},
                    {text: "0 in text", number: 0, link: "AR.g"},
                    {text: "TEXT", link: "s.com"},
                    {text: "text", number: 23, link: "abc.ru"},
                ],
                searchFields: [
                    {name: "fields", type: "Array of strings", required: "-", description: "List of fields where search has to be carried out"},
                    {name: "filters", type: "Array of arrow functions", required: "-", description: "Set of arrow functions to be applied to each entry before comparison"}
                ]
            }
        }
    }
</script>

<style lang="less"></style>