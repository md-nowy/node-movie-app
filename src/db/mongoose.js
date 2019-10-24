const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_DB, {
	useNewUrlParser: true,
	useCreateIndex: true
})

const db = mongoose.connection
db.on("error", console.error.bind(console, "DB connection error"))
db.once("open", function() {
	console.log("DB connection opened")
})
