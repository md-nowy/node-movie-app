const request = require("supertest")
const app = require("../src/app")
const Movie = require("../src/models/movies")
const { clearDataBase, seedDataBase } = require("./fixtures/db")

describe("/movies", () => {
	beforeEach(clearDataBase)
	describe("when data being fetched", () => {
		describe("when there are no movies saved", () => {
			it("returns no movies", async () => {
				const response = await request(app)
					.get("/movies")
					.expect(200)

				expect(response.body).toHaveLength(0)
			})
		})
		describe("when there are some movies saved", () => {
			beforeEach(seedDataBase)
			it("returns all movies", async () => {
				const response = await request(app)
					.get("/movies")
					.expect(200)

				expect(response.body).toHaveLength(2)
			})
		})
	})
	describe("when data being created", () => {
		describe("when data is valid", () => {
			it("creates new movie", async () => {
				const postedMovie = {
					watched: true,
					favorite: false,
					title: "So far"
				}
				const response = await request(app)
					.post("/movies")
					.send(postedMovie)
					.expect(201)

				delete postedMovie.title
				expect(response.body).toMatchObject(postedMovie)

				const savedMovie = Movie.findById(response.body._id)
				expect(savedMovie).not.toBeNull()
			})
		})
		describe("when data is invalid", () => {
			it("does not create new movie if title is missing", async () => {
				const postedMovie = {
					watched: true,
					favorite: false,
					title: ""
				}
				const response = await request(app)
					.post("/movies")
					.send(postedMovie)
					.expect(400)

				delete postedMovie.title
				expect(response.body).toHaveProperty('error');
	
				const allMovies = await Movie.find({})
				expect(allMovies).toHaveLength(0)
			})
		})
	})
})
