const pdfmake = require('pdfmake');
const path = require('path');
const pdfMakePrinter = require('pdfmake/src/printer');

module.exports = function (callback, name, list) {
    var dd = {
        info: {
            title: 'Invoice-01',
            author: 'Author...',
            subject: 'subject...',
            keywords: 'keywords...',
        },
        header: {
            text: 'https://github.com/shammelburg/pdfmakeTemplates',
            link: 'https://github.com/shammelburg/pdfmakeTemplates',
            margin: 15
        },
        footer: {
            text: 'https://github.com/shammelburg/pdfmakeTemplates',
            link: 'https://github.com/shammelburg/pdfmakeTemplates',
            margin: 15
        },
        content: [{
            text: 'Invoice',
            style: 'header'
        },
        {
            columns: [{
                width: '50%',
                stack: [{
                    text: [
                        'Company: ',
                        {
                            text: 'IT Company',
                            style: 'bold'
                        }
                    ]
                },
                {
                    text: [
                        'Email: ',
                        {
                            text: 'first.last@example.com',
                            style: 'bold'
                        }
                    ]
                },
                {
                    text: [
                        'Mobile: ',
                        {
                            text: '0123456789',
                            style: 'bold'
                        }
                    ]
                }
                ]
            },
            {
                width: '50%',
                alignment: 'right',
                style: 'marginBottom',
                stack: [{
                    text: [
                        'To: ',
                        {
                            text: name,
                            style: 'bold'
                        }
                    ]
                },
                    'Address',
                    'City',
                    'County',
                    'Post Code'
                ]
            }
            ]
        },
        {
            text: [
                'Invoice No: ',
                {
                    text: 'INV00001',
                    style: 'bold'
                }
            ]
        },
        {
            text: [
                'Invoice Date: ',
                {
                    text: new Date().toLocaleDateString(),
                    style: 'bold'
                }
            ]
        },
        {
            text: [
                'Payment Terms: ',
                {
                    text: '30 Days',
                    style: 'bold'
                }
            ]
        },
        {
            text: [
                'Reference: ',
                {
                    text: 'Website Development',
                    style: 'bold'
                }
            ],
            style: 'marginBottom'
        },
        {
            style: 'marginBottom',
            table: {
                widths: ['*', 100],
                headerRows: 1,
                body: [
                    [{
                        text: 'Description',
                        bold: true
                    }, {
                        text: 'Cost',
                        bold: true
                    }],
                    ['Design', '£500'],
                    ['Dev', '£1,000']
                ]
            }
        },
        {
            style: 'tableExample',
            table: {
                widths: ['*', 100],
                headerRows: 1,
                body: [
                    [{
                        text: 'Total due on ' + new Date().toLocaleDateString(),
                        bold: false
                    }, {
                        text: '£1,500',
                        bold: true
                    }],
                ]
            }
        }
        ],
        styles: {
            header: {
                alignment: 'right',
                fontSize: 20,
                bold: true,
                margin: [0, 0, 0, 50]
            },
            bold: {
                fontSize: 12,
                bold: true
            },
            marginBottom: {
                margin: [0, 0, 0, 20]
            }
        }
    }



    createPdfBinary(dd, function (base64) {
        console.log('test');
        callback(null, base64);
    });


};

function createPdfBinary(pdfDoc, callback) {
    var fontDescriptors = {
        Roboto: {
            normal: path.join(__dirname, '_assets', '/pdf-templates/fonts/Roboto-Regular.ttf'),
            bold: path.join(__dirname, '_assets', '/pdf-templates/fonts/Roboto-Medium.ttf'),
            italics: path.join(__dirname, '_assets', '/pdf-templates/fonts/Roboto-Italic.ttf'),
            bolditalics: path.join(__dirname, '_assets', '/pdf-templates/fonts/Roboto-MediumItalic.ttf')
        }
    };

    var printer = new pdfMakePrinter(fontDescriptors);

    var doc = printer.createPdfKitDocument(pdfDoc);

    var chunks = [];
    var result;

    doc.on('data', function (chunk) {
        chunks.push(chunk);
    });
    doc.on('end', function () {
        result = Buffer.concat(chunks);
        // return PDF to the browsers
        //callback(result);
        // return PDF as Base64 string
        callback(result.toString('base64'));
    });
    doc.end();
}