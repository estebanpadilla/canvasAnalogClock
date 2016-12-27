const http = require('http');
const fs = require('fs');
const port = 3000;
const hostname = '127.0.0.1';
const filename = 'index.html';

fs.readFile(filename, (err, html) => {
    if (err) {
        throw err;
    }

    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'type/html');
        res.write(html);
        res.end();
    });

    server.listen(port, hostname, () => {
        console.log('running');
    });
});