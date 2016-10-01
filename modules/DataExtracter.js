var cheerio = require('cheerio');

var _extract = function(html) {
	var obj = [];
	var $ = cheerio.load(html);
	$('.torrent').each(function() {
		var torrent = $(this);
		var torrentObj = {};
		torrentObj.title = torrent.find('.r a').text().trim();
		torrentObj.seeds = torrent.find('.seeders .gac_b').text().trim();
		torrentObj.leechs = torrent.find('.leechers .gac_b').text().trim();
		torrentObj.time_uploaded = torrent.find('.cated').text().trim();
		torrentObj.category = torrent.find('.cate').text().trim();
		torrentObj.size = torrent.find('.torrent-size').text().trim().toUpperCase().trim();
		torrentObj.magnet = 'magnet:?xt=urn:btih:' + torrent.find('.r a').attr('href').split('/')[1].trim() + '&dn=' + torrentObj.title.replace(/ /g, '_');
		obj.push(torrentObj);
	});
	return obj;
};

module.exports = {
	extractFrom: function(html) {
		this.json = _extract(html);
		return this;
	},
	send: function(response) {
		response.setHeader('Content-Type', 'application/json');
		response.end(JSON.stringify(this.json));
		return this;
	}
};
