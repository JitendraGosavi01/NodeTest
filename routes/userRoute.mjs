import express from 'express';
import userController from '../controller/userController';
const router = express.Router();

/**
 * Default route
 */
router.get('/',(req,res) => {
    res.json({
        name: "Jitendra",
        surename: "Gosavi"
    })
})
// user registration route
router.post('/register', userController.registerUser);
//user login route
router.post('/login', userController.userLogin)
router.get('/delete', userController.deleteUser)
router.get('/edit', userController.editUser)
router.post('/update', userController.updateUser)
router.get('/delete', userController.deleteUser)
export default router;