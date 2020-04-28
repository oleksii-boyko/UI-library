const tableConfig = {
    parent: 'usersTable',
    columns: [
        {title: '№', value: 'index'},
        {title: 'Имя', value: 'name'},
        {title: 'Фамилия', value: 'surname', sortable: true},
        {title: 'Возраст', value: 'age', type: 'number', sortable: true}
    ],
    search: {
        fields: ['name', 'surname'],
    }
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
        return (Array.from(array)).sort(function(a, b){return isNaN(Number(a[property])) ? calculateIntSine(multiplier) * (a[property].localeCompare(b[property])) : calculateIntSine(multiplier) * (a[property] - b[property])});
    }

    function filterArray(array, fields, value) {

        function compare(data){
            for (let i = 0; i < fields.length; i++){
                if (data[fields[i]] == value){
                    return true;
                }
            }
            return false;
        }
        return array.filter(compare);
    }
}

function calculateIntSine(number) {
    return Math.round(Math.sin(number));
}