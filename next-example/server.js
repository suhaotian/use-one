const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === '/a') {
        await app.render(req, res, '/a', query);
      } else if (pathname === '/b') {
        await app.render(req, res, '/b', query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, async () => {
      const domain = `http://${hostname}:${port}`;
      await Promise.all([
        fetch(`${domain}/api/revalidate`).then((res) => res.text()),
        fetch(`${domain}`).then((res) => res.text()),
        fetch(`${domain}`).then((res) => res.text()),
      ]);
      if (process.send) {
        console.log(`process.send('ready');`);
        process.send('ready');
      }
      console.log(`> Ready on ${domain}`);
    });
});

process.on('SIGINT', function () {
  // db.stop(function (err) {
  //   process.exit(err ? 1 : 0);
  // });
  process.exit(0);
});
