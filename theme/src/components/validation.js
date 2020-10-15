import { text, language } from '../lib/settings';
// Get an instance of `PhoneNumberUtil`.
import { PhoneNumberUtil } from 'google-libphonenumber';
const phoneUtil = PhoneNumberUtil.getInstance();

export const validateRequired = value =>
	value && value.length > 0 ? undefined : text.required;

export const validateEmail = value =>
	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
		? text.emailInvalid
		: undefined;

export const validatePhone = value => {
	let isValidNumber = false;
	try {
		const number = phoneUtil.parseAndKeepRawInput(value, language);
		isValidNumber = phoneUtil.isValidNumberForRegion(number, language);
	} catch (err) {
		isValidNumber = false;
	}
	return isValidNumber ? undefined : text.phoneInvalid;
};
