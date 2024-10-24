/**
 * Detects if a URL is an internal one.
 * @param url - The {@link URL} to test. Defaults to {@link location}.
 * @returns - True if the URL is determined to be internal, false otherwise.
 */
export function isInternal(url: Location | URL = location): boolean {
	const hostname = url.hostname;
	return (
		/^localhost\b/i.test(hostname) || /\.((loc)|(internal))$/i.test(hostname)
	);
}

export default isInternal;
