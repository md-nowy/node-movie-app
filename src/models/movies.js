const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema(
	{
		watched: {
			type: Boolean,
			required: true
		},
		favorite: {
			type: Boolean,
			required: false
		},
		details: {
			type: Object,
			required: true
		}
	},
	{
		timestamps: true
	}
)

movieSchema.pre("save", async function(next) {
	const movie = this
	const details = movie.details
	const isMovieDuplicate = await Movie.find({ details: details })
	if (isMovieDuplicate.length > 0) {
		next(new Error("Movie was already saved"))
	}
	next()
})

const Movie = mongoose.model("Movie", movieSchema)

module.exports = Movie
