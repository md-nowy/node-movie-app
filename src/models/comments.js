const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema(
	{
		value: {
			type: String,
			required: true,
			trim: true,
			validate(value) {
				if (value.trim() === "") {
					throw new Error("Provide comment with at least one character")
				}
			}
		}
	},
	{
		timestamps: true
	}
)

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment
