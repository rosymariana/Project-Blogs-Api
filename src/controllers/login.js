const loginService = require('../services/loginService'); 

const loginController = {
    async login(req, res) {
        // const { email, password } = req.body;
        await loginService.validarBody(req.body);
        const user = await loginService.getEmail(req.body);
        const token = await loginService.makeToken(user);
        res.status(200).json({ token });
    },
};

module.exports = loginController;