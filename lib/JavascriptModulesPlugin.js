/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const Parser = require("./Parser");
const JavascriptGenerator = require("./JavascriptGenerator");

class JavascriptModulesPlugin {
	apply(compiler) {
		compiler.hooks.compilation.tap("JavascriptModulesPlugin", (compilation, {
			normalModuleFactory
		}) => {
			normalModuleFactory.hooks.createParser.for("javascript/auto").tap("JavascriptModulesPlugin", options => {
				return new Parser(options, "auto");
			});
			normalModuleFactory.hooks.createParser.for("javascript/dynamic").tap("JavascriptModulesPlugin", options => {
				return new Parser(options, "script");
			});
			normalModuleFactory.hooks.createParser.for("javascript/esm").tap("JavascriptModulesPlugin", options => {
				return new Parser(options, "module");
			});
			normalModuleFactory.hooks.createGenerator.for("javascript/auto").tap("JavascriptModulesPlugin", options => {
				return new JavascriptGenerator(options);
			});
			normalModuleFactory.hooks.createGenerator.for("javascript/dynamic").tap("JavascriptModulesPlugin", options => {
				return new JavascriptGenerator(options);
			});
			normalModuleFactory.hooks.createGenerator.for("javascript/esm").tap("JavascriptModulesPlugin", options => {
				return new JavascriptGenerator(options);
			});
		});
	}
}

module.exports = JavascriptModulesPlugin;
