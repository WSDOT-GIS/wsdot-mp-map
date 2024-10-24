// @ts-check

/**
 * Run `biome ci --reporter=github` and then fix the output,
 * by replacing '%3A' with ':'.
 */

import { exec } from "node:child_process";
import { relative } from "node:path";
import { cwd, env, stderr, stdout } from "node:process";
import { promisify } from "node:util";

env.PATH += `;${cwd()}/node_modules/.bin`;

/**
 * Problem matcher for Biome.
 * `biome ci --reporter=github`
 * @see https://biomejs.dev/reference/reporters/#github
 * ```
 * ::error title=lint/suspicious/noDoubleEquals,file=main.ts,line=4,endLine=4,col=3,endColumn=5::Use === instead of ==
 * ::error title=lint/suspicious/noDebugger,file=main.ts,line=6,endLine=6,col=1,endColumn=9::This is an unexpected use of the debugger statement.
 * ::error title=lint/nursery/noEvolvingAny,file=main.ts,line=8,endLine=8,col=5,endColumn=6::This variable's type is not allowed to evolve implicitly, leading to potential any types.
 * ```
 */
export const githubProblemMatcher =
	/^::(?<severity>\S+)\s+title=(?<title>.+),file=(?<file>.+),line=(?<line>\d+),endLine=(?<endLine>\d+),col=(?<col>\d+),endColumn=(?<endColumn>\d+)::(?<message>.+)$/;

/**
 * Fixes the file paths in the Biome error message.
 * @param {string} s - input string
 */
function fixFileInProblem(s) {
	/**
	 * Matches the "file" portion of a Biome issue message returned
	 * when using the `--reporter=github` flag.
	 */
	const fileRe = /(?<=file=)[^,]+/gi;
	const current = cwd();
	return s.replaceAll(fileRe, (substring, ...args) => {
		console.debug("args", args);
		let fixedPath = substring.replace(/%3A/gi, ":");
		fixedPath = relative(current, fixedPath);
		return fixedPath;
	});
}

const promisifiedExec = promisify(exec);

/**
 * @type { {stdout: string; stderr: string} }
 */
const result = await promisifiedExec(
	String.raw`biome lint --reporter=github`,
).catch(
	/**
	 * If there are lint errors, the process will exit with a non-zero exit code.
	 * This is expected, and we still want to output the result anyway.
	 * The error will have a stderr & stdout property.
	 */
	(reason) => {
		return reason;
	},
);
stderr.write(`${result.stderr}\n`);
const fixedWithNewFunction = fixFileInProblem(result.stdout);
stdout.write(fixedWithNewFunction);
