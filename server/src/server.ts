import express from 'express';
import morgan from 'morgan';
import { AppDataSource } from './data-source';
import authRoutes from './routes/auth';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
const origin = 'http://localhost:3000';

app.use(
	cors({
		origin,
		credentials: true,
	})
);
// json요청을 해석
app.use(express.json());
app.use(morgan('dev'));

// .env파일에서 작성한것을 process.env 변수로 사용가능하도록
// client는 CRA에서 알아서 설정되어있어서 dotenv를 사용하지 않아도 된다.
dotenv.config();

app.get('/', (_, res) => res.send('running'));
app.use('/api/auth', authRoutes);
let port = 4000;
app.listen(port, async () => {
	console.log(`server running at http://localhost:${port}`);
	AppDataSource.initialize()
		.then(() => {
			console.log('datebase initialized');
		})
		.catch((err) => console.log(err));
});
