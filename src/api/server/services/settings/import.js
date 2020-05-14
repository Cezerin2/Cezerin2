import { db } from '../../lib/mongo';
import parse from '../../lib/parse';

class ImportSettingsService {
	constructor() {
		this.defaultSettings = {
			apikey: '',
			sheetid: '',
			range: ''
		};
	}

	getImportSettings() {
		return db
			.collection('importSettings')
			.findOne()
			.then(settings => {
				return this.changeProperties(settings);
			});
	}

	updateImportSettings(data) {
		const settings = this.getValidDocumentForUpdate(data);
		return this.insertDefaultSettingsIfEmpty().then(() =>
			db
				.collection('importSettings')
				.updateOne(
					{},
					{
						$set: settings
					},
					{ upsert: true }
				)
				.then(res => this.getImportSettings())
		);
	}

	insertDefaultSettingsIfEmpty() {
		return db
			.collection('importSettings')
			.countDocuments({})
			.then(count => {
				if (count === 0) {
					return db.collection('importSettings').insertOne(this.defaultSettings);
				} else {
					return;
				}
			});
	}

	getValidDocumentForUpdate(data) {
		if (Object.keys(data).length === 0) {
			return new Error('Required fields are missing');
		}

		let settings = {};

		if (data.apikey !== undefined) {
			settings.apikey = parse.getString(data.apikey);
		}

		if (data.sheetid !== undefined) {
			settings.sheetid = parse.getString(data.sheetid);
		}

		if (data.range !== undefined) {
			settings.range = parse.getString(data.range);
		}

		return settings;
	}

	changeProperties(settings) {
		if (settings) {
			delete settings._id;
		} else {
			return this.defaultSettings;
		}

		return settings;
	}
}

export default new ImportSettingsService();
