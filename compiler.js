const fs = require("fs");

const zero = "+[]";
const one = "+!+[]";

const small_number = (n) => {
	if (n === 0) return zero;
	if (n === 1) return one;
	return Array.from({ length: n }, () => one)
		.join("")
		.substring(1);
};

const number = (n) => {
	if (n === 0) return zero;

	let output = "";
	const split = Array.from(n.toString(), Number);
	for (let i = 0; i < split.length; i++) {
		output += `[${small_number(split[i])}]+`;
	}
	output = output.slice(0, -1);

	// If the normal function is more efficient then just use that one
	const orig = small_number(n);
	return orig.length < output.length ? orig : output;
};

const map = {};

const fromString = (s) =>
	s
		.split("")
		.map((x) => {
			if (!(x in map)) {
				const charCode = x.charCodeAt(0);
				return `([]+[])[${fromString("constructor")}][${fromString("fromCharCode")}](${number(charCode)})`;
			}
			return map[x];
		})
		.join("+");

const addStringToMap = (str) => {
	const evaluated = eval(str);
	for (let i = 0; i < evaluated.length; i++) {
		const value = `${str}[${number(i)}]`;
		if (evaluated[i] in map) {
			if (value.length < map[evaluated[i]].length) {
				map[evaluated[i]] = value;
			}
		} else {
			map[evaluated[i]] = value;
		}
	}
};

for (let i = 0; i < 10; i++) {
	map[i.toString()] = `(${number(i)}+[])`;
}

addStringToMap("({}+[])"); // [object Object]
addStringToMap("(+{}+[])"); // NaN
addStringToMap(`([][[]]+[])`); // undefined
addStringToMap("(![]+[])"); // false
addStringToMap("(!![]+[])"); // true
addStringToMap("(!+[]/+[]+[])"); // Infinity
addStringToMap("(/\\\\/+[])"); // /\\/
addStringToMap(`(+(${number(11)}+${map.e}+${number(20)})+[])`); // 1.1e+21
addStringToMap(`(/-/[${fromString("constructor")}]+[])`); // function RegExp() { [native code] }
addStringToMap(`(([]+[])[${fromString("constructor")}]+[])`); // function String() { [native code] }
addStringToMap(`(()=>{})[${fromString("constructor")}](${fromString("return escape")})()(${map["\\"]})`); // %5C
addStringToMap(`((+[])[${fromString("constructor")}]+[])`); // function Number() { [native code] }
addStringToMap(`([]+[])[${fromString("fontcolor")}]()`); // <font color="undefined"></font>
addStringToMap(`([]+[])[${fromString("fontcolor")}](\"\\\"\")`); // <font color="&quot;"></font>
addStringToMap(`([][${fromString("flat")}]+[])`); // function flat() { [native code] }
addStringToMap(`(!![]+[][${fromString("flat")}]+[])`); // truefunction flat() { [native code] }
addStringToMap(`(+(${number(1)}+${map.e}+${number(100)})+[])`); // 1e+100
addStringToMap(`(+(${fromString(".")}+(+[])+(+[])+(+[])+(+[])+(+[])+(+[])+(+!![]))+[])`); // 1e-7
addStringToMap(`(![]+[]+[${number(0)}])[${fromString("italics")}]()`); // <i>false0</i>
addStringToMap(
	`([][${fromString("flat")}][${fromString("constructor")}](${fromString("return/false/")})()[${fromString("constructor")}]()+[])`
); // /(?:)/
addStringToMap(`(+{}+[][${fromString("entries")}]())`); // NaN[object Array Iterator]
addStringToMap(`((![])[${fromString("constructor")}]+[])`); // function Boolean() { [native code] }
addStringToMap(
	`(+[![]]+[][${fromString("entries")}]()[${fromString("constructor")}]()[${fromString("toString")}][${fromString("call")}]())`
); // NaN[object Undefined]
addStringToMap(`(+[]+[][${fromString("flat")}][${fromString("constructor")}])`); // 0function Function() { [native code] }

const alphabet = "abcdefghijklmnopqrstuvwxyz";
for (let i = 0; i < alphabet.length; i++) {
	const value = `(+(${number(10 + i)}))[${fromString("toString")}](+(${number(11 + i)}))`;
	if (map[alphabet[i]] === undefined || value.length < map[alphabet[i]].length) {
		map[alphabet[i]] = value;
	}
}

