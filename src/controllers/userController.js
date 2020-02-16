// Utils
const md5 = require("md5");

//Repository's
const userRepository = require("../repositories/userRepository");

// Services
const authService = require("../services/authService");
const watson = require('../services/auth.watson.service');

exports.createUser = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    const user = await userRepository.createUser({
      email,
      password: md5(password + global.SALT_KEY),
    });

    if (!user) res.status(400).send({ message: "Fail in register a User!", err });
    return res.status(201).send({ message: "Usuário criado"});
    
  } catch (err) {
    console.log(err)
  }
};


exports.authenticate = async (req, res, next) => {
    try {
      let { email, password } = req.body;

      const user = await userRepository.authenticate({
        email,
        password: md5(password + global.SALT_KEY),
      });

      if (!user) return res.status(201).send({ message: "Usuário ou senha inválidos" });
          
      return res.status(201).send({ user });
    } catch (err) {
      res.status(400).send({ message: "Fail in register a User!", err });
    }
};