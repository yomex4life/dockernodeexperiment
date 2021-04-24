const Post = require('../models/postModels');

exports.getAllPosts = async (req, res) =>{
    try
    {
        const posts = await Post.find();
        res.status(200).json({
            status: "Success",
            result: posts.length,
            data: {posts}
        })
    }
    catch (e)
    {
        res.status(400).json({
            status: "fail"
        })
    }
}

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


exports.createPost = async(req, res) =>{
    try
    {
        const post = await Post.create(req.body);
        res.status(200).json({
            status: "Success",
            data: {post}
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


exports.updatePost = async(req, res) =>{
    try
    {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: "Success",
            data: {post}
        })
    }
    catch (e)
    {
        res.status(400).json({
            status: "fail"
        })
    }
}

exports.deletePost = async(req, res) =>{
    try
    {
        const post = await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "Success",
        })
    }
    catch (e)
    {
        res.status(400).json({
            status: "fail"
        })
    }
}