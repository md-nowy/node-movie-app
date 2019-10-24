const mongoose = require("mongoose")
const Comment = require("./comments")

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


const Movie = mongoose.model("Movie", movieSchema)

module.exports = Movie
