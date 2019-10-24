const got = require("got")

const OMDbKey = process.env.OMDB_API_KEY

const getMovieDetailsByTitle = async (title) => {
	if(!title){
		throw Error('Provide title to get movie details')
	}
	const url = `http://www.omdbapi.com/?apikey=${OMDbKey}&t=${title}`
	try {
		const response = await got(url)
		return response.body
	} catch (e) {
		console.log(e.response.body)
		throw Error(e.response.body)
	}
}

module.exports = getMovieDetailsByTitle
