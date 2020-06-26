<template>
    <div style="overflow: scroll">
        <div v-if="search" class="table-search">
            <input type="text" @input="filterArray($event.target.value)">
        </div>
        <Modal id="add" size="md" v-if="!static">
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
                <th v-if="!static">Действия</th>
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
                <td v-if="!static" class="btn-group">
                    <modal>
                        <template v-slot:trigger>
                            <span class="btn-container" @click="temp=Object.assign({}, row)"><MyButton variant="warning">EDIT</MyButton></span>
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
                            <button @click="put(row, index)">SAVE</button>
                        </template>
                    </modal>
                    <MyButton variant="danger" @click="remove(row, index)">DELETE</MyButton>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
    import '@fortawesome/fontawesome-free/css/all.css'
    import '@fortawesome/fontawesome-free/js/all.js'
    import MyButton from '@/components/MyButton.vue';
    import Modal from "@/components/Modal.vue";
    import Vue from "vue";

    export default Vue.extend({

        name: "Table",
        components: {
            Modal,
            MyButton
        },
        props: {
            name: {
                type: String,
                required: true
            },
            entries: {
                default: () => ([])
            },
            columns: {
                required: true,
                type: Array
            },
            search: {
                type: Object,
                default: null
            },
            apiurl: {
                type: String
            },
            static: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                natural: Array.from(this.entries) as IEntry[],
                filtered: Array.from(this.entries) as IEntry[],
                sorted: Array.from(this.entries) as IEntry[],
                states: {} as { [key: string] : number},
                temp: {} as IEntry,
                isLocal: this.entries.length !== 0,
                classes: ["fas fa-sort-up", "fas fa-sort", "fas fa-sort-down"]
            }
        },
        async mounted() {
            this.$store.commit("initTable", {
                tableName: this.name,
                initialState: this.entries
            });
            await this.update();
            this.initializeButtons();
        },
        methods: {
            initializeButtons: function (column?: IColumn): void {
                (this.columns as IColumn[]).forEach((c: IColumn) => {
                    if (c !== column) this.$set(this.states, c.title, 1);
                });
            },
            sort: function (column: IColumn): void {
                this.$emit('sort', column);
                this.initializeButtons(column);
                let property: colValue = column.value;

                function getValueFor (obj: IEntry, property: colValue): entryValue {
                    return typeof property === 'function' ? property(obj) : obj[property]
                }

                let state: number = this.states[column.title];
                this.states[column.title] = (state + 1) % 3;
                state = this.states[column.title];

                function isNumber(n: entryValue): n is number {
                    return !isNaN(Number(n))
                }
                this.sorted = (Array.from(this.filtered)).sort(
                    function (a, b): number {
                        const aValue: entryValue = getValueFor(a, property);
                        const bValue: entryValue = getValueFor(b, property);
                        let res = 0;
                        if (isNumber(aValue) && isNumber(bValue)) {
                            res = aValue - bValue;
                        }
                        else if (!isNumber(aValue) && !isNumber(bValue)) {
                            res = aValue.localeCompare(bValue)
                        }
                        return (state - 1) * res;
                    });
            },
            filterArray: function (value: string): void {
                this.$emit('input', value);
                this.initializeButtons();
                let fields: string[] = this.search.fields
                    ? this.search.fields
                    : ((this.columns as IColumn[]).map((x: IColumn) => x.value));
                let filters: strFunction[] = this.search.filters;

                function compare(data: IEntry): boolean {
                    for (let i = 0; i < fields.length; i++) {
                        if (!data[fields[i]]) continue;
                        if (applyFilters(data[fields[i]].toString(), filters).includes(applyFilters(value, filters))) {
                            return true;
                        }
                    }
                    return false;
                }

                function applyFilters(value: string, filters: strFunction[]): string {
                    if (filters) {
                        filters.forEach(filter => value = filter(value));
                    }
                    return value;
                }

                this.filtered = Array.from(this.sorted = value ? this.natural.filter(compare) : Array.from(this.natural));
            },
            getData: async function (): Promise<IEntry[]> {
                return this.isLocal ?
                    this.$store.state.tables[this.name] :
                    await fetch(this.apiurl, {method : 'GET'}).then(response => response.json())
            },
            saveTo: function (col: string, id: string): void {
                let input: HTMLFormElement | null = document.querySelector("#" + id);
                this.temp[col] = input ? input.value : "";
            },
            post: async function (): Promise<void> {
                this.isLocal ? this.$store.commit('post', { entry: this.temp, tableName: this.name })
                    : await fetch(this.apiurl, { method: "POST", body: JSON.stringify(this.temp),
                    headers: { "Content-type": "application/json; charset=UTF-8"}});
                this.$emit('post', this.temp);
                this.temp = {};
                await this.update();
                alert("Data is successfully posted and updated")
            },
            put: async function (row: IEntry, index: number): Promise<void> {
                this.isLocal ? this.$store.commit('put', { entry: this.temp, tableName: this.name, index: index} )
                    : await fetch(this.apiurl + "/" + row.id, { method: "PUT", body: JSON.stringify(this.temp),
                    headers: { "Content-type": "application/json; charset=UTF-8"}});
                this.$emit('put', this.temp);
                this.temp = {};
                await this.update();
                alert("Changes are successfully implemented");
            },
            remove: async function (row: IEntry, index: number): Promise<void> {
                this.isLocal ? this.$store.commit('remove', { tableName: this.name, index: index})
                    : await fetch(this.apiurl + "/" + row.id, { method: "DELETE" });
                this.$emit('remove', row);
                await this.update();
                alert("Row is successfully removed");
            },
            update: async function (): Promise<void> {
                this.filtered = Array.from(this.sorted = Array.from(this.natural = await this.getData()));
            },
            toDatetime: function(type: string, value: entryValue): entryValue {
                return (type === "datetime-local" && typeof value === "string" && value.endsWith("Z"))
                    ? value.substring(0, value.length - 1) : value;
            }
        }
    });

    interface IColumn {
        title: string,
        value: colValue,
        type: string,
        editable?: boolean,
        sortable?: boolean
    }

    interface IEntry {
        [key: string] : entryValue
    }

    type entryValue = string | number;
    type entryFunction = ((e: IEntry) => entryValue);
    type strFunction = (str: string) => string;
    type colValue = string | entryFunction;
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
        width: 100%;
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