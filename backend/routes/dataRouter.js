const router = require('express').Router()
const ensureAuthenticated = require('../middlewares/dataauth')
const { getProfile, updateProfile } = require('../controllers/userController');

router.get('/', ensureAuthenticated, (req,res)=>{
    console.log(req.user)
    try {
        return res.status(200).json([
            {
                name: "mobile",
                price: 10000
            },
            {
                name: "tv",
                price: 20000
            }
        ])
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        })
    }
})

router.get('/profile', ensureAuthenticated, getProfile);
router.put('/profile', ensureAuthenticated, updateProfile);

module.exports = router