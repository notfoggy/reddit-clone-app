import express from 'express';
import morgan from 'morgan';
import { AppDataSource } from './data-source';

const app = express();

// json요청을 해석
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_, res) => res.send('running'));

let port = 4000;
app.listen(port, async () => {
	console.log(`server running at http://localhost:${port}`);

	AppDataSource.initialize()
		.then(async () => {
			console.log('Inserting a new user into the database...');
		})
		.catch((error) => console.log(error));
});
