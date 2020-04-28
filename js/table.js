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