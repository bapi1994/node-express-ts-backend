/* eslint-disable @typescript-eslint/no-var-requires */
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import Users from "../models/Users";

const saltRounds = 10;

export default class AuthCtrl {
  login = async (req: any, res: any) => {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      const user = await Users.findOne({
        where: { email: email },
      });

      if (user == null) {
        return res.status(400).json({ message: "User Not Exists" });
      } else {
        const match = await bcrypt.compare(password, user.password);

        if (match) {
          const token = jwt.sign(
            {
              exp: Math.floor(Date.now() / 1000) + 14 * 60 * 60,
              data: { email: user.email },
            },
            process.env.SECRET_TOKEN
          );
          res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: token,
          });
        } else {
          return res.status(400).json({ message: "Invalid Password" });
        }
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  register = async (req: any, res: any) => {
    try {
      console.log(req.body);
      const { name, email, phone, password } = req.body;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash_password = bcrypt.hashSync(password, salt);

      const getUser = await Users.findOne({
        where: { email: email },
      });

      if (getUser) {
        return res.status(400).json({ message: "Email already Exists" });
      }

      const user = {
        name: name,
        email: email,
        phone: phone,
        password: hash_password,
      };
      const create_user = await Users.create(user);

      if (create_user) {
        return res.status(201).json({
          status: "success",
          data: create_user,
          message: "User register successfully!",
        });
      } else {
        return res.status(400).json({
          status: "error",
          data: create_user,
          message: "User register faill!",
        });
      }
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };
}
