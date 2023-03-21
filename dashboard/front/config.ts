const fs = require('fs');

fs.copyFile('public/index.html', 'build/www/index.html', (err) => {
    if (err) {
        throw err;
    }
    console.log('Copied index.html!');
});