const express = require('express');
const fs = require('fs');
const { promisify } = require('util');
const path = require('path');
const app = express();

const fsStat = promisify(fs.stat);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.htm'));
});

app.get('/video', async function (req, res) {
    const path = 'assets/sample.mp4';
    const stat = await fsStat(path);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        let end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize - 1;

        if (start >= fileSize) {
            res.status(416).send('Requested range not satisfiable\n' + start + ' >= ' + fileSize);
            return;
        }

        const chunksize = Math.min(end - start + 1, 1024 * 1024);
        end = Math.min(end, start + chunksize);
        const file = fs.createReadStream(path, { start, end })
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4'
        };

        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
    }
});

app.listen(3000, function () {
    console.log('Listening on port 3000!');
});
