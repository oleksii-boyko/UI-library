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

DataTable(tableConfig, users);

function DataTable(config, data) {
    let parent = document.getElementById(config.parent);

    if (config["search"]){
        parent.appendChild(createSearchBar());
    }

    function createSearchBar() {
        let bar = document.createElement("div");
        bar.classList.add("table-search");
        let input = document.createElement("input");
        input["type"] = "text";
        input.addEventListener("input", function () {
            let fields;
            fields = (config["search"])["fields"] ? (config["search"])["fields"] : (config["columns"]).map(x => x["value"]);

            let body = (table.getElementsByTagName("tbody")[0]);
            table.removeChild(body);
            table.appendChild(createBody(config, (input.value) ? filterArray(data, fields, input.value, config.search.filters) : data));
        });
        bar.appendChild(input);
        return bar;
    }

    const table = document.createElement("table");
    table.appendChild(createHead());
    table.appendChild(createBody(config, data));
    parent.appendChild(table);

    function createHead() {
        const head = document.createElement("thead");
        const content = document.createElement("tr");
        head.appendChild(content);
        config.columns.forEach(createColumn);

        function createColumn(colElement) {
            const column = document.createElement("th");
            column.innerHTML = colElement["title"];

            if (colElement["sortable"] === true){
                let sortButton = document.createElement("button");
                sortButton.classList.add("sort-button");
                let icon = document.createElement("i");
                icon.classList.add("fas");
                icon.classList.add("fa-sort");
                sortButton.appendChild(icon);
                sortButton["state"] = 0;

                sortButton.addEventListener("click", function () {
                    let buttons = document.getElementsByClassName("sort-button");

                    for (let i = 0; i < buttons.length; i++){
                        discardButton(buttons[i]);
                    }

                    function discardButton(button){
                        if (button !== sortButton){
                            button["state"] = 0;
                            setActualClass(button);
                        }
                    }

                    sortButton["state"] += Math.PI / 2;
                    setActualClass(sortButton);

                    let body = (table.getElementsByTagName("tbody")[0]);
                    table.removeChild(body);
                    table.appendChild(createBody(config, sortArray(data, colElement["value"], sortButton["state"])));
                });

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
                column.appendChild(sortButton);
            }
            content.appendChild(column);
        }
        return head;
    }

    function createBody(config, data) {
        const body = document.createElement("tbody");
        let index = 1;
        data.forEach(createRow);

        function createRow(rowContent) {
            rowContent["index"] = index;
            const row = document.createElement("tr");
            config.columns.forEach(createColumn);
            body.appendChild(row);

            function createColumn(colElement) {
                const col = document.createElement("td");
                col.innerHTML = rowContent[colElement.value];
                if (colElement.type === "number"){
                    col.classList.add("align-right");
                }
                row.appendChild(col);
            }

            index++;
        }
        return body;
    }

    function sortArray(array, property, multiplier) {
        return (Array.from(array)).sort(function(a, b){return calculateIntSine(multiplier) * isNaN(Number(a[property])) ? (a[property].localeCompare(b[property])) : (a[property] - b[property])});
    }

    function filterArray(array, fields, value, filters) {

        function compare(data){
            for (let i = 0; i < fields.length; i++){
                if (applyFilters(data[fields[i]], filters) == applyFilters(value, filters)){
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
}

function calculateIntSine(number) {
    return Math.round(Math.sin(number));
}