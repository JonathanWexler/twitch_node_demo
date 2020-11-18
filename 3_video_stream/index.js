import { createServer } from 'http';
import { stat, createReadStream } from 'fs';
import { promisify } from 'util';

const fileName = './video.mp4'
const fileInfo = promisify(stat);

createServer(async (req, res) => {
  const { size } = await fileInfo(fileName);
  const range = req.headers.range;
  let streamOptions = {}
  let headOptions = {}
  let statusCode = 200

  if (range) {
    let [start, end] = range.replace(/bytes=/, '').split('-');
    start = parseInt(start, 10);
    end = end ? parseInt(end, 10) : size - 1;
    statusCode = 206
    headOptions = {
       'Content-Range': `bytes ${start}-${end}/${size}`,
       'Accept-Ranges': 'bytes',
       'Content-Length': (end-start) + 1,
       'Content-Type': 'video/mp4'
    };
    streamOptions = { start, end }
  } else {
    headOptions = {
      'Content-Length': size,
      'Content-Type': 'video/mp4'
    };
  }
  res.writeHead(statusCode, headOptions);
  createReadStream(fileName, streamOptions).pipe(res);
}).listen(3000, () => console.log('Server started on port 3000'));