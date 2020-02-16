const jwt = require ('jsonwebtoken');

exports.generateToken = async (data) => {
    return jwt.sign(data, global.SALT_KEY, {expiresIn: '1d'});
}

// exports.decodeToken = async (token) => {
//     var data = await jwt.verify(token, global.SALT_KEY);
//     return data;
// }

exports.authorize = async function(req,res,next){
    var token = req.headers['x-access-token'] 
    if(!token){
        res.status(401).json({
            message: 'Acesso restrito'
        });
    }else{
        await jwt.verify(token, global.SALT_KEY, function(error,decoded){
            if(error){
                console.log(error);
                res.status(401).json({
                    message: 'Token Inválido'
                });
            }else{
                next();
            }
        })
    }
}

// exports.isAdmin = function(req,res,next){
//     var token = req.headers.authorization 

//     if(!token){
//         res.status(401).json({
//             message: 'Acesso restrito'
//         });
//     }else
//         jwt.verify(token, global.SALT_KEY, function(error,decoded){
//             if(error){
//                 res.status(401).json({
//                     message: 'Token Inválido'
//                 });
//             }else{
//                 if(decoded.roles.includes('admin')){
//                     next();
//                 }else{
//                     res.status(403).json({
//                     message:'Está funcionalidade é restrita para administradores'
//                 });
//             }
//         }
//     });
// };