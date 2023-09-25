<h1 align="center">JSFuck Optimized</h1>

```js
(()=>{})[({}+[])[[+!+[]]+[!+[]+!+[]]]+({}+[])[+!+[]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]
+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+({}+[])[[+!+[]]+[!+[]+!+[]]]+(!![]+[])[+[]]+({
}+[])[+!+[]]+(!![]+[])[+!+[]]](({}+[])[[+!+[]]+[!+[]+!+[]]]+({}+[])[+!+[]]+([][[]]+[])[+!+[]]+(!
[]+[])[!+[]+!+[]+!+[]]+({}+[])[+!+[]]+(![]+[])[!+[]+!+[]]+({}+[])[[+!+[]]+[+!+[]]]+(+([+!+[]]+[+
!+[]]+({}+[])[[+!+[]]+[+!+[]]]+[!+[]+!+[]]+[+[]])+[])[+!+[]]+(![]+[])[!+[]+!+[]]+({}+[])[+!+[]]+
(/-/[({}+[])[[+!+[]]+[!+[]+!+[]]]+({}+[])[+!+[]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!!
[]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+({}+[])[[+!+[]]+[!+[]+!+[]]]+(!![]+[])[+[]]+({}+[]
)[+!+[]]+(!![]+[])[+!+[]]]+[])[[+!+[]]+[+!+[]]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(+{}+[])[+
!+[]]+(!![]+[])[+[]]]+[])[[+!+[]]+[!+[]+!+[]+!+[]]]+([]+[])[(![]+[])[+[]]+({}+[])[+!+[]]+([][[]]
+[])[+!+[]]+(!![]+[])[+[]]+({}+[])[[+!+[]]+[!+[]+!+[]]]+({}+[])[+!+[]]+(![]+[])[!+[]+!+[]]+({}+[
])[+!+[]]+(!![]+[])[+!+[]]]()[[+!+[]]+[!+[]+!+[]]]+(+([+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[
]]))[(!![]+[])[+[]]+({}+[])[+!+[]]+(([]+[])[({}+[])[[+!+[]]+[!+[]+!+[]]]+({}+[])[+!+[]]+([][[]]+
[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+({}+[])[[+!
+[]]+[!+[]+!+[]]]+(!![]+[])[+[]]+({}+[])[+!+[]]+(!![]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]+!+[]+!+[]+!
+[]+!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+(!+[]/+[]+[])[!+[]+!+[]+!+[]]+([][[]]+[])[+!
+[]]+(/-/[({}+[])[[+!+[]]+[!+[]+!+[]]]+({}+[])[+!+[]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]
]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+({}+[])[[+!+[]]+[!+[]+!+[]]]+(!![]+[])[+[]]+(
{}+[])[+!+[]]+(!![]+[])[+!+[]]]+[])[[+!+[]]+[+!+[]]]](+([+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!
+[]+!+[]]))+({}+[])[[+!+[]]+[+!+[]]]+(![]+[])[!+[]+!+[]]+(![]+[])[!+[]+!+[]]+({}+[])[+!+[]]+([]+
[])[(![]+[])[+[]]+({}+[])[+!+[]]+([][[]]+[])[+!+[]]+(!![]+[])[+[]]+({}+[])[[+!+[]]+[!+[]+!+[]]]+
({}+[])[+!+[]]+(![]+[])[!+[]+!+[]]+({}+[])[+!+[]]+(!![]+[])[+!+[]]]()[[+!+[]]+[!+[]+!+[]]]+([][(
![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(+{}+[])[+!+[]]+(!![]+[])[+[]]]+[])[[+!+[]]+[!+[]+!+[]+!+[]+!+[
]]])()
```

<p align="center">
	A better optimized version of the official JSFuck compiler
</p>


<h1 align="center">Usage</h1>


```console
Usage: node compiler.js [OPTIONS] <file>
OPTIONS:
  -r [--run]    Automatically run the script after compiling
  -q [--quiet]  Don't give any console output when compiling
  -o [--output] The output file name
```



<h1 align="center">About</h1>

This is a compiler that compiles JavaScript code into a lot of garbage that is still valid JavaScript code.

The original JSFuck compiler on https://jsfuck.com is not as efficient and can be improved. This repository rougly improves the length of the output by 2-3x.
A simple hello world program (`console.log("hello world")`) in this compiler is 2934 characters long, in the original its 7099 characters long. This is a 2.4x improvement.

For a good explanation on how JSFuck works, you can go [here](https://www.youtube.com/watch?v=sRWE5tnaxlI).

<h1 align="center">Credits</h1>

aemkei / Martin Kleppe - https://jsfuck.com / https://github.com/aemkei/jsfuck \
Low Byte Productions / Francis Stokes - https://www.youtube.com/watch?v=sRWE5tnaxlI
