const nodemailer = require('nodemailer');
const mailerhbs = require('nodemailer-express-handlebars');

const nodemailerOptions = require('./config');
const transporter = nodemailer.createTransport(nodemailerOptions);
const handlebarOptions = {
    viewEngine: {
        extName: '.hbs',
        partialsDir: './NodeServices/nodemailer/templates',
        layoutsDir: './NodeServices/nodemailer/templates',
        defaultLayout: 'registration.hbs'
    },
    viewPath: './NodeServices/nodemailer/templates',
    extName: '.hbs'
};

transporter.use('compile', mailerhbs(handlebarOptions));

module.exports = function (callback, user) {

    var mailOptions = {
        from: '"NodeServices" <node-services@node-services.com>',
        to: [
            user.email
        ],

        subject: 'Sending Email using NodeServices',
        //html: body,
        //Name email file template
        template: 'registration',
        // pass variables to template
        context: {
            name: user.name,
            list: [{
                age: 33,
                firstName: 'A',
                lastName: 'B'
            }, {
                age: 26,
                firstName: 'C',
                lastName: 'D'
            }]
        },
        // https://nodemailer.com/message/attachments/
        attachments: [
            { // utf-8 string as an attachment
                filename: 'text1.txt',
                content: 'hello world!'
            },
            { // use URL as an attachment
                filename: 'LittleAspNetCoreBook.pdf',
                path: 'https://s3.amazonaws.com/recaffeinate-files/LittleAspNetCoreBook.pdf'
            }
        ]
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            callback(null, error);
        } else {
            console.log('Email sent: ' + info.response);
            callback(null, info);
        }
    });
};