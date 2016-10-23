var itemFactory = function(query) {
	return {
		title: 'title ' + query,
		seeds: 'seeds ' + query,
		leechs: 'leechs ' + query,
		time_uploaded: 'time_uploaded ' + query,
		category: 'category ' + query,
		size: 'size ' + query,
		magnet: 'magnet ' + query
	};
};

module.exports = function(query, count) {
	var result = [];
	var item = itemFactory(query);
	for (var i = 0; i < count; i++) {
		result.push(item);
	}
	return result;
};
