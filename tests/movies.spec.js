const request = require("supertest")
const app = require("../src/app")
const Movie = require("../src/models/movies")
const { clearDataBase, seedDataBase } = require("./fixtures/db")

jest.mock("../src/utils/movieDetails", () => () => ({
	Title: "So far so good",
	Year: 2019
}))

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
})
