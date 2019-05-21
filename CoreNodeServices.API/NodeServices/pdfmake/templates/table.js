module.exports = (list) => {

    var tableHeader = ['Name', 'Age', 'Job'];

    var tableArray = []

    tableArray.push(tableHeader)

    list.forEach(val => {
        var row = [
            val.name,
            {
                alignment: 'right',
                text: val.age,
                fillColor: '#eeeeee',
                border: [false, false, false, false]
            },
            val.job
        ];
        tableArray.push(row)
    })


    return {
        content: [
            {
                layout: 'lightHorizontalLines', // optional
                table: {
                    // headers are automatically repeated if the table spans over multiple pages
                    // you can declare how many rows should be treated as headers
                    headerRows: 1,
                    widths: ['*', 'auto', '*'],

                    body: tableArray
                }
            }
        ]
    }
}