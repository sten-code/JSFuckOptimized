import { encode } from "./original_jsfuck.js";

function run(program) {
	console.log(program);
	console.log("---------------------------------------");
	console.log(eval(program));
	console.log("---------------------------------------");
	console.log(`Length: ${program.length}`);
}

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
	s.split("").map((x) => {
		if (!(x in map)) {
			const charCode = x.charCodeAt(0);
			return `([]+[])[${fromString("constructor")}][${fromString("fromCharCode")}](${number(charCode)})`;
		}
		return map[x];
	}).join("+");

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
addStringToMap(`([][${fromString("flat")}][${fromString("constructor")}](${fromString("return/false/")})()[${fromString("constructor")}]()+[])`); // /(?:)/
addStringToMap(`(+{}+[][${fromString("entries")}]())`); // NaN[object Array Iterator]
addStringToMap(`((![])[${fromString("constructor")}]+[])`); // function Boolean() { [native code] }
addStringToMap(`(+[![]]+[][${fromString("entries")}]()[${fromString("constructor")}]()[${fromString("toString")}][${fromString("call")}]())`); // NaN[object Undefined]
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

// * Compare this compiler to the official one on https://jsfuck.com
// const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
// for (let i = 0; i < chars.length; i++) {
// 	const mine = fromString(chars[i]).length;
// 	const orig = encode(chars[i], false, true).length;
// 	if (mine > orig) {
// 		console.log(`${chars[i]}: ${mine} ${orig}`);
// 	}
// }

run(compile("console.log(\"hello\")"));