map[","] = `[[]][${fromString("concat")}]([[]])+[]`;

const compile = (code) => `(()=>{})[${fromString("constructor")}](${fromString(code)})()`;

function parseCommandLine(config) {
	const args = process.argv.slice(2);

	// Initialize an object to store flag values and positional arguments
	const parsedArgs = {
		flags: {},
		positional: {},
	};

	// Function to display usage and exit
	function displayUsage() {
		const flagUsage = Object.keys(config.flags)
			.map((flag) => `[${flag}]`)
			.join(" ");
		const positionalUsage = config.positional.map((arg) => (arg.required ? `<${arg.name}>` : `[${arg.name}]`)).join(" ");

		console.error(`Usage: node ${process.argv[1]} ${flagUsage} ${positionalUsage}`);
		console.error("Available Options:");
		for (const flag in config.flags) {
			console.error(
				`  ${flag} ${config.flags[flag].aliases.map((alias) => `[${alias}]`).join(" ")}\t${config.flags[flag].description}`
			);
		}
		process.exit(1);
	}

	// Function to display help information and exit
	function displayHelp() {
		console.log(`Usage: node ${process.argv[1]} [OPTIONS] ${config.positional.map((arg) => `<${arg.name}>`).join(" ")}`);
		console.log("OPTIONS:");
		for (const flag in config.flags) {
			console.log(
				`  ${flag} ${config.flags[flag].aliases.map((alias) => `[${alias}]`).join(" ")}\t${config.flags[flag].description}`
			);
		}
		process.exit(0);
	}

	// Parse the command line arguments
	for (let i = 0; i < args.length; i++) {
		const arg = args[i];

		if (arg === "--help" || arg === "-h") {
			displayHelp();
		}

		if (!parsedArgs.flags.help) {
			let isFlag = false;

			for (const flag in config.flags) {
				const flagConfig = config.flags[flag];
				if (arg === flag || flagConfig.aliases.includes(arg)) {
					if (flagConfig.name === "output") {
						// Handle the -o flag for specifying the output file
						const outputFileName = args[i + 1];
						if (!outputFileName) {
							console.error(`Missing output file name for -o flag.`);
							displayUsage();
						}
						parsedArgs.flags[flagConfig.name] = outputFileName;
						i++; // Increment i to skip the next argument (output file name)
					} else {
						parsedArgs.flags[flagConfig.name] = true;
					}
					isFlag = true;
					break;
				}
			}

			if (!isFlag) {
				const positionalArg = config.positional.shift();
				if (positionalArg) {
					parsedArgs.positional[positionalArg.name] = arg;
				} else {
					console.error(`Excess positional argument: ${arg}`);
					displayUsage();
				}
			}
		}
	}

	// Check if required positional arguments are missing
	const missingRequiredPositionalArgs = config.positional.filter((arg) => arg.required && !parsedArgs.positional[arg.name]);
	if (missingRequiredPositionalArgs.length > 0) {
		console.error(`Missing required positional argument(s): ${missingRequiredPositionalArgs.map((arg) => `<${arg.name}>`).join(", ")}`);
		displayUsage();
	}

	return parsedArgs;
}

// Define the configuration for your CLI arguments
const config = {
	flags: {
		"-r": {
			name: "run",
			aliases: ["--run"],
			required: false,
			description: "Automatically run the script after compiling"
		},
		"-q": {
			name: "quiet",
			aliases: ["--quiet"],
			required: false,
			description: "Don't give any console output when compiling"
		},
		"-o": {
			name: "output",
			aliases: ["--output"],
			required: false,
			description: "The output file name"
		}
	},
	positional: [
		{
			name: "file",
			required: true,
			description: "The target script file"
		},
	],
};

const parsedArgs = parseCommandLine(config);

const code = fs.readFileSync(parsedArgs.positional["file"]).toString();
const compiled = compile(code);

if (parsedArgs.flags["output"] !== undefined) {
	fs.writeFileSync(parsedArgs.flags["output"], compiled);
} else {
	fs.writeFileSync("output.js", compiled);
}

if (parsedArgs.flags["run"]) eval(compiled);
