const express = require("express")
const getMovieDetailsByTitle = require("../utils/movieDetails")
const Movie = require("../models/movies")

const router = express.Router()

router.post("/movies", async (req, res) => {
	try {
		const details = await getMovieDetailsByTitle(req.body.title)
		const movie = new Movie({ ...req.body, details })
		await movie.save()
		res.status(201).send(movie)
	} catch (e) {
		res.status(400).send({ message: e.message })
	}
})

router.get("/movies",  async (req, res) => {
	const movies = await Movie.find({})
	res.send(movies)
})

module.exports = router
