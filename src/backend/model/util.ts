/* Used by APIs to check that result has all required keys */
export function isValidResult(result: any, requiredKeys: string[]) {
    if(result) {
		return requiredKeys.every(k => Object.prototype.hasOwnProperty.call(result, k));
	}

	return false;
}