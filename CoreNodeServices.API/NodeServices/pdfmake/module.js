const path = require('path');
const pdfMakePrinter = require('pdfmake/src/printer');

module.exports = function (callback, name, templateName) {

    let dd = require('./templates/' + templateName)(name);





    createPdfBinary(dd, function (base64) {
        callback(null, base64);
    });
};

function createPdfBinary(pdfDoc, callback) {
    var fontDescriptors = {
        Roboto: {
            normal: path.join(__dirname, './fonts/Roboto-Regular.ttf'),
            bold: path.join(__dirname, './fonts/Roboto-Medium.ttf'),
            italics: path.join(__dirname, './fonts/Roboto-Italic.ttf'),
            bolditalics: path.join(__dirname, './fonts/Roboto-MediumItalic.ttf')
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