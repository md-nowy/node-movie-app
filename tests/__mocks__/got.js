const got = function(url) {
	const response = {}
	response.body = JSON.stringify({ Title: "So far so good", Year: "2019" })
	return response
}

module.exports = got
