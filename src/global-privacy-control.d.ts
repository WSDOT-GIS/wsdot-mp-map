interface Navigator {
	/**
	 * Indicates if the user has opted out of tracking via the
	 * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-GPC|Sec-GPC}
	 * HTTP header.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigator/globalPrivacyControl|Navigator.globalPrivacyControl on MDN}
	 */
	globalPrivacyControl?: boolean;
}
