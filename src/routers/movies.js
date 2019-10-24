const express = require("express")

const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useCreateIndex: true })
const Movie = mongoose.model('Movie',
    {
        title: { type: String },
        watched: { type: Boolean }
    }
)


const router = express.Router()

router.post("/movies", async (req, res) => {
	const movie = new Movie(req.body)
	try {
        await movie.save()
		res.status(201).send(req.body)
	} catch (e) {
		res.status(400).send({ message: e.message })
	}
})

module.exports = router
