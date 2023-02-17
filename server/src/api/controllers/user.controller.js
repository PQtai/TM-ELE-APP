import { User } from "../models/index.js";
import errorFunction from "../utils/errorFunction.js";
import { encryptionPassword } from '../utils/encryption.js'

const registerAccount = async (req, res, next) => {
    console.log(req.body)
    try {
        const existingPhone = await User.findOne({
            phone: req.body.phone
        }).lean(true)
        if (existingPhone) {
            res.status(403)
            return res.json(errorFunction(true, 403, 'User Already Exist'))
        } else {
            const hashedPassword = await encryptionPassword(req.body.password)
            const newUser = await User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: hashedPassword,
                phone: req.body.phone,
                avatar: req.body.avatar,
                isAdmin: req.body.isAdmin,
            })
            // const newUser = await User.create(req.body)
            if (newUser) {
                res.status(201)
                return res.json(errorFunction(false, 201, 'User Created', newUser))
            } else {
                res.status(403)
                return res.json(errorFunction(true, 403, 'Error Creating User'))
            }
        }
    } catch (error) {
        res.status(400)
        console.log(error)
        return res.json(errorFunction(true, 400, 'Error Adding User'));
    }
}

// const userControllers = {
//     index : async (req, res, next)=>{
//         try {
//             const users = await User.find({});
//             res.status(200).json(users);
//         } catch (error) {
//             res.status(500).json(error.message);
//         }
//     },
//     // [Get]/user/:id
//     show : async (req, res, next) => {
//         try {
//             const user = await User.findOne({_id:req.params.id});
//             res.status(201).json(user);
//         } catch (error) {
//             res.status(500).json(error.message);
//         }
//     },
// }
export default {registerAccount}