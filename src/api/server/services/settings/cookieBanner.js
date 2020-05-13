import { db } from '../../lib/mongo';
import parse from '../../lib/parse';

class CookieBannerService {
	constructor() {
		this.defaultSettings = {
			body: ''
		};
	}

	retrieveCookieBanner() {
		return db
			.collection('cookieBanner')
			.findOne()
			.then(body => {
				return this.changeProperties(body);
			});
	}

	updateCookieBanner(data) {
		const body = this.getValidDocumentForUpdate(data);
		return db
			.collection('cookieBanner')
			.updateOne(
				{},
				{
					$set: body
				},
				{ upsert: true }
			)
			.then(res => this.retrieveCookieBanner());
	}

	insertDefaultSettingsIfEmpty() {
		return db
			.collection('cookieBanner')
			.countDocuments({})
			.then(count => {
				if (count === 0) {
					return db.collection('cookieBanner').insertOne(this.defaultSettings);
				} else {
					return;
				}
			});
	}

	getValidDocumentForUpdate(data) {
		if (Object.keys(data).length === 0) {
			return new Error('Required fields are missing');
		}

		let cookieBanner = {};

		if (data.body !== undefined) {
			cookieBanner.body = parse.getString(data.body);
		}

		return cookieBanner;
	}

	changeProperties(cookiebanner) {
		if (cookiebanner) {
			delete cookiebanner._id;
		} else {
			return this.defaultSettings;
		}

		return cookiebanner;
	}
}

export default new CookieBannerService();
