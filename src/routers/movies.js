const express = require("express")
const getMovieDetailsByTitle = require("../middleware/movieDetails")
const Movie = require("../models/movies")

const router = express.Router()

router.post("/movies", getMovieDetailsByTitle, async (req, res) => {
	try {
		const movie = new Movie(req.body)
		await movie.save()
		res.status(201).send(movie)
	} catch (e) {
		res.status(400).send({ error: e.message })
	}
})

router.get("/movies", async (req, res) => {
	const movies = await Movie.find({})
	res.send(movies)
})

module.exports = router
