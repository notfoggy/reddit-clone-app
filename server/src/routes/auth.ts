import { isEmpty, validate } from 'class-validator';
import { Request, Response, Router } from 'express';
import { appendFile } from 'fs';
import User from '../entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

// errors =
// [
//   {
//     property: "email",
//     constraints: { isEmail: "이메일 주소가 잘못되었습니다" },
//   },
//   {
//     property: "username",
//     constraints: { isLength: "사용자 이름은 3자 이상이어야 합니다" },
//   },
//   {
//     property: "password",
//     constraints: { isLength: "비밀번호는 6자리 이상이어야 합니다." },
//   },
// ];

// prev = {email : '이메일 주소가 잘못되었습니다.'}
// error.constraints = {isEmail: '이메일 주소가 잘못되었습니다'}
// Object.entries(error.contratins) = [['isEmail', '이메일 주소가 잘못되었습니다']]
// Object.entries(error.constraints)[0][1] = '이메일 주소가 잘못되었습니다'

// prev =
// {
//   email: "이메일 주소가 잘못되었습니다.",
//   username: "사용자 이름은 3자 이상이어야 합니다",
//   password: "비밀번호는 6자리 이상이어야 합니다.",
// };

const mapError = (errors: Object[]) => {
	return errors.reduce((prev: any, error: any) => {
		prev[error.property] = Object.entries(error.constraints)[0][1];
		return prev;
	}, {});
};

const register = async (req: Request, res: Response) => {
	const { email, username, password } = req.body;
	try {
		let errors: any = {};

		// 이메일과 유저이름이 이미 저장, 사용되고 있는 것인지 확인
		const emailUser = await User.findOneBy({ email });
		const usernameUser = await User.findOneBy({ username });

		// 이미 email과 username이 존재한다면
		if (emailUser) errors.email = '이미 해당 이메일 주소가 사용되었습니다.';
		if (usernameUser) errors.username = '이미 이 사용자 이름이 사용되었습니다.';

		// 에러가 있다면  에러를 reponse하고 return한다.
		if (Object.keys(errors).length > 0) {
			return res.status(400).json(errors);
		}

		const user = new User();
		user.email = email;
		user.username = username;
		user.password = password;

		// 엔티티에 정해놓은 조건으로 user 데이터의 유효성 검사를 해준다.
		errors = await validate(user);

		if (errors.length > 0) return res.status(400).json(mapError(errors));

		// 유저 정보를 user table 저장
		// save() : baseEntity에서 제공하는 메소드
		await user.save();
		return res.json(user);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error });
	}
};

const login = async (req: Request, res: Response) => {
	const { username, password } = req.body;
	try {
		let errors: any = {};
		// 비워져있다면 에러를 프론트엔드로 보내주기
		if (isEmpty(username))
			errors.username = '사용자 이름은 비워둘 수 없습니다.';
		if (isEmpty(password)) errors.password = '비밀번호는 비워둘 수 없습니다';
		if (Object.keys(errors).length > 0) {
			return res.status(400).json(errors);
		}
		// 디비에서 유저찾기
		const user = await User.findOneBy({ username });

		if (!user)
			return res
				.status(404)
				.json({ username: '사용자 이름이 등록되지 않았습니다.' });

		// 유저가 있다면 비밀번호 비교하기
		const passwordMatches = await bcrypt.compare(password, user.password);

		// 비밀번호가 다르다면 에러 보내기
		if (!passwordMatches) {
			return res.status(401).json({ password: '비밀번호가 잘못되었습니다' });
		}

		// 비밀번호가 맞다면 토큰 생성
		const token = jwt.sign({ username }, process.env.JWT_SECRET!);

		// 토큰을 쿠키에 저장
		res.set('Set-Cookie', cookie.serialize('token', token));

		return res.json({ user, token });
	} catch (error) {
		console.log('error', error);
		return res.status(500).json(error);
	}
};

const router = Router();

router.post('/register', register);
router.post('/login', login);
export default router;
