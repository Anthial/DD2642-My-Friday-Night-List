/* Used by APIs to check that result has all required keys */
export function isValidResult(result: any, requiredKeys: string[]) {
    if(result) {
		if(requiredKeys.every(k => Object.prototype.hasOwnProperty.call(result, k))) {
			return !requiredKeys.some(k => result[k] === undefined || result[k] === null);
		}
	}

	return false;
}