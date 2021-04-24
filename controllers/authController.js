const User = require('../models/userModel');
const argon2 = require('argon2');

exports.getOnePost = async (req, res) => {
    try
    {
        const post = await Post.findById(req.params.id);
        res.status(200).json({
            status: "Success",
            data: {post}
        })
    }
    catch (e)
    {
        console.log(e.message)
        res.status(400).json({
            status: "fail"
        })
    }
}


exports.signUp = async(req, res) =>{
    const {username, password} = req.body;
    const hashPassword = await argon2.hash(password);
    console.log(username+" "+hashPassword)
    try
    {
        const user = await User.create({
            username,
            password: hashPassword
        });
        req.session.user = user;
        res.status(200).json({
            status: "Success",
            data: {user}
        })
    }
    catch (e)
    {
        console.log(e.message);
        res.status(400).json({
            status: "fail"
        })
    }
}

exports.login = async (req, res) =>{
    const {username, password} = req.body;
    
    try
    {
        const user = await User.findOne({username});
        if(!user)
        {
            res.status(200).json({
                status: "success",
                message: "User doesn't exist"
            })
        }
        const valid = await argon2.verify(user.password, password);
        if(!valid)
        {
            res.status(200).json({
                status: "success",
                message: "User doesn't exist"
            })
        }
        req.session.user = user;
        res.status(200).json({
            status: "Success",
            data: {user}
        })
    }
    catch (e)
    {
        console.log(e.message);
        res.status(400).json({
            status: "fail"
        })
    }
}


