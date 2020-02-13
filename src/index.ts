import * as express from 'express'
import {getLinkPreview} from 'link-preview-js'

const app = express();
const port = process.env.PORT || 8080; // default port to listen

const urlPreview = async (url: string) => {
	try {
		const response = await getLinkPreview(url);
		const domain = url.split('//')[1].split('/').shift();

		return {
			domain,
			...response
		};
	} catch (e) {
		console.log('error', e);
	}
};

// define a route handler for the default home page
app.get('/', async (req, res) => {
	const { url } = req.query;
	console.log(url);

	if (url) {
		const response = await urlPreview(url);

		return res.json(response);
	}

	return res.json({
		error: true,
		message: 'Insert url params ?url='
	});
});

// start the Express server
app.listen(port, () => {
	console.log(`server started at http://localhost:${port}`);
});
