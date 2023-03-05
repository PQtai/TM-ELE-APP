import jwt from "jsonwebtoken";
const authMiddleware = {
    verifyToken: (req , res , next) => {
        const token = req.headers.token;
        if(token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESSTOKEN_KEY,(err , user)=>{
                if(err) {
                    res.status(403).json(err);
                    return;
                }
                req.user = user;
                console.log(user)
                next();
            })
        }else{
            res.status(401).json("You're not authenticated")
        }
    },

    // Auth admin
    authIsAdminOrIsAuthor : (req , res , next) => {
        authMiddleware.verifyToken(req , res , ()=>{
            if(req.user.id === req.params.id || req.user.role === 'admin'){
                next();
            }else{
                res.status(403).json("You are not authorized to do this");
            }
        });
    },
    authIsAdmin: (req, res, next) => {
        authMiddleware.verifyToken(req, res, () => {
          if (req.user.role === 'admin') {
            next();
          } else {
            res
              .status(403)
              .json(errorFunction(true, 403, 'You are not authorized to do this'));
          }
        });
      },
    // Middleware to check the account field
    checkRole: (req, res, next) => {
        if(req.body.role){
            return res.status(403).json('You cannot register as role')
        }
        next();
    },
}
export default authMiddleware;