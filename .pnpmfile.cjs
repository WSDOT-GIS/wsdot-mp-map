// @ts-check

module.exports = {
	hooks: {
		/**
		 * Patches out the "node-domexception" dependency, which is no longer needed,
		 * as this capability is now built in to node.
		 * @param {{ name: string; dependencies: { [x: string]: any; }; }} pkg
		 */
		readPackage(pkg) {
			if (pkg.name === "fetch-blob") {
				// drop the node-domexception dep
				const deps = Object.entries(pkg.dependencies).filter(
					([key, ]) => key !== "node-domexception",
				);
				pkg.dependencies = Object.fromEntries(deps);
			}
			return pkg;
		},
	},
};
