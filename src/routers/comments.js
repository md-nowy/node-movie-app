const express = require("express")
const Comment = require("../models/comments")
const router = express.Router()

router.post("/comments", async (req, res) => {
	try {
		const comment = new Comment({
			...req.body
		})
		await comment.save()
		res.status(201).send(comment)
	} catch (error) {
		res.status(400).send({ message: error.message })
	}
})

router.get("/comments", async (req, res) => {
	const comments = await Comment.find({})
	res.send(comments)
})

module.exports = router
