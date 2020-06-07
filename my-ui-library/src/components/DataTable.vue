<template>
    <div>
        <div class="table-search">
            <input type="text" @input="filterArray($event.target.value)">
        </div>
        <Modal id="add" size="md">
            <template v-slot:trigger>
                <span class="btn-container"><MyButton variant="primary">ADD</MyButton></span>
            </template>
            <template v-slot:modal-heading>
                Enter new values
            </template>
            <div v-for="column in columns"
                 v-if="column.editable!==false"
                 class="modal-line"
                 :key="column.title">
                <label :for="'add' + column.title">{{column.title + ":"}}</label>
                <input :id="'add' + column.title"
                       :type="column.type" required
                       @input="saveTo(column.value, 'add' + column.title)">
            </div>
            <template v-slot:modal-footer>
                <button @click="post">SAVE</button>
            </template>
        </Modal>
        <table>
            <thead>
            <tr>
                <th v-for="column in columns"
                    :key="column.title">
                    {{column.title}}
                    <button v-if="column.sortable===true"
                            @click="sort(column)">
                        <span>
                            <i :class="classes[states[column.title]]"></i>
                        </span>
                    </button>
                </th>
                <th>Действия</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="(row, index) in sorted">
                <td v-for="column in columns"
                    :key="column.title">
                    {{typeof column.value==="function" ?
                    column.value(row) :
                    column.value==="index" ?
                    index :
                    toDatetime(column.type, row[column.value])}}
                </td>
                <td class="btn-group">
                    <modal>
                        <template v-slot:trigger>
                            <span class="btn-container"><MyButton variant="warning">EDIT</MyButton></span>
                        </template>
                        <template v-slot:modal-heading>
                            Enter updated values
                        </template>
                        <div v-for="column in columns"
                             v-if="column.editable!==false"
                             class="modal-line"
                             :key="column.title">
                            <label :for="'put' + column.title + index">{{column.title + ":"}}</label>
                            <input :id="'put' + column.title + index"
                                   :type="column.type" required
                                   @input="saveTo(column.value, 'put' + column.title + index)"
                                   :value="toDatetime(column.type, row[column.value])">
                        </div>
                        <template v-slot:modal-footer>
                            <button @click="put(row)">SAVE</button>
                        </template>
                    </modal>
                    <MyButton variant="danger" @click="remove(row)">DELETE</MyButton>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import '@fortawesome/fontawesome-free/css/all.css'
    import '@fortawesome/fontawesome-free/js/all.js'
    import MyButton from '@/components/MyButton.vue';
    import Modal from "@/components/Modal";

    export default {

        name: "Table",
        components: {
            Modal,
            MyButton
        },
        props: {
            data: {
                default: () => ([])
            },
            columns: {
                required: true
            },
            search: {
                default: null
            },
            apiurl: {
                type: String
            },
        },
        data() {
            return {
                natural: Array.from(this.data),
                filtered: Array.from(this.data),
                sorted: Array.from(this.data),
                states: {},
                temp: {},
                isLocal: this.data.length !== 0,
                classes: ["fas fa-sort-up", "fas fa-sort", "fas fa-sort-down"]
            }
        },
        async mounted() {
            await this.update();
            this.initializeButtons();
        },
        methods: {
            initializeButtons: function (column) {
                this.columns.forEach(c => {
                    if (c !== column) this.$set(this.states, c.title, 1);
                });
            },
            sort: function (column) {
                this.initializeButtons(column);
                let property = column.value;

                function getValueFor (obj, property) {
                    return typeof property === 'function' ? property(obj) : obj[property]
                }

                let state = this.states[column.title];
                this.states[column.title] = (state + 1) % 3;
                state = this.states[column.title];

                this.sorted = (Array.from(this.filtered)).sort(
                    function (a, b) {
                        const aValue = getValueFor(a, property);
                        const bValue = getValueFor(b, property);
                        return (state - 1) * (isNaN(Number(aValue))
                            ? aValue.localeCompare(bValue)
                            : (aValue - bValue))
                    });
            },
            filterArray: function (value) {
                this.initializeButtons();
                let fields = this.search.fields ? (this.search.fields) : (this.columns.map(x => x.fields));
                let filters = this.search.filters;
                function compare(data) {
                    for (let i = 0; i < fields.length; i++) {
                        if (applyFilters(data[fields[i]], filters).includes(applyFilters(value, filters))) {
                            return true;
                        }
                    }
                    return false;
                }

                function applyFilters(value, filters) {
                    if (filters) {
                        filters.forEach(filter => value = filter(value));
                    }
                    return value;
                }

                this.filtered = Array.from(this.sorted = value ? this.natural.filter(compare) : Array.from(this.natural));
            },
            getData: async function () {
                return this.isLocal ?
                    this.natural :
                    await fetch(this.apiurl, {method : 'GET'}).then(response => response.json())
            },
            saveTo: function (col, id) {
                this.temp[col] = document.querySelector("#" + id).value;
            },
            post: async function () {
                await fetch(this.apiurl, { method: "POST", body: JSON.stringify(this.temp),
                    headers: { "Content-type": "application/json; charset=UTF-8"}});
                this.temp = {};
                await this.update();
                alert("Data is successfully posted and updated")
            },
            put: async function (row) {
                await fetch(this.apiurl + "/" + row.id, { method: "PUT", body: JSON.stringify(this.temp),
                    headers: { "Content-type": "application/json; charset=UTF-8"}});
                this.temp = {};
                await this.update();
                alert("Changes are successfully implemented");
            },
            remove: async function (row) {
                await fetch(this.apiurl + "/" + row.id, { method: "DELETE" });
                await this.update();
                alert("Row is successfully removed");
            },
            update: async function () {
                this.filtered = Array.from(this.sorted = Array.from(this.natural = await this.getData()));
            },
            toDatetime: function(type, value) {
                return (type === "datetime-local" && value.endsWith("Z"))
                    ? value.substring(0, value.length - 1) : value;
            }
        }
    }
</script>

<style lang="less">
    .align-right{
        text-align: right;
    }

    .table-search{
        margin: 1vh 10%;

        input{
            width: 100%;
            background-color: azure;
        }
    }

    .btn-group{
    }

    .btn-container{
    }

    table{
        width: 80vw;
        margin: 0 auto;

        thead{
            color: white;
            background-color: blue;

            tr>th{
                box-shadow: 0 0 3px black;
            }
        }

        tbody{
            background-color: aliceblue;

            tr>td{
                text-align: center;
                box-shadow: 0 0 2px black;
            }
        }
    }
</style>