const request = require("supertest")
const app = require("../src/app")
const Comment = require("../src/models/comments")
const { clearDataBase, seedDataBase } = require("./fixtures/db")

describe("/comments", () => {
	beforeEach(clearDataBase)
	describe("when data being fetched", () => {
		describe("when there are no comments saved", () => {
			it("returns no comments", async () => {
				const response = await request(app)
					.get("/comments")
					.expect(200)

				expect(response.body).toHaveLength(0)
			})
		})
		describe("when there are some comments saved", () => {
			beforeEach(seedDataBase)
			it("returns all comments", async () => {
				const response = await request(app)
					.get("/comments")
					.expect(200)

				expect(response.body).toHaveLength(2)
			})
		})
	})
	describe("when data being created", () => {
		it("creates new comment with at least one character", async () => {
			const postedComment = { value: "S" }
			const response = await request(app)
				.post("/comments")
				.send(postedComment)
				.expect(201)

			expect(response.body).toMatchObject({ ...postedComment })

			const savedComment = Comment.findById(response.body._id)
			expect(savedComment).not.toBeNull()
		})
		it("does not create comment without any characters", async () => {
			const postedComment = { value: " " }
			const response = await request(app)
				.post("/comments")
				.send(postedComment)
				.expect(400)

			expect(response.body).toHaveProperty("message")

			const allComments = await Comment.find({})
			expect(allComments).toHaveLength(0)
		})
	})
})
