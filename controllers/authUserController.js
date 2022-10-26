const jwt = require('jsonwebtoken');
const authUser = {
    authenticate:(req, res, next) => {
        const token = req.header('authorization-token');
        if(!token) return res.status(401).send('Você não está logado');
        try{
            const userVerified = jwt.verify(token,process.env.TOKEN_SECRET)
            req.user = userVerified;
            console.log("O usuário está logado");
            console.log(req.user);
            next();
        }catch{
            res.status(401).send('Seu token é inválido');
        }
    },
    admin:(req, res, next) => {
        const token = req.header('authorization-token');
        if(!token) return res.status(401).send('Você não está logado');
        try{
            const userVerified = jwt.verify(token,process.env.TOKEN_SECRET)
            req.user = userVerified;
            console.log("O usuário está logado");
            console.log(req.user);
            if (!userVerified.admin){
                return res.status(401).send("Você não é administrador");
            }
            next();
        }catch{
            res.status(401).send('Seu token é inválido');
        }
    }
}   

module.exports = authUser;
