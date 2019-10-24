const mongoose = require("mongoose")
const Movie = require("../../src/models/movies")
const Comment = require("../../src/models/comments")

const movieOne = {
	_id: new mongoose.Types.ObjectId(),
	watched: true,
	favorite: false,
	details: { Title: "Whatever" }
}

const movieTwo = {
	_id: new mongoose.Types.ObjectId(),
	watched: true,
	favorite: false,
	details: { Title: "Duplicate check" }
}

const commentOne = {
	_id: new mongoose.Types.ObjectId(),
	value: "Comment One"
}

const commentTwo = {
	_id: new mongoose.Types.ObjectId(),
	value: "Comment Two"
}

const clearDataBase = async () => {
	await Movie.deleteMany({})
	await Comment.deleteMany({})
}

const seedDataBase = async () => {
	await new Movie(movieOne).save()
	await new Movie(movieTwo).save()
	await new Comment(commentOne).save()
	await new Comment(commentTwo).save()
}

module.exports = {
	clearDataBase,
	seedDataBase
}
