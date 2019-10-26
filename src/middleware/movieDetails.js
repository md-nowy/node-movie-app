const got = require("got")

const OMDbKey = process.env.OMDB_API_KEY

const getMovieDetailsByTitle = async (req, res, next) => {
	try {
		if (!req.body.title) {
			throw new Error("Provide title with at least one character")
		}
		const title = req.body.title
		const url = `http://www.omdbapi.com/?apikey=${OMDbKey}&t=${title}`
		const response = await got(url)
		response.body = JSON.parse(response.body)
		if (
			response.body.hasOwnProperty("Response") &&
			response.body.Response === "False"
		) {
			throw new Error(JSON.stringify(response.body))
		}
		req.body.details = response.body
		next()
	} catch (e) {
		console.log(e.message)
		res.status(400).send({ error: e.message })
	}
}

module.exports = getMovieDetailsByTitle
