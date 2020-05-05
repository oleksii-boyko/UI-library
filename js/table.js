import {initializeModal} from "./modal.js";
import {createElement} from "./support.js";
import {hide} from "./modal.js";
import {show} from "./modal.js";

const tableConfig = {
    parent: 'usersTable',
    columns: [
        {title: '№', value: 'index', editable: false},
        {title: 'Тема', value: 'subject', sortable: true},
        {title: 'Тело', value: 'body'},
        {title: 'Почта', value: 'senderEmail', sortable: true, type: 'email'},
        {title: 'Аватар', value: 'senderAvatar', type: 'url'},
        //{title: 'Возраст', value: (user) => calculateTime(user['receivedAt']), type: 'number', sortable: true},
        {title: 'Получено', value: 'receivedAt', type: 'datetime-local'}
    ],
    search: {
        fields: ['subject', 'senderEmail'],
        filters: [
            v => v.toLowerCase()
        ]
    },
    apiURL: "https://5e938231c7393c0016de48e6.mockapi.io/api/ps5/emails"
};

const users = [
    {id: 30050, name: 'Вася', surname: 'Петров', age: 12},
    {id: 30051, name: 'Вася', surname: 'Васечкин', age: 15},
    {id: 22833, name: 'Вася', surname: 'Как смешно', age: 18},
    {id: 32222, name: 'Серьезно?', surname: 'Вася?', age: 14}
];

DataTable(tableConfig);

async function DataTable(config, data) {
    if (!data){
        data = await getData();
    }

    async function getData() {
        return await fetch(config.apiURL, {method : 'GET'}).then(response => response.json());
    }

    let currentState = Array.from(data);
    let parent = document.getElementById(config.parent);

    if (config["search"]){
        createSearchBar(parent);
    }

    function createSearchBar(parent) {
        const bar = createElement("div", parent, "", "table-search");
        const input = createElement("input", bar);
        input["type"] = "text";
        input.addEventListener("input", function () {
            let fields = (config["search"])["fields"] ? (config["search"])["fields"] : (config["columns"]).map(x => x["value"]);

            currentState = Array.from(data);
            updateBody((input.value) ? currentState = filterArray(currentState, fields, input.value, config.search.filters) : currentState);
            discardOtherButtons(table.getElementsByClassName("sort-button"))
        });
    }

    let topBar = createElement("div", parent, "", "btn-group");
    let addBtn = createElement("button", topBar, "ADD", "mybtn-primary mybtn-large add");
    addBtn.name = "add";
    createModal(parent, addBtn, false, "POST");

    const table = createElement("table", parent);
    createHead(table);
    createBody(config, currentState);

    function createHead(table) {
        const head = createElement("thead", table);
        const content = createElement("tr", head);
        config.columns.forEach(createColumn);

        function createColumn(colElement) {
            const column = createElement("th", content, colElement["title"]);

            if (colElement["sortable"] === true){
                let sortButton = createElement("button", column, "", "sort-button");
                let icon = createElement("i", sortButton, "", "fas fa-sort");
                sortButton["state"] = 0;

                sortButton.addEventListener("click", function () {
                    discardOtherButtons(table.getElementsByClassName("sort-button"), sortButton);

                    sortButton["state"] += Math.PI / 2;
                    setActualClass(sortButton);

                    updateBody( sortArray(currentState, colElement["value"], sortButton["state"]));
                });
            }
        }

        let actions = createElement("th", content, "Действия");
    }

    function createBody(config, data) {
        const body = createElement("tbody", table);
        let index = 1;
        data.forEach(createRow);

        function createRow(rowContent) {
            rowContent["index"] = index;
            const row = createElement("tr", body);
            config.columns.forEach(createColumn);

            function createColumn(colElement) {
                const col = createElement("td", row,
                    typeof colElement.value === "function"
                    ? colElement.value(rowContent)
                    : rowContent[colElement.value]);
                if (colElement["type"] === "number"){
                    col.classList.add("align-right");
                }

                col.innerHTML = rowContent[colElement.value]
                    = toDatetime(colElement["type"], rowContent[colElement.value]);
            }

            const btnGroup = createElement("td", row, "", "btn-group");

            const deleteBtn = createElement("button", btnGroup, "DELETE", "mybtn-danger");
            deleteBtn.addEventListener('click', async function () {
                await fetch(config.apiURL + "/" + rowContent["id"], { method: 'DELETE'});
                updateBody(currentState = data = await getData());
            });

            const editBtn = createElement("button", btnGroup, "EDIT", "mybtn-warning show");
            editBtn.name = rowContent["id"];
            createModal(btnGroup, editBtn, true, "PUT", rowContent);
            index++;
        }
    }

    function createModal(parent, trigger, filled, type, row = {}) {
        let modal = createElement("div", parent, "", "modal md t-1 l-1");
        modal["id"] = trigger["name"];

        trigger.addEventListener('click', function () {
            show(modal);
        });

        let modalHeading = createElement("div", modal,  "Enter new values", "modal-heading p1");
        let modalBody = createElement("form", modal, "", "modal-main modal-form");

        addInputs(modalBody, filled, row);

        let modalFooter = createElement("div", modal, "", "modal-footer p1");

        initializeModal(modal);

        let saveBtn = createElement("button", modalFooter, "SAVE", "mybtn-info hide");
        saveBtn.name = modal["id"];
        saveBtn.type = "submit";
        saveBtn.addEventListener('click', async function () {
            hide(modal);
            for (let i = 0; i < config.columns.length; i++){
                if (config.columns[i].editable === false){
                    continue;
                }
                row[config.columns[i].value] =
                    document.getElementById(modal["id"] + config.columns[i].title).value;
            }
            await fetch(type === "PUT" ? config.apiURL + "/" + row["id"] : config.apiURL,
                { method: type, body: JSON.stringify(row), headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }});
            updateBody(currentState = data = await getData());
        });

        function addInputs(parent, filled, row) {
            for (let i = 0; i < config.columns.length; i++){
                if (config.columns[i].editable === false){
                    continue;
                }
                let label = createElement("label", parent, (config.columns[i])["title"] + ":");

                let input = createElement("input", parent);
                input["id"] = modal["id"] + config.columns[i].title;
                input.required = true;

                if ((config.columns[i])["type"]){
                    input["type"] = (config.columns[i])["type"];
                }

                if (filled) {
                    input.defaultValue = row[(config.columns[i]).value];
                    input.defaultValue = toDatetime(input["type"], input.defaultValue);
                }

                label["for"] = input["id"];
            }
        }
    }

    function sortArray(array, property, multiplier) {
        return (Array.from(array)).sort(
            function(a, b){
                const aValue = getValueFor(a, property);
                const bValue = getValueFor(b, property);
                return calculateIntSine(multiplier) * (isNaN(Number(aValue))
            ? aValue.localeCompare(bValue)
            : (aValue - bValue))});
    }

    function filterArray(array, fields, value, filters) {

        function compare(data){
            for (let i = 0; i < fields.length; i++){
                if (applyFilters(data[fields[i]], filters).includes(applyFilters(value, filters))){
                    return true;
                }
            }
            return false;
        }
        return array.filter(compare);

        function applyFilters(value, filters) {
            if (filters){
                filters.forEach(filter => value = filter(value));
            }
            return value;
        }
    }

    function updateBody(newData) {
        let body = (table.getElementsByTagName("tbody")[0]);
        table.removeChild(body);
        createBody(config, newData);
    }
}

