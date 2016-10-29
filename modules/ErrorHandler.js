module.exports = {
	handle: function(error) {
		return this;
	},
	send: function(res) {
		res.status(404).end();
		return this;
	}
};
