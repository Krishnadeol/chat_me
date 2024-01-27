const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
router.post('/', [    
    body('name', 'Enter a valid ame').isLength({ min: 4 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must have at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    let success = false;

    if (!errors.isEmpty()) {
        return res.json({ successn, errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ success, errors: [{ msg: "This user already exists" }] });
        }

        const myPass = req.body.password;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(myPass, salt);

        user = await User.create({
            name: req.body.name,
            password: hash,
            email: req.body.email,
        });

        const data = {
            user: {
                id: user.id
            }
        };
        success = true;
        const token = jwt.sign(data, JWT_SECRET);

        res.json({ success,user  });
    } catch (error) {
        console.error("Something went wrong");
        res.status(500).json({ success: false, error: error.message });
    } 
});
module.exports = router;