const router = require('express').Router();
const queryToMongoose = require('../core/query-to-mongoose');
const userController = require('../controllers/user-controller');
const auth = require('../middleware/auth'); // Add authorization 

// POST localhost:3000/admin/api/v1/users
router.post('/admin/api/v1/users', auth, userController.postUser);

// POST localhost:3000/admin/api/v1/users/login
router.post('/admin/api/v1/users/login', userController.postLogin);

// GET localhost:3000/admin/api/v1/users
router.get('/admin/api/v1/users', queryToMongoose, auth, userController.getUsers);

// GET localhost:3000/admin/api/v1/users/661c0414b45d61f0c2f7a5c2
router.get('/admin/api/v1/users/:userId', auth, userController.getUser);

// PUT localhost:3000/admin/api/v1/users/661c0414b45d61f0c2f7a5c2
router.put('/admin/api/v1/users/:userId', auth, userController.putUser);

// DELETE localhost:3000/admin/api/v1/users/661c04568d00a8be547fc34b
router.delete('/admin/api/v1/users/:userId', auth, userController.deleteUser);

module.exports = router;
