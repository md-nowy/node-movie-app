const express = require("express")
// require("./db/mongoose")
const movieRouter = require("./routers/movies")

const app = express()
const port = process.env.PORT

// middleware added for logging purposes
app.use((req, res, next) => {
	console.log(`${req.method} ${req.path}`)
	next()
})

app.use(express.json())
// split routers based on resources that they provide
app.use(movieRouter)

app.listen(port, () => {
	console.log(`Server is up on port: ${port}`)
})
