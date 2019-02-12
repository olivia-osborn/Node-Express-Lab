const express = require("express");
const Posts = require("./db")
const router = express.Router();

router.post("/", async (req, res) => {
    newPost = req.body
    if (!newPost.title || !newPost.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        try {
            const post = await Posts.insert(newPost)
            res.status(201).json(post)
       } catch (error) {
           res.status(500).json({ error: "There was an error while saving the post to the database" })
       }
    }
})

router.get("/", async (req, res) => {
    try {
        const posts = await Posts.find(req.query);
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist."})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "The post information could not be retrieved." })
    }
})

module.exports = router;