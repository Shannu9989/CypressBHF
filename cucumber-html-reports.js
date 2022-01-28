const report = require('multiple-cucumber-html-reporter');
report.generate({
	jsonDir: 'cypress/cucumber-json',
	reportPath: './reports/cucumber-html-report.html',
	metadata:{
        browser: {
            name: 'chrome',
            version: '97'
        },
        device: 'Local test machine',
        platform: {
            name: 'WINDOWS',
            version: '10.0.19042'
        }
    },
    customData: {
        title: 'Run info',
        data: [
            {label: 'Project', value: 'BHF CSR'},
            {label: 'Region', value: 'PILOT2'},
            {label: 'Execution Start Time', value: 'JAN 28th 2022, 02:31 PM EST'},
            {label: 'Execution End Time', value: 'JAN 28th 2022, 02:56 PM EST'}
        ]
    }
});