const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const overview = fs.readFileSync(
	`${__dirname}/templates/overview.html`,
	'utf-8'
);
const card = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');
const product = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));

const server = http.createServer((req, res) => {
	const { query, pathname } = url.parse(req.url, true);

	if (pathname === '/' || pathname === '/overview') {
		res.writeHead(200, { 'Content-type': 'text/html' });

		const cardsHTML = dataObj.map((el) => replaceTemplate(card, el)).join('');
		const output = overview.replace(/{%products%}/g, cardsHTML);

		res.end(output);
	} else if (pathname === '/product') {
		res.writeHead(200, { 'Content-type': 'text/html' });

		const productDetail = dataObj[query.id];
		const output = replaceTemplate(product, productDetail);

		res.end(output);
	} else if (pathname === '/api') {
		res.writeHead(200, { 'Content-type': 'application/json' });
		res.end(data);
	} else {
		res.writeHead(404, {
			'Content-type': 'text/html',
			'my-own-header': 'hello-world',
		});

		res.end('<h1>Page not found!</h1>');
	}
});

server.listen(8000, '127.0.0.1', () => {
	console.log('Listening on port 8000.');
});
