/**
 * Tests the current hostname to see if it is on the intranet.
 * If the hostname test fails, then tests to see if the browser can
 * make a HEAD or GET request (respectively) to an intranet test URL.
 * @returns - True if the hostname is on the intranet, false otherwise.
 */
export function isIntranet(): boolean {
  return (
    /\.loc$/i.test(location.hostname) || /^localhost$/i.test(location.hostname)
  );
}

export default isIntranet;
