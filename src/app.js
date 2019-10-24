const express = require("express")
require("./db/mongoose")
const moviesRouter = require("./routers/movies")
const commentsRouter = require("./routers/comments")

const app = express()

// middleware added for logging purposes
app.use((req, res, next) => {
	console.log(`${req.method} ${req.path}`)
	next()
})

app.use(express.json())

app.use(moviesRouter)
app.use(commentsRouter)

module.exports = app