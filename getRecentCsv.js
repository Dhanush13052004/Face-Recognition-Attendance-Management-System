const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const directory = 'Attendance';
    fs.readdir(directory, (err, files) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            const csvFiles = files.filter(file => file.endsWith('.csv'));
            if (csvFiles.length > 0) {
                const newestCsv = csvFiles.reduce((prev, current) => {
                    const prevStat = fs.statSync(path.join(directory, prev));
                    const currentStat = fs.statSync(path.join(directory, current));
                    return prevStat.mtimeMs > currentStat.mtimeMs ? prev : current;
                });
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(path.join(directory, newestCsv));
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('No CSV files found');
            }
        }
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
