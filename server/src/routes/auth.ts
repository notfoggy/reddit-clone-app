import { validate } from "class-validator";
import { Request, Response, Router } from "express";
import { appendFile } from "fs";
import User from "../entities/User";

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
    if (emailUser) errors.email = "이미 해당 이메일 주소가 사용되었습니다.";
    if (usernameUser) errors.username = "이미 이 사용자 이름이 사용되었습니다.";

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

const router = Router();

router.post("/register", register);

export default router;