function toDatetime(type, value) {
    return (type === "datetime-local" && value.endsWith("Z"))
        ? value.substring(0, value.length - 1) : value;
}

function getValueFor(obj, property) {
    return typeof property === 'function' ? property(obj) : obj[property]
}

function discardOtherButtons(buttons, refButton) {
    for (let i = 0; i < buttons.length; i++) {
        discardButton(buttons[i]);
    }

    function discardButton(button) {
        if (button !== refButton) {
            button["state"] = 0;
            setActualClass(button);
        }
    }
}

function setActualClass(button) {
    let buttonClasses = button.firstChild.classList;
    for (let i = 0; i < buttonClasses.length; i++) {
        if (buttonClasses[i].includes("fa-")) {
            buttonClasses.remove(buttonClasses[i]);
            buttonClasses.add(obtainActualClass(button["state"]));
            break;
        }
    }
}

function obtainActualClass(state) {
    if (calculateIntSine(state) === -1){
        return "fa-sort-down"
    }
    else if (calculateIntSine(state) === 0){
        return "fa-sort"
    }
    else if (calculateIntSine(state) === 1){
        return "fa-sort-up"
    }
}

function calculateAge(birthday) {
    let currentDate = new Date();
    let age = currentDate.getFullYear() - birthday.getFullYear();
    return (currentDate.getMonth() > birthday.getMonth()
        || (currentDate.getMonth() === birthday.getMonth()
            && currentDate.getDay() >= birthday.getDay())) ? age : age - 1;
}

function calculateTime(refTime) {
    let currentDate = new Date();
    let ref = new Date(refTime);
    const MINUTES_IN_HOUR = 60;
    const SECONDS_IN_MINUTE = 60;
    const MILLISECONDS_IN_SECOND = 1000;
    return Math.round((currentDate.getTime() - ref.getTime()) / MINUTES_IN_HOUR / SECONDS_IN_MINUTE / MILLISECONDS_IN_SECOND);
}

function calculateIntSine(number) {
    return Math.round(Math.sin(number));
}