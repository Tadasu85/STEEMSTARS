/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
;
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.cytoscape=e()}}(function(){var define,module,exports;return function e(t,r,n){function i(o,s){if(!r[o]){if(!t[o]){var l="function"==typeof require&&require;if(!s&&l)return l(o,!0);if(a)return a(o,!0);var u=new Error("Cannot find module '"+o+"'");throw u.code="MODULE_NOT_FOUND",u}var c=r[o]={exports:{}};t[o][0].call(c.exports,function(e){var r=t[o][1][e];return i(r?r:e)},c,c.exports,e,t,r,n)}return r[o].exports}for(var a="function"==typeof require&&require,o=0;o<n.length;o++)i(n[o]);return i}({1:[function(e,t,r){/*!

Cytoscape.js 2.7.11 (MIT licensed)

Copyright (c) The Cytoscape Consortium

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the “Software”), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
"use strict"},{}],2:[function(e,t,r){"use strict";var n=e("./util"),i=e("./is"),a=e("./promise"),o=function(e,t,r){if(!(this instanceof o))return new o(e,t,r);var a=this._private=n.extend({duration:1e3},t,r);a.target=e,a.style=a.style||a.css,a.started=!1,a.playing=!1,a.hooked=!1,a.applying=!1,a.progress=0,a.completes=[],a.frames=[],a.complete&&i.fn(a.complete)&&a.completes.push(a.complete),this.length=1,this[0]=this},s=o.prototype;n.extend(s,{instanceString:function(){return"animation"},hook:function(){var e=this._private;if(!e.hooked){var t,r=e.target._private.animation;t=e.queue?r.queue:r.current,t.push(this),i.elementOrCollection(e.target)&&e.target.cy().addToAnimationPool(e.target),e.hooked=!0}return this},play:function(){var e=this._private;return 1===e.progress&&(e.progress=0),e.playing=!0,e.started=!1,e.stopped=!1,this.hook(),this},playing:function(){return this._private.playing},apply:function(){var e=this._private;return e.applying=!0,e.started=!1,e.stopped=!1,this.hook(),this},applying:function(){return this._private.applying},pause:function(){var e=this._private;return e.playing=!1,e.started=!1,this},stop:function(){var e=this._private;return e.playing=!1,e.started=!1,e.stopped=!0,this},rewind:function(){return this.progress(0)},fastforward:function(){return this.progress(1)},time:function(e){var t=this._private;return void 0===e?t.progress*t.duration:this.progress(e/t.duration)},progress:function(e){var t=this._private,r=t.playing;return void 0===e?t.progress:(r&&this.pause(),t.progress=e,t.started=!1,r&&this.play(),this)},completed:function(){return 1===this._private.progress},reverse:function(){var e=this._private,t=e.playing;t&&this.pause(),e.progress=1-e.progress,e.started=!1;var r=function(t,r){var n=e[t];e[t]=e[r],e[r]=n};r("zoom","startZoom"),r("pan","startPan"),r("position","startPosition");for(var n=0;n<e.style.length;n++){var i=e.style[n],a=i.name,o=e.startStyle[a];e.startStyle[a]=i,e.style[n]=o}return t&&this.play(),this},promise:function(e){var t,r=this._private;switch(e){case"frame":t=r.frames;break;default:case"complete":case"completed":t=r.completes}return new a(function(e,r){t.push(function(){e()})})}}),s.complete=s.completed,t.exports=o},{"./is":83,"./promise":86,"./util":100}],3:[function(e,t,r){"use strict";var n=e("../../is"),i={aStar:function(e){var t=this;e=e||{};var r=function(e,t,n,i){if(e==t)return i.push(a.getElementById(t)),i;if(t in n){var o=n[t],s=f[t];return i.push(a.getElementById(t)),i.push(a.getElementById(s)),r(e,o,n,i)}},i=function(e,t){if(0!==e.length){for(var r=0,n=t[e[0]],i=1;i<e.length;i++){var a=t[e[i]];n>a&&(n=a,r=i)}return r}},a=this._private.cy;if(null!=e&&null!=e.root){var o=n.string(e.root)?this.filter(e.root)[0]:e.root[0];if(null!=e.goal){var s=n.string(e.goal)?this.filter(e.goal)[0]:e.goal[0];if(null!=e.heuristic&&n.fn(e.heuristic))var l=e.heuristic;else var l=function(){return 0};if(null!=e.weight&&n.fn(e.weight))var u=e.weight;else var u=function(e){return 1};if(null!=e.directed)var c=e.directed;else var c=!1;var d=[],h=[o.id()],p={},f={},v={},g={};v[o.id()]=0,g[o.id()]=l(o);for(var y=this.edges().stdFilter(function(e){return!e.isLoop()}),m=this.nodes(),b=0;h.length>0;){var x=i(h,g),w=a.getElementById(h[x]);if(b++,w.id()==s.id()){var E=r(o.id(),s.id(),p,[]);return E.reverse(),{found:!0,distance:v[w.id()],path:t.spawn(E),steps:b}}d.push(w.id()),h.splice(x,1);var _=w.connectedEdges();c&&(_=_.stdFilter(function(e){return e.data("source")===w.id()})),_=_.intersect(y);for(var P=0;P<_.length;P++){var S=_[P],k=S.connectedNodes().stdFilter(function(e){return e.id()!==w.id()}).intersect(m);if(-1==d.indexOf(k.id())){var T=v[w.id()]+u.apply(S,[S]);-1!=h.indexOf(k.id())?T<v[k.id()]&&(v[k.id()]=T,g[k.id()]=T+l(k),p[k.id()]=w.id()):(v[k.id()]=T,g[k.id()]=T+l(k),h.push(k.id()),p[k.id()]=w.id(),f[k.id()]=S.id())}}}return{found:!1,distance:void 0,path:void 0,steps:b}}}}};t.exports=i},{"../../is":83}],4:[function(e,t,r){"use strict";var n=e("../../is"),i=e("../../util"),a={bellmanFord:function(e){var t=this;if(e=e||{},null!=e.weight&&n.fn(e.weight))var r=e.weight;else var r=function(e){return 1};if(null!=e.directed)var a=e.directed;else var a=!1;if(null!=e.root){if(n.string(e.root))var o=this.filter(e.root)[0];else var o=e.root[0];for(var s=this._private.cy,l=this.edges().stdFilter(function(e){return!e.isLoop()}),u=this.nodes(),c=u.length,d={},h=0;c>h;h++)d[u[h].id()]=h;for(var p=[],f=[],v=[],h=0;c>h;h++)u[h].id()===o.id()?p[h]=0:p[h]=1/0,f[h]=void 0;for(var g=!1,h=1;c>h;h++){g=!1;for(var y=0;y<l.length;y++){var m=d[l[y].source().id()],b=d[l[y].target().id()],x=r.apply(l[y],[l[y]]),w=p[m]+x;if(w<p[b]&&(p[b]=w,f[b]=m,v[b]=l[y],g=!0),!a){var w=p[b]+x;w<p[m]&&(p[m]=w,f[m]=b,v[m]=l[y],g=!0)}}if(!g)break}if(g)for(var y=0;y<l.length;y++){var m=d[l[y].source().id()],b=d[l[y].target().id()],x=r.apply(l[y],[l[y]]);if(p[m]+x<p[b])return i.error("Graph contains a negative weight cycle for Bellman-Ford"),{pathTo:void 0,distanceTo:void 0,hasNegativeWeightCycle:!0}}for(var E=[],h=0;c>h;h++)E.push(u[h].id());var _={distanceTo:function(e){if(n.string(e))var t=s.filter(e)[0].id();else var t=e.id();return p[d[t]]},pathTo:function(e){var r=function(e,t,r,n,i,a){for(;;){if(i.push(s.getElementById(n[r])),i.push(a[r]),t===r)return i;var o=e[r];if("undefined"==typeof o)return;r=o}};if(n.string(e))var i=s.filter(e)[0].id();else var i=e.id();var a=[],l=r(f,d[o.id()],d[i],E,a,v);return null!=l&&l.reverse(),t.spawn(l)},hasNegativeWeightCycle:!1};return _}}};t.exports=a},{"../../is":83,"../../util":100}],5:[function(e,t,r){"use strict";var n=e("../../is"),i=e("../../heap"),a={betweennessCentrality:function(e){e=e||{};var t,r;n.fn(e.weight)?(r=e.weight,t=!0):t=!1;for(var a=null!=e.directed?e.directed:!1,o=this._private.cy,s=this.nodes(),l={},u={},c=0,d={set:function(e,t){u[e]=t,t>c&&(c=t)},get:function(e){return u[e]}},h=0;h<s.length;h++){var p=s[h],f=p.id();a?l[f]=p.outgoers().nodes():l[f]=p.openNeighborhood().nodes(),d.set(f,0)}for(var v=0;v<s.length;v++){for(var g=s[v].id(),y=[],m={},b={},x={},w=new i(function(e,t){return x[e]-x[t]}),h=0;h<s.length;h++){var f=s[h].id();m[f]=[],b[f]=0,x[f]=1/0}for(b[g]=1,x[g]=0,w.push(g);!w.empty();){var p=w.pop();if(y.push(p),t)for(var E=0;E<l[p].length;E++){var _,P=l[p][E],S=o.getElementById(p);_=S.edgesTo(P).length>0?S.edgesTo(P)[0]:P.edgesTo(S)[0];var k=r.apply(_,[_]);P=P.id(),x[P]>x[p]+k&&(x[P]=x[p]+k,w.nodes.indexOf(P)<0?w.push(P):w.updateItem(P),b[P]=0,m[P]=[]),x[P]==x[p]+k&&(b[P]=b[P]+b[p],m[P].push(p))}else for(var E=0;E<l[p].length;E++){var P=l[p][E].id();x[P]==1/0&&(w.push(P),x[P]=x[p]+1),x[P]==x[p]+1&&(b[P]=b[P]+b[p],m[P].push(p))}}for(var T={},h=0;h<s.length;h++)T[s[h].id()]=0;for(;y.length>0;)for(var P=y.pop(),E=0;E<m[P].length;E++){var p=m[P][E];T[p]=T[p]+b[p]/b[P]*(1+T[P]),P!=s[v].id()&&d.set(P,d.get(P)+T[P])}}var D={betweenness:function(e){if(n.string(e))var e=o.filter(e).id();else var e=e.id();return d.get(e)},betweennessNormalized:function(e){if(0==c)return 0;if(n.string(e))var e=o.filter(e).id();else var e=e.id();return d.get(e)/c}};return D.betweennessNormalised=D.betweennessNormalized,D}};a.bc=a.betweennessCentrality,t.exports=a},{"../../heap":81,"../../is":83}],6:[function(e,t,r){"use strict";var n=e("../../is"),i=function(e){return e={bfs:e.bfs||!e.dfs,dfs:e.dfs||!e.bfs},function(t,r,i){var a,o,s;n.plainObject(t)&&!n.elementOrCollection(t)&&(a=t,t=a.roots||a.root,r=a.visit,i=a.directed,o=a.std,s=a.thisArg),i=2!==arguments.length||n.fn(r)?i:r,r=n.fn(r)?r:function(){};for(var l,u=this._private.cy,c=t=n.string(t)?this.filter(t):t,d=[],h=[],p={},f={},v={},g=0,y=this.nodes(),m=this.edges(),b=0;b<c.length;b++)c[b].isNode()&&(d.unshift(c[b]),e.bfs&&(v[c[b].id()]=!0,h.push(c[b])),f[c[b].id()]=0);for(;0!==d.length;){var c=e.bfs?d.shift():d.pop();if(e.dfs){if(v[c.id()])continue;v[c.id()]=!0,h.push(c)}var x,w=f[c.id()],E=p[c.id()],_=null==E?void 0:E.connectedNodes().not(c)[0];if(x=o?r.call(s,c,E,_,g++,w):r.call(c,g++,w,c,E,_),x===!0){l=c;break}if(x===!1)break;for(var P=c.connectedEdges(i?function(){return this.data("source")===c.id()}:void 0).intersect(m),b=0;b<P.length;b++){var S=P[b],k=S.connectedNodes(function(){return this.id()!==c.id()}).intersect(y);0===k.length||v[k.id()]||(k=k[0],d.push(k),e.bfs&&(v[k.id()]=!0,h.push(k)),p[k.id()]=S,f[k.id()]=f[c.id()]+1)}}for(var T=[],b=0;b<h.length;b++){var D=h[b],C=p[D.id()];C&&T.push(C),T.push(D)}return{path:u.collection(T,{unique:!0}),found:u.collection(l)}}},a={breadthFirstSearch:i({bfs:!0}),depthFirstSearch:i({dfs:!0})};a.bfs=a.breadthFirstSearch,a.dfs=a.depthFirstSearch,t.exports=a},{"../../is":83}],7:[function(e,t,r){"use strict";var n=e("../../is"),i={closenessCentralityNormalized:function(e){e=e||{};var t=this.cy(),r=e.harmonic;void 0===r&&(r=!0);for(var i={},a=0,o=this.nodes(),s=this.floydWarshall({weight:e.weight,directed:e.directed}),l=0;l<o.length;l++){for(var u=0,c=0;c<o.length;c++)if(l!=c){var d=s.distance(o[l],o[c]);u+=r?1/d:d}r||(u=1/u),u>a&&(a=u),i[o[l].id()]=u}return{closeness:function(e){if(0==a)return 0;if(n.string(e))var e=t.filter(e)[0].id();else var e=e.id();return i[e]/a}}},closenessCentrality:function(e){if(e=e||{},null!=e.root){if(n.string(e.root))var t=this.filter(e.root)[0];else var t=e.root[0];if(null!=e.weight&&n.fn(e.weight))var r=e.weight;else var r=function(){return 1};if(null!=e.directed&&n.bool(e.directed))var i=e.directed;else var i=!1;var a=e.harmonic;void 0===a&&(a=!0);for(var o=this.dijkstra({root:t,weight:r,directed:i}),s=0,l=this.nodes(),u=0;u<l.length;u++)if(l[u].id()!=t.id()){var c=o.distanceTo(l[u]);s+=a?1/c:c}return a?s:1/s}}};i.cc=i.closenessCentrality,i.ccn=i.closenessCentralityNormalised=i.closenessCentralityNormalized,t.exports=i},{"../../is":83}],8:[function(e,t,r){"use strict";var n=e("../../is"),i=e("../../util"),a={degreeCentralityNormalized:function(e){e=e||{};var t=this.cy();if(null!=e.directed)var r=e.directed;else var r=!1;var a=this.nodes(),o=a.length;if(r){for(var s={},l={},u=0,c=0,d=0;o>d;d++){var h=a[d],p=this.degreeCentrality(i.extend({},e,{root:h}));u<p.indegree&&(u=p.indegree),c<p.outdegree&&(c=p.outdegree),s[h.id()]=p.indegree,l[h.id()]=p.outdegree}return{indegree:function(e){if(0==u)return 0;if(n.string(e))var e=t.filter(e)[0].id();else var e=e.id();return s[e]/u},outdegree:function(e){if(0==c)return 0;if(n.string(e))var e=t.filter(e)[0].id();else var e=e.id();return l[e]/c}}}for(var f={},v=0,d=0;o>d;d++){var h=a[d],p=this.degreeCentrality(i.extend({},e,{root:h}));v<p.degree&&(v=p.degree),f[h.id()]=p.degree}return{degree:function(e){if(0==v)return 0;if(n.string(e))var e=t.filter(e)[0].id();else var e=e.id();return f[e]/v}}},degreeCentrality:function(e){e=e||{};var t=this;if(null!=e&&null!=e.root){var r=n.string(e.root)?this.filter(e.root)[0]:e.root[0];if(null!=e.weight&&n.fn(e.weight))var i=e.weight;else var i=function(e){return 1};if(null!=e.directed)var a=e.directed;else var a=!1;if(null!=e.alpha&&n.number(e.alpha))var o=e.alpha;else o=0;if(a){for(var s=r.connectedEdges('edge[target = "'+r.id()+'"]').intersection(t),l=r.connectedEdges('edge[source = "'+r.id()+'"]').intersection(t),u=s.length,c=l.length,d=0,h=0,p=0;p<s.length;p++){var f=s[p];d+=i.apply(f,[f])}for(var p=0;p<l.length;p++){var f=l[p];h+=i.apply(f,[f])}return{indegree:Math.pow(u,1-o)*Math.pow(d,o),outdegree:Math.pow(c,1-o)*Math.pow(h,o)}}for(var v=r.connectedEdges().intersection(t),g=v.length,y=0,p=0;p<v.length;p++){var f=v[p];y+=i.apply(f,[f])}return{degree:Math.pow(g,1-o)*Math.pow(y,o)}}}};a.dc=a.degreeCentrality,a.dcn=a.degreeCentralityNormalised=a.degreeCentralityNormalized,t.exports=a},{"../../is":83,"../../util":100}],9:[function(e,t,r){"use strict";var n=e("../../is"),i=e("../../heap"),a={dijkstra:function(e,t,r){var a;n.plainObject(e)&&!n.elementOrCollection(e)&&(a=e,e=a.root,t=a.weight,r=a.directed);var o=this._private.cy;t=n.fn(t)?t:function(){return 1};for(var s=n.string(e)?this.filter(e)[0]:e[0],l={},u={},c={},d=this.edges().filter(function(){return!this.isLoop()}),h=this.nodes(),p=function(e){return l[e.id()]},f=function(e,t){l[e.id()]=t,v.updateItem(e)},v=new i(function(e,t){return p(e)-p(t)}),g=0;g<h.length;g++){var y=h[g];l[y.id()]=y.same(s)?0:1/0,v.push(y)}for(var m=function(e,n){for(var i,a=(r?e.edgesTo(n):e.edgesWith(n)).intersect(d),o=1/0,s=0;s<a.length;s++){var l=a[s],u=t.apply(l,[l]);(o>u||!i)&&(o=u,i=l)}return{edge:i,dist:o}};v.size()>0;){var b=v.pop(),x=p(b),w=b.id();if(c[w]=x,x===Math.Infinite)break;for(var E=b.neighborhood().intersect(h),g=0;g<E.length;g++){var _=E[g],P=_.id(),S=m(b,_),k=x+S.dist;k<p(_)&&(f(_,k),u[P]={node:b,edge:S.edge})}}return{distanceTo:function(e){var t=n.string(e)?h.filter(e)[0]:e[0];return c[t.id()]},pathTo:function(e){var t=n.string(e)?h.filter(e)[0]:e[0],r=[],i=t;if(t.length>0)for(r.unshift(t);u[i.id()];){var a=u[i.id()];r.unshift(a.edge),r.unshift(a.node),i=a.node}return o.collection(r)}}}};t.exports=a},{"../../heap":81,"../../is":83}],10:[function(e,t,r){"use strict";var n=e("../../is"),i={floydWarshall:function(e){e=e||{};var t=this.cy();if(null!=e.weight&&n.fn(e.weight))var r=e.weight;else var r=function(e){return 1};if(null!=e.directed)var i=e.directed;else var i=!1;for(var a=this.edges().stdFilter(function(e){return!e.isLoop()}),o=this.nodes(),s=o.length,l={},u=0;s>u;u++)l[o[u].id()]=u;for(var c=[],u=0;s>u;u++){for(var d=new Array(s),h=0;s>h;h++)u==h?d[h]=0:d[h]=1/0;c.push(d)}var p=[],f=[],v=function(e){for(var t=0;s>t;t++){for(var r=new Array(s),n=0;s>n;n++)r[n]=void 0;e.push(r)}};v(p),v(f);for(var u=0;u<a.length;u++){var g=l[a[u].source().id()],y=l[a[u].target().id()],m=r.apply(a[u],[a[u]]);c[g][y]>m&&(c[g][y]=m,p[g][y]=y,f[g][y]=a[u])}if(!i)for(var u=0;u<a.length;u++){var g=l[a[u].target().id()],y=l[a[u].source().id()],m=r.apply(a[u],[a[u]]);c[g][y]>m&&(c[g][y]=m,p[g][y]=y,f[g][y]=a[u])}for(var b=0;s>b;b++)for(var u=0;s>u;u++)for(var h=0;s>h;h++)c[u][b]+c[b][h]<c[u][h]&&(c[u][h]=c[u][b]+c[b][h],p[u][h]=p[u][b]);for(var x=[],u=0;s>u;u++)x.push(o[u].id());var w={distance:function(e,r){if(n.string(e))var i=t.filter(e)[0].id();else var i=e.id();if(n.string(r))var a=t.filter(r)[0].id();else var a=r.id();return c[l[i]][l[a]]},path:function(e,r){var i=function(e,r,n,i,a){if(e===r)return t.getElementById(i[e]);if(void 0!==n[e][r]){for(var o=[t.getElementById(i[e])],s=e;e!==r;){s=e,e=n[e][r];var l=a[s][e];o.push(l),o.push(t.getElementById(i[e]))}return o}};if(n.string(e))var a=t.filter(e)[0].id();else var a=e.id();if(n.string(r))var o=t.filter(r)[0].id();else var o=r.id();var s=i(l[a],l[o],p,x,f);return t.collection(s)}};return w}};t.exports=i},{"../../is":83}],11:[function(e,t,r){"use strict";var n=e("../../util"),i={};[e("./bfs-dfs"),e("./dijkstra"),e("./kruskal"),e("./a-star"),e("./floyd-warshall"),e("./bellman-ford"),e("./kerger-stein"),e("./page-rank"),e("./degree-centrality"),e("./closeness-centrality"),e("./betweenness-centrality")].forEach(function(e){n.extend(i,e)}),t.exports=i},{"../../util":100,"./a-star":3,"./bellman-ford":4,"./betweenness-centrality":5,"./bfs-dfs":6,"./closeness-centrality":7,"./degree-centrality":8,"./dijkstra":9,"./floyd-warshall":10,"./kerger-stein":12,"./kruskal":13,"./page-rank":14}],12:[function(e,t,r){"use strict";var n=e("../../util"),i={kargerStein:function(e){var t=this;e=e||{};var r=function(e,t,r){for(var n=r[e],i=n[1],a=n[2],o=t[i],s=t[a],l=r.filter(function(e){return t[e[1]]===o&&t[e[2]]===s?!1:t[e[1]]!==s||t[e[2]]!==o}),u=0;u<l.length;u++){var c=l[u];c[1]===s?(l[u]=c.slice(0),l[u][1]=o):c[2]===s&&(l[u]=c.slice(0),l[u][2]=o)}for(var u=0;u<t.length;u++)t[u]===s&&(t[u]=o);return l},i=function(e,t,n,a){if(a>=n)return t;var o=Math.floor(Math.random()*t.length),s=r(o,e,t);return i(e,s,n-1,a)},a=this._private.cy,o=this.edges().stdFilter(function(e){return!e.isLoop()}),s=this.nodes(),l=s.length,u=o.length,c=Math.ceil(Math.pow(Math.log(l)/Math.LN2,2)),d=Math.floor(l/Math.sqrt(2));if(2>l)return void n.error("At least 2 nodes are required for Karger-Stein algorithm");for(var h={},p=0;l>p;p++)h[s[p].id()]=p;for(var f=[],p=0;u>p;p++){var v=o[p];f.push([p,h[v.source().id()],h[v.target().id()]])}for(var g,y=1/0,m=[],p=0;l>p;p++)m.push(p);for(var b=0;c>=b;b++){var x=m.slice(0),w=i(x,f,l,d),E=x.slice(0),_=i(x,w,d,2),P=i(E,w,d,2);_.length<=P.length&&_.length<y?(y=_.length,g=[_,x]):P.length<=_.length&&P.length<y&&(y=P.length,g=[P,E])}for(var S=g[0].map(function(e){return o[e[0]]}),k=[],T=[],D=g[1][0],p=0;p<g[1].length;p++){var C=g[1][p];C===D?k.push(s[p]):T.push(s[p])}var M={cut:t.spawn(a,S),partition1:t.spawn(k),partition2:t.spawn(T)};return M}};t.exports=i},{"../../util":100}],13:[function(e,t,r){"use strict";var n=e("../../is"),i={kruskal:function(e){function t(e){for(var t=0;t<a.length;t++){var r=a[t];if(r.anySame(e))return{eles:r,index:t}}}var r=this.cy();e=n.fn(e)?e:function(){return 1};for(var i=r.collection(r,[]),a=[],o=this.nodes(),s=0;s<o.length;s++)a.push(o[s].collection());for(var l=this.edges(),u=l.toArray().sort(function(t,r){var n=e.call(t,t),i=e.call(r,r);return n-i}),s=0;s<u.length;s++){var c=u[s],d=c.source()[0],h=c.target()[0],p=t(d),f=t(h);p.index!==f.index&&(i=i.add(c),a[p.index]=p.eles.add(f.eles),a.splice(f.index,1))}return o.add(i)}};t.exports=i},{"../../is":83}],14:[function(e,t,r){"use strict";var n=e("../../is"),i={pageRank:function(e){e=e||{};var t=function(e){for(var t=e.length,r=0,n=0;t>n;n++)r+=e[n];for(var n=0;t>n;n++)e[n]=e[n]/r};if(null!=e&&null!=e.dampingFactor)var r=e.dampingFactor;else var r=.8;if(null!=e&&null!=e.precision)var i=e.precision;else var i=1e-6;if(null!=e&&null!=e.iterations)var a=e.iterations;else var a=200;if(null!=e&&null!=e.weight&&n.fn(e.weight))var o=e.weight;else var o=function(e){return 1};for(var s=this._private.cy,l=this.edges().stdFilter(function(e){return!e.isLoop()}),u=this.nodes(),c=u.length,d=l.length,h={},p=0;c>p;p++)h[u[p].id()]=p;for(var f=[],v=[],g=(1-r)/c,p=0;c>p;p++){for(var y=[],m=0;c>m;m++)y.push(0);f.push(y),v.push(0)}for(var p=0;d>p;p++){var b=l[p],x=h[b.source().id()],w=h[b.target().id()],E=o.apply(b,[b]);f[w][x]+=E,v[x]+=E}for(var _=1/c+g,m=0;c>m;m++)if(0===v[m])for(var p=0;c>p;p++)f[p][m]=_;else for(var p=0;c>p;p++)f[p][m]=f[p][m]/v[m]+g;for(var P,S=[],k=[],p=0;c>p;p++)S.push(1),k.push(0);for(var T=0;a>T;T++){for(var D=k.slice(0),p=0;c>p;p++)for(var m=0;c>m;m++)D[p]+=f[p][m]*S[m];t(D),P=S,S=D;for(var C=0,p=0;c>p;p++)C+=Math.pow(P[p]-S[p],2);if(i>C)break}var M={rank:function(e){if(n.string(e))var t=s.filter(e)[0].id();else var t=e.id();return S[h[t]]}};return M}};t.exports=i},{"../../is":83}],15:[function(e,t,r){"use strict";var n=e("../define"),i={animate:n.animate(),animation:n.animation(),animated:n.animated(),clearQueue:n.clearQueue(),delay:n.delay(),delayAnimation:n.delayAnimation(),stop:n.stop()};t.exports=i},{"../define":44}],16:[function(e,t,r){"use strict";var n=e("../util"),i={classes:function(e){e=e.match(/\S+/g)||[];for(var t=this,r=[],i={},a=0;a<e.length;a++){var o=e[a];i[o]=!0}for(var s=0;s<t.length;s++){for(var l=t[s],u=l._private,c=u.classes,d=!1,a=0;a<e.length;a++){var o=e[a],h=c[o];if(!h){d=!0;break}}if(!d)for(var e=Object.keys(c),a=0;a<e.length;a++){var p=e[a],h=c[p],f=i[p];if(h&&!f){d=!0;break}}d&&(u.classes=n.copy(i),r.push(l))}return r.length>0&&this.spawn(r).updateStyle().trigger("class"),t},addClass:function(e){return this.toggleClass(e,!0)},hasClass:function(e){var t=this[0];return!(null==t||!t._private.classes[e])},toggleClass:function(e,t){for(var r=e.match(/\S+/g)||[],n=this,i=[],a=0,o=n.length;o>a;a++)for(var s=n[a],l=!1,u=0;u<r.length;u++){var c=r[u],d=s._private.classes,h=d[c],p=t||void 0===t&&!h;p?(d[c]=!0,h||l||(i.push(s),l=!0)):(d[c]=!1,h&&!l&&(i.push(s),l=!0))}return i.length>0&&this.spawn(i).updateStyle().trigger("class"),n},removeClass:function(e){return this.toggleClass(e,!1)},flashClass:function(e,t){var r=this;if(null==t)t=250;else if(0===t)return r;return r.addClass(e),setTimeout(function(){r.removeClass(e)},t),r}};t.exports=i},{"../util":100}],17:[function(e,t,r){"use strict";var n={allAre:function(e){return this.filter(e).length===this.length},is:function(e){return this.filter(e).length>0},some:function(e,t){for(var r=0;r<this.length;r++){var n=t?e.apply(t,[this[r],r,this]):e(this[r],r,this);if(n)return!0}return!1},every:function(e,t){for(var r=0;r<this.length;r++){var n=t?e.apply(t,[this[r],r,this]):e(this[r],r,this);if(!n)return!1}return!0},same:function(e){return e=this.cy().collection(e),this.length!==e.length?!1:this.intersect(e).length===this.length},anySame:function(e){return e=this.cy().collection(e),this.intersect(e).length>0},allAreNeighbors:function(e){return e=this.cy().collection(e),this.neighborhood().intersect(e).length===e.length}};n.allAreNeighbours=n.allAreNeighbors,t.exports=n},{}],18:[function(e,t,r){"use strict";var n={parent:function(e){for(var t=[],r=this._private.cy,n=0;n<this.length;n++){var i=this[n],a=r.getElementById(i._private.data.parent);a.size()>0&&t.push(a)}return this.spawn(t,{unique:!0}).filter(e)},parents:function(e){for(var t=[],r=this.parent();r.nonempty();){for(var n=0;n<r.length;n++){var i=r[n];t.push(i)}r=r.parent()}return this.spawn(t,{unique:!0}).filter(e)},commonAncestors:function(e){for(var t,r=0;r<this.length;r++){var n=this[r],i=n.parents();t=t||i,t=t.intersect(i)}return t.filter(e)},orphans:function(e){return this.stdFilter(function(e){return e.isNode()&&e.parent().empty()}).filter(e)},nonorphans:function(e){return this.stdFilter(function(e){return e.isNode()&&e.parent().nonempty()}).filter(e)},children:function(e){for(var t=[],r=0;r<this.length;r++){var n=this[r];t=t.concat(n._private.children)}return this.spawn(t,{unique:!0}).filter(e)},siblings:function(e){return this.parent().children().not(this).filter(e)},isParent:function(){var e=this[0];return e?0!==e._private.children.length:void 0},isChild:function(){var e=this[0];return e?void 0!==e._private.data.parent&&0!==e.parent().length:void 0},descendants:function(e){function t(e){for(var n=0;n<e.length;n++){var i=e[n];r.push(i),i.children().nonempty()&&t(i.children())}}var r=[];return t(this.children()),this.spawn(r,{unique:!0}).filter(e)}};n.ancestors=n.parents,t.exports=n},{}],19:[function(e,t,r){"use strict";var n,i,a=e("../define");n=i={data:a.data({field:"data",bindingEvent:"data",allowBinding:!0,allowSetting:!0,settingEvent:"data",settingTriggersEvent:!0,triggerFnName:"trigger",allowGetting:!0,immutableKeys:{id:!0,source:!0,target:!0,parent:!0},updateStyle:!0}),removeData:a.removeData({field:"data",event:"data",triggerFnName:"trigger",triggerEvent:!0,immutableKeys:{id:!0,source:!0,target:!0,parent:!0},updateStyle:!0}),scratch:a.data({field:"scratch",bindingEvent:"scratch",allowBinding:!0,allowSetting:!0,settingEvent:"scratch",settingTriggersEvent:!0,triggerFnName:"trigger",allowGetting:!0,updateStyle:!0}),removeScratch:a.removeData({field:"scratch",event:"scratch",triggerFnName:"trigger",triggerEvent:!0,updateStyle:!0}),rscratch:a.data({field:"rscratch",allowBinding:!1,allowSetting:!0,settingTriggersEvent:!1,allowGetting:!0}),removeRscratch:a.removeData({field:"rscratch",triggerEvent:!1}),id:function(){var e=this[0];return e?e._private.data.id:void 0}},n.attr=n.data,n.removeAttr=n.removeData,t.exports=i},{"../define":44}],20:[function(e,t,r){"use strict";function n(e){return function(t){var r=this;if(void 0===t&&(t=!0),0!==r.length&&r.isNode()&&!r.removed()){for(var n=0,i=r[0],a=i._private.edges,o=0;o<a.length;o++){var s=a[o];!t&&s.isLoop()||(n+=e(i,s))}return n}}}function i(e,t){return function(r){for(var n,i=this.nodes(),a=0;a<i.length;a++){var o=i[a],s=o[e](r);void 0===s||void 0!==n&&!t(s,n)||(n=s)}return n}}var a=e("../util"),o={};a.extend(o,{degree:n(function(e,t){return t.source().same(t.target())?2:1}),indegree:n(function(e,t){return t.target().same(e)?1:0}),outdegree:n(function(e,t){return t.source().same(e)?1:0})}),a.extend(o,{minDegree:i("degree",function(e,t){return t>e}),maxDegree:i("degree",function(e,t){return e>t}),minIndegree:i("indegree",function(e,t){return t>e}),maxIndegree:i("indegree",function(e,t){return e>t}),minOutdegree:i("outdegree",function(e,t){return t>e}),maxOutdegree:i("outdegree",function(e,t){return e>t})}),a.extend(o,{totalDegree:function(e){for(var t=0,r=this.nodes(),n=0;n<r.length;n++)t+=r[n].degree(e);return t}}),t.exports=o},{"../util":100}],21:[function(e,t,r){"use strict";var n,i,a=e("../define"),o=e("../is"),s=e("../util"),l=e("../math");n=i={position:a.data({field:"position",bindingEvent:"position",allowBinding:!0,allowSetting:!0,settingEvent:"position",settingTriggersEvent:!0,triggerFnName:"rtrigger",allowGetting:!0,validKeys:["x","y"],onSet:function(e){var t=e.updateCompoundBounds();t.rtrigger("position")},canSet:function(e){return!e.locked()&&!e.isParent()}}),silentPosition:a.data({field:"position",bindingEvent:"position",allowBinding:!1,allowSetting:!0,settingEvent:"position",settingTriggersEvent:!1,triggerFnName:"trigger",allowGetting:!0,validKeys:["x","y"],onSet:function(e){e.updateCompoundBounds()},canSet:function(e){return!e.locked()&&!e.isParent()}}),positions:function(e,t){if(o.plainObject(e))this.position(e);else if(o.fn(e)){for(var r=e,n=0;n<this.length;n++){var i=this[n],e=r.apply(i,[n,i]);if(e&&!i.locked()&&!i.isParent()){var a=i._private.position;a.x=e.x,a.y=e.y}}var s=this.updateCompoundBounds(),l=s.length>0?this.add(s):this;t?l.trigger("position"):l.rtrigger("position")}return this},silentPositions:function(e){return this.positions(e,!0)},renderedPosition:function(e,t){var r=this[0],n=this.cy(),i=n.zoom(),a=n.pan(),s=o.plainObject(e)?e:void 0,l=void 0!==s||void 0!==t&&o.string(e);if(r&&r.isNode()){if(!l){var u=r._private.position;return s={x:u.x*i+a.x,y:u.y*i+a.y},void 0===e?s:s[e]}for(var c=0;c<this.length;c++){var r=this[c];void 0!==t?r._private.position[e]=(t-a[e])/i:void 0!==s&&(r._private.position={x:(s.x-a.x)/i,y:(s.y-a.y)/i})}this.rtrigger("position")}else if(!l)return;return this},relativePosition:function(e,t){var r=this[0],n=this.cy(),i=o.plainObject(e)?e:void 0,a=void 0!==i||void 0!==t&&o.string(e),s=n.hasCompoundNodes();if(r&&r.isNode()){if(!a){var l=r._private.position,u=s?r.parent():null,c=u&&u.length>0,d=c;c&&(u=u[0]);var h=d?u._private.position:{x:0,y:0};return i={x:l.x-h.x,y:l.y-h.y},void 0===e?i:i[e]}for(var p=0;p<this.length;p++){var r=this[p],u=s?r.parent():null,c=u&&u.length>0,d=c;c&&(u=u[0]);var h=d?u._private.position:{x:0,y:0};void 0!==t?r._private.position[e]=t+h[e]:void 0!==i&&(r._private.position={x:i.x+h.x,y:i.y+h.y})}this.rtrigger("position")}else if(!a)return;return this},renderedBoundingBox:function(e){var t=this.boundingBox(e),r=this.cy(),n=r.zoom(),i=r.pan(),a=t.x1*n+i.x,o=t.x2*n+i.x,s=t.y1*n+i.y,l=t.y2*n+i.y;return{x1:a,x2:o,y1:s,y2:l,w:o-a,h:l-s}},updateCompoundBounds:function(){function e(e){if(e.isParent()){var t=e._private,n=e.children(),i="include"===e.pstyle("compound-sizing-wrt-labels").value,a=n.boundingBox({includeLabels:i,includeShadows:!1,includeOverlays:!1,useCache:!1}),o={top:e.pstyle("padding-top").pfValue,bottom:e.pstyle("padding-bottom").pfValue,left:e.pstyle("padding-left").pfValue,right:e.pstyle("padding-right").pfValue},s=t.position;t.autoWidth=a.w,s.x=(a.x1+a.x2-o.left+o.right)/2,t.autoHeight=a.h,s.y=(a.y1+a.y2-o.top+o.bottom)/2,r.push(e)}}var t=this.cy();if(!t.styleEnabled()||!t.hasCompoundNodes())return t.collection();for(var r=[],n=this;n.nonempty();){for(var i=0;i<n.length;i++){var a=n[i];e(a)}n=n.parent()}return this.spawn(r)}};var u=function(e){return e===1/0||e===-(1/0)?0:e},c=function(e,t,r,n,i){n-t!==0&&i-r!==0&&(e.x1=t<e.x1?t:e.x1,e.x2=n>e.x2?n:e.x2,e.y1=r<e.y1?r:e.y1,e.y2=i>e.y2?i:e.y2)},d=function(e,t){return c(e,t.x1,t.y1,t.x2,t.y2)},h=function(e,t,r){return s.getPrefixedProperty(e,t,r)},p=function(e,t,r,n){var i,a,o=t._private,s=o.rstyle,l=s.arrowWidth/2,u=t.pstyle(r+"-arrow-shape").value;"none"!==u&&("source"===r?(i=s.srcX,a=s.srcY):"target"===r?(i=s.tgtX,a=s.tgtY):(i=s.midX,a=s.midY),c(e,i-l,a-l,i+l,a+l))},f=function(e,t,r,n){var i;i=r?r+"-":"";var a=t._private,o=a.rstyle,s=t.pstyle(i+"label").strValue;if(s){var l,u,d,p,f=t.pstyle("text-halign"),v=t.pstyle("text-valign"),g=h(o,"labelWidth",r),y=h(o,"labelHeight",r),m=h(o,"labelX",r),b=h(o,"labelY",r),x=t.pstyle(i+"text-margin-x").pfValue,w=t.pstyle(i+"text-margin-y").pfValue,E=t.isEdge(),_=t.pstyle(i+"text-rotation"),P=t.pstyle("text-shadow-blur").pfValue/2,S=t.pstyle("text-shadow-offset-x").pfValue,k=t.pstyle("text-shadow-offset-y").pfValue,T=t.pstyle("text-shadow-opacity").value,D=t.pstyle("text-outline-width").pfValue,C=t.pstyle("text-border-width").pfValue,M=C/2,N=y,B=g,z=B/2,I=N/2;if(E)l=m-z,u=m+z,d=b-I,p=b+I;else{switch(f.value){case"left":l=m-B,u=m;break;case"center":l=m-z,u=m+z;break;case"right":l=m,u=m+B}switch(v.value){case"top":d=b-N,p=b;break;case"center":d=b-I,p=b+I;break;case"bottom":d=b,p=b+N}}var L=E&&"autorotate"===_.strValue,O=null!=_.pfValue&&0!==_.pfValue;if(L||O){var A=L?h(a.rstyle,"labelAngle",r):_.pfValue,R=Math.cos(A),q=Math.sin(A),V=function(e,t){return e-=m,t-=b,{x:e*R-t*q+m,y:e*q+t*R+b}},F=V(l,d),j=V(l,p),X=V(u,d),Y=V(u,p);l=Math.min(F.x,j.x,X.x,Y.x),u=Math.max(F.x,j.x,X.x,Y.x),d=Math.min(F.y,j.y,X.y,Y.y),p=Math.max(F.y,j.y,X.y,Y.y)}l+=x-Math.max(D,M),u+=x+Math.max(D,M),d+=w-Math.max(D,M),p+=w+Math.max(D,M),c(e,l,d,u,p),n.includeShadows&&T>0&&(l+=-P+S,u+=+P+S,d+=-P+k,p+=+P+k,c(e,l,d,u,p))}return e},v=function(e,t){var r,n,i,a,o,s,d=e._private.cy,h=d._private,v=h.styleEnabled,g={x1:1/0,y1:1/0,x2:-(1/0),y2:-(1/0)},y=e._private,m=v?e.pstyle("display").value:"element",b=e.isNode(),x=e.isEdge(),w="none"!==m;if(w){var E=0,_=0;v&&t.includeOverlays&&(E=e.pstyle("overlay-opacity").value,0!==E&&(_=e.pstyle("overlay-padding").value));var P=0,S=0;if(v&&(P=e.pstyle("width").pfValue,S=P/2),b&&t.includeNodes){var k=y.position;o=k.x,s=k.y;var P=e.outerWidth(),T=P/2,D=e.outerHeight(),C=D/2;r=o-T-_,n=o+T+_,i=s-C-_,a=s+C+_,c(g,r,i,n,a)}else if(x&&t.includeEdges){var M=y.rstyle||{};if(v&&(r=Math.min(M.srcX,M.midX,M.tgtX),n=Math.max(M.srcX,M.midX,M.tgtX),i=Math.min(M.srcY,M.midY,M.tgtY),a=Math.max(M.srcY,M.midY,M.tgtY),r-=S,n+=S,i-=S,a+=S,c(g,r,i,n,a)),v&&"haystack"===e.pstyle("curve-style").strValue){var N=M.haystackPts;if(r=N[0].x,i=N[0].y,n=N[1].x,a=N[1].y,r>n){var B=r;r=n,n=B}if(i>a){var B=i;i=a,a=B}c(g,r-S,i-S,n+S,a+S)}else{for(var z=M.bezierPts||M.linePts||[],I=0;I<z.length;I++){var L=z[I];r=L.x-S,n=L.x+S,i=L.y-S,a=L.y+S,c(g,r,i,n,a)}if(0===z.length){var O=y.source,A=O._private,R=A.position,q=y.target,V=q._private,F=V.position;if(r=R.x,n=F.x,i=R.y,a=F.y,r>n){var B=r;r=n,n=B}if(i>a){var B=i;i=a,a=B}r-=S,n+=S,i-=S,a+=S,c(g,r,i,n,a)}}}if(v){if(r=g.x1,n=g.x2,i=g.y1,a=g.y2,t.includeShadows&&e.pstyle("shadow-opacity").value>0){var j=e.pstyle("shadow-blur").pfValue/2,X=e.pstyle("shadow-offset-x").pfValue,Y=e.pstyle("shadow-offset-y").pfValue;c(g,r-j+X,i-j+Y,n+j+X,a+j+Y)}c(g,r-_,i-_,n+_,a+_)}v&&t.includeEdges&&x&&(p(g,e,"mid-source",t),p(g,e,"mid-target",t),p(g,e,"source",t),p(g,e,"target",t)),v&&t.includeLabels&&(f(g,e,null,t),x&&(f(g,e,"source",t),f(g,e,"target",t)))}return g.x1=u(g.x1),g.y1=u(g.y1),g.x2=u(g.x2),g.y2=u(g.y2),g.w=u(g.x2-g.x1),g.h=u(g.y2-g.y1),g.w>0&&g.h>0&&w&&l.expandBoundingBox(g,1),g},g=function(e){return e?"t":"f"},y=function(e){var t="";return t+=g(e.incudeNodes),t+=g(e.includeEdges),t+=g(e.includeLabels),t+=g(e.includeShadows),t+=g(e.includeOverlays)},m=function(e,t){var r,n=e._private,i=e.cy().headless(),a=t===b?x:y(t);return t.useCache&&!i&&n.bbCache&&n.bbCache[a]?r=n.bbCache[a]:(r=v(e,t),i||(n.bbCache=n.bbCache||{},n.bbCache[a]=r)),r},b={includeNodes:!0,includeEdges:!0,includeLabels:!0,includeShadows:!0,includeOverlays:!0,useCache:!0},x=y(b);i.recalculateRenderedStyle=function(e){var t=this.cy(),r=t.renderer(),n=t.styleEnabled();return r&&n&&r.recalculateRenderedStyle(this,e),this},i.boundingBox=function(e){if(1===this.length&&this[0]._private.bbCache&&(void 0===e||void 0===e.useCache||e.useCache===!0))return void 0===e&&(e=b),m(this[0],e);var t={x1:1/0,y1:1/0,x2:-(1/0),y2:-(1/0)};e=e||s.staticEmptyObject();var r={includeNodes:s["default"](e.includeNodes,b.includeNodes),includeEdges:s["default"](e.includeEdges,b.includeEdges),includeLabels:s["default"](e.includeLabels,b.includeLabels),
includeShadows:s["default"](e.includeShadows,b.includeShadows),includeOverlays:s["default"](e.includeOverlays,b.includeOverlays),useCache:s["default"](e.useCache,b.useCache)},n=this,i=n.cy(),a=i.styleEnabled();a&&this.recalculateRenderedStyle(r.useCache);for(var o=0;o<n.length;o++){var l=n[o];a&&l.isEdge()&&"bezier"===l.pstyle("curve-style").strValue&&l.parallelEdges().recalculateRenderedStyle(r.useCache),d(t,m(l,r))}return t.x1=u(t.x1),t.y1=u(t.y1),t.x2=u(t.x2),t.y2=u(t.y2),t.w=u(t.x2-t.x1),t.h=u(t.y2-t.y1),t};var w=function(e){e.uppercaseName=s.capitalize(e.name),e.autoName="auto"+e.uppercaseName,e.labelName="label"+e.uppercaseName,e.outerName="outer"+e.uppercaseName,e.uppercaseOuterName=s.capitalize(e.outerName),n[e.name]=function(){var t=this[0],r=t._private,n=r.cy,i=n._private.styleEnabled;if(t){if(!i)return 1;if(t.isParent())return r[e.autoName]||0;var a=t.pstyle(e.name);switch(a.strValue){case"label":return r.rstyle[e.labelName]||0;default:return a.pfValue}}},n["outer"+e.uppercaseName]=function(){var t=this[0],r=t._private,n=r.cy,i=n._private.styleEnabled;if(t){if(i){var a=t[e.name](),o=t.pstyle("border-width").pfValue,s=t.pstyle(e.paddings[0]).pfValue+t.pstyle(e.paddings[1]).pfValue;return a+o+s}return 1}},n["rendered"+e.uppercaseName]=function(){var t=this[0];if(t){var r=t[e.name]();return r*this.cy().zoom()}},n["rendered"+e.uppercaseOuterName]=function(){var t=this[0];if(t){var r=t[e.outerName]();return r*this.cy().zoom()}}};w({name:"width",paddings:["padding-left","padding-right"]}),w({name:"height",paddings:["padding-top","padding-bottom"]}),n.modelPosition=n.point=n.position,n.modelPositions=n.points=n.positions,n.renderedPoint=n.renderedPosition,n.relativePoint=n.relativePosition,n.boundingbox=n.boundingBox,n.renderedBoundingbox=n.renderedBoundingBox,t.exports=i},{"../define":44,"../is":83,"../math":85,"../util":100}],22:[function(e,t,r){"use strict";var n=e("../util"),i=e("../is"),a=function(e,t,r){var a=this;if(r=!(void 0!==r&&!r),void 0===e||void 0===t||!i.core(e))return void n.error("An element must have a core reference and parameters set");var o=t.group;if(null==o&&(o=t.data&&null!=t.data.source&&null!=t.data.target?"edges":"nodes"),"nodes"!==o&&"edges"!==o)return void n.error("An element must be of type `nodes` or `edges`; you specified `"+o+"`");if(this.length=1,this[0]=this,this._private={cy:e,single:!0,data:t.data||{},position:t.position||{},autoWidth:void 0,autoHeight:void 0,listeners:[],group:o,style:{},rstyle:{},styleCxts:[],removed:!0,selected:!!t.selected,selectable:void 0===t.selectable?!0:!!t.selectable,locked:!!t.locked,grabbed:!1,grabbable:void 0===t.grabbable?!0:!!t.grabbable,active:!1,classes:{},animation:{current:[],queue:[]},rscratch:{},scratch:t.scratch||{},edges:[],children:[],traversalCache:{}},t.renderedPosition){var s=t.renderedPosition,l=e.pan(),u=e.zoom();this._private.position={x:(s.x-l.x)/u,y:(s.y-l.y)/u}}if(i.string(t.classes))for(var c=t.classes.split(/\s+/),d=0,h=c.length;h>d;d++){var p=c[d];p&&""!==p&&(a._private.classes[p]=!0)}(t.style||t.css)&&e.style().applyBypass(this,t.style||t.css),(void 0===r||r)&&this.restore()};t.exports=a},{"../is":83,"../util":100}],23:[function(e,t,r){"use strict";var n=e("../define"),i={on:n.on(),one:n.on({unbindSelfOnTrigger:!0}),once:n.on({unbindAllBindersOnTrigger:!0}),off:n.off(),trigger:n.trigger(),rtrigger:function(e,t){return 0!==this.length?(this.cy().notify({type:e,eles:this}),this.trigger(e,t),this):void 0}};n.eventAliasesOn(i),t.exports=i},{"../define":44}],24:[function(e,t,r){"use strict";var n=e("../is"),i=e("../selector"),a={nodes:function(e){return this.filter(function(e,t){return t.isNode()}).filter(e)},edges:function(e){return this.filter(function(e,t){return t.isEdge()}).filter(e)},filter:function(e){if(void 0===e)return this;if(n.string(e)||n.elementOrCollection(e))return i(e).filter(this);if(n.fn(e)){for(var t=[],r=0;r<this.length;r++){var a=this[r];e.apply(a,[r,a])&&t.push(a)}return this.spawn(t)}return this.spawn()},not:function(e){if(e){n.string(e)&&(e=this.filter(e));for(var t=[],r=0;r<this.length;r++){var i=this[r],a=e._private.ids[i.id()];a||t.push(i)}return this.spawn(t)}return this},absoluteComplement:function(){var e=this._private.cy;return e.mutableElements().not(this)},intersect:function(e){if(n.string(e)){var t=e;return this.filter(t)}for(var r=[],i=this,a=e,o=this.length<e.length,s=o?a._private.ids:i._private.ids,l=o?i:a,u=0;u<l.length;u++){var c=l[u]._private.data.id,d=s[c];d&&r.push(d)}return this.spawn(r)},xor:function(e){var t=this._private.cy;n.string(e)&&(e=t.$(e));var r=[],i=this,a=e,o=function(e,t){for(var n=0;n<e.length;n++){var i=e[n],a=i._private.data.id,o=t._private.ids[a];o||r.push(i)}};return o(i,a),o(a,i),this.spawn(r)},diff:function(e){var t=this._private.cy;n.string(e)&&(e=t.$(e));var r=[],i=[],a=[],o=this,s=e,l=function(e,t,r){for(var n=0;n<e.length;n++){var i=e[n],o=i._private.data.id,s=t._private.ids[o];s?a.push(i):r.push(i)}};return l(o,s,r),l(s,o,i),{left:this.spawn(r,{unique:!0}),right:this.spawn(i,{unique:!0}),both:this.spawn(a,{unique:!0})}},add:function(e){var t=this._private.cy;if(!e)return this;if(n.string(e)){var r=e;e=t.mutableElements().filter(r)}for(var i=[],a=0;a<this.length;a++)i.push(this[a]);for(var a=0;a<e.length;a++){var o=!this._private.ids[e[a].id()];o&&i.push(e[a])}return this.spawn(i)},merge:function(e){var t=this._private,r=t.cy;if(!e)return this;if(e&&n.string(e)){var i=e;e=r.mutableElements().filter(i)}for(var a=0;a<e.length;a++){var o=e[a],s=o._private.data.id,l=!t.ids[s];if(l){var u=this.length++;this[u]=o,t.ids[s]=o,t.indexes[s]=u}else{var u=t.indexes[s];this[u]=o,t.ids[s]=o}}return this},unmergeOne:function(e){e=e[0];var t=this._private,r=e._private.data.id,n=t.indexes[r];if(null==n)return this;this[n]=void 0,t.ids[r]=void 0,t.indexes[r]=void 0;var i=n===this.length-1;if(this.length>1&&!i){var a=this.length-1,o=this[a],s=o._private.data.id;this[a]=void 0,this[n]=o,t.indexes[s]=n}return this.length--,this},unmerge:function(e){var t=this._private.cy;if(!e)return this;if(e&&n.string(e)){var r=e;e=t.mutableElements().filter(r)}for(var i=0;i<e.length;i++)this.unmergeOne(e[i]);return this},map:function(e,t){for(var r=[],n=this,i=0;i<n.length;i++){var a=n[i],o=t?e.apply(t,[a,i,n]):e(a,i,n);r.push(o)}return r},stdFilter:function(e,t){for(var r=[],n=this,i=0;i<n.length;i++){var a=n[i],o=t?e.apply(t,[a,i,n]):e(a,i,n);o&&r.push(a)}return this.spawn(r)},max:function(e,t){for(var r,n=-(1/0),i=this,a=0;a<i.length;a++){var o=i[a],s=t?e.apply(t,[o,a,i]):e(o,a,i);s>n&&(n=s,r=o)}return{value:n,ele:r}},min:function(e,t){for(var r,n=1/0,i=this,a=0;a<i.length;a++){var o=i[a],s=t?e.apply(t,[o,a,i]):e(o,a,i);n>s&&(n=s,r=o)}return{value:n,ele:r}}},o=a;o.u=o["|"]=o["+"]=o.union=o.or=o.add,o["\\"]=o["!"]=o["-"]=o.difference=o.relativeComplement=o.subtract=o.not,o.n=o["&"]=o["."]=o.and=o.intersection=o.intersect,o["^"]=o["(+)"]=o["(-)"]=o.symmetricDifference=o.symdiff=o.xor,o.fnFilter=o.filterFn=o.stdFilter,o.complement=o.abscomp=o.absoluteComplement,t.exports=a},{"../is":83,"../selector":87}],25:[function(e,t,r){"use strict";var n={isNode:function(){return"nodes"===this.group()},isEdge:function(){return"edges"===this.group()},isLoop:function(){return this.isEdge()&&this.source().id()===this.target().id()},isSimple:function(){return this.isEdge()&&this.source().id()!==this.target().id()},group:function(){var e=this[0];return e?e._private.group:void 0}};t.exports=n},{}],26:[function(e,t,r){"use strict";var n=e("../util"),i=e("../is"),a=e("./element"),o={generate:function(e,t,r){for(var i=null!=r?r:n.uuid();e.hasElementWithId(i);)i=n.uuid();return i}},s=function(e,t,r){if(void 0===e||!i.core(e))return void n.error("A collection must have a reference to the core");var s={},l={},u=!1;if(t){if(t.length>0&&i.plainObject(t[0])&&!i.element(t[0])){u=!0;for(var c=[],d={},h=0,p=t.length;p>h;h++){var f=t[h];null==f.data&&(f.data={});var v=f.data;if(null==v.id)v.id=o.generate(e,f);else if(e.hasElementWithId(v.id)||d[v.id])continue;var g=new a(e,f,!1);c.push(g),d[v.id]=!0}t=c}}else t=[];this.length=0;for(var h=0,p=t.length;p>h;h++){var y=t[h];if(y){var m=y._private.data.id;(!r||r.unique&&!s[m])&&(s[m]=y,l[m]=this.length,this[this.length]=y,this.length++)}}this._private={cy:e,ids:s,indexes:l},u&&this.restore()},l=a.prototype=s.prototype;l.instanceString=function(){return"collection"},l.spawn=function(e,t,r){return i.core(e)||(r=t,t=e,e=this.cy()),new s(e,t,r)},l.spawnSelf=function(){return this.spawn(this)},l.cy=function(){return this._private.cy},l.element=function(){return this[0]},l.collection=function(){return i.collection(this)?this:new s(this._private.cy,[this])},l.unique=function(){return new s(this._private.cy,this,{unique:!0})},l.hasElementWithId=function(e){return!!this._private.ids[e]},l.getElementById=function(e){var t=this._private.cy,r=this._private.ids[e];return r?r:new s(t)},l.poolIndex=function(){var e=this._private.cy,t=e._private.elements,r=this._private.data.id;return t._private.indexes[r]},l.json=function(e){var t=this.element(),r=this.cy();if(null==t&&e)return this;if(null!=t){var a=t._private;if(i.plainObject(e)){r.startBatch(),e.data&&t.data(e.data),e.position&&t.position(e.position);var o=function(r,n,i){var o=e[r];null!=o&&o!==a[r]&&(o?t[n]():t[i]())};return o("removed","remove","restore"),o("selected","select","unselect"),o("selectable","selectify","unselectify"),o("locked","lock","unlock"),o("grabbable","grabify","ungrabify"),null!=e.classes&&t.classes(e.classes),r.endBatch(),this}if(void 0===e){var s={data:n.copy(a.data),position:n.copy(a.position),group:a.group,removed:a.removed,selected:a.selected,selectable:a.selectable,locked:a.locked,grabbable:a.grabbable,classes:null};return s.classes=Object.keys(a.classes).filter(function(e){return a.classes[e]}).join(" "),s}}},l.jsons=function(){for(var e=[],t=0;t<this.length;t++){var r=this[t],n=r.json();e.push(n)}return e},l.clone=function(){for(var e=this.cy(),t=[],r=0;r<this.length;r++){var n=this[r],i=n.json(),o=new a(e,i,!1);t.push(o)}return new s(e,t)},l.copy=l.clone,l.restore=function(e){var t=this,r=t.cy(),a=r._private;void 0===e&&(e=!0);for(var l,u=[],c=[],d=0,h=t.length;h>d;d++){var p=t[d];p.removed()&&(p.isNode()?u.push(p):c.push(p))}l=u.concat(c);var d,f=function(){l.splice(d,1),d--};for(d=0;d<l.length;d++){var p=l[d],v=p._private,g=v.data;if(v.traversalCache=null,void 0===g.id)g.id=o.generate(r,p);else if(i.number(g.id))g.id=""+g.id;else{if(i.emptyString(g.id)||!i.string(g.id)){n.error("Can not create element with invalid string ID `"+g.id+"`"),f();continue}if(r.hasElementWithId(g.id)){n.error("Can not create second element with ID `"+g.id+"`"),f();continue}}var y=g.id;if(p.isNode()){var m=p,b=v.position;null==b.x&&(b.x=0),null==b.y&&(b.y=0)}if(p.isEdge()){for(var x=p,w=["source","target"],E=w.length,_=!1,P=0;E>P;P++){var S=w[P],k=g[S];i.number(k)&&(k=g[S]=""+g[S]),null==k||""===k?(n.error("Can not create edge `"+y+"` with unspecified "+S),_=!0):r.hasElementWithId(k)||(n.error("Can not create edge `"+y+"` with nonexistant "+S+" `"+k+"`"),_=!0)}if(_){f();continue}var T=r.getElementById(g.source),D=r.getElementById(g.target);T._private.edges.push(x),D._private.edges.push(x),x._private.source=T,x._private.target=D}v.ids={},v.ids[y]=p,v.indexes={},v.indexes[y]=p,v.removed=!1,r.addToPool(p)}for(var d=0;d<u.length;d++){var m=u[d],g=m._private.data;i.number(g.parent)&&(g.parent=""+g.parent);var C=g.parent,M=null!=C;if(M){var N=r.getElementById(C);if(N.empty())g.parent=void 0;else{for(var B=!1,z=N;!z.empty();){if(m.same(z)){B=!0,g.parent=void 0;break}z=z.parent()}B||(N[0]._private.children.push(m),m._private.parent=N[0],a.hasCompoundNodes=!0)}}}if(l.length>0){for(var I=new s(r,l),d=0;d<I.length;d++){var p=I[d];if(!p.isNode()){for(var L=p.parallelEdges(),P=0;P<L.length;P++)L[P]._private.traversalCache=null;p.source()[0]._private.traversalCache=null,p.target()[0]._private.traversalCache=null}}var O;O=a.hasCompoundNodes?I.add(I.connectedNodes()).add(I.parent()):I,O.updateStyle(e),e?I.rtrigger("add"):I.trigger("add")}return t},l.removed=function(){var e=this[0];return e&&e._private.removed},l.inside=function(){var e=this[0];return e&&!e._private.removed},l.remove=function(e){function t(e){for(var t=e._private.edges,r=0;r<t.length;r++)i(t[r])}function r(e){for(var t=e._private.children,r=0;r<t.length;r++)i(t[r])}function i(e){var n=h[e.id()];n||(h[e.id()]=!0,e.isNode()?(d.push(e),t(e),r(e)):d.unshift(e))}function a(e,t){var r=e._private.edges;n.removeFromArray(r,t),e._private.traversalCache=null}function o(e){for(var t=e.parallelEdges(),r=0;r<t.length;r++)t[r]._private.traversalCache=null}function l(e,t){t=t[0],e=e[0];var r=e._private.children,i=e.id();n.removeFromArray(r,t),y.ids[i]||(y.ids[i]=!0,y.push(e))}var u=this,c=[],d=[],h={},p=u._private.cy;void 0===e&&(e=!0);for(var f=0,v=u.length;v>f;f++){var g=u[f];i(g)}var y=[];y.ids={},p.removeFromPool(d);for(var f=0;f<d.length;f++){var g=d[f];if(g._private.removed=!0,c.push(g),g.isEdge()){var m=g.source()[0],b=g.target()[0];a(m,g),a(b,g),o(g)}else{var x=g.parent();0!==x.length&&l(x,g)}}var w=p._private.elements;p._private.hasCompoundNodes=!1;for(var f=0;f<w.length;f++){var g=w[f];if(g.isParent()){p._private.hasCompoundNodes=!0;break}}var E=new s(this.cy(),c);E.size()>0&&(e&&this.cy().notify({type:"remove",eles:E}),E.trigger("remove"));for(var f=0;f<y.length;f++){var g=y[f];g.removed()||g.updateStyle()}return new s(p,c)},l.move=function(e){var t=this._private.cy;if(void 0!==e.source||void 0!==e.target){var r=e.source,n=e.target,i=t.hasElementWithId(r),a=t.hasElementWithId(n);if(i||a){var o=this.jsons();this.remove();for(var s=0;s<o.length;s++){var l=o[s],u=this[s];"edges"===l.group&&(i&&(l.data.source=r),a&&(l.data.target=n),l.scratch=u._private.scratch)}return t.add(o)}}else if(void 0!==e.parent){var c=e.parent,d=null===c||t.hasElementWithId(c);if(d){var o=this.jsons(),h=this.descendants(),p=h.union(h.union(this).connectedEdges()).jsons();this.remove();for(var s=0;s<o.length;s++){var l=o[s],u=this[s];"nodes"===l.group&&(l.data.parent=null===c?void 0:c,l.scratch=u._private.scratch)}return t.add(o.concat(p))}}return this},[e("./algorithms"),e("./animation"),e("./class"),e("./comparators"),e("./compounds"),e("./data"),e("./degree"),e("./dimensions"),e("./events"),e("./filter"),e("./group"),e("./index"),e("./iteration"),e("./layout"),e("./style"),e("./switch-functions"),e("./traversing")].forEach(function(e){n.extend(l,e)}),t.exports=s},{"../is":83,"../util":100,"./algorithms":11,"./animation":15,"./class":16,"./comparators":17,"./compounds":18,"./data":19,"./degree":20,"./dimensions":21,"./element":22,"./events":23,"./filter":24,"./group":25,"./index":26,"./iteration":27,"./layout":28,"./style":29,"./switch-functions":30,"./traversing":31}],27:[function(e,t,r){"use strict";var n=e("../is"),i=e("./zsort"),a={each:function(e){if(n.fn(e))for(var t=0;t<this.length;t++){var r=this[t],i=e.apply(r,[t,r]);if(i===!1)break}return this},forEach:function(e,t){if(n.fn(e))for(var r=0;r<this.length;r++){var i=this[r],a=t?e.apply(t,[i,r,this]):e(i,r,this);if(a===!1)break}return this},toArray:function(){for(var e=[],t=0;t<this.length;t++)e.push(this[t]);return e},slice:function(e,t){var r=[],n=this.length;null==t&&(t=n),null==e&&(e=0),0>e&&(e=n+e),0>t&&(t=n+t);for(var i=e;i>=0&&t>i&&n>i;i++)r.push(this[i]);return this.spawn(r)},size:function(){return this.length},eq:function(e){return this[e]||this.spawn()},first:function(){return this[0]||this.spawn()},last:function(){return this[this.length-1]||this.spawn()},empty:function(){return 0===this.length},nonempty:function(){return!this.empty()},sort:function(e){if(!n.fn(e))return this;var t=this.toArray().sort(e);return this.spawn(t)},sortByZIndex:function(){return this.sort(i)},zDepth:function(){var e=this[0];if(e){var t=e._private,r=t.group;if("nodes"===r){var n=t.data.parent?e.parents().size():0;return e.isParent()?n:Number.MAX_VALUE}var i=t.source,a=t.target,o=i.zDepth(),s=a.zDepth();return Math.max(o,s,0)}}};t.exports=a},{"../is":83,"./zsort":32}],28:[function(e,t,r){"use strict";var n=e("../is"),i=e("../util"),a=e("../promise"),o={layoutPositions:function(e,t,r){var i=this.nodes(),o=this.cy();if(e.trigger({type:"layoutstart",layout:e}),e.animations=[],t.animate){for(var s=0;s<i.length;s++){var l=i[s],u=r.call(l,s,l),c=l.position();n.number(c.x)&&n.number(c.y)||l.silentPosition({x:0,y:0});var d=l.animation({position:u,duration:t.animationDuration,easing:t.animationEasing});e.animations.push(d),d.play()}var h;o.on("step.*",h=function(){t.fit&&o.fit(t.eles,t.padding)}),e.one("layoutstop",function(){o.off("step.*",h)}),e.one("layoutready",t.ready),e.trigger({type:"layoutready",layout:e}),a.all(e.animations.map(function(e){return e.promise()})).then(function(){o.off("step.*",h),null!=t.zoom&&o.zoom(t.zoom),t.pan&&o.pan(t.pan),t.fit&&o.fit(t.eles,t.padding),e.one("layoutstop",t.stop),e.trigger({type:"layoutstop",layout:e})})}else i.positions(r),t.fit&&o.fit(t.eles,t.padding),null!=t.zoom&&o.zoom(t.zoom),t.pan&&o.pan(t.pan),e.one("layoutready",t.ready),e.trigger({type:"layoutready",layout:e}),e.one("layoutstop",t.stop),e.trigger({type:"layoutstop",layout:e});return this},layout:function(e){var t=this.cy();return t.layout(i.extend({},e,{eles:this})),this},makeLayout:function(e){var t=this.cy();return t.makeLayout(i.extend({},e,{eles:this}))}};o.createLayout=o.makeLayout,t.exports=o},{"../is":83,"../promise":86,"../util":100}],29:[function(e,t,r){"use strict";var n=e("../is"),i={updateStyle:function(e){var t=this._private.cy;if(!t.styleEnabled())return this;if(t._private.batchingStyle){var r=t._private.batchStyleEles;return r.merge(this),this}var n=t.style();e=!(!e&&void 0!==e),n.apply(this);var i=this.updateCompoundBounds(),a=i.length>0?this.add(i):this;return e?a.rtrigger("style"):a.trigger("style"),this},updateMappers:function(e){var t=this._private.cy,r=t.style();if(e=!(!e&&void 0!==e),!t.styleEnabled())return this;r.updateMappers(this);var n=this.updateCompoundBounds(),i=n.length>0?this.add(n):this;return e?i.rtrigger("style"):i.trigger("style"),this},parsedStyle:function(e){var t=this[0];if(t.cy().styleEnabled())return t?t._private.style[e]||t.cy().style().getDefaultProperty(e):void 0},renderedStyle:function(e){var t=this.cy();if(!t.styleEnabled())return this;var r=this[0];if(r){var n=r.cy().style().getRenderedStyle(r);return void 0===e?n:n[e]}},style:function(e,t){var r=this.cy();if(!r.styleEnabled())return this;var i=!1,a=r.style();if(n.plainObject(e)){var o=e;a.applyBypass(this,o,i);var s=this.updateCompoundBounds(),l=s.length>0?this.add(s):this;l.rtrigger("style")}else if(n.string(e)){if(void 0===t){var u=this[0];return u?a.getStylePropertyValue(u,e):void 0}a.applyBypass(this,e,t,i);var s=this.updateCompoundBounds(),l=s.length>0?this.add(s):this;l.rtrigger("style")}else if(void 0===e){var u=this[0];return u?a.getRawStyle(u):void 0}return this},removeStyle:function(e){var t=this.cy();if(!t.styleEnabled())return this;var r=!1,n=t.style(),i=this;if(void 0===e)for(var a=0;a<i.length;a++){var o=i[a];n.removeAllBypasses(o,r)}else{e=e.split(/\s+/);for(var a=0;a<i.length;a++){var o=i[a];n.removeBypasses(o,e,r)}}var s=this.updateCompoundBounds(),l=s.length>0?this.add(s):this;return l.rtrigger("style"),this},show:function(){return this.css("display","element"),this},hide:function(){return this.css("display","none"),this},visible:function(){var e=this.cy();if(!e.styleEnabled())return!0;var t=this[0],r=e.hasCompoundNodes();if(t){if("visible"!==t.pstyle("visibility").value||"element"!==t.pstyle("display").value||0===t.pstyle("width").pfValue)return!1;if("nodes"===t._private.group){if(0===t.pstyle("height").pfValue)return!1;if(!r)return!0;var n=t._private.data.parent?t.parents():null;if(n)for(var i=0;i<n.length;i++){var a=n[i],o=a.pstyle("visibility").value,s=a.pstyle("display").value;if("visible"!==o||"element"!==s)return!1}return!0}var l=t._private.source,u=t._private.target;return l.visible()&&u.visible()}},hidden:function(){var e=this[0];return e?!e.visible():void 0},effectiveOpacity:function(){var e=this.cy();if(!e.styleEnabled())return 1;var t=e.hasCompoundNodes(),r=this[0];if(r){var n=r._private,i=r.pstyle("opacity").value;if(!t)return i;var a=n.data.parent?r.parents():null;if(a)for(var o=0;o<a.length;o++){var s=a[o],l=s.pstyle("opacity").value;i=l*i}return i}},transparent:function(){var e=this.cy();if(!e.styleEnabled())return!1;var t=this[0],r=t.cy().hasCompoundNodes();return t?r?0===t.effectiveOpacity():0===t.pstyle("opacity").value:void 0},backgrounding:function(){var e=this.cy();if(!e.styleEnabled())return!1;var t=this[0];return!!t._private.backgrounding}};i.bypass=i.css=i.style,i.renderedCss=i.renderedStyle,i.removeBypass=i.removeCss=i.removeStyle,i.pstyle=i.parsedStyle,t.exports=i},{"../is":83}],30:[function(e,t,r){"use strict";function n(e){return function(){var t=arguments,r=[];if(2===t.length){var n=t[0],i=t[1];this.on(e.event,n,i)}else if(1===t.length){var i=t[0];this.on(e.event,i)}else if(0===t.length){for(var a=0;a<this.length;a++){var o=this[a],s=!e.ableField||o._private[e.ableField],l=o._private[e.field]!=e.value;if(e.overrideAble){var u=e.overrideAble(o);if(void 0!==u&&(s=u,!u))return this}s&&(o._private[e.field]=e.value,l&&r.push(o))}var c=this.spawn(r);c.updateStyle(),c.trigger(e.event)}return this}}function i(e){a[e.field]=function(){var t=this[0];if(t){if(e.overrideField){var r=e.overrideField(t);if(void 0!==r)return r}return t._private[e.field]}},a[e.on]=n({event:e.on,field:e.field,ableField:e.ableField,overrideAble:e.overrideAble,value:!0}),a[e.off]=n({event:e.off,field:e.field,ableField:e.ableField,overrideAble:e.overrideAble,value:!1})}var a={};i({field:"locked",overrideField:function(e){return e.cy().autolock()?!0:void 0},on:"lock",off:"unlock"}),i({field:"grabbable",overrideField:function(e){return e.cy().autoungrabify()?!1:void 0},on:"grabify",off:"ungrabify"}),i({field:"selected",ableField:"selectable",overrideAble:function(e){return e.cy().autounselectify()?!1:void 0},on:"select",off:"unselect"}),i({field:"selectable",overrideField:function(e){return e.cy().autounselectify()?!1:void 0},on:"selectify",off:"unselectify"}),a.deselect=a.unselect,a.grabbed=function(){var e=this[0];return e?e._private.grabbed:void 0},i({field:"active",on:"activate",off:"unactivate"}),a.inactive=function(){var e=this[0];return e?!e._private.active:void 0},t.exports=a},{}],31:[function(e,t,r){"use strict";function n(e){return function(t){for(var r=[],n=0;n<this.length;n++){var i=this[n],a=i._private[e.attr];a&&r.push(a)}return this.spawn(r,{unique:!0}).filter(t)}}function i(e){return function(t){var r=[],n=this._private.cy,i=e||{};s.string(t)&&(t=n.$(t));for(var a=this._private.ids,o=t._private.ids,l=0;l<t.length;l++)for(var u=t[l]._private.edges,c=0;c<u.length;c++){var d=u[c],h=d._private.data,p=a[h.source]&&o[h.target],f=o[h.source]&&a[h.target],v=p||f;if(v){if(i.thisIsSrc||i.thisIsTgt){if(i.thisIsSrc&&!p)continue;if(i.thisIsTgt&&!f)continue}r.push(d)}}return this.spawn(r,{unique:!0})}}function a(e){var t={codirected:!1};return e=o.extend({},t,e),function(t){for(var r=[],n=this.edges(),i=e,a=0;a<n.length;a++)for(var o=n[a],s=o._private,l=s.source,u=l._private.data.id,c=s.data.target,d=l._private.edges,h=0;h<d.length;h++){var p=d[h],f=p._private.data,v=f.target,g=f.source,y=v===c&&g===u,m=u===v&&c===g;(i.codirected&&y||!i.codirected&&(y||m))&&r.push(p)}return this.spawn(r,{unique:!0}).filter(t)}}var o=e("../util"),s=e("../is"),l={},u=function(e,t){return function(r,n,i,a){var o,l=r,u=this;if(null==l?o="null":s.elementOrCollection(l)&&1===l.length&&(o="#"+l.id()),1===u.length&&o){var c=u[0]._private,d=c.traversalCache=c.traversalCache||{},h=d[t]=d[t]||{},p=h[o];return p?p:h[o]=e.call(u,r,n,i,a)}return e.call(u,r,n,i,a)}},c=function(e){return function(t){for(var r=this,n=[],i=0;i<r.length;i++){var a=r[i];if(a.isNode()){for(var o=!1,s=a.connectedEdges(),l=0;l<s.length;l++){var u=s[l],c=u.source(),d=u.target();if(e.noIncomingEdges&&d===a&&c!==a||e.noOutgoingEdges&&c===a&&d!==a){o=!0;break}}o||n.push(a)}}return this.spawn(n,{unique:!0}).filter(t)}},d=function(e){return function(t){for(var r=this,n=[],i=0;i<r.length;i++){var a=r[i];if(a.isNode())for(var o=a.connectedEdges(),s=0;s<o.length;s++){var l=o[s],u=l.source(),c=l.target();e.outgoing&&u===a?(n.push(l),n.push(c)):e.incoming&&c===a&&(n.push(l),n.push(u))}}return this.spawn(n,{unique:!0}).filter(t)}},h=function(e){return function(t){for(var r=this,n=[],i={};;){var a=e.outgoing?r.outgoers():r.incomers();if(0===a.length)break;for(var o=!1,s=0;s<a.length;s++){var l=a[s],u=l.id();i[u]||(i[u]=!0,n.push(l),o=!0)}if(!o)break;r=a}return this.spawn(n,{unique:!0}).filter(t)}};o.extend(l,{roots:c({noIncomingEdges:!0}),leaves:c({noOutgoingEdges:!0}),outgoers:u(d({outgoing:!0}),"outgoers"),successors:h({outgoing:!0}),incomers:u(d({incoming:!0}),"incomers"),predecessors:h({incoming:!0})}),o.extend(l,{neighborhood:u(function(e){for(var t=[],r=this.nodes(),n=0;n<r.length;n++)for(var i=r[n],a=i.connectedEdges(),o=0;o<a.length;o++){var s=a[o],l=s.source(),u=s.target(),c=i===l?u:l;c.length>0&&t.push(c[0]),t.push(s[0])}return this.spawn(t,{unique:!0}).filter(e)},"neighborhood"),closedNeighborhood:function(e){return this.neighborhood().add(this).filter(e)},openNeighborhood:function(e){return this.neighborhood(e)}}),l.neighbourhood=l.neighborhood,l.closedNeighbourhood=l.closedNeighborhood,l.openNeighbourhood=l.openNeighborhood,o.extend(l,{source:u(function(e){var t,r=this[0];return r&&(t=r._private.source||r.cy().collection()),t&&e?t.filter(e):t},"source"),target:u(function(e){var t,r=this[0];return r&&(t=r._private.target||r.cy().collection()),t&&e?t.filter(e):t},"target"),sources:n({attr:"source"}),targets:n({attr:"target"})}),o.extend(l,{edgesWith:u(i(),"edgesWith",!0),edgesTo:u(i({thisIsSrc:!0}),"edgesTo",!0)}),o.extend(l,{connectedEdges:u(function(e){for(var t=[],r=this,n=0;n<r.length;n++){var i=r[n];if(i.isNode())for(var a=i._private.edges,o=0;o<a.length;o++){var s=a[o];t.push(s)}}return this.spawn(t,{unique:!0}).filter(e)},"connectedEdges"),connectedNodes:u(function(e){for(var t=[],r=this,n=0;n<r.length;n++){var i=r[n];i.isEdge()&&(t.push(i.source()[0]),t.push(i.target()[0]))}return this.spawn(t,{unique:!0}).filter(e)},"connectedNodes"),parallelEdges:u(a(),"parallelEdges"),codirectedEdges:u(a({codirected:!0}),"codirectedEdges")}),o.extend(l,{components:function(){var e=this,t=e.cy(),r=e.spawn(),n=e.nodes().spawnSelf(),i=[],a=function(e,t){r.merge(e),n.unmerge(e),t.merge(e)};if(n.empty())return e.spawn();do{var o=t.collection();i.push(o);var s=n[0];a(s,o),e.bfs({directed:!1,roots:s,visit:function(e,t,r,n,i){a(r,o)}})}while(n.length>0);return i.map(function(e){var t=e.connectedEdges().stdFilter(function(t){return e.anySame(t.source())&&e.anySame(t.target())});return e.union(t)})}}),t.exports=l},{"../is":83,"../util":100}],32:[function(e,t,r){"use strict";var n=function(e,t){var r=e.cy(),n=e.pstyle("z-index").value-t.pstyle("z-index").value,i=0,a=0,o=r.hasCompoundNodes(),s=e.isNode(),l=!s,u=t.isNode(),c=!u;o&&(i=e.zDepth(),a=t.zDepth());var d=i-a,h=0===d;return h?s&&c?1:l&&u?-1:0===n?e.poolIndex()-t.poolIndex():n:d};t.exports=n},{}],33:[function(e,t,r){"use strict";var n=e("../is"),i=e("../util"),a=e("../collection"),o=e("../collection/element"),s={add:function(e){var t,r=this;if(n.elementOrCollection(e)){var s=e;if(s._private.cy===r)t=s.restore();else{for(var l=[],u=0;u<s.length;u++){var c=s[u];l.push(c.json())}t=new a(r,l)}}else if(n.array(e)){var l=e;t=new a(r,l)}else if(n.plainObject(e)&&(n.array(e.nodes)||n.array(e.edges))){for(var d=e,l=[],h=["nodes","edges"],u=0,p=h.length;p>u;u++){var f=h[u],v=d[f];if(n.array(v))for(var g=0,y=v.length;y>g;g++){var m=i.extend({group:f},v[g]);l.push(m)}}t=new a(r,l)}else{var m=e;t=new o(r,m).collection()}return t},remove:function(e){if(n.elementOrCollection(e));else if(n.string(e)){var t=e;e=this.$(t)}return e.remove()},load:function(e,t,r){var a=this;a.notifications(!1);var o=a.mutableElements();o.length>0&&o.remove(),null!=e&&(n.plainObject(e)||n.array(e))&&a.add(e),a.one("layoutready",function(e){a.notifications(!0),a.trigger(e),a.notify({type:"load",eles:a.mutableElements()}),a.one("load",t),a.trigger("load")}).one("layoutstop",function(){a.one("done",r),a.trigger("done")});var s=i.extend({},a._private.options.layout);return s.eles=a.elements(),a.layout(s),this}};t.exports=s},{"../collection":26,"../collection/element":22,"../is":83,"../util":100}],34:[function(e,t,r){"use strict";var n=e("../define"),i=e("../util"),a=e("../is"),o={animate:n.animate(),animation:n.animation(),animated:n.animated(),clearQueue:n.clearQueue(),delay:n.delay(),delayAnimation:n.delayAnimation(),stop:n.stop(),addToAnimationPool:function(e){var t=this;t.styleEnabled()&&t._private.aniEles.merge(e)},stopAnimationLoop:function(){this._private.animationsRunning=!1},startAnimationLoop:function(){function e(){c._private.animationsRunning&&i.requestAnimationFrame(function(r){t(r),e()})}function t(e){function t(t,i){var s=t._private,l=s.animation.current,u=s.animation.queue,c=!1;if(0===l.length){var d=u.shift();d&&l.push(d)}for(var h=function(e){for(var t=e.length-1;t>=0;t--){var r=e[t];r()}e.splice(0,e.length)},p=l.length-1;p>=0;p--){var f=l[p],v=f._private;v.stopped?(l.splice(p,1),v.hooked=!1,v.playing=!1,v.started=!1,h(v.frames)):(v.playing||v.applying)&&(v.playing&&v.applying&&(v.applying=!1),v.started||r(t,f,e),n(t,f,e,i),a.fn(v.step)&&v.step.call(t,e),v.applying&&(v.applying=!1),h(v.frames),f.completed()&&(l.splice(p,1),v.hooked=!1,v.playing=!1,v.started=!1,h(v.completes)),c=!0)}return i||0!==l.length||0!==u.length||o.push(t),c}for(var i=c._private.aniEles,o=[],s=!1,l=0;l<i.length;l++){var u=i[l],d=t(u);s=s||d}var h=t(c,!0);if(s||h)if(i.length>0){var p=i.updateCompoundBounds().spawnSelf().merge(i);c.notify({type:"draw",eles:p})}else c.notify({type:"draw"});i.unmerge(o),c.trigger("step")}function r(e,t,r){var n=a.core(e),i=!n,o=e,s=c._private.style,l=t._private;if(i){var u=o._private.position;l.startPosition=l.startPosition||{x:u.x,y:u.y},l.startStyle=l.startStyle||s.getAnimationStartStyle(o,l.style)}if(n){var d=c._private.pan;l.startPan=l.startPan||{x:d.x,y:d.y},l.startZoom=null!=l.startZoom?l.startZoom:c._private.zoom}l.started=!0,l.startTime=r-l.progress*l.duration}function n(e,t,r,n){var i=c._private.style,s=!n,l=e._private,d=t._private,h=d.easing,f=d.startTime;if(!d.easingImpl)if(null==h)d.easingImpl=p.linear;else{var v;if(a.string(h)){var g=i.parse("transition-timing-function",h);v=g.value}else v=h;var y,m;a.string(v)?(y=v,m=[]):(y=v[1],m=v.slice(2).map(function(e){return+e})),m.length>0?("spring"===y&&m.push(d.duration),d.easingImpl=p[y].apply(null,m)):d.easingImpl=p[y]}var b,x=d.easingImpl;if(b=0===d.duration?1:(r-f)/d.duration,d.applying&&(b=d.progress),0>b?b=0:b>1&&(b=1),null==d.delay){var w=d.startPosition,E=d.position,_=l.position;E&&s&&(o(w.x,E.x)&&(_.x=u(w.x,E.x,b,x)),o(w.y,E.y)&&(_.y=u(w.y,E.y,b,x)),e.trigger("position"));var P=d.startPan,S=d.pan,k=l.pan,T=null!=S&&n;T&&(o(P.x,S.x)&&(k.x=u(P.x,S.x,b,x)),o(P.y,S.y)&&(k.y=u(P.y,S.y,b,x)),e.trigger("pan"));var D=d.startZoom,C=d.zoom,M=null!=C&&n;M&&(o(D,C)&&(l.zoom=u(D,C,b,x)),e.trigger("zoom")),(T||M)&&e.trigger("viewport");var N=d.style;if(N&&N.length>0&&s){for(var B=0;B<N.length;B++){var z=N[B],y=z.name,I=z,L=d.startStyle[y],O=u(L,I,b,x);i.overrideBypass(e,y,O)}e.trigger("style")}}return d.progress=b,b}function o(e,t){return null==e||null==t?!1:a.number(e)&&a.number(t)?!0:!(!e||!t)}function s(e,t,r){var n=1-r,i=r*r;return 3*n*n*r*e+3*n*i*t+i*r}function l(e,t){return function(r,n,i){return r+(n-r)*s(e,t,i)}}function u(e,t,r,n){0>r?r=0:r>1&&(r=1);var i,o;if(i=null!=e.pfValue||null!=e.value?null!=e.pfValue?e.pfValue:e.value:e,o=null!=t.pfValue||null!=t.value?null!=t.pfValue?t.pfValue:t.value:t,a.number(i)&&a.number(o))return n(i,o,r);if(a.array(i)&&a.array(o)){for(var s=[],l=0;l<o.length;l++){var u=i[l],c=o[l];if(null!=u&&null!=c){var d=n(u,c,r);e.roundValue&&(d=Math.round(d)),s.push(d)}else s.push(c)}return s;
}}var c=this;if(c._private.animationsRunning=!0,c.styleEnabled()){var d=c.renderer();d&&d.beforeRender?d.beforeRender(function(e,r){t(r)},d.beforeRenderPriorities.animations):e();/*! Runge-Kutta spring physics function generator. Adapted from Framer.js, copyright Koen Bok. MIT License: http://en.wikipedia.org/wiki/MIT_License */
/* Given a tension, friction, and duration, a simulation at 60FPS will first run without a defined duration in order to calculate the full path. A second pass
       then adjusts the time delta -- using the relation between actual time and duration -- to calculate the path for the duration-constrained animation. */
var h=function(){function e(e){return-e.tension*e.x-e.friction*e.v}function t(t,r,n){var i={x:t.x+n.dx*r,v:t.v+n.dv*r,tension:t.tension,friction:t.friction};return{dx:i.v,dv:e(i)}}function r(r,n){var i={dx:r.v,dv:e(r)},a=t(r,.5*n,i),o=t(r,.5*n,a),s=t(r,n,o),l=1/6*(i.dx+2*(a.dx+o.dx)+s.dx),u=1/6*(i.dv+2*(a.dv+o.dv)+s.dv);return r.x=r.x+l*n,r.v=r.v+u*n,r}return function n(e,t,i){var a,o,s,l={x:-1,v:0,tension:null,friction:null},u=[0],c=0,d=1e-4,h=.016;for(e=parseFloat(e)||500,t=parseFloat(t)||20,i=i||null,l.tension=e,l.friction=t,a=null!==i,a?(c=n(e,t),o=c/i*h):o=h;;)if(s=r(s||l,o),u.push(1+s.x),c+=16,!(Math.abs(s.x)>d&&Math.abs(s.v)>d))break;return a?function(e){return u[e*(u.length-1)|0]}:c}}(),p={linear:function(e,t,r){return e+(t-e)*r},ease:l(.25,.1,.25,1),"ease-in":l(.42,0,1,1),"ease-out":l(0,0,.58,1),"ease-in-out":l(.42,0,.58,1),"ease-in-sine":l(.47,0,.745,.715),"ease-out-sine":l(.39,.575,.565,1),"ease-in-out-sine":l(.445,.05,.55,.95),"ease-in-quad":l(.55,.085,.68,.53),"ease-out-quad":l(.25,.46,.45,.94),"ease-in-out-quad":l(.455,.03,.515,.955),"ease-in-cubic":l(.55,.055,.675,.19),"ease-out-cubic":l(.215,.61,.355,1),"ease-in-out-cubic":l(.645,.045,.355,1),"ease-in-quart":l(.895,.03,.685,.22),"ease-out-quart":l(.165,.84,.44,1),"ease-in-out-quart":l(.77,0,.175,1),"ease-in-quint":l(.755,.05,.855,.06),"ease-out-quint":l(.23,1,.32,1),"ease-in-out-quint":l(.86,0,.07,1),"ease-in-expo":l(.95,.05,.795,.035),"ease-out-expo":l(.19,1,.22,1),"ease-in-out-expo":l(1,0,0,1),"ease-in-circ":l(.6,.04,.98,.335),"ease-out-circ":l(.075,.82,.165,1),"ease-in-out-circ":l(.785,.135,.15,.86),spring:function(e,t,r){if(0===r)return p.linear;var n=h(e,t,r);return function(e,t,r){return e+(t-e)*n(r)}},"cubic-bezier":function(e,t,r,n){return l(e,t,r,n)}}}}};t.exports=o},{"../define":44,"../is":83,"../util":100}],35:[function(e,t,r){"use strict";var n=e("../define"),i={on:n.on(),one:n.on({unbindSelfOnTrigger:!0}),once:n.on({unbindAllBindersOnTrigger:!0}),off:n.off(),trigger:n.trigger()};n.eventAliasesOn(i),t.exports=i},{"../define":44}],36:[function(e,t,r){"use strict";var n={png:function(e){var t=this._private.renderer;return e=e||{},t.png(e)},jpg:function(e){var t=this._private.renderer;return e=e||{},e.bg=e.bg||"#fff",t.jpg(e)}};n.jpeg=n.jpg,t.exports=n},{}],37:[function(e,t,r){"use strict";var n=e("../window"),i=e("../util"),a=e("../collection"),o=e("../is"),s=e("../promise"),l=e("../define"),u=function(e){var t=this;e=i.extend({},e);var r=e.container;r&&!o.htmlElement(r)&&o.htmlElement(r[0])&&(r=r[0]);var l=r?r._cyreg:null;l=l||{},l&&l.cy&&(l.cy.destroy(),l={});var u=l.readies=l.readies||[];r&&(r._cyreg=l),l.cy=t;var c=void 0!==n&&void 0!==r&&!e.headless,d=e;d.layout=i.extend({name:c?"grid":"null"},d.layout),d.renderer=i.extend({name:c?"canvas":"null"},d.renderer);var h=function(e,t,r){return void 0!==t?t:void 0!==r?r:e},p=this._private={container:r,ready:!1,initrender:!1,options:d,elements:new a(this),listeners:[],aniEles:new a(this),scratch:{},layout:null,renderer:null,notificationsEnabled:!0,minZoom:1e-50,maxZoom:1e50,zoomingEnabled:h(!0,d.zoomingEnabled),userZoomingEnabled:h(!0,d.userZoomingEnabled),panningEnabled:h(!0,d.panningEnabled),userPanningEnabled:h(!0,d.userPanningEnabled),boxSelectionEnabled:h(!0,d.boxSelectionEnabled),autolock:h(!1,d.autolock,d.autolockNodes),autoungrabify:h(!1,d.autoungrabify,d.autoungrabifyNodes),autounselectify:h(!1,d.autounselectify),styleEnabled:void 0===d.styleEnabled?c:d.styleEnabled,zoom:o.number(d.zoom)?d.zoom:1,pan:{x:o.plainObject(d.pan)&&o.number(d.pan.x)?d.pan.x:0,y:o.plainObject(d.pan)&&o.number(d.pan.y)?d.pan.y:0},animation:{current:[],queue:[]},hasCompoundNodes:!1},f=d.selectionType;void 0===f||"additive"!==f&&"single"!==f?p.selectionType="single":p.selectionType=f,o.number(d.minZoom)&&o.number(d.maxZoom)&&d.minZoom<d.maxZoom?(p.minZoom=d.minZoom,p.maxZoom=d.maxZoom):o.number(d.minZoom)&&void 0===d.maxZoom?p.minZoom=d.minZoom:o.number(d.maxZoom)&&void 0===d.minZoom&&(p.maxZoom=d.maxZoom);var v=function(e,t){var r=e.some(o.promise);return r?s.all(e).then(t):void t(e)};t.initRenderer(i.extend({hideEdgesOnViewport:d.hideEdgesOnViewport,textureOnViewport:d.textureOnViewport,wheelSensitivity:o.number(d.wheelSensitivity)&&d.wheelSensitivity>0?d.wheelSensitivity:1,motionBlur:void 0===d.motionBlur?!1:d.motionBlur,motionBlurOpacity:void 0===d.motionBlurOpacity?.05:d.motionBlurOpacity,pixelRatio:o.number(d.pixelRatio)&&d.pixelRatio>0?d.pixelRatio:void 0,desktopTapThreshold:void 0===d.desktopTapThreshold?4:d.desktopTapThreshold,touchTapThreshold:void 0===d.touchTapThreshold?8:d.touchTapThreshold},d.renderer)),v([d.style,d.elements],function(e){var r=e[0],n=e[1];p.styleEnabled&&t.setStyle(r),d.initrender&&(t.on("initrender",d.initrender),t.on("initrender",function(){p.initrender=!0})),t.load(n,function(){t.startAnimationLoop(),p.ready=!0,o.fn(d.ready)&&t.on("ready",d.ready);for(var e=0;e<u.length;e++){var r=u[e];t.on("ready",r)}l&&(l.readies=[]),t.trigger("ready")},d.done)})},c=u.prototype;i.extend(c,{instanceString:function(){return"core"},isReady:function(){return this._private.ready},ready:function(e){return this.isReady()?this.trigger("ready",[],e):this.on("ready",e),this},initrender:function(){return this._private.initrender},destroy:function(){var e=this;return e.stopAnimationLoop(),e.destroyRenderer(),e},hasElementWithId:function(e){return this._private.elements.hasElementWithId(e)},getElementById:function(e){return this._private.elements.getElementById(e)},selectionType:function(){return this._private.selectionType},hasCompoundNodes:function(){return this._private.hasCompoundNodes},headless:function(){return"null"===this._private.options.renderer.name},styleEnabled:function(){return this._private.styleEnabled},addToPool:function(e){return this._private.elements.merge(e),this},removeFromPool:function(e){return this._private.elements.unmerge(e),this},container:function(){return this._private.container},options:function(){return i.copy(this._private.options)},json:function(e){var t=this,r=t._private,n=t.mutableElements();if(o.plainObject(e)){if(t.startBatch(),e.elements){var a={},s=function(e,r){for(var n=0;n<e.length;n++){var o=e[n],s=o.data.id,l=t.getElementById(s);a[s]=!0,0!==l.length?l.json(o):r?t.add(i.extend({group:r},o)):t.add(o)}};if(o.array(e.elements))s(e.elements);else for(var l=["nodes","edges"],u=0;u<l.length;u++){var c=l[u],d=e.elements[c];o.array(d)&&s(d,c)}n.stdFilter(function(e){return!a[e.id()]}).remove()}e.style&&t.style(e.style),null!=e.zoom&&e.zoom!==r.zoom&&t.zoom(e.zoom),e.pan&&(e.pan.x===r.pan.x&&e.pan.y===r.pan.y||t.pan(e.pan));for(var h=["minZoom","maxZoom","zoomingEnabled","userZoomingEnabled","panningEnabled","userPanningEnabled","boxSelectionEnabled","autolock","autoungrabify","autounselectify"],u=0;u<h.length;u++){var p=h[u];null!=e[p]&&t[p](e[p])}return t.endBatch(),this}if(void 0===e){var f={};return f.elements={},n.forEach(function(e){var t=e.group();f.elements[t]||(f.elements[t]=[]),f.elements[t].push(e.json())}),this._private.styleEnabled&&(f.style=t.style().json()),f.zoomingEnabled=t._private.zoomingEnabled,f.userZoomingEnabled=t._private.userZoomingEnabled,f.zoom=t._private.zoom,f.minZoom=t._private.minZoom,f.maxZoom=t._private.maxZoom,f.panningEnabled=t._private.panningEnabled,f.userPanningEnabled=t._private.userPanningEnabled,f.pan=i.copy(t._private.pan),f.boxSelectionEnabled=t._private.boxSelectionEnabled,f.renderer=i.copy(t._private.options.renderer),f.hideEdgesOnViewport=t._private.options.hideEdgesOnViewport,f.textureOnViewport=t._private.options.textureOnViewport,f.wheelSensitivity=t._private.options.wheelSensitivity,f.motionBlur=t._private.options.motionBlur,f}},scratch:l.data({field:"scratch",bindingEvent:"scratch",allowBinding:!0,allowSetting:!0,settingEvent:"scratch",settingTriggersEvent:!0,triggerFnName:"trigger",allowGetting:!0}),removeScratch:l.removeData({field:"scratch",event:"scratch",triggerFnName:"trigger",triggerEvent:!0})}),[e("./add-remove"),e("./animation"),e("./events"),e("./export"),e("./layout"),e("./notification"),e("./renderer"),e("./search"),e("./style"),e("./viewport")].forEach(function(e){i.extend(c,e)}),t.exports=u},{"../collection":26,"../define":44,"../is":83,"../promise":86,"../util":100,"../window":107,"./add-remove":33,"./animation":34,"./events":35,"./export":36,"./layout":38,"./notification":39,"./renderer":40,"./search":41,"./style":42,"./viewport":43}],38:[function(e,t,r){"use strict";var n=e("../util"),i=e("../is"),a={layout:function(e){var t=this._private.prevLayout=null==e?this._private.prevLayout:this.makeLayout(e);return t.run(),this},makeLayout:function(e){var t=this;if(null==e)return void n.error("Layout options must be specified to make a layout");if(null==e.name)return void n.error("A `name` must be specified to make a layout");var r=e.name,a=t.extension("layout",r);if(null==a)return void n.error("Can not apply layout: No such layout `"+r+"` found; did you include its JS file?");var o;o=i.string(e.eles)?t.$(e.eles):null!=e.eles?e.eles:t.$();var s=new a(n.extend({},e,{cy:t,eles:o}));return s}};a.createLayout=a.makeLayout,t.exports=a},{"../is":83,"../util":100}],39:[function(e,t,r){"use strict";var n={notify:function(e){var t=this._private;if(t.batchingNotify){var r=t.batchNotifyEles,n=t.batchNotifyTypes;return e.eles&&r.merge(e.eles),void(n.ids[e.type]||(n.push(e.type),n.ids[e.type]=!0))}if(t.notificationsEnabled){var i=this.renderer();i&&i.notify(e)}},notifications:function(e){var t=this._private;return void 0===e?t.notificationsEnabled:void(t.notificationsEnabled=!!e)},noNotifications:function(e){this.notifications(!1),e(),this.notifications(!0)},startBatch:function(){var e=this._private;return null==e.batchCount&&(e.batchCount=0),0===e.batchCount&&(e.batchingStyle=e.batchingNotify=!0,e.batchStyleEles=this.collection(),e.batchNotifyEles=this.collection(),e.batchNotifyTypes=[],e.batchNotifyTypes.ids={}),e.batchCount++,this},endBatch:function(){var e=this._private;return e.batchCount--,0===e.batchCount&&(e.batchingStyle=!1,e.batchStyleEles.updateStyle(),e.batchingNotify=!1,this.notify({type:e.batchNotifyTypes,eles:e.batchNotifyEles})),this},batch:function(e){return this.startBatch(),e(),this.endBatch(),this},batchData:function(e){var t=this;return this.batch(function(){for(var r=Object.keys(e),n=0;n<r.length;n++){var i=r[n],a=e[i],o=t.getElementById(i);o.data(a)}})}};t.exports=n},{}],40:[function(e,t,r){"use strict";var n=e("../util"),i={renderTo:function(e,t,r,n){var i=this._private.renderer;return i.renderTo(e,t,r,n),this},renderer:function(){return this._private.renderer},forceRender:function(){return this.notify({type:"draw"}),this},resize:function(){return this.invalidateSize(),this.notify({type:"resize"}),this.trigger("resize"),this},initRenderer:function(e){var t=this,r=t.extension("renderer",e.name);if(null==r)return void n.error("Can not initialise: No such renderer `%s` found; did you include its JS file?",e.name);var i=n.extend({},e,{cy:t});t._private.renderer=new r(i)},destroyRenderer:function(){var e=this;e.notify({type:"destroy"});var t=e.container();if(t)for(t._cyreg=null;t.childNodes.length>0;)t.removeChild(t.childNodes[0]);e._private.renderer=null},onRender:function(e){return this.on("render",e)},offRender:function(e){return this.off("render",e)}};i.invalidateDimensions=i.resize,t.exports=i},{"../util":100}],41:[function(e,t,r){"use strict";var n=e("../is"),i=e("../collection"),a={collection:function(e,t){return n.string(e)?this.$(e):n.elementOrCollection(e)?e.collection():n.array(e)?new i(this,e,t):new i(this)},nodes:function(e){var t=this.$(function(){return this.isNode()});return e?t.filter(e):t},edges:function(e){var t=this.$(function(){return this.isEdge()});return e?t.filter(e):t},$:function(e){var t=this._private.elements;return e?t.filter(e):t.spawnSelf()},mutableElements:function(){return this._private.elements}};a.elements=a.filter=a.$,t.exports=a},{"../collection":26,"../is":83}],42:[function(e,t,r){"use strict";var n=e("../is"),i=e("../style"),a={style:function(e){if(e){var t=this.setStyle(e);t.update()}return this._private.style},setStyle:function(e){var t=this._private;return n.stylesheet(e)?t.style=e.generateStyle(this):n.array(e)?t.style=i.fromJson(this,e):n.string(e)?t.style=i.fromString(this,e):t.style=i(this),t.style}};t.exports=a},{"../is":83,"../style":92}],43:[function(e,t,r){"use strict";var n=e("../is"),i={autolock:function(e){return void 0===e?this._private.autolock:(this._private.autolock=!!e,this)},autoungrabify:function(e){return void 0===e?this._private.autoungrabify:(this._private.autoungrabify=!!e,this)},autounselectify:function(e){return void 0===e?this._private.autounselectify:(this._private.autounselectify=!!e,this)},panningEnabled:function(e){return void 0===e?this._private.panningEnabled:(this._private.panningEnabled=!!e,this)},userPanningEnabled:function(e){return void 0===e?this._private.userPanningEnabled:(this._private.userPanningEnabled=!!e,this)},zoomingEnabled:function(e){return void 0===e?this._private.zoomingEnabled:(this._private.zoomingEnabled=!!e,this)},userZoomingEnabled:function(e){return void 0===e?this._private.userZoomingEnabled:(this._private.userZoomingEnabled=!!e,this)},boxSelectionEnabled:function(e){return void 0===e?this._private.boxSelectionEnabled:(this._private.boxSelectionEnabled=!!e,this)},pan:function(){var e,t,r,i,a,o=arguments,s=this._private.pan;switch(o.length){case 0:return s;case 1:if(n.string(o[0]))return e=o[0],s[e];if(n.plainObject(o[0])){if(!this._private.panningEnabled)return this;r=o[0],i=r.x,a=r.y,n.number(i)&&(s.x=i),n.number(a)&&(s.y=a),this.trigger("pan viewport")}break;case 2:if(!this._private.panningEnabled)return this;e=o[0],t=o[1],"x"!==e&&"y"!==e||!n.number(t)||(s[e]=t),this.trigger("pan viewport")}return this.notify({type:"viewport"}),this},panBy:function(e){var t,r,i,a,o,s=arguments,l=this._private.pan;if(!this._private.panningEnabled)return this;switch(s.length){case 1:n.plainObject(s[0])&&(i=s[0],a=i.x,o=i.y,n.number(a)&&(l.x+=a),n.number(o)&&(l.y+=o),this.trigger("pan viewport"));break;case 2:t=s[0],r=s[1],"x"!==t&&"y"!==t||!n.number(r)||(l[t]+=r),this.trigger("pan viewport")}return this.notify({type:"viewport"}),this},fit:function(e,t){var r=this.getFitViewport(e,t);if(r){var n=this._private;n.zoom=r.zoom,n.pan=r.pan,this.trigger("pan zoom viewport"),this.notify({type:"viewport"})}return this},getFitViewport:function(e,t){if(n.number(e)&&void 0===t&&(t=e,e=void 0),this._private.panningEnabled&&this._private.zoomingEnabled){var r;if(n.string(e)){var i=e;e=this.$(i)}else if(n.boundingBox(e)){var a=e;r={x1:a.x1,y1:a.y1,x2:a.x2,y2:a.y2},r.w=r.x2-r.x1,r.h=r.y2-r.y1}else n.elementOrCollection(e)||(e=this.mutableElements());r=r||e.boundingBox();var o,s=this.width(),l=this.height();if(t=n.number(t)?t:0,!isNaN(s)&&!isNaN(l)&&s>0&&l>0&&!isNaN(r.w)&&!isNaN(r.h)&&r.w>0&&r.h>0){o=Math.min((s-2*t)/r.w,(l-2*t)/r.h),o=o>this._private.maxZoom?this._private.maxZoom:o,o=o<this._private.minZoom?this._private.minZoom:o;var u={x:(s-o*(r.x1+r.x2))/2,y:(l-o*(r.y1+r.y2))/2};return{zoom:o,pan:u}}}},minZoom:function(e){return void 0===e?this._private.minZoom:(n.number(e)&&(this._private.minZoom=e),this)},maxZoom:function(e){return void 0===e?this._private.maxZoom:(n.number(e)&&(this._private.maxZoom=e),this)},zoom:function(e){var t,r;if(void 0===e)return this._private.zoom;if(n.number(e))r=e;else if(n.plainObject(e)){if(r=e.level,e.position){var i=e.position,a=this._private.pan,o=this._private.zoom;t={x:i.x*o+a.x,y:i.y*o+a.y}}else e.renderedPosition&&(t=e.renderedPosition);if(t&&!this._private.panningEnabled)return this}if(!this._private.zoomingEnabled)return this;if(!n.number(r)||t&&(!n.number(t.x)||!n.number(t.y)))return this;if(r=r>this._private.maxZoom?this._private.maxZoom:r,r=r<this._private.minZoom?this._private.minZoom:r,t){var s=this._private.pan,l=this._private.zoom,u=r,c={x:-u/l*(t.x-s.x)+t.x,y:-u/l*(t.y-s.y)+t.y};this._private.zoom=r,this._private.pan=c;var d=s.x!==c.x||s.y!==c.y;this.trigger(" zoom "+(d?" pan ":"")+" viewport ")}else this._private.zoom=r,this.trigger("zoom viewport");return this.notify({type:"viewport"}),this},viewport:function(e){var t=this._private,r=!0,i=!0,a=[],o=!1,s=!1;if(!e)return this;if(n.number(e.zoom)||(r=!1),n.plainObject(e.pan)||(i=!1),!r&&!i)return this;if(r){var l=e.zoom;l<t.minZoom||l>t.maxZoom||!t.zoomingEnabled?o=!0:(t.zoom=l,a.push("zoom"))}if(i&&(!o||!e.cancelOnFailedZoom)&&t.panningEnabled){var u=e.pan;n.number(u.x)&&(t.pan.x=u.x,s=!1),n.number(u.y)&&(t.pan.y=u.y,s=!1),s||a.push("pan")}return a.length>0&&(a.push("viewport"),this.trigger(a.join(" ")),this.notify({type:"viewport"})),this},center:function(e){var t=this.getCenterPan(e);return t&&(this._private.pan=t,this.trigger("pan viewport"),this.notify({type:"viewport"})),this},getCenterPan:function(e,t){if(this._private.panningEnabled){if(n.string(e)){var r=e;e=this.mutableElements().filter(r)}else n.elementOrCollection(e)||(e=this.mutableElements());var i=e.boundingBox(),a=this.width(),o=this.height();t=void 0===t?this._private.zoom:t;var s={x:(a-t*(i.x1+i.x2))/2,y:(o-t*(i.y1+i.y2))/2};return s}},reset:function(){return this._private.panningEnabled&&this._private.zoomingEnabled?(this.viewport({pan:{x:0,y:0},zoom:1}),this):this},invalidateSize:function(){this._private.sizeCache=null},size:function(){var e=this._private,t=e.container;return e.sizeCache=e.sizeCache||(t?{width:t.clientWidth,height:t.clientHeight}:{width:1,height:1})},width:function(){return this.size().width},height:function(){return this.size().height},extent:function(){var e=this._private.pan,t=this._private.zoom,r=this.renderedExtent(),n={x1:(r.x1-e.x)/t,x2:(r.x2-e.x)/t,y1:(r.y1-e.y)/t,y2:(r.y2-e.y)/t};return n.w=n.x2-n.x1,n.h=n.y2-n.y1,n},renderedExtent:function(){var e=this.width(),t=this.height();return{x1:0,y1:0,x2:e,y2:t,w:e,h:t}}};i.centre=i.center,i.autolockNodes=i.autolock,i.autoungrabifyNodes=i.autoungrabify,t.exports=i},{"../is":83}],44:[function(e,t,r){"use strict";var n=e("./util"),i=e("./is"),a=e("./selector"),o=e("./promise"),s=e("./event"),l=e("./animation"),u={data:function(e){var t={field:"data",bindingEvent:"data",allowBinding:!1,allowSetting:!1,allowGetting:!1,settingEvent:"data",settingTriggersEvent:!1,triggerFnName:"trigger",immutableKeys:{},updateStyle:!1,onSet:function(e){},canSet:function(e){return!0}};return e=n.extend({},t,e),function(t,r){var n=e,a=this,o=void 0!==a.length,s=o?a:[a],l=o?a[0]:a;if(i.string(t)){if(n.allowGetting&&void 0===r){var u;return l&&(u=l._private[n.field][t]),u}if(n.allowSetting&&void 0!==r){var c=!n.immutableKeys[t];if(c){for(var d=0,h=s.length;h>d;d++)n.canSet(s[d])&&(s[d]._private[n.field][t]=r);n.updateStyle&&a.updateStyle(),n.onSet(a),n.settingTriggersEvent&&a[n.triggerFnName](n.settingEvent)}}}else if(n.allowSetting&&i.plainObject(t)){for(var p,f,v=t,g=Object.keys(v),d=0;d<g.length;d++){p=g[d],f=v[p];var c=!n.immutableKeys[p];if(c)for(var y=0;y<s.length;y++){var m=s[y];n.canSet(m)&&(m._private[n.field][p]=f)}}n.updateStyle&&a.updateStyle(),n.onSet(a),n.settingTriggersEvent&&a[n.triggerFnName](n.settingEvent)}else if(n.allowBinding&&i.fn(t)){var b=t;a.on(n.bindingEvent,b)}else if(n.allowGetting&&void 0===t){var u;return l&&(u=l._private[n.field]),u}return a}},removeData:function(e){var t={field:"data",event:"data",triggerFnName:"trigger",triggerEvent:!1,immutableKeys:{}};return e=n.extend({},t,e),function(t){var r=e,n=this,a=void 0!==n.length,o=a?n:[n];if(i.string(t)){for(var s=t.split(/\s+/),l=s.length,u=0;l>u;u++){var c=s[u];if(!i.emptyString(c)){var d=!r.immutableKeys[c];if(d)for(var h=0,p=o.length;p>h;h++)o[h]._private[r.field][c]=void 0}}r.triggerEvent&&n[r.triggerFnName](r.event)}else if(void 0===t){for(var h=0,p=o.length;p>h;h++)for(var f=o[h]._private[r.field],s=Object.keys(f),u=0;u<s.length;u++){var c=s[u],v=!r.immutableKeys[c];v&&(f[c]=void 0)}r.triggerEvent&&n[r.triggerFnName](r.event)}return n}},event:{regex:/(\w+)(\.(?:\w+|\*))?/,universalNamespace:".*",optionalTypeRegex:/(\w+)?(\.(?:\w+|\*))?/,falseCallback:function(){return!1}},on:function(e){var t={unbindSelfOnTrigger:!1,unbindAllBindersOnTrigger:!1};return e=n.extend({},t,e),function(t,r,n,o){var s=this,l=void 0!==s.length,c=l?s:[s],d=i.string(t),h=e;if(i.plainObject(r)?(o=n,n=r,r=void 0):(i.fn(r)||r===!1)&&(o=r,n=void 0,r=void 0),(i.fn(n)||n===!1)&&(o=n,n=void 0),!i.fn(o)&&o!==!1&&d)return s;if(d){var p={};p[t]=o,t=p}for(var f=Object.keys(t),v=0;v<f.length;v++){var g=f[v];if(o=t[g],o===!1&&(o=u.event.falseCallback),i.fn(o)){g=g.split(/\s+/);for(var y=0;y<g.length;y++){var m=g[y];if(!i.emptyString(m)){var b=m.match(u.event.regex);if(b)for(var x=b[1],w=b[2]?b[2]:void 0,E={callback:o,data:n,delegated:!!r,selector:r,selObj:new a(r),type:x,namespace:w,unbindSelfOnTrigger:h.unbindSelfOnTrigger,unbindAllBindersOnTrigger:h.unbindAllBindersOnTrigger,binders:c},_=0;_<c.length;_++){var P=c[_]._private=c[_]._private||{};P.listeners=P.listeners||[],P.listeners.push(E)}}}}}return s}},eventAliasesOn:function(e){var t=e;t.addListener=t.listen=t.bind=t.on,t.removeListener=t.unlisten=t.unbind=t.off,t.emit=t.trigger,t.pon=t.promiseOn=function(e,t){var r=this,n=Array.prototype.slice.call(arguments,0);return new o(function(e,t){var i=function(t){r.off.apply(r,o),e(t)},a=n.concat([i]),o=a.concat([]);r.on.apply(r,a)})}},off:function(e){var t={};return e=n.extend({},t,e),function(e,t,r){var n=this,a=void 0!==n.length,o=a?n:[n],s=i.string(e);if(0===arguments.length){for(var l=0;l<o.length;l++)o[l]._private=o[l]._private||{},b.listeners=[];return n}if((i.fn(t)||t===!1)&&(r=t,t=void 0),s){var c={};c[e]=r,e=c}for(var d=Object.keys(e),h=0;h<d.length;h++){var p=d[h];r=e[p],r===!1&&(r=u.event.falseCallback),p=p.split(/\s+/);for(var f=0;f<p.length;f++){var v=p[f];if(!i.emptyString(v)){var g=v.match(u.event.optionalTypeRegex);if(g)for(var y=g[1]?g[1]:void 0,m=g[2]?g[2]:void 0,l=0;l<o.length;l++)for(var b=o[l]._private=o[l]._private||{},x=b.listeners=b.listeners||[],w=0;w<x.length;w++){var E=x[w],_=!m||m===E.namespace,P=!y||E.type===y,S=!r||r===E.callback,k=_&&P&&S;k&&(x.splice(w,1),w--)}}}}return n}},trigger:function(e){var t={};return e=n.extend({},t,e),function(t,r,n){var a=this,o=void 0!==a.length,l=o?a:[a],c=i.string(t),d=i.plainObject(t),h=i.event(t),p=this._private=this._private||{},f=p.cy||(i.core(this)?this:null),v=f?f.hasCompoundNodes():!1;if(c){var g=t.split(/\s+/);t=[];for(var y=0;y<g.length;y++){var m=g[y];if(!i.emptyString(m)){var b=m.match(u.event.regex),x=b[1],w=b[2]?b[2]:void 0;t.push({type:x,namespace:w})}}}else if(d){var E=t;t=[E]}r?i.array(r)||(r=[r]):r=[];for(var y=0;y<t.length;y++)for(var _=t[y],P=0;P<l.length;P++){var m,S=l[P],p=S._private=S._private||{},k=p.listeners=p.listeners||[],T=i.element(S),D=T||e.layout;if(h?(m=_,m.cyTarget=m.cyTarget||S,m.cy=m.cy||f):m=new s(_,{cyTarget:S,cy:f,namespace:_.namespace}),_.layout&&(m.layout=_.layout),e.layout&&(m.layout=S),m.cyPosition){var C=m.cyPosition,M=f.zoom(),N=f.pan();m.cyRenderedPosition={x:C.x*M+N.x,y:C.y*M+N.y}}n&&(k=[{namespace:m.namespace,type:m.type,callback:n}]);for(var B=0;B<k.length;B++){var z=k[B],I=!z.namespace||z.namespace===m.namespace||z.namespace===u.event.universalNamespace,L=z.type===m.type,O=z.delegated?S!==m.cyTarget&&i.element(m.cyTarget)&&z.selObj.matches(m.cyTarget):!0,A=I&&L&&O;if(A){var R=[m];if(R=R.concat(r),z.data?m.data=z.data:m.data=void 0,(z.unbindSelfOnTrigger||z.unbindAllBindersOnTrigger)&&(k.splice(B,1),B--),z.unbindAllBindersOnTrigger)for(var q=z.binders,V=0;V<q.length;V++){var F=q[V];if(F&&F!==S)for(var j=F._private.listeners,X=0;X<j.length;X++){var Y=j[X];Y===z&&(j.splice(X,1),X--)}}var W=z.delegated?m.cyTarget:S,$=z.callback.apply(W,R);($===!1||m.isPropagationStopped())&&(D=!1,$===!1&&(m.stopPropagation(),m.preventDefault()))}}if(D){var H=v?S._private.parent:null,U=null!=H&&0!==H.length;U?(H=H[0],H.trigger(m)):f.trigger(m)}}return a}},animated:function(e){var t={};return e=n.extend({},t,e),function(){var e=this,t=void 0!==e.length,r=t?e:[e],n=this._private.cy||this;if(!n.styleEnabled())return!1;var i=r[0];return i?i._private.animation.current.length>0:void 0}},clearQueue:function(e){var t={};return e=n.extend({},t,e),function(){var e=this,t=void 0!==e.length,r=t?e:[e],n=this._private.cy||this;if(!n.styleEnabled())return this;for(var i=0;i<r.length;i++){var a=r[i];a._private.animation.queue=[]}return this}},delay:function(e){var t={};return e=n.extend({},t,e),function(e,t){var r=this._private.cy||this;return r.styleEnabled()?this.animate({delay:e,duration:e,complete:t}):this}},delayAnimation:function(e){var t={};return e=n.extend({},t,e),function(e,t){var r=this._private.cy||this;return r.styleEnabled()?this.animation({delay:e,duration:e,complete:t}):this}},animation:function(e){var t={};return e=n.extend({},t,e),function(e,t){var r=this,i=void 0!==r.length,a=i?r:[r],o=this._private.cy||this,s=!i,u=!s;if(!o.styleEnabled())return this;var c=o.style();switch(e=n.extend({},e,t),void 0===e.duration&&(e.duration=400),e.duration){case"slow":e.duration=600;break;case"fast":e.duration=200}var d=0===Object.keys(e).length;if(d)return new l(a[0],e);if(u&&(e.style=c.getPropsList(e.style||e.css),e.css=void 0),e.renderedPosition&&u){var h=e.renderedPosition,p=o.pan(),f=o.zoom();e.position={x:(h.x-p.x)/f,y:(h.y-p.y)/f}}if(e.panBy&&s){var v=e.panBy,g=o.pan();e.pan={x:g.x+v.x,y:g.y+v.y}}var y=e.center||e.centre;if(y&&s){var m=o.getCenterPan(y.eles,e.zoom);m&&(e.pan=m)}if(e.fit&&s){var b=e.fit,x=o.getFitViewport(b.eles||b.boundingBox,b.padding);x&&(e.pan=x.pan,e.zoom=x.zoom)}return new l(a[0],e)}},animate:function(e){var t={};return e=n.extend({},t,e),function(e,t){var r=this,i=void 0!==r.length,a=i?r:[r],o=this._private.cy||this;if(!o.styleEnabled())return this;t&&(e=n.extend({},e,t));for(var s=0;s<a.length;s++){var l=a[s],u=l.animated()&&(void 0===e.queue||e.queue),c=l.animation(e,u?{queue:!0}:void 0);c.play()}return this}},stop:function(e){var t={};return e=n.extend({},t,e),function(e,t){var r=this,n=void 0!==r.length,i=n?r:[r],a=this._private.cy||this;if(!a.styleEnabled())return this;for(var o=0;o<i.length;o++){for(var s=i[o],l=s._private,u=l.animation.current,c=0;c<u.length;c++){var d=u[c],h=d._private;t&&(h.duration=0)}e&&(l.animation.queue=[]),t||(l.animation.current=[])}return a.notify({eles:this,type:"draw"}),this}}};t.exports=u},{"./animation":2,"./event":45,"./is":83,"./promise":86,"./selector":87,"./util":100}],45:[function(e,t,r){"use strict";function n(){return!1}function i(){return!0}/*!
Event object based on jQuery events, MIT license

https://jquery.org/license/
https://tldrlegal.com/license/mit-license
https://github.com/jquery/jquery/blob/master/src/event.js
*/
var a=function(e,t){return this instanceof a?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented?i:n):this.type=e,t&&(this.type=void 0!==t.type?t.type:this.type,this.cy=t.cy,this.cyTarget=t.cyTarget,this.cyPosition=t.cyPosition,this.cyRenderedPosition=t.cyRenderedPosition,this.namespace=t.namespace,this.layout=t.layout,this.data=t.data,this.message=t.message),void(this.timeStamp=e&&e.timeStamp||Date.now())):new a(e,t)};a.prototype={instanceString:function(){return"event"},preventDefault:function(){this.isDefaultPrevented=i;var e=this.originalEvent;e&&e.preventDefault&&e.preventDefault()},stopPropagation:function(){this.isPropagationStopped=i;var e=this.originalEvent;e&&e.stopPropagation&&e.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=i,this.stopPropagation()},isDefaultPrevented:n,isPropagationStopped:n,isImmediatePropagationStopped:n},t.exports=a},{}],46:[function(e,t,r){"use strict";function n(e,t,r){var n=r,a=function(r){s.error("Can not register `"+t+"` for `"+e+"` since `"+r+"` already exists in the prototype and can not be overridden")};if("core"===e){if(c.prototype[t])return a(t);c.prototype[t]=r}else if("collection"===e){if(u.prototype[t])return a(t);u.prototype[t]=r}else if("layout"===e){for(var o=function(e){this.options=e,r.call(this,e),h.plainObject(this._private)||(this._private={}),this._private.cy=e.cy,this._private.listeners=[]},d=o.prototype=Object.create(r.prototype),f=[],v=0;v<f.length;v++){var g=f[v];d[g]=d[g]||function(){return this}}d.start&&!d.run?d.run=function(){return this.start(),this}:!d.start&&d.run&&(d.start=function(){return this.run(),this}),d.stop||(d.stop=function(){var e=this.options;if(e&&e.animate)for(var t=this.animations,r=0;r<t.length;r++)t[r].stop();return this.trigger("layoutstop"),this}),d.destroy||(d.destroy=function(){return this}),d.on=l.on({layout:!0}),d.one=l.on({layout:!0,unbindSelfOnTrigger:!0}),d.once=l.on({layout:!0,unbindAllBindersOnTrigger:!0}),d.off=l.off({layout:!0}),d.trigger=l.trigger({layout:!0}),l.eventAliasesOn(d),n=o}else if("renderer"===e&&"null"!==t&&"base"!==t){var y=i("renderer","base"),m=y.prototype,b=r,x=r.prototype,w=function(){y.apply(this,arguments),b.apply(this,arguments)},E=w.prototype;for(var _ in m){var P=m[_],S=null!=x[_];if(S)return a(_);E[_]=P}for(var _ in x)E[_]=x[_];m.clientFunctions.forEach(function(e){E[e]=E[e]||function(){s.error("Renderer does not implement `renderer."+e+"()` on its prototype")}}),n=w}return s.setMap({map:p,keys:[e,t],value:n})}function i(e,t){return s.getMap({map:p,keys:[e,t]})}function a(e,t,r,n,i){return s.setMap({map:f,keys:[e,t,r,n],value:i})}function o(e,t,r,n){return s.getMap({map:f,keys:[e,t,r,n]})}var s=e("./util"),l=e("./define"),u=e("./collection"),c=e("./core"),d=e("./extensions"),h=e("./is"),p={},f={},v=function(){return 2===arguments.length?i.apply(null,arguments):3===arguments.length?n.apply(null,arguments):4===arguments.length?o.apply(null,arguments):5===arguments.length?a.apply(null,arguments):void s.error("Invalid extension access syntax")};c.prototype.extension=v,d.forEach(function(e){e.extensions.forEach(function(t){n(e.type,t.name,t.impl)})}),t.exports=v},{"./collection":26,"./core":37,"./define":44,"./extensions":47,"./is":83,"./util":100}],47:[function(e,t,r){"use strict";t.exports=[{type:"layout",extensions:e("./layout")},{type:"renderer",extensions:e("./renderer")}]},{"./layout":53,"./renderer":78}],48:[function(e,t,r){"use strict";function n(e){this.options=i.extend({},s,e)}var i=e("../../util"),a=e("../../math"),o=e("../../is"),s={fit:!0,directed:!1,padding:30,circle:!1,spacingFactor:1.75,boundingBox:void 0,avoidOverlap:!0,roots:void 0,maximalAdjustments:0,animate:!1,animationDuration:500,animationEasing:void 0,ready:void 0,stop:void 0};n.prototype.run=function(){var e,t=this.options,r=t,n=t.cy,i=r.eles,s=i.nodes().not(":parent"),l=i,u=a.makeBoundingBox(r.boundingBox?r.boundingBox:{x1:0,y1:0,w:n.width(),h:n.height()});if(o.elementOrCollection(r.roots))e=r.roots;else if(o.array(r.roots)){for(var c=[],d=0;d<r.roots.length;d++){var h=r.roots[d],p=n.getElementById(h);c.push(p)}e=n.collection(c)}else if(o.string(r.roots))e=n.$(r.roots);else if(r.directed)e=s.roots();else{for(var f=[],v=s;v.length>0;){var g=n.collection();i.bfs({roots:v[0],visit:function(e,t,r,n,i){g=g.add(r)},directed:!1}),v=v.not(g),f.push(g)}e=n.collection();for(var d=0;d<f.length;d++){var y=f[d],m=y.maxDegree(!1),b=y.filter(function(){return this.degree(!1)===m});e=e.add(b)}}var x=[],w={},E={},_={},P={},S={};l.bfs({roots:e,directed:r.directed,visit:function(e,t,r,n,i){var a=this[0],o=a.id();if(x[t]||(x[t]=[]),x[t].push(a),w[o]=!0,E[o]=t,_[o]=i,P[o]=n,i){var s=i.id(),l=S[s]=S[s]||[];l.push(r)}}});for(var k=[],d=0;d<s.length;d++){var p=s[d];w[p.id()]||k.push(p)}for(var T=3*k.length,D=0;0!==k.length&&T>D;){for(var C=k.shift(),M=C.neighborhood().nodes(),N=!1,d=0;d<M.length;d++){var B=E[M[d].id()];if(void 0!==B){x[B].push(C),N=!0;break}}N||k.push(C),D++}for(;0!==k.length;){var C=k.shift(),N=!1;N||(0===x.length&&x.push([]),x[0].push(C))}var z=function(){for(var e=0;e<x.length;e++)for(var t=x[e],r=0;r<t.length;r++){var n=t[r];n._private.scratch.breadthfirst={depth:e,index:r}}};z();for(var I=function(e){for(var t,r=e.connectedEdges(function(){return this.data("target")===e.id()}),n=e._private.scratch.breadthfirst,i=0,a=0;a<r.length;a++){var o=r[a],s=o.source()[0],l=s._private.scratch.breadthfirst;n.depth<=l.depth&&i<l.depth&&(i=l.depth,t=s)}return t},L=0;L<r.maximalAdjustments;L++){for(var O=x.length,A=[],d=0;O>d;d++)for(var B=x[d],R=B.length,q=0;R>q;q++){var p=B[q],V=p._private.scratch.breadthfirst,F=I(p);F&&(V.intEle=F,A.push(p))}for(var d=0;d<A.length;d++){var p=A[d],V=p._private.scratch.breadthfirst,F=V.intEle,j=F._private.scratch.breadthfirst;x[V.depth].splice(V.index,1);for(var X=j.depth+1;X>x.length-1;)x.push([]);x[X].push(p),V.depth=X,V.index=x[X].length-1}z()}var Y=0;if(r.avoidOverlap){for(var d=0;d<s.length;d++){var W=s[d],$=W.boundingBox(),H=$.w,U=$.h;Y=Math.max(Y,H,U)}Y*=r.spacingFactor}for(var Z={},G=function(e){if(Z[e.id()])return Z[e.id()];for(var t=e._private.scratch.breadthfirst.depth,r=e.neighborhood().nodes().not(":parent"),n=0,i=0,a=0;a<r.length;a++){var o=r[a],s=o._private.scratch.breadthfirst,l=s.index,u=s.depth,c=x[u].length;(t>u||0===t)&&(n+=l/c,i++)}return i=Math.max(1,i),n/=i,0===i&&(n=void 0),Z[e.id()]=n,n},Q=function(e,t){var r=G(e),n=G(t);return r-n},K=0;3>K;K++){for(var d=0;d<x.length;d++)x[d]=x[d].sort(Q);z()}for(var J=0,d=0;d<x.length;d++)J=Math.max(x[d].length,J);for(var ee={x:u.x1+u.w/2,y:u.x1+u.h/2},te=function(e,t){var n=e._private.scratch.breadthfirst,i=n.depth,a=n.index,o=x[i].length,s=Math.max(u.w/(o+1),Y),l=Math.max(u.h/(x.length+1),Y),c=Math.min(u.w/2/x.length,u.h/2/x.length);if(c=Math.max(c,Y),r.circle){if(r.circle){var d=c*i+c-(x.length>0&&x[0].length<=3?c/2:0),h=2*Math.PI/x[i].length*a;return 0===i&&1===x[0].length&&(d=1),{x:ee.x+d*Math.cos(h),y:ee.y+d*Math.sin(h)}}return{x:ee.x+(a+1-(o+1)/2)*s,y:(i+1)*l}}var p={x:ee.x+(a+1-(o+1)/2)*s,y:(i+1)*l};return t?p:p},re={},d=x.length-1;d>=0;d--)for(var B=x[d],q=0;q<B.length;q++){var C=B[q];re[C.id()]=te(C,d===x.length-1)}return s.layoutPositions(this,r,function(){return re[this.id()]}),this},t.exports=n},{"../../is":83,"../../math":85,"../../util":100}],49:[function(e,t,r){"use strict";function n(e){this.options=i.extend({},s,e)}var i=e("../../util"),a=e("../../math"),o=e("../../is"),s={fit:!0,padding:30,boundingBox:void 0,avoidOverlap:!0,radius:void 0,startAngle:1.5*Math.PI,sweep:void 0,clockwise:!0,sort:void 0,animate:!1,animationDuration:500,animationEasing:void 0,ready:void 0,stop:void 0};n.prototype.run=function(){var e=this.options,t=e,r=e.cy,n=t.eles,i=void 0!==t.counterclockwise?!t.counterclockwise:t.clockwise,s=n.nodes().not(":parent");t.sort&&(s=s.sort(t.sort));for(var l,u=a.makeBoundingBox(t.boundingBox?t.boundingBox:{x1:0,y1:0,w:r.width(),h:r.height()}),c={x:u.x1+u.w/2,y:u.y1+u.h/2},d=void 0===t.sweep?2*Math.PI-2*Math.PI/s.length:t.sweep,h=d/Math.max(1,s.length-1),p=0,f=0;f<s.length;f++){var v=s[f],g=v.boundingBox(),y=g.w,m=g.h;p=Math.max(p,y,m)}if(l=o.number(t.radius)?t.radius:s.length<=1?0:Math.min(u.h,u.w)/2-p,s.length>1&&t.avoidOverlap){p*=1.75;var b=Math.cos(h)-Math.cos(0),x=Math.sin(h)-Math.sin(0),w=Math.sqrt(p*p/(b*b+x*x));l=Math.max(w,l)}var E=function(e,r){var n=t.startAngle+e*h*(i?1:-1),a=l*Math.cos(n),o=l*Math.sin(n),s={x:c.x+a,y:c.y+o};return s};return s.layoutPositions(this,t,E),this},t.exports=n},{"../../is":83,"../../math":85,"../../util":100}],50:[function(e,t,r){"use strict";function n(e){this.options=i.extend({},o,e)}var i=e("../../util"),a=e("../../math"),o={fit:!0,padding:30,startAngle:1.5*Math.PI,sweep:void 0,clockwise:!0,equidistant:!1,minNodeSpacing:10,boundingBox:void 0,avoidOverlap:!0,height:void 0,width:void 0,concentric:function(e){return e.degree()},levelWidth:function(e){return e.maxDegree()/4},animate:!1,animationDuration:500,animationEasing:void 0,ready:void 0,stop:void 0};n.prototype.run=function(){for(var e=this.options,t=e,r=void 0!==t.counterclockwise?!t.counterclockwise:t.clockwise,n=e.cy,i=t.eles,o=i.nodes().not(":parent"),s=a.makeBoundingBox(t.boundingBox?t.boundingBox:{x1:0,y1:0,w:n.width(),h:n.height()}),l={x:s.x1+s.w/2,y:s.y1+s.h/2},u=[],c=t.startAngle,d=0,h=0;h<o.length;h++){var p,f=o[h];p=t.concentric.apply(f,[f]),u.push({value:p,node:f}),f._private.scratch.concentric=p}o.updateStyle();for(var h=0;h<o.length;h++){var f=o[h],v=f.boundingBox();d=Math.max(d,v.w,v.h)}u.sort(function(e,t){return t.value-e.value});for(var g=t.levelWidth(o),y=[[]],m=y[0],h=0;h<u.length;h++){var b=u[h];if(m.length>0){var x=Math.abs(m[0].value-b.value);x>=g&&(m=[],y.push(m))}m.push(b)}var w=d+t.minNodeSpacing;if(!t.avoidOverlap){var E=y.length>0&&y[0].length>1,_=Math.min(s.w,s.h)/2-w,P=_/(y.length+E?1:0);w=Math.min(w,P)}for(var S=0,h=0;h<y.length;h++){var k=y[h],T=void 0===t.sweep?2*Math.PI-2*Math.PI/k.length:t.sweep,D=k.dTheta=T/Math.max(1,k.length-1);if(k.length>1&&t.avoidOverlap){var C=Math.cos(D)-Math.cos(0),M=Math.sin(D)-Math.sin(0),N=Math.sqrt(w*w/(C*C+M*M));S=Math.max(N,S)}k.r=S,S+=w}if(t.equidistant){for(var B=0,S=0,h=0;h<y.length;h++){var k=y[h],z=k.r-S;B=Math.max(B,z)}S=0;for(var h=0;h<y.length;h++){var k=y[h];0===h&&(S=k.r),k.r=S,S+=B}}for(var I={},h=0;h<y.length;h++)for(var k=y[h],D=k.dTheta,S=k.r,L=0;L<k.length;L++){var b=k[L],c=t.startAngle+(r?1:-1)*D*L,O={x:l.x+S*Math.cos(c),y:l.y+S*Math.sin(c)};I[b.node.id()]=O}return o.layoutPositions(this,t,function(){var e=this.id();return I[e]}),this},t.exports=n},{"../../math":85,"../../util":100}],51:[function(e,t,r){"use strict";function n(e){this.options=a.extend({},u,e),this.options.layout=this}var i,a=e("../../util"),o=e("../../math"),s=e("../../thread"),l=e("../../is"),u={ready:function(){},stop:function(){},animate:!0,animationThreshold:250,refresh:20,fit:!0,padding:30,boundingBox:void 0,randomize:!1,componentSpacing:100,nodeRepulsion:function(e){return 4e5},nodeOverlap:10,idealEdgeLength:function(e){return 10},edgeElasticity:function(e){return 100},nestingFactor:5,gravity:80,numIter:1e3,initialTemp:200,coolingFactor:.95,minTemp:1,useMultitasking:!0};n.prototype.run=function(){var e=this.options,t=e.cy,r=this,n=this.thread;n&&!n.stopped()||(n=this.thread=s({disabled:!e.useMultitasking})),r.stopped=!1,r.trigger({type:"layoutstart",layout:r}),i=!0===e.debug;var o=c(t,r,e);i&&p(o),e.randomize&&f(o,t);var l=Date.now(),u=!1,d=function(r){r=r||{},u&&!r.next||!r.force&&Date.now()-l<e.animationThreshold||(u=!0,a.requestAnimationFrame(function(){v(o,t,e),!0===e.fit&&t.fit(e.padding),u=!1,r.next&&r.next()}))};n.on("message",function(e){var t=e.message;o.layoutNodes=t,d()}),n.pass({layoutInfo:o,options:{animate:e.animate,refresh:e.refresh,componentSpacing:e.componentSpacing,nodeOverlap:e.nodeOverlap,nestingFactor:e.nestingFactor,gravity:e.gravity,numIter:e.numIter,initialTemp:e.initialTemp,coolingFactor:e.coolingFactor,minTemp:e.minTemp}}).run(function(e){var t,r=e.layoutInfo,n=e.options,i=!1,a=function(e,t,r){o(e,t),c(e,t),d(e,t),h(e,t),p(e,t)},o=function(e,t){for(var r=0;r<e.graphSet.length;r++)for(var n=e.graphSet[r],i=n.length,a=0;i>a;a++)for(var o=e.layoutNodes[e.idToIndex[n[a]]],l=a+1;i>l;l++){var u=e.layoutNodes[e.idToIndex[n[l]]];s(o,u,e,t)}},s=function(e,t,r,n){var i=e.cmptId,a=t.cmptId;if(i===a||r.isCompound){var o=t.positionX-e.positionX,s=t.positionY-e.positionY;if(0!==o||0!==s){var c=l(e,t,o,s);if(c>0)var d=n.nodeOverlap*c,h=Math.sqrt(o*o+s*s),p=d*o/h,f=d*s/h;else var v=u(e,o,s),g=u(t,-1*o,-1*s),y=g.x-v.x,m=g.y-v.y,b=y*y+m*m,h=Math.sqrt(b),d=(e.nodeRepulsion+t.nodeRepulsion)/b,p=d*y/h,f=d*m/h;e.isLocked||(e.offsetX-=p,e.offsetY-=f),t.isLocked||(t.offsetX+=p,t.offsetY+=f)}}},l=function(e,t,r,n){if(r>0)var i=e.maxX-t.minX;else var i=t.maxX-e.minX;if(n>0)var a=e.maxY-t.minY;else var a=t.maxY-e.minY;return i>=0&&a>=0?Math.sqrt(i*i+a*a):0},u=function(e,t,r){var n=e.positionX,i=e.positionY,a=e.height||1,o=e.width||1,s=r/t,l=a/o,u={};do{if(0===t&&r>0){u.x=n,u.y=i+a/2;break}if(0===t&&0>r){u.x=n,u.y=i+a/2;break}if(t>0&&s>=-1*l&&l>=s){u.x=n+o/2,u.y=i+o*r/2/t;break}if(0>t&&s>=-1*l&&l>=s){u.x=n-o/2,u.y=i-o*r/2/t;break}if(r>0&&(-1*l>=s||s>=l)){u.x=n+a*t/2/r,u.y=i+a/2;break}if(0>r&&(-1*l>=s||s>=l)){u.x=n-a*t/2/r,u.y=i-a/2;break}}while(!1);return u},c=function(e,t){for(var r=0;r<e.edgeSize;r++){var n=e.layoutEdges[r],i=e.idToIndex[n.sourceId],a=e.layoutNodes[i],o=e.idToIndex[n.targetId],s=e.layoutNodes[o],l=s.positionX-a.positionX,c=s.positionY-a.positionY;if(0===l&&0===c)return;var d=u(a,l,c),h=u(s,-1*l,-1*c),p=h.x-d.x,f=h.y-d.y,v=Math.sqrt(p*p+f*f),g=Math.pow(n.idealLength-v,2)/n.elasticity;if(0!==v)var y=g*p/v,m=g*f/v;else var y=0,m=0;a.isLocked||(a.offsetX+=y,a.offsetY+=m),s.isLocked||(s.offsetX-=y,s.offsetY-=m)}},d=function(e,t){for(var r=1,n=0;n<e.graphSet.length;n++){var i=e.graphSet[n],a=i.length;if(0===n)var o=e.clientHeight/2,s=e.clientWidth/2;else var l=e.layoutNodes[e.idToIndex[i[0]]],u=e.layoutNodes[e.idToIndex[l.parentId]],o=u.positionX,s=u.positionY;for(var c=0;a>c;c++){var d=e.layoutNodes[e.idToIndex[i[c]]];if(!d.isLocked){var h=o-d.positionX,p=s-d.positionY,f=Math.sqrt(h*h+p*p);if(f>r){var v=t.gravity*h/f,g=t.gravity*p/f;d.offsetX+=v,d.offsetY+=g}}}}},h=function(e,t){var r=[],n=0,i=-1;for(r.push.apply(r,e.graphSet[0]),i+=e.graphSet[0].length;i>=n;){var a=r[n++],o=e.idToIndex[a],s=e.layoutNodes[o],l=s.children;if(0<l.length&&!s.isLocked){for(var u=s.offsetX,c=s.offsetY,d=0;d<l.length;d++){var h=e.layoutNodes[e.idToIndex[l[d]]];h.offsetX+=u,h.offsetY+=c,r[++i]=l[d]}s.offsetX=0,s.offsetY=0}}},p=function(e,t){for(var r=0;r<e.nodeSize;r++){var n=e.layoutNodes[r];0<n.children.length&&(n.maxX=void 0,n.minX=void 0,n.maxY=void 0,n.minY=void 0)}for(var r=0;r<e.nodeSize;r++){var n=e.layoutNodes[r];if(!(0<n.children.length||n.isLocked)){var i=f(n.offsetX,n.offsetY,e.temperature);n.positionX+=i.x,n.positionY+=i.y,n.offsetX=0,n.offsetY=0,n.minX=n.positionX-n.width,n.maxX=n.positionX+n.width,n.minY=n.positionY-n.height,n.maxY=n.positionY+n.height,v(n,e)}}for(var r=0;r<e.nodeSize;r++){var n=e.layoutNodes[r];0<n.children.length&&!n.isLocked&&(n.positionX=(n.maxX+n.minX)/2,n.positionY=(n.maxY+n.minY)/2,n.width=n.maxX-n.minX,n.height=n.maxY-n.minY)}},f=function(e,t,r){var n=Math.sqrt(e*e+t*t);if(n>r)var i={x:r*e/n,y:r*t/n};else var i={x:e,y:t};return i},v=function(e,t){var r=e.parentId;if(null!=r){var n=t.layoutNodes[t.idToIndex[r]],i=!1;return(null==n.maxX||e.maxX+n.padRight>n.maxX)&&(n.maxX=e.maxX+n.padRight,i=!0),(null==n.minX||e.minX-n.padLeft<n.minX)&&(n.minX=e.minX-n.padLeft,i=!0),(null==n.maxY||e.maxY+n.padBottom>n.maxY)&&(n.maxY=e.maxY+n.padBottom,i=!0),(null==n.minY||e.minY-n.padTop<n.minY)&&(n.minY=e.minY-n.padTop,i=!0),i?v(n,t):void 0}},g=function(e,t){for(var n=r.layoutNodes,i=[],a=0;a<n.length;a++){var o=n[a],s=o.cmptId,l=i[s]=i[s]||[];l.push(o)}for(var u=0,a=0;a<i.length;a++){var c=i[a];if(c){c.x1=1/0,c.x2=-(1/0),c.y1=1/0,c.y2=-(1/0);for(var d=0;d<c.length;d++){var h=c[d];c.x1=Math.min(c.x1,h.positionX-h.width/2),c.x2=Math.max(c.x2,h.positionX+h.width/2),c.y1=Math.min(c.y1,h.positionY-h.height/2),c.y2=Math.max(c.y2,h.positionY+h.height/2)}c.w=c.x2-c.x1,c.h=c.y2-c.y1,u+=c.w*c.h}}i.sort(function(e,t){return t.w*t.h-e.w*e.h});for(var p=0,f=0,v=0,g=0,y=Math.sqrt(u)*r.clientWidth/r.clientHeight,a=0;a<i.length;a++){var c=i[a];if(c){for(var d=0;d<c.length;d++){var h=c[d];h.isLocked||(h.positionX+=p,h.positionY+=f)}p+=c.w+t.componentSpacing,v+=c.w+t.componentSpacing,g=Math.max(g,c.h),v>y&&(f+=g+t.componentSpacing,p=0,v=0,g=0)}}},y=function(e){return i?!1:(a(r,n,e),r.temperature=r.temperature*n.coolingFactor,!(r.temperature<n.minTemp))},m=0;do{for(var b=0;b<n.refresh&&m<n.numIter;){var t=y(m);if(!t)break;b++,m++}n.animate&&broadcast(r.layoutNodes)}while(t&&m+1<n.numIter);return g(r,n),r}).then(function(e){o.layoutNodes=e.layoutNodes,n.stop(),h()});var h=function(){d({force:!0,next:function(){r.one("layoutstop",e.stop),r.trigger({type:"layoutstop",layout:r})}})};return this},n.prototype.stop=function(){return this.stopped=!0,this.thread&&this.thread.stop(),this.trigger("layoutstop"),this},n.prototype.destroy=function(){return this.thread&&this.thread.stop(),this};var c=function(e,t,r){for(var n=r.eles.edges(),i=r.eles.nodes(),a={isCompound:e.hasCompoundNodes(),layoutNodes:[],idToIndex:{},nodeSize:i.size(),graphSet:[],indexToGraph:[],layoutEdges:[],edgeSize:n.size(),temperature:r.initialTemp,clientWidth:e.width(),clientHeight:e.width(),boundingBox:o.makeBoundingBox(r.boundingBox?r.boundingBox:{x1:0,y1:0,w:e.width(),h:e.height()})},s=r.eles.components(),u={},c=0;c<s.length;c++)for(var h=s[c],p=0;p<h.length;p++){var f=h[p];u[f.id()]=c}for(var c=0;c<a.nodeSize;c++){var v=i[c],g=v.boundingBox(),y={};y.isLocked=v.locked(),y.id=v.data("id"),y.parentId=v.data("parent"),y.cmptId=u[v.id()],y.children=[],y.positionX=v.position("x"),y.positionY=v.position("y"),y.offsetX=0,y.offsetY=0,y.height=g.w,y.width=g.h,y.maxX=y.positionX+y.width/2,y.minX=y.positionX-y.width/2,y.maxY=y.positionY+y.height/2,y.minY=y.positionY-y.height/2,y.padLeft=parseFloat(v.style("padding-left")),y.padRight=parseFloat(v.style("padding-right")),y.padTop=parseFloat(v.style("padding-top")),y.padBottom=parseFloat(v.style("padding-bottom")),y.nodeRepulsion=l.fn(r.nodeRepulsion)?r.nodeRepulsion.call(v,v):r.nodeRepulsion,a.layoutNodes.push(y),a.idToIndex[y.id]=c}for(var m=[],b=0,x=-1,w=[],c=0;c<a.nodeSize;c++){var v=a.layoutNodes[c],E=v.parentId;null!=E?a.layoutNodes[a.idToIndex[E]].children.push(v.id):(m[++x]=v.id,w.push(v.id))}for(a.graphSet.push(w);x>=b;){var _=m[b++],P=a.idToIndex[_],f=a.layoutNodes[P],S=f.children;if(S.length>0){a.graphSet.push(S);for(var c=0;c<S.length;c++)m[++x]=S[c]}}for(var c=0;c<a.graphSet.length;c++)for(var k=a.graphSet[c],p=0;p<k.length;p++){var T=a.idToIndex[k[p]];a.indexToGraph[T]=c}for(var c=0;c<a.edgeSize;c++){var D=n[c],C={};C.id=D.data("id"),C.sourceId=D.data("source"),C.targetId=D.data("target");var M=l.fn(r.idealEdgeLength)?r.idealEdgeLength.call(D,D):r.idealEdgeLength,N=l.fn(r.edgeElasticity)?r.edgeElasticity.call(D,D):r.edgeElasticity,B=a.idToIndex[C.sourceId],z=a.idToIndex[C.targetId],I=a.indexToGraph[B],L=a.indexToGraph[z];if(I!=L){for(var O=d(C.sourceId,C.targetId,a),A=a.graphSet[O],R=0,y=a.layoutNodes[B];-1===A.indexOf(y.id);)y=a.layoutNodes[a.idToIndex[y.parentId]],R++;for(y=a.layoutNodes[z];-1===A.indexOf(y.id);)y=a.layoutNodes[a.idToIndex[y.parentId]],R++;M*=R*r.nestingFactor}C.idealLength=M,C.elasticity=N,a.layoutEdges.push(C)}return a},d=function(e,t,r){var n=h(e,t,0,r);return 2>n.count?0:n.graph},h=function(e,t,r,n){var i=n.graphSet[r];if(-1<i.indexOf(e)&&-1<i.indexOf(t))return{count:2,graph:r};for(var a=0,o=0;o<i.length;o++){var s=i[o],l=n.idToIndex[s],u=n.layoutNodes[l].children;if(0!==u.length){var c=n.indexToGraph[n.idToIndex[u[0]]],d=h(e,t,c,n);if(0!==d.count){if(1!==d.count)return d;if(a++,2===a)break}}}return{count:a,graph:r}},p=function(e){if(i){console.debug("layoutNodes:");for(var t=0;t<e.nodeSize;t++){var r=e.layoutNodes[t],n="\nindex: "+t+"\nId: "+r.id+"\nChildren: "+r.children.toString()+"\nparentId: "+r.parentId+"\npositionX: "+r.positionX+"\npositionY: "+r.positionY+"\nOffsetX: "+r.offsetX+"\nOffsetY: "+r.offsetY+"\npadLeft: "+r.padLeft+"\npadRight: "+r.padRight+"\npadTop: "+r.padTop+"\npadBottom: "+r.padBottom;console.debug(n)}console.debug("idToIndex");for(var t in e.idToIndex)console.debug("Id: "+t+"\nIndex: "+e.idToIndex[t]);console.debug("Graph Set");for(var a=e.graphSet,t=0;t<a.length;t++)console.debug("Set : "+t+": "+a[t].toString());for(var n="IndexToGraph",t=0;t<e.indexToGraph.length;t++)n+="\nIndex : "+t+" Graph: "+e.indexToGraph[t];console.debug(n),n="Layout Edges";for(var t=0;t<e.layoutEdges.length;t++){var o=e.layoutEdges[t];n+="\nEdge Index: "+t+" ID: "+o.id+" SouceID: "+o.sourceId+" TargetId: "+o.targetId+" Ideal Length: "+o.idealLength}console.debug(n),n="nodeSize: "+e.nodeSize,n+="\nedgeSize: "+e.edgeSize,n+="\ntemperature: "+e.temperature,console.debug(n)}},f=function(e,t){for(var r=e.clientWidth,n=e.clientHeight,i=0;i<e.nodeSize;i++){var a=e.layoutNodes[i];0!==a.children.length||a.isLocked||(a.positionX=Math.random()*r,a.positionY=Math.random()*n)}},v=function(e,t,r){var n=r.layout,i=r.eles.nodes(),a=e.boundingBox,o={x1:1/0,x2:-(1/0),y1:1/0,y2:-(1/0)};r.boundingBox&&(i.forEach(function(t){var r=e.layoutNodes[e.idToIndex[t.data("id")]];o.x1=Math.min(o.x1,r.positionX),o.x2=Math.max(o.x2,r.positionX),o.y1=Math.min(o.y1,r.positionY),o.y2=Math.max(o.y2,r.positionY)}),o.w=o.x2-o.x1,o.h=o.y2-o.y1),i.positions(function(t,n){var i=e.layoutNodes[e.idToIndex[n.data("id")]];if(r.boundingBox){var s=(i.positionX-o.x1)/o.w,l=(i.positionY-o.y1)/o.h;return{x:a.x1+s*a.w,y:a.y1+l*a.h}}return{x:i.positionX,y:i.positionY}}),!0!==e.ready&&(e.ready=!0,n.one("layoutready",r.ready),n.trigger({type:"layoutready",layout:this}))};t.exports=n},{"../../is":83,"../../math":85,"../../thread":98,"../../util":100}],52:[function(e,t,r){"use strict";function n(e){this.options=i.extend({},o,e)}var i=e("../../util"),a=e("../../math"),o={fit:!0,padding:30,boundingBox:void 0,avoidOverlap:!0,avoidOverlapPadding:10,condense:!1,rows:void 0,cols:void 0,position:function(e){},sort:void 0,animate:!1,animationDuration:500,animationEasing:void 0,ready:void 0,stop:void 0};n.prototype.run=function(){var e=this.options,t=e,r=e.cy,n=t.eles,i=n.nodes().not(":parent");t.sort&&(i=i.sort(t.sort));var o=a.makeBoundingBox(t.boundingBox?t.boundingBox:{x1:0,y1:0,w:r.width(),h:r.height()});if(0===o.h||0===o.w)i.layoutPositions(this,t,function(){return{x:o.x1,y:o.y1}});else{var s=i.size(),l=Math.sqrt(s*o.h/o.w),u=Math.round(l),c=Math.round(o.w/o.h*l),d=function(e){if(null==e)return Math.min(u,c);var t=Math.min(u,c);t==u?u=e:c=e},h=function(e){if(null==e)return Math.max(u,c);var t=Math.max(u,c);t==u?u=e:c=e},p=t.rows,f=null!=t.cols?t.cols:t.columns;if(null!=p&&null!=f)u=p,c=f;else if(null!=p&&null==f)u=p,c=Math.ceil(s/u);else if(null==p&&null!=f)c=f,u=Math.ceil(s/c);else if(c*u>s){var v=d(),g=h();(v-1)*g>=s?d(v-1):(g-1)*v>=s&&h(g-1)}else for(;s>c*u;){var v=d(),g=h();(g+1)*v>=s?h(g+1):d(v+1)}var y=o.w/c,m=o.h/u;if(t.condense&&(y=0,m=0),t.avoidOverlap)for(var b=0;b<i.length;b++){var x=i[b],w=x._private.position;null!=w.x&&null!=w.y||(w.x=0,w.y=0);var E=x.boundingBox(),_=t.avoidOverlapPadding,P=E.w+_,S=E.h+_;y=Math.max(y,P),m=Math.max(m,S)}for(var k={},T=function(e,t){return!!k["c-"+e+"-"+t]},D=function(e,t){k["c-"+e+"-"+t]=!0},C=0,M=0,N=function(){M++,M>=c&&(M=0,C++)},B={},b=0;b<i.length;b++){var x=i[b],z=t.position(x);if(z&&(void 0!==z.row||void 0!==z.col)){var w={row:z.row,col:z.col};if(void 0===w.col)for(w.col=0;T(w.row,w.col);)w.col++;else if(void 0===w.row)for(w.row=0;T(w.row,w.col);)w.row++;B[x.id()]=w,D(w.row,w.col)}}var I=function(e,t){var r,n;if(t.locked()||t.isParent())return!1;var i=B[t.id()];if(i)r=i.col*y+y/2+o.x1,n=i.row*m+m/2+o.y1;else{for(;T(C,M);)N();r=M*y+y/2+o.x1,n=C*m+m/2+o.y1,D(C,M),N()}return{x:r,y:n}};i.layoutPositions(this,t,I)}return this},t.exports=n},{"../../math":85,"../../util":100}],53:[function(e,t,r){"use strict";t.exports=[{name:"breadthfirst",impl:e("./breadthfirst")},{name:"circle",impl:e("./circle")},{name:"concentric",impl:e("./concentric")},{name:"cose",impl:e("./cose")},{name:"grid",impl:e("./grid")},{name:"null",impl:e("./null")},{name:"preset",impl:e("./preset")},{name:"random",impl:e("./random")}]},{"./breadthfirst":48,"./circle":49,"./concentric":50,"./cose":51,"./grid":52,"./null":54,"./preset":55,"./random":56}],54:[function(e,t,r){"use strict";function n(e){this.options=i.extend({},a,e)}var i=e("../../util"),a={ready:function(){},stop:function(){}};n.prototype.run=function(){var e=this.options,t=e.eles,r=this;e.cy;return r.trigger("layoutstart"),t.nodes().positions(function(){return{x:0,y:0}}),r.one("layoutready",e.ready),r.trigger("layoutready"),r.one("layoutstop",e.stop),r.trigger("layoutstop"),this},n.prototype.stop=function(){return this},t.exports=n},{"../../util":100}],55:[function(e,t,r){"use strict";function n(e){this.options=i.extend({},o,e)}var i=e("../../util"),a=e("../../is"),o={positions:void 0,zoom:void 0,pan:void 0,fit:!0,padding:30,animate:!1,animationDuration:500,animationEasing:void 0,ready:void 0,stop:void 0};n.prototype.run=function(){function e(e){if(null==t.positions)return null;if(i)return t.positions.apply(e,[e]);var r=t.positions[e._private.data.id];return null==r?null:r}var t=this.options,r=t.eles,n=r.nodes(),i=a.fn(t.positions);return n.layoutPositions(this,t,function(t,r){var n=e(r);return r.locked()||null==n?!1:n}),this},t.exports=n},{"../../is":83,"../../util":100}],56:[function(e,t,r){"use strict";function n(e){this.options=i.extend({},o,e)}var i=e("../../util"),a=e("../../math"),o={fit:!0,padding:30,boundingBox:void 0,animate:!1,animationDuration:500,animationEasing:void 0,ready:void 0,stop:void 0};n.prototype.run=function(){var e=this.options,t=e.cy,r=e.eles,n=r.nodes().not(":parent"),i=a.makeBoundingBox(e.boundingBox?e.boundingBox:{x1:0,y1:0,w:t.width(),h:t.height()}),o=function(e,t){return{x:i.x1+Math.round(Math.random()*i.w),y:i.y1+Math.round(Math.random()*i.h)}};return n.layoutPositions(this,e,o),this},t.exports=n},{"../../math":85,"../../util":100}],57:[function(e,t,r){"use strict";var n=e("../../../math"),i=e("../../../is"),a=e("../../../util"),o={};o.arrowShapeWidth=.3,o.registerArrowShapes=function(){var e=this.arrowShapes={},t=this,r=function(e,t,r,n,i,a){var o=i.x-r/2-a,s=i.x+r/2+a,l=i.y-r/2-a,u=i.y+r/2+a,c=e>=o&&s>=e&&t>=l&&u>=t;return c},o=function(e,t,r,n,i){var a=e*Math.cos(n)-t*Math.sin(n),o=e*Math.sin(n)+t*Math.cos(n),s=a*r,l=o*r,u=s+i.x,c=l+i.y;return{x:u,y:c}},s=function(e,t,r,n){for(var i=[],a=0;a<e.length;a+=2){var s=e[a],l=e[a+1];i.push(o(s,l,t,r,n))}return i},l=function(e){for(var t=[],r=0;r<e.length;r++){var n=e[r];t.push(n.x,n.y)}return t},u=function(o,u){i.string(u)&&(u=e[u]),e[o]=a.extend({name:o,points:[-.15,-.3,.15,-.3,.15,.3,-.15,.3],collide:function(e,t,r,i,a,o){var u=l(s(this.points,r+2*o,i,a)),c=n.pointInsidePolygonPoints(e,t,u);return c},roughCollide:r,draw:function(e,r,n,i){var a=s(this.points,r,n,i);t.arrowShapeImpl("polygon")(e,a)},spacing:function(e){return 0},gap:function(e){return 2*e.pstyle("width").pfValue}},u)};u("none",{collide:a.falsify,roughCollide:a.falsify,draw:a.noop,spacing:a.zeroify,gap:a.zeroify}),u("triangle",{points:[-.15,-.3,0,0,.15,-.3]}),u("arrow","triangle"),u("triangle-backcurve",{points:e.triangle.points,controlPoint:[0,-.15],roughCollide:r,draw:function(e,r,n,i){var a=s(this.points,r,n,i),l=this.controlPoint,u=o(l[0],l[1],r,n,i);t.arrowShapeImpl(this.name)(e,a,u)},gap:function(e){return e.pstyle("width").pfValue}}),u("triangle-tee",{points:[-.15,-.3,0,0,.15,-.3,-.15,-.3],pointsTee:[-.15,-.4,-.15,-.5,.15,-.5,.15,-.4],collide:function(e,t,r,i,a,o){var u=l(s(this.points,r+2*o,i,a)),c=l(s(this.pointsTee,r+2*o,i,a)),d=n.pointInsidePolygonPoints(e,t,u)||n.pointInsidePolygonPoints(e,t,c);return d},draw:function(e,r,n,i){var a=s(this.points,r,n,i),o=s(this.pointsTee,r,n,i);t.arrowShapeImpl(this.name)(e,a,o)}}),u("vee",{points:[-.15,-.3,0,0,.15,-.3,0,-.15],gap:function(e){return e.pstyle("width").pfValue}}),u("circle",{radius:.15,collide:function(e,t,r,n,i,a){var o=i,s=Math.pow(o.x-e,2)+Math.pow(o.y-t,2)<=Math.pow((r+2*a)*this.radius,2);return s},draw:function(e,r,n,i){t.arrowShapeImpl(this.name)(e,i.x,i.y,this.radius*r)},spacing:function(e){return t.getArrowWidth(e.pstyle("width").pfValue)*this.radius}}),u("inhibitor",{points:[-.15,0,-.15,-.1,.15,-.1,.15,0],spacing:function(e){return 1},gap:function(e){return 1}}),u("tee","inhibitor"),u("square",{points:[-.15,0,.15,0,.15,-.3,-.15,-.3]}),u("diamond",{points:[-.15,-.15,0,-.3,.15,-.15,0,0],gap:function(e){return e.pstyle("width").pfValue}})},t.exports=o},{"../../../is":83,"../../../math":85,"../../../util":100}],58:[function(e,t,r){"use strict";function n(e,t,r){for(var n=function(e,t,r,n){return i.qbezierAt(e,t,r,n)},a=t._private,o=a.rstyle.bezierPts,s=0;s<e.bezierProjPcts.length;s++){var l=e.bezierProjPcts[s];o.push({x:n(r[0],r[2],r[4],l),y:n(r[1],r[3],r[5],l)})}}var i=e("../../../math"),a=e("../../../is"),o=e("../../../util"),s=e("../../../collection/zsort"),l={};l.registerCalculationListeners=function(){var e=this.cy,t=e.collection(),r=this,n=function(e,r){t.merge(e);for(var n=0;n<e.length;n++){var i=e[n],a=i._private,o=a.rstyle;o.clean=!1,a.bbCache=null;var s=o.dirtyEvents=o.dirtyEvents||{length:0};s[r.type]||(s[r.type]=!0,s.length++)}};r.binder(e).on("position.* style.* free.*","node",function(t){var r=t.cyTarget;if(n(r,t),n(r.connectedEdges(),t),e.hasCompoundNodes()){var i=r.parents();n(i,t),n(i.connectedEdges(),t)}}).on("add.* background.*","node",function(e){var t=e.cyTarget;n(t,e)}).on("add.* style.*","edge",function(e){var t=e.cyTarget;n(t,e),n(t.parallelEdges(),e)}).on("remove.*","edge",function(e){for(var t=e.cyTarget,r=t.parallelEdges(),i=0;i<r.length;i++){var a=r[i];a.removed()||n(a,e)}});var i=function(n){if(n){var i=r.onUpdateEleCalcsFns;if(i)for(var a=0;a<i.length;a++){var o=i[a];o(n,t)}r.recalculateRenderedStyle(t,!1);for(var a=0;a<t.length;a++)t[a]._private.rstyle.dirtyEvents=null;t=e.collection()}};r.beforeRender(i,r.beforeRenderPriorities.eleCalcs)},l.onUpdateEleCalcs=function(e){var t=this.onUpdateEleCalcsFns=this.onUpdateEleCalcsFns||[];t.push(e)},l.recalculateRenderedStyle=function(e,t){var r=[],n=[];if(!this.destroyed){void 0===t&&(t=!0);for(var i=0;i<e.length;i++){var a=e[i],o=a._private,s=o.rstyle;t&&s.clean||a.removed()||("nodes"===o.group?n.push(a):r.push(a),s.clean=!0)}for(var i=0;i<n.length;i++){var a=n[i],o=a._private,s=o.rstyle,l=o.position;this.recalculateNodeLabelProjection(a),s.nodeX=l.x,s.nodeY=l.y,s.nodeW=a.pstyle("width").pfValue,s.nodeH=a.pstyle("height").pfValue}this.recalculateEdgeProjections(r);for(var i=0;i<r.length;i++){var a=r[i],o=a._private,s=o.rstyle,u=o.rscratch;this.recalculateEdgeLabelProjections(a),s.srcX=u.arrowStartX,s.srcY=u.arrowStartY,s.tgtX=u.arrowEndX,s.tgtY=u.arrowEndY,s.midX=u.midX,s.midY=u.midY,s.labelAngle=u.labelAngle,s.sourceLabelAngle=u.sourceLabelAngle,s.targetLabelAngle=u.targetLabelAngle}}},l.projectIntoViewport=function(e,t){var r=this.findContainerClientCoords(),n=r[0],i=r[1],a=e-n,o=t-i;return a-=this.cy.pan().x,o-=this.cy.pan().y,a/=this.cy.zoom(),o/=this.cy.zoom(),[a,o]},l.findContainerClientCoords=function(){var e=this.container,t=this.containerBB=this.containerBB||e.getBoundingClientRect();return[t.left,t.top,t.right-t.left,t.bottom-t.top]},l.invalidateContainerClientCoordsCache=function(){this.containerBB=null},l.findNearestElement=function(e,t,r,n){return this.findNearestElements(e,t,r,n)[0]},l.findNearestElements=function(e,t,r,n){function a(e,t){if(e.isNode()){if(h)return;h=e,g.push(e)}if(e.isEdge()&&(null==t||E>t))if(d){if(d.pstyle("z-index").value===e.pstyle("z-index").value)for(var r=0;r<g.length;r++)if(g[r].isEdge()){g[r]=e,d=e,E=null!=t?t:E;break}}else g.push(e),d=e,E=null!=t?t:E}function s(n){var i=n._private;if("no"!==n.pstyle("events").strValue){
var o=n.outerWidth()+2*x,s=n.outerHeight()+2*x,l=o/2,u=s/2,c=i.position;if(c.x-l<=e&&e<=c.x+l&&c.y-u<=t&&t<=c.y+u){var d=!r||n.visible()&&!n.transparent();if(r&&!d)return;var h=f.nodeShapes[p.getNodeShape(n)];h.checkPoint(e,t,0,o,s,c.x,c.y)&&a(n,0)}}}function l(n){var o=n._private;if("no"!==n.pstyle("events").strValue){var l,u,c=o.rscratch,d=n.pstyle("width").pfValue/2+b,h=d*d,v=2*d,y=o.source,x=o.target,w=!1,E=function(){if(void 0!==u)return u;if(!r)return u=!0,!0;var e=n.visible()&&!n.transparent();return e?(u=!0,!0):(u=!1,!1)};if("segments"===c.edgeType||"straight"===c.edgeType||"haystack"===c.edgeType)for(var _=c.allpts,P=0;P+3<_.length;P+=2)(w=i.inLineVicinity(e,t,_[P],_[P+1],_[P+2],_[P+3],v))&&E()&&h>(l=i.sqdistToFiniteLine(e,t,_[P],_[P+1],_[P+2],_[P+3]))&&a(n,l);else if("bezier"===c.edgeType||"multibezier"===c.edgeType||"self"===c.edgeType||"compound"===c.edgeType)for(var _=c.allpts,P=0;P+5<c.allpts.length;P+=4)(w=i.inBezierVicinity(e,t,_[P],_[P+1],_[P+2],_[P+3],_[P+4],_[P+5],v))&&E()&&h>(l=i.sqdistToQuadraticBezier(e,t,_[P],_[P+1],_[P+2],_[P+3],_[P+4],_[P+5]))&&a(n,l);if(w&&E())for(var y=y||o.source,x=x||o.target,S=n.pstyle("width").pfValue,k=p.getArrowWidth(S),T=[{name:"source",x:c.arrowStartX,y:c.arrowStartY,angle:c.srcArrowAngle},{name:"target",x:c.arrowEndX,y:c.arrowEndY,angle:c.tgtArrowAngle},{name:"mid-source",x:c.midX,y:c.midY,angle:c.midsrcArrowAngle},{name:"mid-target",x:c.midX,y:c.midY,angle:c.midtgtArrowAngle}],P=0;P<T.length;P++){var D=T[P],C=f.arrowShapes[n.pstyle(D.name+"-arrow-shape").value];if(C.roughCollide(e,t,k,D.angle,{x:D.x,y:D.y},b)&&C.collide(e,t,k,D.angle,{x:D.x,y:D.y},b)){a(n);break}}m&&g.length>0&&(s(y),s(x))}}function u(e,t,r){return o.getPrefixedProperty(e,t,r)}function c(r,n){var o,s=r._private,l=w;if(o=n?n+"-":"","no"!==r.pstyle("text-events").strValue){var c=r.pstyle(o+"text-rotation");if("autorotate"===c.strValue||c.pfValue){var d=s.rstyle,h=r.pstyle("text-border-width").pfValue,p=u(d,"labelWidth",n)+h/2+2*l,f=u(d,"labelHeight",n)+h/2+2*l,v=u(d,"labelX",n),g=u(d,"labelY",n),y=u(s.rscratch,"labelAngle",n),m=Math.cos(y),b=Math.sin(y),x=function(e,t){return e-=v,t-=g,{x:e*m-t*b+v,y:e*b+t*m+g}},E=v-p/2,_=v+p/2,P=g-f/2,S=g+f/2,k=x(E,P),T=x(E,S),D=x(_,P),C=x(_,S),M=[k.x,k.y,D.x,D.y,C.x,C.y,T.x,T.y];i.pointInsidePolygonPoints(e,t,M)&&a(r)}else{var N=r.boundingBox({includeLabels:!0,includeNodes:!1,includeEdges:!1});N.x1-=l,N.y1-=l,N.x2+=l,N.y2+=l,N.w=N.x2-N.x1,N.h=N.y2-N.y1,i.inBoundingBox(N,e,t)&&a(r)}}}for(var d,h,p=this,f=this,v=f.getCachedZSortedEles(),g=[],y=f.cy.zoom(),m=f.cy.hasCompoundNodes(),b=(n?24:8)/y,x=(n?8:2)/y,w=(n?8:2)/y,E=1/0,_=v.length-1;_>=0;_--){var P=v[_];P.isNode()?(s(P),c(P)):(l(P),c(P),c(P,"source"),c(P,"target"))}return g},l.getAllInBox=function(e,t,r,n){var a=this.getCachedZSortedEles(),o=a.nodes,s=a.edges,l=[],u=Math.min(e,r),c=Math.max(e,r),d=Math.min(t,n),h=Math.max(t,n);e=u,r=c,t=d,n=h;for(var p=i.makeBoundingBox({x1:e,y1:t,x2:r,y2:n}),f=0;f<o.length;f++){var v=o[f],g=v.boundingBox({includeNodes:!0,includeEdges:!1,includeLabels:!1,includeShadows:!1});i.boundingBoxesIntersect(p,g)&&l.push(o[f])}for(var y=0;y<s.length;y++){var m=s[y],b=m._private,x=b.rscratch;if((null==x.startX||null==x.startY||i.inBoundingBox(p,x.startX,x.startY))&&(null==x.endX||null==x.endY||i.inBoundingBox(p,x.endX,x.endY)))if("bezier"===x.edgeType||"multibezier"===x.edgeType||"self"===x.edgeType||"compound"===x.edgeType||"segments"===x.edgeType||"haystack"===x.edgeType){for(var w=b.rstyle.bezierPts||b.rstyle.linePts||b.rstyle.haystackPts,E=!0,f=0;f<w.length;f++)if(!i.pointInBoundingBox(p,w[f])){E=!1;break}E&&l.push(m)}else"haystack"!==x.edgeType&&"straight"!==x.edgeType||l.push(m)}return l},l.getNodeShape=function(e){var t=this,r=e.pstyle("shape").value;if(e.isParent())return"rectangle"===r||"roundrectangle"===r?r:"rectangle";if("polygon"===r){var n=e.pstyle("shape-polygon-points").value;return t.nodeShapes.makePolygon(n).name}return r},l.updateCachedZSortedEles=function(){this.getCachedZSortedEles(!0)},l.updateCachedGrabbedEles=function(){var e=this.cachedZSortedEles;e.drag=[],e.nondrag=[];for(var t,r=0;r<e.length;r++){var n=e[r],i=n._private.rscratch;i.isGrabTarget&&!n.isParent()?t=n:i.inDragLayer?e.drag.push(n):e.nondrag.push(n)}t&&e.drag.push(t)},l.getCachedZSortedEles=function(e){if(e||!this.cachedZSortedEles){var t=this.cy.mutableElements(),r=[];r.nodes=[],r.edges=[];for(var n=0;n<t.length;n++){var i=t[n];(i.animated()||i.visible()&&!i.transparent())&&(r.push(i),i.isNode()?r.nodes.push(i):r.edges.push(i))}r.sort(s),this.cachedZSortedEles=r,this.updateCachedGrabbedEles()}else r=this.cachedZSortedEles;return r},l.projectLines=function(e){var t=e._private,r=t.rscratch,i=r.edgeType;if(t.rstyle.bezierPts=null,t.rstyle.linePts=null,t.rstyle.haystackPts=null,"multibezier"===i||"bezier"===i||"self"===i||"compound"===i)for(var a=(t.rstyle.bezierPts=[],0);a+5<r.allpts.length;a+=4)n(this,e,r.allpts.slice(a,a+6));else if("segments"===i)for(var o=t.rstyle.linePts=[],a=0;a+1<r.allpts.length;a+=2)o.push({x:r.allpts[a],y:r.allpts[a+1]});else if("haystack"===i){var s=r.haystackPts;t.rstyle.haystackPts=[{x:s[0],y:s[1]},{x:s[2],y:s[3]}]}t.rstyle.arrowWidth=this.getArrowWidth(e.pstyle("width").pfValue)*this.arrowShapeWidth},l.projectBezier=l.projectLines,l.recalculateNodeLabelProjection=function(e){var t=e.pstyle("label").strValue;if(!a.emptyString(t)){var r,n,i=e._private,o=e.width(),s=e.height(),l=e.pstyle("padding-left").pfValue,u=e.pstyle("padding-right").pfValue,c=e.pstyle("padding-top").pfValue,d=e.pstyle("padding-bottom").pfValue,h=i.position,p=e.pstyle("text-halign").strValue,f=e.pstyle("text-valign").strValue,v=i.rscratch,g=i.rstyle;switch(p){case"left":r=h.x-o/2-l;break;case"right":r=h.x+o/2+u;break;default:r=h.x}switch(f){case"top":n=h.y-s/2-c;break;case"bottom":n=h.y+s/2+d;break;default:n=h.y}v.labelX=r,v.labelY=n,g.labelX=r,g.labelY=n,this.applyLabelDimensions(e)}},l.recalculateEdgeLabelProjections=function(e){var t,r=e._private,n=r.rscratch,a=this,s={mid:e.pstyle("label").strValue,source:e.pstyle("source-label").strValue,target:e.pstyle("target-label").strValue};if(s.mid||s.source||s.target){t={x:n.midX,y:n.midY};var l=function(e,t,n){o.setPrefixedProperty(r.rscratch,e,t,n),o.setPrefixedProperty(r.rstyle,e,t,n)};l("labelX",null,t.x),l("labelY",null,t.y);var u=function(){function e(e,t,r,n,a){var o=i.dist(t,r),s=e.segments[e.segments.length-1],l={p0:t,p1:r,t0:n,t1:a,startDist:s?s.startDist+s.length:0,length:o};e.segments.push(l),e.length+=o}if(u.cache)return u.cache;for(var t=[],o=0;o+5<n.allpts.length;o+=4){var s={x:n.allpts[o],y:n.allpts[o+1]},l={x:n.allpts[o+2],y:n.allpts[o+3]},c={x:n.allpts[o+4],y:n.allpts[o+5]};t.push({p0:s,p1:l,p2:c,startDist:0,length:0,segments:[]})}for(var d=r.rstyle.bezierPts,h=a.bezierProjPcts.length,o=0;o<t.length;o++){var p=t[o],f=t[o-1];f&&(p.startDist=f.startDist+f.length),e(p,p.p0,d[o*h],0,a.bezierProjPcts[0]);for(var v=0;h-1>v;v++)e(p,d[o*h+v],d[o*h+v+1],a.bezierProjPcts[v],a.bezierProjPcts[v+1]);e(p,d[o*h+h-1],p.p2,a.bezierProjPcts[h-1],1)}return u.cache=t},c=function(r){var a,o="source"===r;if(s[r]){var c=e.pstyle(r+"-text-offset").pfValue,d=function(e,t){var r=t.x-e.x,n=t.y-e.y;return Math.atan(n/r)},h=function(e,t,r,n){var a=i.bound(0,n-.001,1),o=i.bound(0,n+.001,1),s=i.qbezierPtAt(e,t,r,a),l=i.qbezierPtAt(e,t,r,o);return d(s,l)};switch(n.edgeType){case"self":case"compound":case"bezier":case"multibezier":for(var p,f=u(),v=0,g=0,y=0;y<f.length;y++){for(var m=f[o?y:f.length-1-y],b=0;b<m.segments.length;b++){var x=m.segments[o?b:m.segments.length-1-b],w=y===f.length-1&&b===m.segments.length-1;if(v=g,g+=x.length,g>=c||w){p={cp:m,segment:x};break}}if(p)break}var m=p.cp,x=p.segment,E=(c-v)/x.length,_=x.t1-x.t0,P=o?x.t0+_*E:x.t1-_*E;P=i.bound(0,P,1),t=i.qbezierPtAt(m.p0,m.p1,m.p2,P),a=h(m.p0,m.p1,m.p2,P,t);break;case"straight":case"segments":case"haystack":for(var S,k,T,D,C=0,M=n.allpts.length,y=0;M>y+3&&(o?(T={x:n.allpts[y],y:n.allpts[y+1]},D={x:n.allpts[y+2],y:n.allpts[y+3]}):(T={x:n.allpts[M-2-y],y:n.allpts[M-1-y]},D={x:n.allpts[M-4-y],y:n.allpts[M-3-y]}),S=i.dist(T,D),k=C,C+=S,!(C>=c));y+=2);var N=c-k,P=N/S;P=i.bound(0,P,1),t=i.lineAt(T,D,P),a=d(T,D)}l("labelX",r,t.x),l("labelY",r,t.y),l("labelAutoAngle",r,a)}};c("source"),c("target"),this.applyLabelDimensions(e)}},l.applyLabelDimensions=function(e){this.applyPrefixedLabelDimensions(e),e.isEdge()&&(this.applyPrefixedLabelDimensions(e,"source"),this.applyPrefixedLabelDimensions(e,"target"))},l.applyPrefixedLabelDimensions=function(e,t){var r=e._private,n=this.getLabelText(e,t),i=this.calculateLabelDimensions(e,n);o.setPrefixedProperty(r.rstyle,"labelWidth",t,i.width),o.setPrefixedProperty(r.rscratch,"labelWidth",t,i.width),o.setPrefixedProperty(r.rstyle,"labelHeight",t,i.height),o.setPrefixedProperty(r.rscratch,"labelHeight",t,i.height)},l.getLabelText=function(e,t){var r=e._private,n=t?t+"-":"",i=e.pstyle(n+"label").strValue,a=e.pstyle("text-transform").value,s=function(e,n){return n?(o.setPrefixedProperty(r.rscratch,e,t,n),n):o.getPrefixedProperty(r.rscratch,e,t)};if("none"==a||("uppercase"==a?i=i.toUpperCase():"lowercase"==a&&(i=i.toLowerCase())),"wrap"===e.pstyle("text-wrap").value){var l=s("labelKey");if(l&&s("labelWrapKey")===l)return s("labelWrapCachedText");for(var u=i.split("\n"),c=e.pstyle("text-max-width").pfValue,d=[],h=0;h<u.length;h++){var p=u[h],f=this.calculateLabelDimensions(e,p,"line="+p),v=f.width;if(v>c){for(var g=p.split(/\s+/),y="",m=0;m<g.length;m++){var b=g[m],x=0===y.length?b:y+" "+b,w=this.calculateLabelDimensions(e,x,"testLine="+x),E=w.width;c>=E?y+=b+" ":(d.push(y),y=b+" ")}y.match(/^\s+$/)||d.push(y)}else d.push(p)}s("labelWrapCachedLines",d),i=s("labelWrapCachedText",d.join("\n")),s("labelWrapKey",l)}return i},l.calculateLabelDimensions=function(e,t,r){var n=this,i=e._private.labelStyleKey+"$@$"+t;r&&(i+="$@$"+r);var a=n.labelDimCache||(n.labelDimCache={});if(a[i])return a[i];var o=1,s=e.pstyle("font-style").strValue,l=o*e.pstyle("font-size").pfValue+"px",u=e.pstyle("font-family").strValue,c=e.pstyle("font-weight").strValue,d=this.labelCalcDiv;d||(d=this.labelCalcDiv=document.createElement("div"),document.body.appendChild(d));var h=d.style;return h.fontFamily=u,h.fontStyle=s,h.fontSize=l,h.fontWeight=c,h.position="absolute",h.left="-9999px",h.top="-9999px",h.zIndex="-1",h.visibility="hidden",h.pointerEvents="none",h.padding="0",h.lineHeight="1","wrap"===e.pstyle("text-wrap").value?h.whiteSpace="pre":h.whiteSpace="normal",d.textContent=t,a[i]={width:Math.ceil(d.clientWidth/o),height:Math.ceil(d.clientHeight/o)},a[i]},l.recalculateEdgeProjections=function(e){this.findEdgeControlPoints(e)},l.findEdgeControlPoints=function(e){if(e&&0!==e.length){for(var t,r=this,n=r.cy,o=n.hasCompoundNodes(),s={},l=[],u=[],c=0;c<e.length;c++){var d=e[c],h=d._private,p=h.data,f=d.pstyle("curve-style").value,v="unbundled-bezier"===f||"segments"===f;if("none"!==d.pstyle("display").value)if("haystack"!==f){var g=p.source,y=p.target;t=g>y?y+"$-$"+g:g+"$-$"+y,v&&(t="unbundled$-$"+p.id),null==s[t]&&(s[t]=[],l.push(t)),s[t].push(d),v&&(s[t].hasUnbundled=!0)}else u.push(d)}for(var m,b,x,w,E,_,P,S,k,T,D,C,M,N,B=0;B<l.length;B++){t=l[B];var z=s[t];if(z.sort(function(e,t){return e.poolIndex()-t.poolIndex()}),m=z[0]._private.source,b=z[0]._private.target,!z.hasUnbundled&&m.id()>b.id()){var I=m;m=b,b=I}if(x=m._private,w=b._private,E=x.position,_=w.position,P=m.outerWidth(),S=m.outerHeight(),k=b.outerWidth(),T=b.outerHeight(),D=r.nodeShapes[this.getNodeShape(m)],C=r.nodeShapes[this.getNodeShape(b)],N=!1,z.length>1&&m!==b||z.hasUnbundled){var L=D.intersectLine(E.x,E.y,P,S,_.x,_.y,0),O=C.intersectLine(_.x,_.y,k,T,E.x,E.y,0),A={x1:L[0],x2:O[0],y1:L[1],y2:O[1]},R={x1:E.x,x2:_.x,y1:E.y,y2:_.y},q=O[1]-L[1],V=O[0]-L[0],F=Math.sqrt(V*V+q*q),j={x:V,y:q},X={x:j.x/F,y:j.y/F};M={x:-X.y,y:X.x},C.checkPoint(L[0],L[1],0,k,T,_.x,_.y)&&D.checkPoint(O[0],O[1],0,P,S,E.x,E.y)&&(M={},N=!0)}for(var d,Y,W,c=0;c<z.length;c++){d=z[c],Y=d._private,W=Y.rscratch;var $=W.lastEdgeIndex,H=c,U=W.lastNumEdges,Z=z.length,f=d.pstyle("curve-style").value,G=d.pstyle("control-point-distances"),Q=d.pstyle("control-point-weights"),K=G&&Q?Math.min(G.value.length,Q.value.length):1,J=d.pstyle("control-point-step-size").pfValue,ee=G?G.pfValue[0]:void 0,te=Q.value[0],v="unbundled-bezier"===f||"segments"===f,re=W.lastSrcCtlPtX,ne=E.x,ie=W.lastSrcCtlPtY,ae=E.y,oe=W.lastSrcCtlPtW,se=m.outerWidth(),le=W.lastSrcCtlPtH,ue=m.outerHeight(),ce=W.lastTgtCtlPtX,de=_.x,he=W.lastTgtCtlPtY,pe=_.y,fe=W.lastTgtCtlPtW,ve=b.outerWidth(),ge=W.lastTgtCtlPtH,ye=b.outerHeight(),me=W.lastW,be=d.pstyle("control-point-step-size").pfValue,xe=d.pstyle("edge-distances").value;if(N?W.badBezier=!0:W.badBezier=!1,re!==ne||ie!==ae||oe!==se||le!==ue||ce!==de||he!==pe||fe!==ve||ge!==ye||me!==be||!($===H&&U===Z||v)){if(W.lastSrcCtlPtX=ne,W.lastSrcCtlPtY=ae,W.lastSrcCtlPtW=se,W.lastSrcCtlPtH=ue,W.lastTgtCtlPtX=de,W.lastTgtCtlPtY=pe,W.lastTgtCtlPtW=ve,W.lastTgtCtlPtH=ye,W.lastEdgeIndex=H,W.lastNumEdges=Z,W.lastWidth=be,m===b){W.edgeType="self";var we=c,Ee=J;v&&(we=0,Ee=ee),W.ctrlpts=[E.x,E.y-(1+Math.pow(S,1.12)/100)*Ee*(we/3+1),E.x-(1+Math.pow(P,1.12)/100)*Ee*(we/3+1),E.y]}else if(o&&(m.isParent()||m.isChild()||b.isParent()||b.isChild())&&(m.parents().anySame(b)||b.parents().anySame(m))){W.edgeType="compound",W.badBezier=!1;var we=c,Ee=J;v&&(we=0,Ee=ee);var _e=50,Pe={x:E.x-P/2,y:E.y-S/2},Se={x:_.x-k/2,y:_.y-T/2},ke={x:Math.min(Pe.x,Se.x),y:Math.min(Pe.y,Se.y)},Te=.5,De=Math.max(Te,Math.log(.01*P)),Ce=Math.max(Te,Math.log(.01*k));W.ctrlpts=[ke.x,ke.y-(1+Math.pow(_e,1.12)/100)*Ee*(we/3+1)*De,ke.x-(1+Math.pow(_e,1.12)/100)*Ee*(we/3+1)*Ce,ke.y]}else if("segments"===f){W.edgeType="segments",W.segpts=[];for(var Me=d.pstyle("segment-weights").pfValue,Ne=d.pstyle("segment-distances").pfValue,Be=Math.min(Me.length,Ne.length),ze=0;Be>ze;ze++){var Ie=Me[ze],Le=Ne[ze],Oe=1-Ie,Ae=Ie,Re="node-position"===xe?R:A,qe={x:Re.x1*Oe+Re.x2*Ae,y:Re.y1*Oe+Re.y2*Ae};W.segpts.push(qe.x+M.x*Le,qe.y+M.y*Le)}}else if(z.length%2!==1||c!==Math.floor(z.length/2)||v){var Ve=v;W.edgeType=Ve?"multibezier":"bezier",W.ctrlpts=[];for(var Fe=0;K>Fe;Fe++){var je,Xe=(.5-z.length/2+c)*J,Ye=i.signum(Xe);Ve&&(ee=G?G.pfValue[Fe]:J,te=Q.value[Fe]),je=v?ee:void 0!==ee?Ye*ee:void 0;var We=void 0!==je?je:Xe,Oe=1-te,Ae=te,Re="node-position"===xe?R:A,qe={x:Re.x1*Oe+Re.x2*Ae,y:Re.y1*Oe+Re.y2*Ae};W.ctrlpts.push(qe.x+M.x*We,qe.y+M.y*We)}}else W.edgeType="straight";this.findEndpoints(d);var $e=!a.number(W.startX)||!a.number(W.startY),He=!a.number(W.arrowStartX)||!a.number(W.arrowStartY),Ue=!a.number(W.endX)||!a.number(W.endY),Ze=!a.number(W.arrowEndX)||!a.number(W.arrowEndY),Ge=3,Qe=this.getArrowWidth(d.pstyle("width").pfValue)*this.arrowShapeWidth,Ke=Ge*Qe;if("bezier"===W.edgeType){var Je=i.dist({x:W.ctrlpts[0],y:W.ctrlpts[1]},{x:W.startX,y:W.startY}),et=Ke>Je,tt=i.dist({x:W.ctrlpts[0],y:W.ctrlpts[1]},{x:W.endX,y:W.endY}),rt=Ke>tt,nt=!1;if($e||He||et){nt=!0;var it={x:W.ctrlpts[0]-E.x,y:W.ctrlpts[1]-E.y},at=Math.sqrt(it.x*it.x+it.y*it.y),ot={x:it.x/at,y:it.y/at},st=Math.max(P,S),lt={x:W.ctrlpts[0]+2*ot.x*st,y:W.ctrlpts[1]+2*ot.y*st},ut=D.intersectLine(E.x,E.y,P,S,lt.x,lt.y,0);et?(W.ctrlpts[0]=W.ctrlpts[0]+ot.x*(Ke-Je),W.ctrlpts[1]=W.ctrlpts[1]+ot.y*(Ke-Je)):(W.ctrlpts[0]=ut[0]+ot.x*Ke,W.ctrlpts[1]=ut[1]+ot.y*Ke)}if(Ue||Ze||rt){nt=!0;var it={x:W.ctrlpts[0]-_.x,y:W.ctrlpts[1]-_.y},at=Math.sqrt(it.x*it.x+it.y*it.y),ot={x:it.x/at,y:it.y/at},st=Math.max(P,S),lt={x:W.ctrlpts[0]+2*ot.x*st,y:W.ctrlpts[1]+2*ot.y*st},ct=C.intersectLine(_.x,_.y,k,T,lt.x,lt.y,0);rt?(W.ctrlpts[0]=W.ctrlpts[0]+ot.x*(Ke-tt),W.ctrlpts[1]=W.ctrlpts[1]+ot.y*(Ke-tt)):(W.ctrlpts[0]=ct[0]+ot.x*Ke,W.ctrlpts[1]=ct[1]+ot.y*Ke)}nt&&this.findEndpoints(d)}if("multibezier"===W.edgeType||"bezier"===W.edgeType||"self"===W.edgeType||"compound"===W.edgeType){W.allpts=[],W.allpts.push(W.startX,W.startY);for(var Fe=0;Fe+1<W.ctrlpts.length;Fe+=2)W.allpts.push(W.ctrlpts[Fe],W.ctrlpts[Fe+1]),Fe+3<W.ctrlpts.length&&W.allpts.push((W.ctrlpts[Fe]+W.ctrlpts[Fe+2])/2,(W.ctrlpts[Fe+1]+W.ctrlpts[Fe+3])/2);W.allpts.push(W.endX,W.endY);var dt,ht;W.ctrlpts.length/2%2===0?(dt=W.allpts.length/2-1,W.midX=W.allpts[dt],W.midY=W.allpts[dt+1]):(dt=W.allpts.length/2-3,ht=.5,W.midX=i.qbezierAt(W.allpts[dt],W.allpts[dt+2],W.allpts[dt+4],ht),W.midY=i.qbezierAt(W.allpts[dt+1],W.allpts[dt+3],W.allpts[dt+5],ht))}else if("straight"===W.edgeType)W.allpts=[W.startX,W.startY,W.endX,W.endY],W.midX=(W.startX+W.endX+W.arrowStartX+W.arrowEndX)/4,W.midY=(W.startY+W.endY+W.arrowStartY+W.arrowEndY)/4;else if("segments"===W.edgeType)if(W.allpts=[],W.allpts.push(W.startX,W.startY),W.allpts.push.apply(W.allpts,W.segpts),W.allpts.push(W.endX,W.endY),W.segpts.length%4===0){var pt=W.segpts.length/2,ft=pt-2;W.midX=(W.segpts[ft]+W.segpts[pt])/2,W.midY=(W.segpts[ft+1]+W.segpts[pt+1])/2}else{var ft=W.segpts.length/2-1;W.midX=W.segpts[ft],W.midY=W.segpts[ft+1]}this.projectLines(d),this.calculateArrowAngles(d),this.recalculateEdgeLabelProjections(d),this.calculateLabelAngles(d)}}}for(var c=0;c<u.length;c++){var d=u[c],h=d._private,vt=h.rscratch,W=vt;if(!vt.haystack){var gt=2*Math.random()*Math.PI;vt.source={x:Math.cos(gt),y:Math.sin(gt)};var gt=2*Math.random()*Math.PI;vt.target={x:Math.cos(gt),y:Math.sin(gt)}}var m=h.source,b=h.target,E=m._private.position,_=b._private.position,P=m.width(),k=b.width(),S=m.height(),T=b.height(),st=d.pstyle("haystack-radius").value,yt=st/2;W.haystackPts=W.allpts=[W.source.x*P*yt+E.x,W.source.y*S*yt+E.y,W.target.x*k*yt+_.x,W.target.y*T*yt+_.y],W.midX=(W.allpts[0]+W.allpts[2])/2,W.midY=(W.allpts[1]+W.allpts[3])/2,vt.edgeType="haystack",vt.haystack=!0,this.projectLines(d),this.calculateArrowAngles(d),this.recalculateEdgeLabelProjections(d),this.calculateLabelAngles(d)}return s}};var u=function(e,t){return Math.atan2(t,e)-Math.PI/2};l.calculateArrowAngles=function(e){var t,r,n,a,o,s,l=e._private.rscratch,c="haystack"===l.edgeType,d="multibezier"===l.edgeType,h="segments"===l.edgeType,p="compound"===l.edgeType,f="self"===l.edgeType,v=e._private.source._private.position,g=e._private.target._private.position;c?(n=l.haystackPts[0],a=l.haystackPts[1],o=l.haystackPts[2],s=l.haystackPts[3]):(n=l.arrowStartX,a=l.arrowStartY,o=l.arrowEndX,s=l.arrowEndY),t=v.x-n,r=v.y-a,l.srcArrowAngle=u(t,r);var y=l.midX,m=l.midY;if(c&&(y=(n+o)/2,m=(a+s)/2),t=o-n,r=s-a,f)t=-1,r=1;else if(h){var b=l.allpts;if(b.length/2%2===0){var x=b.length/2,w=x-2;t=b[x]-b[w],r=b[x+1]-b[w+1]}else{var x=b.length/2-1,w=x-2,E=x+2;t=b[x]-b[w],r=b[x+1]-b[w+1]}}else if(d||p){var _,P,S,k,b=l.allpts,T=l.ctrlpts;if(T.length/2%2===0){var D=b.length/2-1,C=D+2,M=C+2;_=i.qbezierAt(b[D],b[C],b[M],0),P=i.qbezierAt(b[D+1],b[C+1],b[M+1],0),S=i.qbezierAt(b[D],b[C],b[M],1e-4),k=i.qbezierAt(b[D+1],b[C+1],b[M+1],1e-4)}else{var C=b.length/2-1,D=C-2,M=C+2;_=i.qbezierAt(b[D],b[C],b[M],.4999),P=i.qbezierAt(b[D+1],b[C+1],b[M+1],.4999),S=i.qbezierAt(b[D],b[C],b[M],.5),k=i.qbezierAt(b[D+1],b[C+1],b[M+1],.5)}t=S-_,r=k-P}if(l.midtgtArrowAngle=u(t,r),l.midDispX=t,l.midDispY=r,t*=-1,r*=-1,h){var b=l.allpts;if(b.length/2%2===0);else{var x=b.length/2-1,E=x+2;t=-(b[E]-b[x]),r=-(b[E+1]-b[x+1])}}l.midsrcArrowAngle=u(t,r),t=g.x-o,r=g.y-s,l.tgtArrowAngle=u(t,r)},l.calculateLabelAngles=function(e){var t=e._private,r=t.rscratch,n=e.isEdge(),i=e.pstyle("text-rotation"),a=i.strValue;"none"===a?r.labelAngle=r.sourceLabelAngle=r.targetLabelAngle=0:n&&"autorotate"===a?(r.labelAngle=Math.atan(r.midDispY/r.midDispX),r.sourceLabelAngle=r.sourceLabelAutoAngle,r.targetLabelAngle=r.targetLabelAutoAngle):"autorotate"===a?r.labelAngle=r.sourceLabelAngle=r.targetLabelAngle=0:r.labelAngle=r.sourceLabelAngle=r.targetLabelAngle=i.pfValue},l.findEndpoints=function(e){var t,r,n,o=this,s=e.source()[0],l=e.target()[0],u=s._private,c=l._private,d=u.position,h=c.position,p=e.pstyle("target-arrow-shape").value,f=e.pstyle("source-arrow-shape").value,v=e._private.rscratch,g=v.edgeType,y="bezier"===g||"multibezier"===g||"self"===g||"compound"===g,m="bezier"!==g,b="straight"===g||"segments"===g,x="segments"===g,w=y||m||b;if(y){var E=[v.ctrlpts[0],v.ctrlpts[1]],_=m?[v.ctrlpts[v.ctrlpts.length-2],v.ctrlpts[v.ctrlpts.length-1]]:E;r=_,n=E}else if(b){var P=x?v.segpts.slice(0,2):[h.x,h.y],S=x?v.segpts.slice(v.segpts.length-2):[d.x,d.y];r=S,n=P}t=o.nodeShapes[this.getNodeShape(l)].intersectLine(h.x,h.y,l.outerWidth(),l.outerHeight(),r[0],r[1],0);var k=i.shortenIntersection(t,r,o.arrowShapes[p].spacing(e)),T=i.shortenIntersection(t,r,o.arrowShapes[p].gap(e));v.endX=T[0],v.endY=T[1],v.arrowEndX=k[0],v.arrowEndY=k[1],t=o.nodeShapes[this.getNodeShape(s)].intersectLine(d.x,d.y,s.outerWidth(),s.outerHeight(),n[0],n[1],0);var D=i.shortenIntersection(t,n,o.arrowShapes[f].spacing(e)),C=i.shortenIntersection(t,n,o.arrowShapes[f].gap(e));v.startX=C[0],v.startY=C[1],v.arrowStartX=D[0],v.arrowStartY=D[1],w&&(a.number(v.startX)&&a.number(v.startY)&&a.number(v.endX)&&a.number(v.endY)?v.badLine=!1:v.badLine=!0)},l.getArrowWidth=l.getArrowHeight=function(e){var t=this.arrowWidthCache=this.arrowWidthCache||{},r=t[e];return r?r:(r=Math.max(Math.pow(13.37*e,.9),29),t[e]=r,r)},t.exports=l},{"../../../collection/zsort":32,"../../../is":83,"../../../math":85,"../../../util":100}],59:[function(e,t,r){"use strict";var n={};n.getCachedImage=function(e,t){var r=this,n=r.imageCache=r.imageCache||{},i=n[e];if(i)return i.image.complete||i.image.addEventListener("load",t),i.image;i=n[e]=n[e]||{};var a=i.image=new Image;a.addEventListener("load",t);var o="data:",s=e.substring(0,o.length).toLowerCase()===o;return s||(a.crossOrigin="Anonymous"),a.src=e,a},t.exports=n},{}],60:[function(e,t,r){"use strict";var n=e("../../../is"),i=e("../../../util"),a=function(e){this.init(e)},o=a,s=o.prototype;s.clientFunctions=["redrawHint","render","renderTo","matchCanvasSize","nodeShapeImpl","arrowShapeImpl"],s.init=function(e){var t=this;t.options=e,t.cy=e.cy,t.container=e.cy.container(),t.selection=[void 0,void 0,void 0,void 0,0],t.bezierProjPcts=[.05,.225,.4,.5,.6,.775,.95],t.hoverData={down:null,last:null,downTime:null,triggerMode:null,dragging:!1,initialPan:[null,null],capture:!1},t.dragData={possibleDragElements:[]},t.touchData={start:null,capture:!1,startPosition:[null,null,null,null,null,null],singleTouchStartTime:null,singleTouchMoved:!0,now:[null,null,null,null,null,null],earlier:[null,null,null,null,null,null]},t.redraws=0,t.showFps=e.showFps,t.hideEdgesOnViewport=e.hideEdgesOnViewport,t.hideLabelsOnViewport=e.hideLabelsOnViewport,t.textureOnViewport=e.textureOnViewport,t.wheelSensitivity=e.wheelSensitivity,t.motionBlurEnabled=e.motionBlur,t.forcedPixelRatio=e.pixelRatio,t.motionBlur=e.motionBlur,t.motionBlurOpacity=e.motionBlurOpacity,t.motionBlurTransparency=1-t.motionBlurOpacity,t.motionBlurPxRatio=1,t.mbPxRBlurry=1,t.minMbLowQualFrames=4,t.fullQualityMb=!1,t.clearedForMotionBlur=[],t.desktopTapThreshold=e.desktopTapThreshold,t.desktopTapThreshold2=e.desktopTapThreshold*e.desktopTapThreshold,t.touchTapThreshold=e.touchTapThreshold,t.touchTapThreshold2=e.touchTapThreshold*e.touchTapThreshold,t.tapholdDuration=500,t.bindings=[],t.beforeRenderCallbacks=[],t.beforeRenderPriorities={animations:400,eleCalcs:300,eleTxrDeq:200,lyrTxrDeq:100},t.registerNodeShapes(),t.registerArrowShapes(),t.registerCalculationListeners(),t.load()},s.notify=function(e){var t,r=this;if(!this.destroyed){t=n.array(e.type)?e.type:[e.type];for(var i={},a=0;a<t.length;a++){var o=t[a];i[o]=!0}if(i.destroy)return void r.destroy();(i.add||i.remove||i.load||i.style)&&r.updateCachedZSortedEles(),i.viewport&&r.redrawHint("select",!0),(i.load||i.resize)&&(r.invalidateContainerClientCoordsCache(),r.matchCanvasSize(r.container)),r.redrawHint("eles",!0),r.redrawHint("drag",!0),this.startRenderLoop(),this.redraw()}},s.destroy=function(){var e=this;e.destroyed=!0,e.cy.stopAnimationLoop();for(var t=0;t<e.bindings.length;t++){var r=e.bindings[t],n=r,i=n.target;(i.off||i.removeEventListener).apply(i,n.args)}if(e.bindings=[],e.beforeRenderCallbacks=[],e.onUpdateEleCalcsFns=[],e.removeObserver&&e.removeObserver.disconnect(),e.styleObserver&&e.styleObserver.disconnect(),e.labelCalcDiv)try{document.body.removeChild(e.labelCalcDiv)}catch(a){}},[e("./arrow-shapes"),e("./coord-ele-math"),e("./images"),e("./load-listeners"),e("./node-shapes"),e("./redraw")].forEach(function(e){i.extend(s,e)}),t.exports=o},{"../../../is":83,"../../../util":100,"./arrow-shapes":57,"./coord-ele-math":58,"./images":59,"./load-listeners":61,"./node-shapes":62,"./redraw":63}],61:[function(e,t,r){"use strict";var n=e("../../../is"),i=e("../../../util"),a=e("../../../math"),o=e("../../../event"),s={};s.registerBinding=function(e,t,r,n){var i=Array.prototype.slice.apply(arguments,[1]),a=this.binder(e);return a.on.apply(a,i)},s.binder=function(e){var t=this,r=function(){var r=arguments;return t.bindings.push({target:e,args:r}),(e.addEventListener||e.on).apply(e,r),this};return{on:r,addEventListener:r,addListener:r,bind:r}},s.nodeIsDraggable=function(e){return e&&e.isNode()&&!e.locked()&&e.grabbable()},s.nodeIsGrabbable=function(e){return this.nodeIsDraggable(e)&&0!==e.pstyle("opacity").value&&"visible"===e.pstyle("visibility").value&&"element"===e.pstyle("display").value},s.load=function(){var e=this,t=function(t,r,n,a){null==t&&(t=e.cy);for(var s=0;s<r.length;s++){var l=r[s],u=new o(n,i.extend({type:l},a));t.trigger(u)}},r=function(e){return e.shiftKey||e.metaKey||e.ctrlKey},s=function(t,r){var n=!0;if(e.cy.hasCompoundNodes()&&t&&t.isEdge())for(var i=0;r&&i<r.length;i++){var t=r[i];if(t.isNode()&&t.isParent()){n=!1;break}}else n=!0;return n},l=function(t){var r;if(t.addToList&&e.cy.hasCompoundNodes()){if(!t.addToList.hasId){t.addToList.hasId={};for(var n=0;n<t.addToList.length;n++){var i=t.addToList[n];t.addToList.hasId[i.id()]=!0}}r=t.addToList.hasId}return r||{}},u=function(e){e[0]._private.grabbed=!0},c=function(e){e[0]._private.grabbed=!1},d=function(e){e[0]._private.rscratch.inDragLayer=!0},h=function(e){e[0]._private.rscratch.inDragLayer=!1},p=function(e){e[0]._private.rscratch.isGrabTarget=!0},f=function(e){e[0]._private.rscratch.isGrabTarget=!1},v=function(e,t){var r=l(t);r[e.id()]||(t.addToList.push(e),r[e.id()]=!0,u(e))},g=function(e,t){if(e.cy().hasCompoundNodes()&&(null!=t.inDragLayer||null!=t.addToList)){var r=e.descendants();t.inDragLayer&&(r.forEach(d),r.connectedEdges().forEach(d)),t.addToList&&r.forEach(function(e){v(e,t)})}},y=function(t,r){r=r||{};var n=t.cy().hasCompoundNodes();r.inDragLayer&&(t.forEach(d),t.neighborhood().stdFilter(function(e){return!n||e.isEdge()}).forEach(d)),r.addToList&&t.forEach(function(e){v(e,r)}),g(t,r),x(t,{inDragLayer:r.inDragLayer}),e.updateCachedGrabbedEles()},m=y,b=function(t){t&&(t.hasId={},e.getCachedZSortedEles().forEach(function(e){c(e),h(e),f(e)}),e.updateCachedGrabbedEles())},x=function(e,t){if((null!=t.inDragLayer||null!=t.addToList)&&e.cy().hasCompoundNodes()){var r=e.ancestors().orphans();if(!r.same(e)){var n=r.descendants().spawnSelf().merge(r).unmerge(e).unmerge(e.descendants()),i=n.connectedEdges();t.inDragLayer&&(i.forEach(d),n.forEach(d)),t.addToList&&n.forEach(function(e){v(e,t)})}}},w="undefined"!=typeof MutationObserver;w?(e.removeObserver=new MutationObserver(function(t){for(var r=0;r<t.length;r++){var n=t[r],i=n.removedNodes;if(i)for(var a=0;a<i.length;a++){var o=i[a];if(o===e.container){e.destroy();break}}}}),e.container.parentNode&&e.removeObserver.observe(e.container.parentNode,{childList:!0})):e.registerBinding(e.container,"DOMNodeRemoved",function(t){e.destroy()});var E=i.debounce(function(){e.cy.invalidateSize(),e.invalidateContainerClientCoordsCache(),e.matchCanvasSize(e.container),e.redrawHint("eles",!0),e.redrawHint("drag",!0),e.redraw()},100);w&&(e.styleObserver=new MutationObserver(E),e.styleObserver.observe(e.container,{attributes:!0})),e.registerBinding(window,"resize",E);for(var _=function(t){e.registerBinding(t,"scroll",function(t){e.invalidateContainerClientCoordsCache()})},P=e.cy.container();_(P),P.parentNode;)P=P.parentNode;e.registerBinding(e.container,"contextmenu",function(e){e.preventDefault()});var S=function(){return 0!==e.selection[4]};e.registerBinding(e.container,"mousedown",function(r){r.preventDefault(),e.hoverData.capture=!0,e.hoverData.which=r.which;var n=e.cy,i=[r.clientX,r.clientY],a=e.projectIntoViewport(i[0],i[1]),s=e.selection,l=e.findNearestElements(a[0],a[1],!0,!1),u=l[0],c=e.dragData.possibleDragElements;e.hoverData.mdownPos=a,e.hoverData.mdownGPos=i;var d=function(){e.hoverData.tapholdCancelled=!1,clearTimeout(e.hoverData.tapholdTimeout),e.hoverData.tapholdTimeout=setTimeout(function(){if(!e.hoverData.tapholdCancelled){var t=e.hoverData.down;t?t.trigger(new o(r,{type:"taphold",cyPosition:{x:a[0],y:a[1]}})):n.trigger(new o(r,{type:"taphold",cyPosition:{x:a[0],y:a[1]}}))}},e.tapholdDuration)};if(3==r.which){e.hoverData.cxtStarted=!0;var h=new o(r,{type:"cxttapstart",cyPosition:{x:a[0],y:a[1]}});u?(u.activate(),u.trigger(h),e.hoverData.down=u):n.trigger(h),e.hoverData.downTime=(new Date).getTime(),e.hoverData.cxtDragged=!1}else if(1==r.which){if(u&&u.activate(),null!=u&&e.nodeIsGrabbable(u)){var f=new o(r,{type:"grab",cyPosition:{x:a[0],y:a[1]}});if(p(u),u.selected()){if(u.selected()){c=e.dragData.possibleDragElements=[];var v=n.$(function(){return this.isNode()&&this.selected()&&e.nodeIsGrabbable(this)});y(v,{addToList:c}),u.trigger(f)}}else c=e.dragData.possibleDragElements=[],m(u,{addToList:c}),u.trigger(f);e.redrawHint("eles",!0),e.redrawHint("drag",!0)}e.hoverData.down=u,e.hoverData.downs=l,e.hoverData.downTime=(new Date).getTime(),t(u,["mousedown","tapstart","vmousedown"],r,{cyPosition:{x:a[0],y:a[1]}}),null==u?(s[4]=1,e.data.bgActivePosistion={x:a[0],y:a[1]},e.redrawHint("select",!0),e.redraw()):u.isEdge()&&(s[4]=1),d()}s[0]=s[2]=a[0],s[1]=s[3]=a[1]},!1),e.registerBinding(window,"mousemove",function(i){var l=!1,u=e.hoverData.capture;if(!u){var c=e.findContainerClientCoords();if(!(i.clientX>c[0]&&i.clientX<c[0]+e.canvasWidth&&i.clientY>c[1]&&i.clientY<c[1]+e.canvasHeight))return;for(var d=e.container,h=i.target,p=h.parentNode,f=!1;p;){if(p===d){f=!0;break}p=p.parentNode}if(!f)return}var v=e.cy,g=v.zoom(),m=[i.clientX,i.clientY],b=e.projectIntoViewport(m[0],m[1]),x=e.hoverData.mdownPos,w=e.hoverData.mdownGPos,E=e.selection,_=null;e.hoverData.draggingEles||e.hoverData.dragging||e.hoverData.selecting||(_=e.findNearestElement(b[0],b[1],!0,!1));var P,S=e.hoverData.last,k=e.hoverData.down,T=[b[0]-E[2],b[1]-E[3]],D=e.dragData.possibleDragElements;if(w){var C=m[0]-w[0],M=C*C,N=m[1]-w[1],B=N*N,z=M+B;P=z>=e.desktopTapThreshold2}var I=r(i);P&&(e.hoverData.tapholdCancelled=!0);var L=function(){var t=e.hoverData.dragDelta=e.hoverData.dragDelta||[];0===t.length?(t.push(T[0]),t.push(T[1])):(t[0]+=T[0],t[1]+=T[1])};if(l=!0,t(_,["mousemove","vmousemove","tapdrag"],i,{cyPosition:{x:b[0],y:b[1]}}),3===e.hoverData.which){if(P){var O=new o(i,{type:"cxtdrag",cyPosition:{x:b[0],y:b[1]}});k?k.trigger(O):v.trigger(O),e.hoverData.cxtDragged=!0,e.hoverData.cxtOver&&_===e.hoverData.cxtOver||(e.hoverData.cxtOver&&e.hoverData.cxtOver.trigger(new o(i,{type:"cxtdragout",cyPosition:{x:b[0],y:b[1]}})),e.hoverData.cxtOver=_,_&&_.trigger(new o(i,{type:"cxtdragover",cyPosition:{x:b[0],y:b[1]}})))}}else if(e.hoverData.dragging){if(l=!0,v.panningEnabled()&&v.userPanningEnabled()){var A;if(e.hoverData.justStartedPan){var R=e.hoverData.mdownPos;A={x:(b[0]-R[0])*g,y:(b[1]-R[1])*g},e.hoverData.justStartedPan=!1}else A={x:T[0]*g,y:T[1]*g};v.panBy(A),e.hoverData.dragged=!0}b=e.projectIntoViewport(i.clientX,i.clientY)}else if(1!=E[4]||null!=k&&!k.isEdge()){if(k&&k.isEdge()&&k.active()&&k.unactivate(),k&&k.grabbed()||_==S||(S&&t(S,["mouseout","tapdragout"],i,{cyPosition:{x:b[0],y:b[1]}}),_&&t(_,["mouseover","tapdragover"],i,{cyPosition:{x:b[0],y:b[1]}}),e.hoverData.last=_),k&&e.nodeIsDraggable(k))if(P){var q=!e.dragData.didDrag;q&&e.redrawHint("eles",!0),e.dragData.didDrag=!0;var V=[];e.hoverData.draggingEles||y(v.collection(D),{inDragLayer:!0});for(var F=0;F<D.length;F++){var j=D[F];if(e.nodeIsDraggable(j)&&j.grabbed()){var X=j._private.position;
if(V.push(j),n.number(T[0])&&n.number(T[1])){var Y=!j.isParent();if(Y&&(X.x+=T[0],X.y+=T[1]),q){var W=e.hoverData.dragDelta;Y&&W&&n.number(W[0])&&n.number(W[1])&&(X.x+=W[0],X.y+=W[1])}}}}e.hoverData.draggingEles=!0;var $=v.collection(V);$.updateCompoundBounds(),$.trigger("position drag"),e.redrawHint("drag",!0),e.redraw()}else L();l=!0}else if(P){if(e.hoverData.dragging||!v.boxSelectionEnabled()||!I&&v.panningEnabled()&&v.userPanningEnabled()){if(!e.hoverData.selecting&&v.panningEnabled()&&v.userPanningEnabled()){var H=s(k,e.hoverData.downs);H&&(e.hoverData.dragging=!0,e.hoverData.justStartedPan=!0,E[4]=0,e.data.bgActivePosistion=a.array2point(x),e.redrawHint("select",!0),e.redraw())}}else e.data.bgActivePosistion=void 0,e.hoverData.selecting||v.trigger("boxstart"),e.hoverData.selecting=!0,e.redrawHint("select",!0),e.redraw();k&&k.isEdge()&&k.active()&&k.unactivate()}return E[2]=b[0],E[3]=b[1],l?(i.stopPropagation&&i.stopPropagation(),i.preventDefault&&i.preventDefault(),!1):void 0},!1),e.registerBinding(window,"mouseup",function(n){var i=e.hoverData.capture;if(i){e.hoverData.capture=!1;var a=e.cy,s=e.projectIntoViewport(n.clientX,n.clientY),l=e.selection,u=e.findNearestElement(s[0],s[1],!0,!1),c=e.dragData.possibleDragElements,d=e.hoverData.down,h=r(n);if(e.data.bgActivePosistion&&(e.redrawHint("select",!0),e.redraw()),e.hoverData.tapholdCancelled=!0,e.data.bgActivePosistion=void 0,d&&d.unactivate(),3===e.hoverData.which){var p=new o(n,{type:"cxttapend",cyPosition:{x:s[0],y:s[1]}});if(d?d.trigger(p):a.trigger(p),!e.hoverData.cxtDragged){var f=new o(n,{type:"cxttap",cyPosition:{x:s[0],y:s[1]}});d?d.trigger(f):a.trigger(f)}e.hoverData.cxtDragged=!1,e.hoverData.which=null}else if(1===e.hoverData.which){if(null!=d||e.dragData.didDrag||e.hoverData.selecting||e.hoverData.dragged||r(n)||(a.$(function(){return this.selected()}).unselect(),c.length>0&&e.redrawHint("eles",!0),e.dragData.possibleDragElements=c=[]),t(u,["mouseup","tapend","vmouseup"],n,{cyPosition:{x:s[0],y:s[1]}}),e.dragData.didDrag||e.hoverData.dragged||e.hoverData.selecting||t(d,["click","tap","vclick"],n,{cyPosition:{x:s[0],y:s[1]}}),u!=d||e.dragData.didDrag||e.hoverData.selecting||null!=u&&u._private.selectable&&(e.hoverData.dragging||("additive"===a.selectionType()||h?u.selected()?u.unselect():u.select():h||(a.$(":selected").unmerge(u).unselect(),u.select())),e.redrawHint("eles",!0)),e.hoverData.selecting){var v=a.collection(e.getAllInBox(l[0],l[1],l[2],l[3]));e.redrawHint("select",!0),v.length>0&&e.redrawHint("eles",!0),a.trigger("boxend");var g=function(e){return e.selectable()&&!e.selected()};"additive"===a.selectionType()?v.trigger("box").stdFilter(g).select().trigger("boxselect"):(h||a.$(":selected").unmerge(v).unselect(),v.trigger("box").stdFilter(g).select().trigger("boxselect")),e.redraw()}if(e.hoverData.dragging&&(e.hoverData.dragging=!1,e.redrawHint("select",!0),e.redrawHint("eles",!0),e.redraw()),!l[4]){e.redrawHint("drag",!0),e.redrawHint("eles",!0);var y=d&&d.grabbed();b(c),y&&d.trigger("free")}}l[4]=0,e.hoverData.down=null,e.hoverData.cxtStarted=!1,e.hoverData.draggingEles=!1,e.hoverData.selecting=!1,e.dragData.didDrag=!1,e.hoverData.dragged=!1,e.hoverData.dragDelta=[],e.hoverData.mdownPos=null,e.hoverData.mdownGPos=null}},!1);var k=function(t){if(!e.scrollingPage){var r=e.cy,n=e.projectIntoViewport(t.clientX,t.clientY),i=[n[0]*r.zoom()+r.pan().x,n[1]*r.zoom()+r.pan().y];if(e.hoverData.draggingEles||e.hoverData.dragging||e.hoverData.cxtStarted||S())return void t.preventDefault();if(r.panningEnabled()&&r.userPanningEnabled()&&r.zoomingEnabled()&&r.userZoomingEnabled()){t.preventDefault(),e.data.wheelZooming=!0,clearTimeout(e.data.wheelTimeout),e.data.wheelTimeout=setTimeout(function(){e.data.wheelZooming=!1,e.redrawHint("eles",!0),e.redraw()},150);var a;a=null!=t.deltaY?t.deltaY/-250:null!=t.wheelDeltaY?t.wheelDeltaY/1e3:t.wheelDelta/1e3,a*=e.wheelSensitivity;var o=1===t.deltaMode;o&&(a*=33),r.zoom({level:r.zoom()*Math.pow(10,a),renderedPosition:{x:i[0],y:i[1]}})}}};e.registerBinding(e.container,"wheel",k,!0),e.registerBinding(window,"scroll",function(t){e.scrollingPage=!0,clearTimeout(e.scrollingPageTimeout),e.scrollingPageTimeout=setTimeout(function(){e.scrollingPage=!1},250)},!0),e.registerBinding(e.container,"mouseout",function(t){var r=e.projectIntoViewport(t.clientX,t.clientY);e.cy.trigger(new o(t,{type:"mouseout",cyPosition:{x:r[0],y:r[1]}}))},!1),e.registerBinding(e.container,"mouseover",function(t){var r=e.projectIntoViewport(t.clientX,t.clientY);e.cy.trigger(new o(t,{type:"mouseover",cyPosition:{x:r[0],y:r[1]}}))},!1);var T,D,C,M,N,B,z,I,L,O,A,R,q,V,F=function(e,t,r,n){return Math.sqrt((r-e)*(r-e)+(n-t)*(n-t))},j=function(e,t,r,n){return(r-e)*(r-e)+(n-t)*(n-t)};e.registerBinding(e.container,"touchstart",V=function(r){e.touchData.capture=!0,e.data.bgActivePosistion=void 0;var n=e.cy,i=e.touchData.now,a=e.touchData.earlier;if(r.touches[0]){var s=e.projectIntoViewport(r.touches[0].clientX,r.touches[0].clientY);i[0]=s[0],i[1]=s[1]}if(r.touches[1]){var s=e.projectIntoViewport(r.touches[1].clientX,r.touches[1].clientY);i[2]=s[0],i[3]=s[1]}if(r.touches[2]){var s=e.projectIntoViewport(r.touches[2].clientX,r.touches[2].clientY);i[4]=s[0],i[5]=s[1]}if(r.touches[1]){b(e.dragData.touchDragEles);var l=e.findContainerClientCoords();L=l[0],O=l[1],A=l[2],R=l[3],T=r.touches[0].clientX-L,D=r.touches[0].clientY-O,C=r.touches[1].clientX-L,M=r.touches[1].clientY-O,q=T>=0&&A>=T&&C>=0&&A>=C&&D>=0&&R>=D&&M>=0&&R>=M;var u=n.pan(),c=n.zoom();N=F(T,D,C,M),B=j(T,D,C,M),z=[(T+C)/2,(D+M)/2],I=[(z[0]-u.x)/c,(z[1]-u.y)/c];var d=200,h=d*d;if(h>B&&!r.touches[2]){var f=e.findNearestElement(i[0],i[1],!0,!0),v=e.findNearestElement(i[2],i[3],!0,!0);return f&&f.isNode()?(f.activate().trigger(new o(r,{type:"cxttapstart",cyPosition:{x:i[0],y:i[1]}})),e.touchData.start=f):v&&v.isNode()?(v.activate().trigger(new o(r,{type:"cxttapstart",cyPosition:{x:i[0],y:i[1]}})),e.touchData.start=v):(n.trigger(new o(r,{type:"cxttapstart",cyPosition:{x:i[0],y:i[1]}})),e.touchData.start=null),e.touchData.start&&(e.touchData.start._private.grabbed=!1),e.touchData.cxt=!0,e.touchData.cxtDragged=!1,e.data.bgActivePosistion=void 0,void e.redraw()}}if(r.touches[2]);else if(r.touches[1]);else if(r.touches[0]){var g=e.findNearestElements(i[0],i[1],!0,!0),x=g[0];if(null!=x&&(x.activate(),e.touchData.start=x,e.touchData.starts=g,e.nodeIsGrabbable(x))){var w=e.dragData.touchDragEles=[];if(e.redrawHint("eles",!0),e.redrawHint("drag",!0),x.selected()){var E=n.$(function(){return this.selected()&&e.nodeIsGrabbable(this)});y(E,{addToList:w})}else m(x,{addToList:w});p(x),x.trigger(new o(r,{type:"grab",cyPosition:{x:i[0],y:i[1]}}))}t(x,["touchstart","tapstart","vmousedown"],r,{cyPosition:{x:i[0],y:i[1]}}),null==x&&(e.data.bgActivePosistion={x:s[0],y:s[1]},e.redrawHint("select",!0),e.redraw()),e.touchData.startPosition=[];for(var _=0;_<i.length;_++)a[_]=i[_],e.touchData.startPosition[_]=i[_];e.touchData.startGPosition=[r.touches[0].clientX,r.touches[0].clientY],e.touchData.singleTouchMoved=!1,e.touchData.singleTouchStartTime=+new Date,clearTimeout(e.touchData.tapholdTimeout),e.touchData.tapholdTimeout=setTimeout(function(){e.touchData.singleTouchMoved!==!1||e.pinching||e.touchData.selecting||(t(e.touchData.start,["taphold"],r,{cyPosition:{x:i[0],y:i[1]}}),e.touchData.start||n.$(":selected").unselect())},e.tapholdDuration)}},!1);var X;e.registerBinding(window,"touchmove",X=function(r){var i=e.selection,l=e.touchData.capture,u=e.cy,c=e.touchData.now,d=e.touchData.earlier,h=u.zoom();if(r.touches[0]){var p=e.projectIntoViewport(r.touches[0].clientX,r.touches[0].clientY);c[0]=p[0],c[1]=p[1]}if(r.touches[1]){var p=e.projectIntoViewport(r.touches[1].clientX,r.touches[1].clientY);c[2]=p[0],c[3]=p[1]}if(r.touches[2]){var p=e.projectIntoViewport(r.touches[2].clientX,r.touches[2].clientY);c[4]=p[0],c[5]=p[1]}var f;if(l&&r.touches[0]){for(var v=[],g=0;g<c.length;g++)v[g]=c[g]-d[g];var m=e.touchData.startGPosition,x=r.touches[0].clientX-m[0],w=x*x,E=r.touches[0].clientY-m[1],_=E*E,P=w+_;f=P>=e.touchTapThreshold2}if(l&&e.touchData.cxt){r.preventDefault();var S=r.touches[0].clientX-L,k=r.touches[0].clientY-O,z=r.touches[1].clientX-L,A=r.touches[1].clientY-O,R=j(S,k,z,A),V=R/B,X=150,Y=X*X,W=1.5,$=W*W;if(V>=$||R>=Y){e.touchData.cxt=!1,e.touchData.start&&(e.touchData.start.unactivate(),e.touchData.start=null),e.data.bgActivePosistion=void 0,e.redrawHint("select",!0);var H=new o(r,{type:"cxttapend",cyPosition:{x:c[0],y:c[1]}});e.touchData.start?e.touchData.start.trigger(H):u.trigger(H)}}if(l&&e.touchData.cxt){var H=new o(r,{type:"cxtdrag",cyPosition:{x:c[0],y:c[1]}});e.data.bgActivePosistion=void 0,e.redrawHint("select",!0),e.touchData.start?e.touchData.start.trigger(H):u.trigger(H),e.touchData.start&&(e.touchData.start._private.grabbed=!1),e.touchData.cxtDragged=!0;var U=e.findNearestElement(c[0],c[1],!0,!0);e.touchData.cxtOver&&U===e.touchData.cxtOver||(e.touchData.cxtOver&&e.touchData.cxtOver.trigger(new o(r,{type:"cxtdragout",cyPosition:{x:c[0],y:c[1]}})),e.touchData.cxtOver=U,U&&U.trigger(new o(r,{type:"cxtdragover",cyPosition:{x:c[0],y:c[1]}})))}else if(l&&r.touches[2]&&u.boxSelectionEnabled())r.preventDefault(),e.data.bgActivePosistion=void 0,this.lastThreeTouch=+new Date,e.touchData.selecting||u.trigger("boxstart"),e.touchData.selecting=!0,e.redrawHint("select",!0),i&&0!==i.length&&void 0!==i[0]?(i[2]=(c[0]+c[2]+c[4])/3,i[3]=(c[1]+c[3]+c[5])/3):(i[0]=(c[0]+c[2]+c[4])/3,i[1]=(c[1]+c[3]+c[5])/3,i[2]=(c[0]+c[2]+c[4])/3+1,i[3]=(c[1]+c[3]+c[5])/3+1),i[4]=1,e.touchData.selecting=!0,e.redraw();else if(l&&r.touches[1]&&u.zoomingEnabled()&&u.panningEnabled()&&u.userZoomingEnabled()&&u.userPanningEnabled()){r.preventDefault(),e.data.bgActivePosistion=void 0,e.redrawHint("select",!0);var Z=e.dragData.touchDragEles;if(Z){e.redrawHint("drag",!0);for(var G=0;G<Z.length;G++)Z[G]._private.grabbed=!1,Z[G]._private.rscratch.inDragLayer=!1}var S=r.touches[0].clientX-L,k=r.touches[0].clientY-O,z=r.touches[1].clientX-L,A=r.touches[1].clientY-O,Q=F(S,k,z,A),K=Q/N;if(1!=K&&q){var J=S-T,ee=k-D,te=z-C,re=A-M,ne=(J+te)/2,ie=(ee+re)/2,ae=u.zoom(),oe=ae*K,se=u.pan(),le=I[0]*ae+se.x,ue=I[1]*ae+se.y,ce={x:-oe/ae*(le-se.x-ne)+le,y:-oe/ae*(ue-se.y-ie)+ue};if(e.touchData.start){var Z=e.dragData.touchDragEles;b(Z),e.redrawHint("drag",!0),e.redrawHint("eles",!0),e.touchData.start.trigger("free").unactivate()}u.viewport({zoom:oe,pan:ce,cancelOnFailedZoom:!0}),N=Q,T=S,D=k,C=z,M=A,e.pinching=!0}if(r.touches[0]){var p=e.projectIntoViewport(r.touches[0].clientX,r.touches[0].clientY);c[0]=p[0],c[1]=p[1]}if(r.touches[1]){var p=e.projectIntoViewport(r.touches[1].clientX,r.touches[1].clientY);c[2]=p[0],c[3]=p[1]}if(r.touches[2]){var p=e.projectIntoViewport(r.touches[2].clientX,r.touches[2].clientY);c[4]=p[0],c[5]=p[1]}}else if(r.touches[0]){var U,de=e.touchData.start,he=e.touchData.last;if(e.hoverData.draggingEles||e.swipePanning||(U=e.findNearestElement(c[0],c[1],!0,!0)),l&&null!=de&&r.preventDefault(),l&&null!=de&&e.nodeIsDraggable(de))if(f){var Z=e.dragData.touchDragEles,pe=!e.dragData.didDrag;pe&&y(u.collection(Z),{inDragLayer:!0});for(var fe=0;fe<Z.length;fe++){var ve=Z[fe];if(e.nodeIsDraggable(ve)&&ve.grabbed()){e.dragData.didDrag=!0;var ge=ve._private.position,ye=!ve.isParent();if(ye&&n.number(v[0])&&n.number(v[1])&&(ge.x+=v[0],ge.y+=v[1]),pe){e.redrawHint("eles",!0);var me=e.touchData.dragDelta;ye&&me&&n.number(me[0])&&n.number(me[1])&&(ge.x+=me[0],ge.y+=me[1])}}}var be=u.collection(Z);be.updateCompoundBounds(),be.trigger("position drag"),e.hoverData.draggingEles=!0,e.redrawHint("drag",!0),e.touchData.startPosition[0]==d[0]&&e.touchData.startPosition[1]==d[1]&&e.redrawHint("eles",!0),e.redraw()}else{var me=e.touchData.dragDelta=e.touchData.dragDelta||[];0===me.length?(me.push(v[0]),me.push(v[1])):(me[0]+=v[0],me[1]+=v[1])}if(t(de||U,["touchmove","tapdrag","vmousemove"],r,{cyPosition:{x:c[0],y:c[1]}}),de&&de.grabbed()||U==he||(he&&he.trigger(new o(r,{type:"tapdragout",cyPosition:{x:c[0],y:c[1]}})),U&&U.trigger(new o(r,{type:"tapdragover",cyPosition:{x:c[0],y:c[1]}}))),e.touchData.last=U,l)for(var G=0;G<c.length;G++)c[G]&&e.touchData.startPosition[G]&&f&&(e.touchData.singleTouchMoved=!0);if(l&&(null==de||de.isEdge())&&u.panningEnabled()&&u.userPanningEnabled()){var xe=s(de,e.touchData.starts);xe&&(r.preventDefault(),e.swipePanning?u.panBy({x:v[0]*h,y:v[1]*h}):f&&(e.swipePanning=!0,u.panBy({x:x*h,y:E*h}),de&&(de.unactivate(),e.data.bgActivePosistion||(e.data.bgActivePosistion=a.array2point(e.touchData.startPosition)),e.redrawHint("select",!0),e.touchData.start=null)));var p=e.projectIntoViewport(r.touches[0].clientX,r.touches[0].clientY);c[0]=p[0],c[1]=p[1]}}for(var g=0;g<c.length;g++)d[g]=c[g]},!1);var Y;e.registerBinding(window,"touchcancel",Y=function(t){var r=e.touchData.start;e.touchData.capture=!1,r&&r.unactivate()});var W;if(e.registerBinding(window,"touchend",W=function(r){var n=e.touchData.start,i=e.touchData.capture;if(i){e.touchData.capture=!1,r.preventDefault();var a=e.selection;e.swipePanning=!1,e.hoverData.draggingEles=!1;var s=e.cy,l=s.zoom(),u=e.touchData.now,c=e.touchData.earlier;if(r.touches[0]){var d=e.projectIntoViewport(r.touches[0].clientX,r.touches[0].clientY);u[0]=d[0],u[1]=d[1]}if(r.touches[1]){var d=e.projectIntoViewport(r.touches[1].clientX,r.touches[1].clientY);u[2]=d[0],u[3]=d[1]}if(r.touches[2]){var d=e.projectIntoViewport(r.touches[2].clientX,r.touches[2].clientY);u[4]=d[0],u[5]=d[1]}n&&n.unactivate();var h;if(e.touchData.cxt){if(h=new o(r,{type:"cxttapend",cyPosition:{x:u[0],y:u[1]}}),n?n.trigger(h):s.trigger(h),!e.touchData.cxtDragged){var p=new o(r,{type:"cxttap",cyPosition:{x:u[0],y:u[1]}});n?n.trigger(p):s.trigger(p)}return e.touchData.start&&(e.touchData.start._private.grabbed=!1),e.touchData.cxt=!1,e.touchData.start=null,void e.redraw()}if(!r.touches[2]&&s.boxSelectionEnabled()&&e.touchData.selecting){e.touchData.selecting=!1;var f=s.collection(e.getAllInBox(a[0],a[1],a[2],a[3]));a[0]=void 0,a[1]=void 0,a[2]=void 0,a[3]=void 0,a[4]=0,e.redrawHint("select",!0),s.trigger("boxend");var v=function(e){return e.selectable()&&!e.selected()};f.trigger("box").stdFilter(v).select().trigger("boxselect"),f.nonempty()&&e.redrawHint("eles",!0),e.redraw()}if(null!=n&&n.unactivate(),r.touches[2])e.data.bgActivePosistion=void 0,e.redrawHint("select",!0);else if(r.touches[1]);else if(r.touches[0]);else if(!r.touches[0]){e.data.bgActivePosistion=void 0,e.redrawHint("select",!0);var g=e.dragData.touchDragEles;if(null!=n){var y=n._private.grabbed;b(g),e.redrawHint("drag",!0),e.redrawHint("eles",!0),y&&n.trigger("free"),t(n,["touchend","tapend","vmouseup","tapdragout"],r,{cyPosition:{x:u[0],y:u[1]}}),n.unactivate(),e.touchData.start=null}else{var m=e.findNearestElement(u[0],u[1],!0,!0);t(m,["touchend","tapend","vmouseup","tapdragout"],r,{cyPosition:{x:u[0],y:u[1]}})}var x=e.touchData.startPosition[0]-u[0],w=x*x,E=e.touchData.startPosition[1]-u[1],_=E*E,P=w+_,S=P*l*l;null!=n&&!e.dragData.didDrag&&n._private.selectable&&S<e.touchTapThreshold2&&!e.pinching&&("single"===s.selectionType()?(s.$(":selected").unmerge(n).unselect(),n.select()):n.selected()?n.unselect():n.select(),e.redrawHint("eles",!0)),e.touchData.singleTouchMoved||t(n,["tap","vclick"],r,{cyPosition:{x:u[0],y:u[1]}}),e.touchData.singleTouchMoved=!0}for(var k=0;k<u.length;k++)c[k]=u[k];e.dragData.didDrag=!1,0===r.touches.length&&(e.touchData.dragDelta=[],e.touchData.startPosition=null,e.touchData.startGPosition=null),r.touches.length<2&&(e.pinching=!1,e.redrawHint("eles",!0),e.redraw())}},!1),"undefined"==typeof TouchEvent){var $=[],H=function(e){return{clientX:e.clientX,clientY:e.clientY,force:1,identifier:e.pointerId,pageX:e.pageX,pageY:e.pageY,radiusX:e.width/2,radiusY:e.height/2,screenX:e.screenX,screenY:e.screenY,target:e.target}},U=function(e){return{event:e,touch:H(e)}},Z=function(e){$.push(U(e))},G=function(e){for(var t=0;t<$.length;t++){var r=$[t];if(r.event.pointerId===e.pointerId)return void $.splice(t,1)}},Q=function(e){var t=$.filter(function(t){return t.event.pointerId===e.pointerId})[0];t.event=e,t.touch=H(e)},K=function(e){e.touches=$.map(function(e){return e.touch})};e.registerBinding(e.container,"pointerdown",function(e){"mouse"!==e.pointerType&&(e.preventDefault(),Z(e),K(e),V(e))}),e.registerBinding(e.container,"pointerup",function(e){"mouse"!==e.pointerType&&(G(e),K(e),W(e))}),e.registerBinding(e.container,"pointercancel",function(e){"mouse"!==e.pointerType&&(G(e),K(e),Y(e))}),e.registerBinding(e.container,"pointermove",function(e){"mouse"!==e.pointerType&&(e.preventDefault(),Q(e),K(e),X(e))})}},t.exports=s},{"../../../event":45,"../../../is":83,"../../../math":85,"../../../util":100}],62:[function(e,t,r){"use strict";var n=e("../../../math"),i={};i.generatePolygon=function(e,t){return this.nodeShapes[e]={renderer:this,name:e,points:t,draw:function(e,t,r,n,i){this.renderer.nodeShapeImpl("polygon",e,t,r,n,i,this.points)},intersectLine:function(e,t,r,i,a,o,s){return n.polygonIntersectLine(a,o,this.points,e,t,r/2,i/2,s)},checkPoint:function(e,t,r,i,a,o,s){return n.pointInsidePolygon(e,t,this.points,o,s,i,a,[0,-1],r)}}},i.generateEllipse=function(){return this.nodeShapes.ellipse={renderer:this,name:"ellipse",draw:function(e,t,r,n,i){this.renderer.nodeShapeImpl(this.name,e,t,r,n,i)},intersectLine:function(e,t,r,i,a,o,s){return n.intersectLineEllipse(a,o,e,t,r/2+s,i/2+s)},checkPoint:function(e,t,r,n,i,a,o){return e-=a,t-=o,e/=n/2+r,t/=i/2+r,1>=e*e+t*t}}},i.generateRoundRectangle=function(){return this.nodeShapes.roundrectangle={renderer:this,name:"roundrectangle",points:n.generateUnitNgonPointsFitToSquare(4,0),draw:function(e,t,r,n,i){this.renderer.nodeShapeImpl(this.name,e,t,r,n,i)},intersectLine:function(e,t,r,i,a,o,s){return n.roundRectangleIntersectLine(a,o,e,t,r,i,s)},checkPoint:function(e,t,r,i,a,o,s){var l=n.getRoundRectangleRadius(i,a);if(n.pointInsidePolygon(e,t,this.points,o,s,i,a-2*l,[0,-1],r))return!0;if(n.pointInsidePolygon(e,t,this.points,o,s,i-2*l,a,[0,-1],r))return!0;var u=function(e,t,r,n,i,a,o){return e-=r,t-=n,e/=i/2+o,t/=a/2+o,1>=e*e+t*t};return u(e,t,o-i/2+l,s-a/2+l,2*l,2*l,r)?!0:u(e,t,o+i/2-l,s-a/2+l,2*l,2*l,r)?!0:u(e,t,o+i/2-l,s+a/2-l,2*l,2*l,r)?!0:!!u(e,t,o-i/2+l,s+a/2-l,2*l,2*l,r)}}},i.registerNodeShapes=function(){var e=this.nodeShapes={},t=this;this.generateEllipse(),this.generatePolygon("triangle",n.generateUnitNgonPointsFitToSquare(3,0)),this.generatePolygon("rectangle",n.generateUnitNgonPointsFitToSquare(4,0)),e.square=e.rectangle,this.generateRoundRectangle(),this.generatePolygon("diamond",[0,1,1,0,0,-1,-1,0]),this.generatePolygon("pentagon",n.generateUnitNgonPointsFitToSquare(5,0)),this.generatePolygon("hexagon",n.generateUnitNgonPointsFitToSquare(6,0)),this.generatePolygon("heptagon",n.generateUnitNgonPointsFitToSquare(7,0)),this.generatePolygon("octagon",n.generateUnitNgonPointsFitToSquare(8,0));var r=new Array(20),i=n.generateUnitNgonPoints(5,0),a=n.generateUnitNgonPoints(5,Math.PI/5),o=.5*(3-Math.sqrt(5));o*=1.57;for(var s=0;s<a.length/2;s++)a[2*s]*=o,a[2*s+1]*=o;for(var s=0;5>s;s++)r[4*s]=i[2*s],r[4*s+1]=i[2*s+1],r[4*s+2]=a[2*s],r[4*s+3]=a[2*s+1];r=n.fitPolygonToSquare(r),this.generatePolygon("star",r),this.generatePolygon("vee",[-1,-1,0,-.333,1,-1,0,1]),this.generatePolygon("rhomboid",[-1,-1,.333,-1,1,1,-.333,1]),e.makePolygon=function(e){var r,n=e.join("$"),i="polygon-"+n;return(r=this[i])?r:t.generatePolygon(i,e)}},t.exports=i},{"../../../math":85}],63:[function(e,t,r){"use strict";var n=e("../../../util"),i={};i.timeToRender=function(){return this.redrawTotalTime/this.redrawCount},i.redraw=function(e){e=e||n.staticEmptyObject();var t=this;void 0===t.averageRedrawTime&&(t.averageRedrawTime=0),void 0===t.lastRedrawTime&&(t.lastRedrawTime=0),void 0===t.lastDrawTime&&(t.lastDrawTime=0),t.requestedFrame=!0,t.renderOptions=e},i.beforeRender=function(e,t){if(!this.destroyed){t=t||0;var r=this.beforeRenderCallbacks;r.push({fn:e,priority:t}),r.sort(function(e,t){return t.priority-e.priority})}};var a=function(e,t,r){for(var n=e.beforeRenderCallbacks,i=0;i<n.length;i++)n[i].fn(t,r)};i.startRenderLoop=function(){var e=this;if(!e.renderLoopStarted){e.renderLoopStarted=!0;var t=function(r){if(!e.destroyed){if(e.requestedFrame&&!e.skipFrame){a(e,!0,r);var i=n.performanceNow();e.render(e.renderOptions);var o=e.lastDrawTime=n.performanceNow();void 0===e.averageRedrawTime&&(e.averageRedrawTime=o-i),void 0===e.redrawCount&&(e.redrawCount=0),e.redrawCount++,void 0===e.redrawTotalTime&&(e.redrawTotalTime=0);var s=o-i;e.redrawTotalTime+=s,e.lastRedrawTime=s,e.averageRedrawTime=e.averageRedrawTime/2+s/2,e.requestedFrame=!1}else a(e,!1,r);e.skipFrame=!1,n.requestAnimationFrame(t)}};n.requestAnimationFrame(t)}},t.exports=i},{"../../../util":100}],64:[function(e,t,r){"use strict";var n,i={};i.arrowShapeImpl=function(e){return(n||(n={polygon:function(e,t){for(var r=0;r<t.length;r++){var n=t[r];e.lineTo(n.x,n.y)}},"triangle-backcurve":function(e,t,r){for(var n,i=0;i<t.length;i++){var a=t[i];0===i&&(n=a),e.lineTo(a.x,a.y)}e.quadraticCurveTo(r.x,r.y,n.x,n.y)},"triangle-tee":function(e,t,r){e.beginPath&&e.beginPath();for(var n=t,i=0;i<n.length;i++){var a=n[i];e.lineTo(a.x,a.y)}e.closePath&&e.closePath(),e.beginPath&&e.beginPath();var o=r,s=r[0];e.moveTo(s.x,s.y);for(var i=0;i<o.length;i++){var a=o[i];e.lineTo(a.x,a.y)}e.closePath&&e.closePath()},circle:function(e,t,r,n){e.arc(t,r,n,0,2*Math.PI,!1)}}))[e]},t.exports=i},{}],65:[function(e,t,r){"use strict";var n={};n.drawEdge=function(e,t,r,n,i){var a=t._private.rscratch,o=this.usePaths();if(!a.badLine&&!isNaN(a.allpts[0])&&t.visible()){var s;r&&(s=r,e.translate(-s.x1,-s.y1));var l=t.pstyle("overlay-padding").pfValue,u=t.pstyle("overlay-opacity").value,c=t.pstyle("overlay-color").value;if(i){if(0===u)return;this.strokeStyle(e,c[0],c[1],c[2],u),e.lineCap="round","self"!=a.edgeType||o||(e.lineCap="butt")}else{var d=t.pstyle("line-color").value;this.strokeStyle(e,d[0],d[1],d[2],t.pstyle("opacity").value),e.lineCap="butt"}e.lineJoin="round";var h=t.pstyle("width").pfValue+(i?2*l:0),p=i?"solid":t.pstyle("line-style").value;e.lineWidth=h;var f=t.pstyle("shadow-blur").pfValue,v=t.pstyle("shadow-opacity").value,g=t.pstyle("shadow-color").value,y=t.pstyle("shadow-offset-x").pfValue,m=t.pstyle("shadow-offset-y").pfValue;this.shadowStyle(e,g,i?0:v,f,y,m),this.drawEdgePath(t,e,a.allpts,p,h),this.drawArrowheads(e,t,i),this.shadowStyle(e,"transparent",0),i||this.drawEdge(e,t,!1,n,!0),this.drawElementText(e,t,n),r&&e.translate(s.x1,s.y1)}},n.drawEdgePath=function(e,t,r,n,i){var a,o=e._private.rscratch,s=t,l=!1,u=this.usePaths();if(u){var c=r.join("$"),d=o.pathCacheKey&&o.pathCacheKey===c;d?(a=t=o.pathCache,l=!0):(a=t=new Path2D,o.pathCacheKey=c,o.pathCache=a)}if(s.setLineDash)switch(n){case"dotted":s.setLineDash([1,1]);break;case"dashed":s.setLineDash([6,3]);break;case"solid":s.setLineDash([])}if(!l&&!o.badLine)switch(t.beginPath&&t.beginPath(),t.moveTo(r[0],r[1]),o.edgeType){case"bezier":case"self":case"compound":case"multibezier":for(var h=2;h+3<r.length;h+=4)t.quadraticCurveTo(r[h],r[h+1],r[h+2],r[h+3]);break;case"straight":case"segments":case"haystack":for(var h=2;h+1<r.length;h+=2)t.lineTo(r[h],r[h+1])}t=s,u?t.stroke(a):t.stroke(),t.setLineDash&&t.setLineDash([])},n.drawArrowheads=function(e,t,r){if(!r){var n=t._private.rscratch,i="haystack"===n.edgeType;i||this.drawArrowhead(e,t,"source",n.arrowStartX,n.arrowStartY,n.srcArrowAngle),this.drawArrowhead(e,t,"mid-target",n.midX,n.midY,n.midtgtArrowAngle),this.drawArrowhead(e,t,"mid-source",n.midX,n.midY,n.midsrcArrowAngle),i||this.drawArrowhead(e,t,"target",n.arrowEndX,n.arrowEndY,n.tgtArrowAngle)}},n.drawArrowhead=function(e,t,r,n,i,a){if(!(isNaN(n)||null==n||isNaN(i)||null==i||isNaN(a)||null==a)){var o=this,s=t.pstyle(r+"-arrow-shape").value;if("none"!==s){var l=e.globalCompositeOperation,u="hollow"===t.pstyle(r+"-arrow-fill").value?"both":"filled",c=t.pstyle(r+"-arrow-fill").value,d=t.pstyle("opacity").value;"half-triangle-overshot"===s&&(c="hollow",u="hollow"),1===d&&"hollow"!==c||(e.globalCompositeOperation="destination-out",o.fillStyle(e,255,255,255,1),o.strokeStyle(e,255,255,255,1),o.drawArrowShape(t,r,e,u,t.pstyle("width").pfValue,t.pstyle(r+"-arrow-shape").value,n,i,a),e.globalCompositeOperation=l);var h=t.pstyle(r+"-arrow-color").value;o.fillStyle(e,h[0],h[1],h[2],d),o.strokeStyle(e,h[0],h[1],h[2],d),o.drawArrowShape(t,r,e,c,t.pstyle("width").pfValue,t.pstyle(r+"-arrow-shape").value,n,i,a)}}},n.drawArrowShape=function(e,t,r,n,i,a,o,s,l){var u,c=this,d=this.usePaths(),h=e._private.rscratch,p=!1,f=r,v={x:o,y:s},g=this.getArrowWidth(i),y=c.arrowShapes[a];if(d){var m=g+"$"+a+"$"+l+"$"+o+"$"+s;h.arrowPathCacheKey=h.arrowPathCacheKey||{},h.arrowPathCache=h.arrowPathCache||{};var b=h.arrowPathCacheKey[t]===m;b?(u=r=h.arrowPathCache[t],p=!0):(u=r=new Path2D,h.arrowPathCacheKey[t]=m,h.arrowPathCache[t]=u)}r.beginPath&&r.beginPath(),p||y.draw(r,g,l,v),!y.leavePathOpen&&r.closePath&&r.closePath(),r=f,"filled"!==n&&"both"!==n||(d?r.fill(u):r.fill()),"hollow"!==n&&"both"!==n||(r.lineWidth=y.matchEdgeWidth?i:1,r.lineJoin="miter",d?r.stroke(u):r.stroke())},t.exports=n},{}],66:[function(e,t,r){"use strict";var n=e("../../../math"),i={};i.drawElement=function(e,t,r,n){var i=this;t.isNode()?i.drawNode(e,t,r,n):i.drawEdge(e,t,r,n)},i.drawCachedElement=function(e,t,r,i){var a=this,o=t.boundingBox();if(0!==o.w&&0!==o.h&&(!i||n.boundingBoxesIntersect(o,i))){var s=a.data.eleTxrCache.getElement(t,o,r);s?e.drawImage(s.texture.canvas,s.x,0,s.width,s.height,o.x1,o.y1,o.w,o.h):a.drawElement(e,t)}},i.drawElements=function(e,t){for(var r=this,n=0;n<t.length;n++){var i=t[n];r.drawElement(e,i)}},i.drawCachedElements=function(e,t,r,n){for(var i=this,a=0;a<t.length;a++){var o=t[a];i.drawCachedElement(e,o,r,n)}},i.drawCachedNodes=function(e,t,r,n){for(var i=this,a=0;a<t.length;a++){var o=t[a];o.isNode()&&i.drawCachedElement(e,o,r,n)}},i.drawLayeredElements=function(e,t,r,n){var i=this,a=i.data.lyrTxrCache.getLayers(t,r);if(a)for(var o=0;o<a.length;o++){var s=a[o],l=s.bb;0!==l.w&&0!==l.h&&e.drawImage(s.canvas,l.x1,l.y1,l.w,l.h)}else i.drawCachedElements(e,t,r,n)},t.exports=i},{"../../../math":85}],67:[function(e,t,r){"use strict";var n={};n.safeDrawImage=function(e,t,r,n,i,a,o,s,l,u){var c=this;try{e.drawImage(t,r,n,i,a,o,s,l,u)}catch(d){c.redrawHint("eles",!0),c.redrawHint("drag",!0),c.drawingImage=!0,c.redraw()}},n.drawInscribedImage=function(e,t,r){var n=this,i=r._private.position.x,a=r._private.position.y,o=r.pstyle("background-fit").value,s=r.pstyle("background-position-x"),l=r.pstyle("background-position-y"),u=r.pstyle("background-repeat").value,c=r.width(),d=r.height(),h=r._private.rscratch,p=r.pstyle("background-clip").value,f="node"===p,v=r.pstyle("background-image-opacity").value,g=t.width||t.cachedW,y=t.height||t.cachedH;null!=g&&null!=y||(document.body.appendChild(t),g=t.cachedW=t.width||t.offsetWidth,y=t.cachedH=t.height||t.offsetHeight,document.body.removeChild(t));var m=g,b=y,x=r.pstyle("background-width");"auto"!==x.value&&(m="%"===x.units?x.value/100*c:x.pfValue);var w=r.pstyle("background-height");if("auto"!==w.value&&(b="%"===w.units?w.value/100*d:w.pfValue),0!==m&&0!==b){if("contain"===o){var E=Math.min(c/m,d/b);m*=E,b*=E}else if("cover"===o){var E=Math.max(c/m,d/b);m*=E,b*=E}var _=i-c/2;_+="%"===s.units?(c-m)*s.value/100:s.pfValue;var P=a-d/2;P+="%"===l.units?(d-b)*l.value/100:l.pfValue,h.pathCache&&(_-=i,P-=a,i=0,a=0);var S=e.globalAlpha;if(e.globalAlpha=v,"no-repeat"===u)f&&(e.save(),h.pathCache?e.clip(h.pathCache):(n.nodeShapes[n.getNodeShape(r)].draw(e,i,a,c,d),e.clip())),n.safeDrawImage(e,t,0,0,g,y,_,P,m,b),f&&e.restore();else{var k=e.createPattern(t,u);e.fillStyle=k,n.nodeShapes[n.getNodeShape(r)].draw(e,i,a,c,d),e.translate(_,P),e.fill(),e.translate(-_,-P)}e.globalAlpha=S}},t.exports=n},{}],68:[function(e,t,r){"use strict";function n(e,t,r,n,i,a){var a=a||5;e.beginPath(),e.moveTo(t+a,r),e.lineTo(t+n-a,r),e.quadraticCurveTo(t+n,r,t+n,r+a),e.lineTo(t+n,r+i-a),e.quadraticCurveTo(t+n,r+i,t+n-a,r+i),e.lineTo(t+a,r+i),e.quadraticCurveTo(t,r+i,t,r+i-a),e.lineTo(t,r+a),e.quadraticCurveTo(t,r,t+a,r),e.closePath(),e.fill()}var i=e("../../../util"),a=e("../../../math"),o={};o.eleTextBiggerThanMin=function(e,t){if(!t){var r=e.cy().zoom(),n=this.getPixelRatio(),i=Math.ceil(a.log2(r*n));t=Math.pow(2,i)}var o=e.pstyle("font-size").pfValue*t,s=e.pstyle("min-zoomed-font-size").pfValue;return!(s>o)},o.drawElementText=function(e,t,r){var n=this;if(void 0===r){if(!n.eleTextBiggerThanMin(t))return}else if(!r)return;if(t.isNode()){var i=t.pstyle("label");if(!i||!i.value)return;var a=t.pstyle("text-halign").strValue;t.pstyle("text-valign").strValue;switch(a){case"left":e.textAlign="right";break;case"right":e.textAlign="left";break;default:e.textAlign="center"}e.textBaseline="bottom"}else{var i=t.pstyle("label"),o=t.pstyle("source-label"),s=t.pstyle("target-label");if(!(i&&i.value||o&&o.value||s&&s.value))return;e.textAlign="center",e.textBaseline="bottom"}n.drawText(e,t),t.isEdge()&&(n.drawText(e,t,"source"),n.drawText(e,t,"target"))},o.drawNodeText=o.drawEdgeText=o.drawElementText,o.getFontCache=function(e){var t;this.fontCaches=this.fontCaches||[];for(var r=0;r<this.fontCaches.length;r++)if(t=this.fontCaches[r],t.context===e)return t;return t={context:e},this.fontCaches.push(t),t},o.setupTextStyle=function(e,t){var r=t.effectiveOpacity(),n=t.pstyle("font-style").strValue,i=t.pstyle("font-size").pfValue+"px",a=t.pstyle("font-family").strValue,o=t.pstyle("font-weight").strValue,s=t.pstyle("text-opacity").value*t.pstyle("opacity").value*r,l=t.pstyle("text-outline-opacity").value*s,u=t.pstyle("color").value,c=t.pstyle("text-outline-color").value,d=t.pstyle("text-shadow-blur").pfValue,h=t.pstyle("text-shadow-opacity").value,p=t.pstyle("text-shadow-color").value,f=t.pstyle("text-shadow-offset-x").pfValue,v=t.pstyle("text-shadow-offset-y").pfValue,g=t._private.fontKey,y=this.getFontCache(e);y.key!==g&&(e.font=n+" "+o+" "+i+" "+a,y.key=g),e.lineJoin="round",this.fillStyle(e,u[0],u[1],u[2],s),this.strokeStyle(e,c[0],c[1],c[2],l),this.shadowStyle(e,p,h,d,f,v)},o.drawText=function(e,t,r){var a=t._private,o=a.rscratch,s=t.effectiveOpacity();if(0!==s&&0!==t.pstyle("text-opacity").value){var l=i.getPrefixedProperty(o,"labelX",r),u=i.getPrefixedProperty(o,"labelY",r),c=this.getLabelText(t,r);if(null!=c&&""!==c&&!isNaN(l)&&!isNaN(u)){this.setupTextStyle(e,t);var d=r?r+"-":"",h=i.getPrefixedProperty(o,"labelWidth",r),p=i.getPrefixedProperty(o,"labelHeight",r),f=i.getPrefixedProperty(o,"labelAngle",r),v=t.pstyle(d+"text-margin-x").pfValue,g=t.pstyle(d+"text-margin-y").pfValue,y=t.isEdge(),m=t.isNode(),b=t.pstyle("text-halign").value,x=t.pstyle("text-valign").value;y&&(b="center",x="center"),l+=v,u+=g;var w,E=t.pstyle("text-rotation");if(w="autorotate"===E.strValue?y?f:0:"none"===E.strValue?0:E.pfValue,0!==w){var _=l,P=u;e.translate(_,P),e.rotate(w),l=0,u=0}if(m){var S=t.pstyle("padding-left").pfValue,k=t.pstyle("padding-right").pfValue,T=t.pstyle("padding-top").pfValue,D=t.pstyle("padding-bottom").pfValue;l+=S/2,l-=k/2,u+=T/2,u-=D/2}switch(x){case"top":break;case"center":u+=p/2;break;case"bottom":u+=p}var C=t.pstyle("text-background-opacity").value,M=t.pstyle("text-border-opacity").value,N=t.pstyle("text-border-width").pfValue;if(C>0||N>0&&M>0){var B=l;switch(b){case"left":B-=h;break;case"center":B-=h/2;break;case"right":}var z=u-p;if(C>0){var I=e.fillStyle,L=t.pstyle("text-background-color").value;e.fillStyle="rgba("+L[0]+","+L[1]+","+L[2]+","+C*s+")";var O=t.pstyle("text-background-shape").strValue;"roundrectangle"==O?n(e,B,z,h,p,2):e.fillRect(B,z,h,p),e.fillStyle=I}if(N>0&&M>0){var A=e.strokeStyle,R=e.lineWidth,q=t.pstyle("text-border-color").value,V=t.pstyle("text-border-style").value;if(e.strokeStyle="rgba("+q[0]+","+q[1]+","+q[2]+","+M*s+")",e.lineWidth=N,e.setLineDash)switch(V){case"dotted":e.setLineDash([1,1]);break;case"dashed":e.setLineDash([4,2]);break;case"double":e.lineWidth=N/4,e.setLineDash([]);break;case"solid":e.setLineDash([])}if(e.strokeRect(B,z,h,p),"double"===V){
var F=N/2;e.strokeRect(B+F,z+F,h-2*F,p-2*F)}e.setLineDash&&e.setLineDash([]),e.lineWidth=R,e.strokeStyle=A}}var j=2*t.pstyle("text-outline-width").pfValue;if(j>0&&(e.lineWidth=j),"wrap"===t.pstyle("text-wrap").value){var X=o.labelWrapCachedLines,Y=p/X.length;switch(x){case"top":u-=(X.length-1)*Y;break;case"center":case"bottom":u-=(X.length-1)*Y}for(var W=0;W<X.length;W++)j>0&&e.strokeText(X[W],l,u),e.fillText(X[W],l,u),u+=Y}else j>0&&e.strokeText(c,l,u),e.fillText(c,l,u);0!==w&&(e.rotate(-w),e.translate(-_,-P)),this.shadowStyle(e,"transparent",0)}}},t.exports=o},{"../../../math":85,"../../../util":100}],69:[function(e,t,r){"use strict";var n=e("../../../is"),i={};i.drawNode=function(e,t,r,i){var a,o,s=this,l=t._private.rscratch,u=t._private,c=c||u.position;if(n.number(c.x)&&n.number(c.y)&&t.visible()){var d,h=t.effectiveOpacity(),p=this.usePaths(),f=!1;a=t.width()+t.pstyle("padding-left").pfValue+t.pstyle("padding-right").pfValue,o=t.height()+t.pstyle("padding-top").pfValue+t.pstyle("padding-bottom").pfValue,e.lineWidth=t.pstyle("border-width").pfValue;var v;r&&(v=r,e.translate(-v.x1,-v.y1));var g,y=t.pstyle("background-image"),m=y.value[2]||y.value[1];if(void 0!==m){g=this.getCachedImage(m,function(){t.trigger("background"),s.redrawHint("eles",!0),s.redrawHint("drag",!0),s.drawingImage=!0,s.redraw()});var b=u.backgrounding;u.backgrounding=!g.complete,b!==u.backgrounding&&t.updateStyle(!1)}var x=t.pstyle("background-color").value,w=t.pstyle("border-color").value,E=t.pstyle("border-style").value;this.fillStyle(e,x[0],x[1],x[2],t.pstyle("background-opacity").value*h),this.strokeStyle(e,w[0],w[1],w[2],t.pstyle("border-opacity").value*h);var _=t.pstyle("shadow-blur").pfValue,P=t.pstyle("shadow-opacity").value,S=t.pstyle("shadow-color").value,k=t.pstyle("shadow-offset-x").pfValue,T=t.pstyle("shadow-offset-y").pfValue;if(this.shadowStyle(e,S,P,_,k,T),e.lineJoin="miter",e.setLineDash)switch(E){case"dotted":e.setLineDash([1,1]);break;case"dashed":e.setLineDash([4,2]);break;case"solid":case"double":e.setLineDash([])}var D=t.pstyle("shape").strValue,C=t.pstyle("shape-polygon-points").pfValue;if(p){var M=D+"$"+a+"$"+o+("polygon"===D?"$"+C.join("$"):"");e.translate(c.x,c.y),l.pathCacheKey===M?(d=l.pathCache,f=!0):(d=new Path2D,l.pathCacheKey=M,l.pathCache=d)}if(!f){var N=c;p&&(N={x:0,y:0}),s.nodeShapes[this.getNodeShape(t)].draw(d||e,N.x,N.y,a,o)}p?e.fill(d):e.fill(),this.shadowStyle(e,"transparent",0),void 0!==m&&g.complete&&this.drawInscribedImage(e,g,t);var B=t.pstyle("background-blacken").value,z=t.pstyle("border-width").pfValue;if(this.hasPie(t)&&(this.drawPie(e,t,h),0===B&&0===z||p||s.nodeShapes[this.getNodeShape(t)].draw(e,c.x,c.y,a,o)),B>0?(this.fillStyle(e,0,0,0,B),p?e.fill(d):e.fill()):0>B&&(this.fillStyle(e,255,255,255,-B),p?e.fill(d):e.fill()),z>0&&(p?e.stroke(d):e.stroke(),"double"===E)){e.lineWidth=t.pstyle("border-width").pfValue/3;var I=e.globalCompositeOperation;e.globalCompositeOperation="destination-out",p?e.stroke(d):e.stroke(),e.globalCompositeOperation=I}p&&e.translate(-c.x,-c.y),e.setLineDash&&e.setLineDash([]),s.drawElementText(e,t,i);var L=t.pstyle("overlay-padding").pfValue,O=t.pstyle("overlay-opacity").value,A=t.pstyle("overlay-color").value;O>0&&(this.fillStyle(e,A[0],A[1],A[2],O),s.nodeShapes.roundrectangle.draw(e,t._private.position.x,t._private.position.y,a+2*L,o+2*L),e.fill()),r&&e.translate(v.x1,v.y1)}},i.hasPie=function(e){return e=e[0],e._private.hasPie},i.drawPie=function(e,t,r,n){t=t[0];var i=t._private,a=t.cy().style(),o=t.pstyle("pie-size"),s=t.width(),l=t.height(),n=n||i.position,u=n.x,c=n.y,d=Math.min(s,l)/2,h=0,p=this.usePaths();p&&(u=0,c=0),"%"===o.units?d=d*o.value/100:void 0!==o.pfValue&&(d=o.pfValue/2);for(var f=1;f<=a.pieBackgroundN;f++){var v=t.pstyle("pie-"+f+"-background-size").value,g=t.pstyle("pie-"+f+"-background-color").value,y=t.pstyle("pie-"+f+"-background-opacity").value*r,m=v/100;m+h>1&&(m=1-h);var b=1.5*Math.PI+2*Math.PI*h,x=2*Math.PI*m,w=b+x;0===v||h>=1||h+m>1||(e.beginPath(),e.moveTo(u,c),e.arc(u,c,d,b,w),e.closePath(),this.fillStyle(e,g[0],g[1],g[2],y),e.fill(),h+=m)}},t.exports=i},{"../../../is":83}],70:[function(e,t,r){"use strict";var n={},i=e("../../../util"),a=100;n.getPixelRatio=function(){var e=this.data.contexts[0];if(null!=this.forcedPixelRatio)return this.forcedPixelRatio;var t=e.backingStorePixelRatio||e.webkitBackingStorePixelRatio||e.mozBackingStorePixelRatio||e.msBackingStorePixelRatio||e.oBackingStorePixelRatio||e.backingStorePixelRatio||1;return(window.devicePixelRatio||1)/t},n.paintCache=function(e){for(var t,r=this.paintCaches=this.paintCaches||[],n=!0,i=0;i<r.length;i++)if(t=r[i],t.context===e){n=!1;break}return n&&(t={context:e},r.push(t)),t},n.fillStyle=function(e,t,r,n,i){e.fillStyle="rgba("+t+","+r+","+n+","+i+")"},n.strokeStyle=function(e,t,r,n,i){e.strokeStyle="rgba("+t+","+r+","+n+","+i+")"},n.shadowStyle=function(e,t,r,n,i,a){var o=this.cy.zoom();r>0?(e.shadowBlur=n*o,e.shadowColor="rgba("+t[0]+","+t[1]+","+t[2]+","+r+")",e.shadowOffsetX=i*o,e.shadowOffsetY=a*o):(e.shadowBlur=0,e.shadowColor="transparent",e.shadowOffsetX=0,e.shadowOffsetY=0)},n.matchCanvasSize=function(e){var t=this,r=t.data,n=e.clientWidth,i=e.clientHeight,a=t.getPixelRatio(),o=t.motionBlurPxRatio;e!==t.data.bufferCanvases[t.MOTIONBLUR_BUFFER_NODE]&&e!==t.data.bufferCanvases[t.MOTIONBLUR_BUFFER_DRAG]||(a=o);var s,l=n*a,u=i*a;if(l!==t.canvasWidth||u!==t.canvasHeight){t.fontCaches=null;var c=r.canvasContainer;c.style.width=n+"px",c.style.height=i+"px";for(var d=0;d<t.CANVAS_LAYERS;d++)s=r.canvases[d],s.width===l&&s.height===u||(s.width=l,s.height=u,s.style.width=n+"px",s.style.height=i+"px");for(var d=0;d<t.BUFFER_COUNT;d++)s=r.bufferCanvases[d],s.width===l&&s.height===u||(s.width=l,s.height=u,s.style.width=n+"px",s.style.height=i+"px");t.textureMult=1,1>=a&&(s=r.bufferCanvases[t.TEXTURE_BUFFER],t.textureMult=2,s.width=l*t.textureMult,s.height=u*t.textureMult),t.canvasWidth=l,t.canvasHeight=u}},n.renderTo=function(e,t,r,n){this.render({forcedContext:e,forcedZoom:t,forcedPan:r,drawAllLayers:!0,forcedPxRatio:n})},n.render=function(e){function t(e,t,r,n,i){var a=e.globalCompositeOperation;e.globalCompositeOperation="destination-out",c.fillStyle(e,255,255,255,c.motionBlurTransparency),e.fillRect(t,r,n,i),e.globalCompositeOperation=a}function r(e,r){var i,a,s,d;c.clearingMotionBlur||e!==p.bufferContexts[c.MOTIONBLUR_BUFFER_NODE]&&e!==p.bufferContexts[c.MOTIONBLUR_BUFFER_DRAG]?(i=k,a=P,s=c.canvasWidth,d=c.canvasHeight):(i={x:S.x*y,y:S.y*y},a=_*y,s=c.canvasWidth*y,d=c.canvasHeight*y),e.setTransform(1,0,0,1,0,0),"motionBlur"===r?t(e,0,0,s,d):n||void 0!==r&&!r||e.clearRect(0,0,s,d),o||(e.translate(i.x,i.y),e.scale(a,a)),u&&e.translate(u.x,u.y),l&&e.scale(l,l)}e=e||i.staticEmptyObject();var n=e.forcedContext,o=e.drawAllLayers,s=e.drawOnlyNodeLayer,l=e.forcedZoom,u=e.forcedPan,c=this,d=void 0===e.forcedPxRatio?this.getPixelRatio():e.forcedPxRatio,h=c.cy,p=c.data,f=p.canvasNeedsRedraw,v=c.textureOnViewport&&!n&&(c.pinching||c.hoverData.dragging||c.swipePanning||c.data.wheelZooming),g=void 0!==e.motionBlur?e.motionBlur:c.motionBlur,y=c.motionBlurPxRatio,m=h.hasCompoundNodes(),b=c.hoverData.draggingEles,x=!(!c.hoverData.selecting&&!c.touchData.selecting);g=g&&!n&&c.motionBlurEnabled&&!x;var w=g;n||(c.prevPxRatio!==d&&(c.invalidateContainerClientCoordsCache(),c.matchCanvasSize(c.container),c.redrawHint("eles",!0),c.redrawHint("drag",!0)),c.prevPxRatio=d),!n&&c.motionBlurTimeout&&clearTimeout(c.motionBlurTimeout),g&&(null==c.mbFrames&&(c.mbFrames=0),c.drawingImage||c.mbFrames++,c.mbFrames<3&&(w=!1),c.mbFrames>c.minMbLowQualFrames&&(c.motionBlurPxRatio=c.mbPxRBlurry)),c.clearingMotionBlur&&(c.motionBlurPxRatio=1),c.textureDrawLastFrame&&!v&&(f[c.NODE]=!0,f[c.SELECT_BOX]=!0);var E=h.style()._private.coreStyle,_=h.zoom(),P=void 0!==l?l:_,S=h.pan(),k={x:S.x,y:S.y},T={zoom:_,pan:{x:S.x,y:S.y}},D=c.prevViewport,C=void 0===D||T.zoom!==D.zoom||T.pan.x!==D.pan.x||T.pan.y!==D.pan.y;C||b&&!m||(c.motionBlurPxRatio=1),u&&(k=u),P*=d,k.x*=d,k.y*=d;var M=c.getCachedZSortedEles();if(v||(c.textureDrawLastFrame=!1),v){c.textureDrawLastFrame=!0;var N;if(!c.textureCache){c.textureCache={},N=c.textureCache.bb=h.mutableElements().boundingBox(),c.textureCache.texture=c.data.bufferCanvases[c.TEXTURE_BUFFER];var B=c.data.bufferContexts[c.TEXTURE_BUFFER];B.setTransform(1,0,0,1,0,0),B.clearRect(0,0,c.canvasWidth*c.textureMult,c.canvasHeight*c.textureMult),c.render({forcedContext:B,drawOnlyNodeLayer:!0,forcedPxRatio:d*c.textureMult});var T=c.textureCache.viewport={zoom:h.zoom(),pan:h.pan(),width:c.canvasWidth,height:c.canvasHeight};T.mpan={x:(0-T.pan.x)/T.zoom,y:(0-T.pan.y)/T.zoom}}f[c.DRAG]=!1,f[c.NODE]=!1;var z=p.contexts[c.NODE],I=c.textureCache.texture,T=c.textureCache.viewport;N=c.textureCache.bb,z.setTransform(1,0,0,1,0,0),g?t(z,0,0,T.width,T.height):z.clearRect(0,0,T.width,T.height);var L=E["outside-texture-bg-color"].value,O=E["outside-texture-bg-opacity"].value;c.fillStyle(z,L[0],L[1],L[2],O),z.fillRect(0,0,T.width,T.height);var _=h.zoom();r(z,!1),z.clearRect(T.mpan.x,T.mpan.y,T.width/T.zoom/d,T.height/T.zoom/d),z.drawImage(I,T.mpan.x,T.mpan.y,T.width/T.zoom/d,T.height/T.zoom/d)}else c.textureOnViewport&&!n&&(c.textureCache=null);var A=h.extent(),R=c.pinching||c.hoverData.dragging||c.swipePanning||c.data.wheelZooming||c.hoverData.draggingEles,q=c.hideEdgesOnViewport&&R,V=[];if(V[c.NODE]=!f[c.NODE]&&g&&!c.clearedForMotionBlur[c.NODE]||c.clearingMotionBlur,V[c.NODE]&&(c.clearedForMotionBlur[c.NODE]=!0),V[c.DRAG]=!f[c.DRAG]&&g&&!c.clearedForMotionBlur[c.DRAG]||c.clearingMotionBlur,V[c.DRAG]&&(c.clearedForMotionBlur[c.DRAG]=!0),f[c.NODE]||o||s||V[c.NODE]){var F=g&&!V[c.NODE]&&1!==y,z=n||(F?c.data.bufferContexts[c.MOTIONBLUR_BUFFER_NODE]:p.contexts[c.NODE]),j=g&&!F?"motionBlur":void 0;r(z,j),q?c.drawCachedNodes(z,M.nondrag,d,A):c.drawLayeredElements(z,M.nondrag,d,A),o||g||(f[c.NODE]=!1)}if(!s&&(f[c.DRAG]||o||V[c.DRAG])){var F=g&&!V[c.DRAG]&&1!==y,z=n||(F?c.data.bufferContexts[c.MOTIONBLUR_BUFFER_DRAG]:p.contexts[c.DRAG]);r(z,g&&!F?"motionBlur":void 0),q?c.drawCachedNodes(z,M.drag,d,A):c.drawCachedElements(z,M.drag,d,A),o||g||(f[c.DRAG]=!1)}if(c.showFps||!s&&f[c.SELECT_BOX]&&!o){var z=n||p.contexts[c.SELECT_BOX];if(r(z),1==c.selection[4]&&(c.hoverData.selecting||c.touchData.selecting)){var _=c.cy.zoom(),X=E["selection-box-border-width"].value/_;z.lineWidth=X,z.fillStyle="rgba("+E["selection-box-color"].value[0]+","+E["selection-box-color"].value[1]+","+E["selection-box-color"].value[2]+","+E["selection-box-opacity"].value+")",z.fillRect(c.selection[0],c.selection[1],c.selection[2]-c.selection[0],c.selection[3]-c.selection[1]),X>0&&(z.strokeStyle="rgba("+E["selection-box-border-color"].value[0]+","+E["selection-box-border-color"].value[1]+","+E["selection-box-border-color"].value[2]+","+E["selection-box-opacity"].value+")",z.strokeRect(c.selection[0],c.selection[1],c.selection[2]-c.selection[0],c.selection[3]-c.selection[1]))}if(p.bgActivePosistion&&!c.hoverData.selecting){var _=c.cy.zoom(),Y=p.bgActivePosistion;z.fillStyle="rgba("+E["active-bg-color"].value[0]+","+E["active-bg-color"].value[1]+","+E["active-bg-color"].value[2]+","+E["active-bg-opacity"].value+")",z.beginPath(),z.arc(Y.x,Y.y,E["active-bg-size"].pfValue/_,0,2*Math.PI),z.fill()}var W=c.lastRedrawTime;if(c.showFps&&W){W=Math.round(W);var $=Math.round(1e3/W);z.setTransform(1,0,0,1,0,0),z.fillStyle="rgba(255, 0, 0, 0.75)",z.strokeStyle="rgba(255, 0, 0, 0.75)",z.lineWidth=1,z.fillText("1 frame = "+W+" ms = "+$+" fps",0,20);var H=60;z.strokeRect(0,30,250,20),z.fillRect(0,30,250*Math.min($/H,1),20)}o||(f[c.SELECT_BOX]=!1)}if(g&&1!==y){var U=p.contexts[c.NODE],Z=c.data.bufferCanvases[c.MOTIONBLUR_BUFFER_NODE],G=p.contexts[c.DRAG],Q=c.data.bufferCanvases[c.MOTIONBLUR_BUFFER_DRAG],K=function(e,r,n){e.setTransform(1,0,0,1,0,0),n||!w?e.clearRect(0,0,c.canvasWidth,c.canvasHeight):t(e,0,0,c.canvasWidth,c.canvasHeight);var i=y;e.drawImage(r,0,0,c.canvasWidth*i,c.canvasHeight*i,0,0,c.canvasWidth,c.canvasHeight)};(f[c.NODE]||V[c.NODE])&&(K(U,Z,V[c.NODE]),f[c.NODE]=!1),(f[c.DRAG]||V[c.DRAG])&&(K(G,Q,V[c.DRAG]),f[c.DRAG]=!1)}c.prevViewport=T,c.clearingMotionBlur&&(c.clearingMotionBlur=!1,c.motionBlurCleared=!0,c.motionBlur=!0),g&&(c.motionBlurTimeout=setTimeout(function(){c.motionBlurTimeout=null,c.clearedForMotionBlur[c.NODE]=!1,c.clearedForMotionBlur[c.DRAG]=!1,c.motionBlur=!1,c.clearingMotionBlur=!v,c.mbFrames=0,f[c.NODE]=!0,f[c.DRAG]=!0,c.redraw()},a)),c.drawingImage=!1,n||c.initrender||(c.initrender=!0,h.trigger("initrender")),n||h.trigger("render")},t.exports=n},{"../../../util":100}],71:[function(e,t,r){"use strict";var n=e("../../../math"),i={};i.drawPolygonPath=function(e,t,r,n,i,a){var o=n/2,s=i/2;e.beginPath&&e.beginPath(),e.moveTo(t+o*a[0],r+s*a[1]);for(var l=1;l<a.length/2;l++)e.lineTo(t+o*a[2*l],r+s*a[2*l+1]);e.closePath()},i.drawRoundRectanglePath=function(e,t,r,i,a){var o=i/2,s=a/2,l=n.getRoundRectangleRadius(i,a);e.beginPath&&e.beginPath(),e.moveTo(t,r-s),e.arcTo(t+o,r-s,t+o,r,l),e.arcTo(t+o,r+s,t,r+s,l),e.arcTo(t-o,r+s,t-o,r,l),e.arcTo(t-o,r-s,t,r-s,l),e.lineTo(t,r-s),e.closePath()};for(var a=Math.sin(0),o=Math.cos(0),s={},l={},u=Math.PI/40,c=0*Math.PI;c<2*Math.PI;c+=u)s[c]=Math.sin(c),l[c]=Math.cos(c);i.drawEllipsePath=function(e,t,r,n,i){if(e.beginPath&&e.beginPath(),e.ellipse)e.ellipse(t,r,n/2,i/2,0,0,2*Math.PI);else for(var c,d,h=n/2,p=i/2,f=0*Math.PI;f<2*Math.PI;f+=u)c=t-h*s[f]*a+h*l[f]*o,d=r+p*l[f]*a+p*s[f]*o,0===f?e.moveTo(c,d):e.lineTo(c,d);e.closePath()},t.exports=i},{"../../../math":85}],72:[function(e,t,r){"use strict";var n=e("../../../math"),i=e("../../../util"),a=e("../../../heap"),o=e("./texture-cache-defs"),s=25,l=50,u=-4,c=2,d=3.99,h=8,p=1024,f=1024,v=1024,g=.5,y=.8,m=10,b=!1,x=!1,w=.15,E=.1,_=.9,P=.9,S=100,k=1,T={dequeue:"dequeue",downscale:"downscale",highQuality:"highQuality"},D=function(e){var t=this;t.renderer=e,t.onDequeues=[],t.setupDequeueing()},C=D.prototype;C.reasons=T,C.getTextureQueue=function(e){var t=this;return t.eleImgCaches=t.eleImgCaches||{},t.eleImgCaches[e]=t.eleImgCaches[e]||[]},C.getRetiredTextureQueue=function(e){var t=this,r=t.eleImgCaches.retired=t.eleImgCaches.retired||{},n=r[e]=r[e]||[];return n},C.getElementQueue=function(){var e=this,t=e.eleCacheQueue=e.eleCacheQueue||new a(function(e,t){return t.reqs-e.reqs});return t},C.getElementIdToQueue=function(){var e=this,t=e.eleIdToCacheQueue=e.eleIdToCacheQueue||{};return t},C.getElement=function(e,t,r,i,a){var o=this,p=this.renderer,g=e._private.rscratch,y=p.cy.zoom();if(0===t.w||0===t.h)return null;if(null==i&&(i=Math.ceil(n.log2(y*r))),u>i)i=u;else if(y>=d||i>c)return null;var m=Math.pow(2,i),w=t.h*m,E=t.w*m,_=g.imgCaches=g.imgCaches||{},P=_[i];if(P)return P;var S;if(S=s>=w?s:l>=w?l:Math.ceil(w/l)*l,w>v||E>f||!b&&e.isEdge()||!x&&e.isParent())return null;var k=o.getTextureQueue(S),D=k[k.length-2],C=function(){return o.recycleTexture(S,E)||o.addTexture(S,E)};D||(D=k[k.length-1]),D||(D=C()),D.width-D.usedWidth<E&&(D=C());for(var M,N=p.eleTextBiggerThanMin(e,m),B=function(e){return e&&e.scaledLabelShown===N},z=a&&a===T.dequeue,I=a&&a===T.highQuality,L=a&&a===T.downscale,O=i+1;c>=O;O++){var A=_[O];if(A){M=A;break}}var R=M&&M.level===i+1?M:null,q=function(){D.context.drawImage(R.texture.canvas,R.x,0,R.width,R.height,D.usedWidth,0,E,w)};if(B(R))q();else if(B(M)){if(!I)return o.queueElement(e,t,M.level-1),M;for(var O=M.level;O>i;O--)R=o.getElement(e,t,r,O,T.downscale);q()}else{var V;if(!z&&!I&&!L)for(var O=i-1;O>=u;O--){var A=_[O];if(A){V=A;break}}if(B(V))return o.queueElement(e,t,i),V;D.context.translate(D.usedWidth,0),D.context.scale(m,m),p.drawElement(D.context,e,t,N),D.context.scale(1/m,1/m),D.context.translate(-D.usedWidth,0)}return P=_[i]={ele:e,x:D.usedWidth,texture:D,level:i,scale:m,width:E,height:w,scaledLabelShown:N},D.usedWidth+=Math.ceil(E+h),D.eleCaches.push(P),o.checkTextureFullness(D),P},C.invalidateElement=function(e){var t=this,r=e._private.rscratch.imgCaches;if(r)for(var n=u;c>=n;n++){var a=r[n];if(a){var o=a.texture;o.invalidatedWidth+=a.width,r[n]=null,i.removeFromArray(o.eleCaches,a),t.checkTextureUtility(o)}}},C.checkTextureUtility=function(e){e.invalidatedWidth>=g*e.width&&this.retireTexture(e)},C.checkTextureFullness=function(e){var t=this,r=t.getTextureQueue(e.height);e.usedWidth/e.width>y&&e.fullnessChecks>=m?i.removeFromArray(r,e):e.fullnessChecks++},C.retireTexture=function(e){var t=this,r=e.height,n=t.getTextureQueue(r);i.removeFromArray(n,e),e.retired=!0;for(var a=e.eleCaches,o=0;o<a.length;o++){var s=a[o],l=s.ele,u=s.level,c=l._private.rscratch.imgCaches;c&&(c[u]=null)}i.clearArray(a);var d=t.getRetiredTextureQueue(r);d.push(e)},C.addTexture=function(e,t){var r=this,n=r.getTextureQueue(e),i={};return n.push(i),i.eleCaches=[],i.height=e,i.width=Math.max(p,t),i.usedWidth=0,i.invalidatedWidth=0,i.fullnessChecks=0,i.canvas=document.createElement("canvas"),i.canvas.width=i.width,i.canvas.height=i.height,i.context=i.canvas.getContext("2d"),i},C.recycleTexture=function(e,t){for(var r=this,n=r.getTextureQueue(e),a=r.getRetiredTextureQueue(e),o=0;o<a.length;o++){var s=a[o];if(s.width>=t)return s.retired=!1,s.usedWidth=0,s.invalidatedWidth=0,s.fullnessChecks=0,i.clearArray(s.eleCaches),s.context.clearRect(0,0,s.width,s.height),i.removeFromArray(a,s),n.push(s),s}},C.queueElement=function(e,t,r){var i=this,a=i.getElementQueue(),o=i.getElementIdToQueue(),s=e.id(),l=o[s];if(l)l.level=Math.max(l.level,r),l.reqs++,a.updateItem(l);else{var u={ele:e,bb:t,position:n.copyPosition(e.position()),level:r,reqs:1};e.isEdge()&&(u.positions={source:n.copyPosition(e.source().position()),target:n.copyPosition(e.target().position())}),a.push(u),o[s]=u}},C.dequeue=function(e,t){for(var r=this,i=r.getElementQueue(),a=r.getElementIdToQueue(),o=[],s=0;k>s&&i.size()>0;s++){var l=i.pop();a[l.ele.id()]=null,o.push(l);var u,c=l.ele;u=(!c.isEdge()||n.arePositionsSame(c.source().position(),l.positions.source)&&n.arePositionsSame(c.target().position(),l.positions.target))&&n.arePositionsSame(c.position(),l.position)?l.bb:c.boundingBox(),r.getElement(l.ele,u,e,l.level,T.dequeue)}return o},C.onDequeue=function(e){this.onDequeues.push(e)},C.offDequeue=function(e){i.removeFromArray(this.onDequeues,e)},C.setupDequeueing=o.setupDequeueing({deqRedrawThreshold:S,deqCost:w,deqAvgCost:E,deqNoDrawCost:_,deqFastCost:P,deq:function(e,t,r){return e.dequeue(t,r)},onDeqd:function(e,t){for(var r=0;r<e.onDequeues.length;r++){var n=e.onDequeues[r];n(t)}},shouldRedraw:function(e,t,r,i){for(var a=0;a<t.length;a++){var o=t[a].bb;if(n.boundingBoxesIntersect(o,i))return!0}return!1},priority:function(e){return e.renderer.beforeRenderPriorities.eleTxrDeq}}),t.exports=D},{"../../../heap":81,"../../../math":85,"../../../util":100,"./texture-cache-defs":77}],73:[function(e,t,r){"use strict";var n=e("../../../is"),i={};i.createBuffer=function(e,t){var r=document.createElement("canvas");return r.width=e,r.height=t,[r,r.getContext("2d")]},i.bufferCanvasImage=function(e){var t=this.cy,r=t.mutableElements(),i=r.boundingBox(),a=e.full?Math.ceil(i.w):this.container.clientWidth,o=e.full?Math.ceil(i.h):this.container.clientHeight,s=n.number(e.maxWidth)||n.number(e.maxHeight),l=this.getPixelRatio(),u=1;if(void 0!==e.scale)a*=e.scale,o*=e.scale,u=e.scale;else if(s){var c=1/0,d=1/0;n.number(e.maxWidth)&&(c=u*e.maxWidth/a),n.number(e.maxHeight)&&(d=u*e.maxHeight/o),u=Math.min(c,d),a*=u,o*=u}s||(a*=l,o*=l,u*=l);var h=document.createElement("canvas");h.width=a,h.height=o,h.style.width=a+"px",h.style.height=o+"px";var p=h.getContext("2d");if(a>0&&o>0){p.clearRect(0,0,a,o),e.bg&&(p.fillStyle=e.bg,p.rect(0,0,a,o),p.fill()),p.globalCompositeOperation="source-over";var f=this.getCachedZSortedEles();if(e.full)p.translate(-i.x1*u,-i.y1*u),p.scale(u,u),this.drawElements(p,f);else{var v=t.pan(),g={x:v.x*u,y:v.y*u};u*=t.zoom(),p.translate(g.x,g.y),p.scale(u,u),this.drawElements(p,f)}}return h},i.png=function(e){return this.bufferCanvasImage(e).toDataURL("image/png")},i.jpg=function(e){return this.bufferCanvasImage(e).toDataURL("image/jpeg")},t.exports=i},{"../../../is":83}],74:[function(e,t,r){"use strict";function n(e){var t=this;t.data={canvases:new Array(u.CANVAS_LAYERS),contexts:new Array(u.CANVAS_LAYERS),canvasNeedsRedraw:new Array(u.CANVAS_LAYERS),bufferCanvases:new Array(u.BUFFER_COUNT),bufferContexts:new Array(u.CANVAS_LAYERS)},t.data.canvasContainer=document.createElement("div");var r=t.data.canvasContainer.style;t.data.canvasContainer.setAttribute("style","-webkit-tap-highlight-color: rgba(0,0,0,0);"),r.position="relative",r.zIndex="0",r.overflow="hidden";var n=e.cy.container();n.appendChild(t.data.canvasContainer),n.setAttribute("style",(n.getAttribute("style")||"")+"-webkit-tap-highlight-color: rgba(0,0,0,0);");for(var i=0;i<u.CANVAS_LAYERS;i++){var l=t.data.canvases[i]=document.createElement("canvas");t.data.contexts[i]=l.getContext("2d"),l.setAttribute("style","-webkit-user-select: none; -moz-user-select: -moz-none; user-select: none; -webkit-tap-highlight-color: rgba(0,0,0,0); outline-style: none;"+(a.ms()?" -ms-touch-action: none; touch-action: none; ":"")),l.style.position="absolute",l.setAttribute("data-id","layer"+i),l.style.zIndex=String(u.CANVAS_LAYERS-i),t.data.canvasContainer.appendChild(l),t.data.canvasNeedsRedraw[i]=!1}t.data.topCanvas=t.data.canvases[0],t.data.canvases[u.NODE].setAttribute("data-id","layer"+u.NODE+"-node"),t.data.canvases[u.SELECT_BOX].setAttribute("data-id","layer"+u.SELECT_BOX+"-selectbox"),t.data.canvases[u.DRAG].setAttribute("data-id","layer"+u.DRAG+"-drag");for(var i=0;i<u.BUFFER_COUNT;i++)t.data.bufferCanvases[i]=document.createElement("canvas"),t.data.bufferContexts[i]=t.data.bufferCanvases[i].getContext("2d"),t.data.bufferCanvases[i].style.position="absolute",t.data.bufferCanvases[i].setAttribute("data-id","buffer"+i),t.data.bufferCanvases[i].style.zIndex=String(-i-1),t.data.bufferCanvases[i].style.visibility="hidden";t.pathsEnabled=!0,t.data.eleTxrCache=new o(t),t.data.lyrTxrCache=new s(t,t.data.eleTxrCache),t.onUpdateEleCalcs(function(e,r){for(var n=0;n<r.length;n++){var i=r[n],a=i._private.rstyle,o=a.dirtyEvents;i.isNode()&&o&&1===o.length&&o.position||t.data.eleTxrCache.invalidateElement(i)}r.length>0&&t.data.lyrTxrCache.invalidateElements(r)})}var i=e("../../../util"),a=e("../../../is"),o=e("./ele-texture-cache"),s=e("./layered-texture-cache"),l=n,u=n.prototype;u.CANVAS_LAYERS=3,u.SELECT_BOX=0,u.DRAG=1,u.NODE=2,u.BUFFER_COUNT=3,u.TEXTURE_BUFFER=0,u.MOTIONBLUR_BUFFER_NODE=1,u.MOTIONBLUR_BUFFER_DRAG=2,u.redrawHint=function(e,t){var r=this;switch(e){case"eles":r.data.canvasNeedsRedraw[u.NODE]=t;break;case"drag":r.data.canvasNeedsRedraw[u.DRAG]=t;break;case"select":r.data.canvasNeedsRedraw[u.SELECT_BOX]=t}};var c="undefined"!=typeof Path2D;u.path2dEnabled=function(e){return void 0===e?this.pathsEnabled:void(this.pathsEnabled=!!e)},u.usePaths=function(){return c&&this.pathsEnabled},[e("./arrow-shapes"),e("./drawing-elements"),e("./drawing-edges"),e("./drawing-images"),e("./drawing-label-text"),e("./drawing-nodes"),e("./drawing-redraw"),e("./drawing-shapes"),e("./export-image"),e("./node-shapes")].forEach(function(e){i.extend(u,e)}),t.exports=l},{"../../../is":83,"../../../util":100,"./arrow-shapes":64,"./drawing-edges":65,"./drawing-elements":66,"./drawing-images":67,"./drawing-label-text":68,"./drawing-nodes":69,"./drawing-redraw":70,"./drawing-shapes":71,"./ele-texture-cache":72,"./export-image":73,"./layered-texture-cache":75,"./node-shapes":76}],75:[function(e,t,r){"use strict";function n(e,t){null!=e.imageSmoothingEnabled?e.imageSmoothingEnabled=t:(e.webkitImageSmoothingEnabled=t,e.mozImageSmoothingEnabled=t,e.msImageSmoothingEnabled=t)}var i=e("../../../util"),a=e("../../../math"),o=e("../../../heap"),s=e("../../../is"),l=e("./texture-cache-defs"),u=1,c=-4,d=2,h=3.99,p=50,f=50,v=!0,g=.15,y=.1,m=.9,b=.9,x=1,w=250,E=16e6,_=!0,P=!0,S=!0,k=function(e,t){var r=this,n=r.renderer=e;r.layersByLevel={},r.firstGet=!0,r.lastInvalidationTime=i.performanceNow()-2*w,r.skipping=!1,n.beforeRender(function(e,t){t-r.lastInvalidationTime<=w?r.skipping=!0:r.skipping=!1});var a=function(e,t){return t.reqs-e.reqs};r.layersQueue=new o(a),r.eleTxrCache=t,r.setupEleCacheInvalidation(),r.setupDequeueing()},T=k.prototype,D=0,C=Math.pow(2,53)-1;T.makeLayer=function(e,t){var r=Math.pow(2,t),n=Math.ceil(e.w*r),i=Math.ceil(e.h*r),a=document.createElement("canvas");a.width=n,a.height=i;var o={id:D=++D%C,bb:e,level:t,width:n,height:i,canvas:a,context:a.getContext("2d"),eles:[],elesQueue:[],reqs:0},s=o.context,l=-o.bb.x1,u=-o.bb.y1;return s.scale(r,r),s.translate(l,u),o},T.getLayers=function(e,t,r){var n=this,o=n.renderer,s=o.cy,l=s.zoom(),p=n.firstGet;if(n.firstGet=!1,null==r)if(r=Math.ceil(a.log2(l*t)),c>r)r=c;else if(l>=h||r>d)return null;n.validateLayersElesOrdering(r,e);var f,v,g=n.layersByLevel,y=Math.pow(2,r),m=g[r]=g[r]||[],b=n.levelIsComplete(r,e),x=function(){var t=function(t){return n.validateLayersElesOrdering(t,e),n.levelIsComplete(t,e)?(v=g[t],!0):void 0},a=function(e){if(!v)for(var n=r+e;n>=c&&d>=n&&!t(n);n+=e);};a(1),a(-1);for(var o=m.length-1;o>=0;o--){var s=m[o];s.invalid&&i.removeFromArray(m,s)}};if(b)return m;x();var w=function(){if(!f){f=a.makeBoundingBox();for(var t=0;t<e.length;t++)a.updateBoundingBox(f,e[t].boundingBox())}return f},P=function(e){e=e||{};var t=e.after;w();var i=f.w*y*(f.h*y);if(i>E)return null;var a=n.makeLayer(f,r);if(null!=t){var o=m.indexOf(t)+1;m.splice(o,0,a)}else(void 0===e.insert||e.insert)&&m.unshift(a);return a};if(n.skipping&&!p)return null;for(var S=null,k=e.length/u,T=_&&!p,D=0;D<e.length;D++){var C=e[D],M=C._private.rscratch,N=M.imgLayerCaches=M.imgLayerCaches||{},B=N[r];if(B)S=B;else{if((!S||S.eles.length>=k||!a.boundingBoxInBoundingBox(S.bb,C.boundingBox()))&&(S=P({insert:!0,after:S}),!S))return null;v||T?n.queueLayer(S,C):n.drawEleInLayer(S,C,r,t),S.eles.push(C),N[r]=S}}return v?v:T?null:m},T.getEleLevelForLayerLevel=function(e,t){return e},T.drawEleInLayer=function(e,t,r,i){var a=this,o=this.renderer,s=e.context,l=t.boundingBox();if(0!==l.w&&0!==l.h){var u=a.eleTxrCache,c=P?u.reasons.highQuality:void 0;r=a.getEleLevelForLayerLevel(r,i);var d=S?u.getElement(t,l,null,r,c):null;d?(v&&n(s,!1),s.drawImage(d.texture.canvas,d.x,0,d.width,d.height,l.x1,l.y1,l.w,l.h),v&&n(s,!0)):o.drawElement(s,t)}},T.levelIsComplete=function(e,t){var r=this,n=r.layersByLevel[e];if(!n||0===n.length)return!1;for(var i=0,a=0;a<n.length;a++){var o=n[a];if(o.reqs>0)return!1;if(o.invalid)return!1;i+=o.eles.length}return i===t.length},T.validateLayersElesOrdering=function(e,t){var r=this.layersByLevel[e];if(r)for(var n=0;n<r.length;n++){for(var i=r[n],a=-1,o=0;o<t.length;o++)if(i.eles[0]===t[o]){a=o;break}if(0>a)this.invalidateLayer(i);else for(var s=a,o=0;o<i.eles.length;o++)if(i.eles[o]!==t[s+o]){this.invalidateLayer(i);break}}},T.updateElementsInLayers=function(e,t){for(var r=this,n=s.element(e[0]),i=0;i<e.length;i++)for(var a=n?null:e[i],o=n?e[i]:e[i].ele,l=o._private.rscratch,u=l.imgLayerCaches=l.imgLayerCaches||{},h=c;d>=h;h++){var p=u[h];p&&(a&&r.getEleLevelForLayerLevel(p.level)!==a.level||t(p,o,a))}},T.haveLayers=function(){for(var e=this,t=!1,r=c;d>=r;r++){var n=e.layersByLevel[r];if(n&&n.length>0){t=!0;break}}return t},T.invalidateElements=function(e){var t=this;t.lastInvalidationTime=i.performanceNow(),0!==e.length&&t.haveLayers()&&t.updateElementsInLayers(e,function(e,r,n){t.invalidateLayer(e)})},T.invalidateLayer=function(e){if(this.lastInvalidationTime=i.performanceNow(),!e.invalid){var t=e.level,r=e.eles,n=this.layersByLevel[t];i.removeFromArray(n,e),e.elesQueue=[],e.invalid=!0,e.replacement&&(e.replacement.invalid=!0);for(var a=0;a<r.length;a++){var o=r[a]._private.rscratch.imgLayerCaches;o&&(o[t]=null)}}},T.refineElementTextures=function(e){var t=this;t.updateElementsInLayers(e,function(e,r,n){var i=e.replacement;if(i||(i=e.replacement=t.makeLayer(e.bb,e.level),i.replaces=e,i.eles=e.eles),!i.reqs)for(var a=0;a<i.eles.length;a++)t.queueLayer(i,i.eles[a])})},T.setupEleCacheInvalidation=function(){var e=this,t=[];if(S){var r=i.debounce(function(){e.refineElementTextures(t),t=[]},f);e.eleTxrCache.onDequeue(function(e){for(var n=0;n<e.length;n++)t.push(e[n]);r()})}},T.queueLayer=function(e,t){var r=this,n=r.layersQueue,i=e.elesQueue,a=i.hasId=i.hasId||{};if(!e.replacement){if(t){if(a[t.id()])return;i.push(t),a[t.id()]=!0}e.reqs?(e.reqs++,n.updateItem(e)):(e.reqs=1,n.push(e))}},T.dequeue=function(e){for(var t=this,r=t.layersQueue,n=[],i=0;x>i&&0!==r.size();){var a=r.peek();if(a.replacement)r.pop();else if(a.replaces&&a!==a.replaces.replacement)r.pop();else if(a.invalid)r.pop();else{var o=a.elesQueue.shift();o&&(t.drawEleInLayer(a,o,a.level,e),i++),0===n.length&&n.push(!0),0===a.elesQueue.length&&(r.pop(),a.reqs=0,a.replaces&&t.applyLayerReplacement(a),t.requestRedraw())}}return n},T.applyLayerReplacement=function(e){var t=this,r=t.layersByLevel[e.level],n=e.replaces,i=r.indexOf(n);if(!(0>i||n.invalid)){r[i]=e;for(var a=0;a<e.eles.length;a++){var o=e.eles[a]._private,s=o.imgLayerCaches=o.imgLayerCaches||{};s&&(s[e.level]=e)}t.requestRedraw()}},T.requestRedraw=i.debounce(function(){var e=this.renderer;e.redrawHint("eles",!0),e.redrawHint("drag",!0),e.redraw()},100),T.setupDequeueing=l.setupDequeueing({deqRedrawThreshold:p,deqCost:g,deqAvgCost:y,deqNoDrawCost:m,deqFastCost:b,deq:function(e,t){return e.dequeue(t)},onDeqd:i.noop,shouldRedraw:i.trueify,priority:function(e){return e.renderer.beforeRenderPriorities.lyrTxrDeq}}),t.exports=k},{"../../../heap":81,"../../../is":83,"../../../math":85,"../../../util":100,"./texture-cache-defs":77}],76:[function(e,t,r){"use strict";var n={};n.nodeShapeImpl=function(e,t,r,n,i,a,o){switch(e){case"ellipse":return this.drawEllipsePath(t,r,n,i,a);case"polygon":return this.drawPolygonPath(t,r,n,i,a,o);case"roundrectangle":return this.drawRoundRectanglePath(t,r,n,i,a)}},t.exports=n},{}],77:[function(e,t,r){"use strict";var n=e("../../../util"),i=1e3/60;t.exports={setupDequeueing:function(e){return function(){var t=this,r=this.renderer;if(!t.dequeueingSetup){t.dequeueingSetup=!0;var a=n.debounce(function(){r.redrawHint("eles",!0),r.redrawHint("drag",!0),r.redraw()},e.deqRedrawThreshold),o=function(o,s){for(var l=n.performanceNow(),u=r.averageRedrawTime,c=r.lastRedrawTime,d=[],h=r.cy.extent(),p=r.getPixelRatio();;){var f=n.performanceNow(),v=f-l,g=f-s;if(i>c){var y=i-(o?u:0);if(g>=e.deqFastCost*y)break}else if(o){if(v>=e.deqCost*c||v>=e.deqAvgCost*u)break}else if(g>=e.deqNoDrawCost*i)break;var m=e.deq(t,p,h);if(!(m.length>0))break;for(var b=0;b<m.length;b++)d.push(m[b])}d.length>0&&(e.onDeqd(t,d),!o&&e.shouldRedraw(t,d,p,h)&&a())},s=e.priority||n.noop;r.beforeRender(o,s(t))}}}}},{"../../../util":100}],78:[function(e,t,r){"use strict";t.exports=[{name:"null",impl:e("./null")},{name:"base",impl:e("./base")},{name:"canvas",impl:e("./canvas")}]},{"./base":60,"./canvas":74,"./null":79}],79:[function(e,t,r){"use strict";function n(e){this.options=e,this.notifications=0}var i=function(){};n.prototype={recalculateRenderedStyle:i,notify:function(){this.notifications++},init:i},t.exports=n},{}],80:[function(e,t,r){/*! Weaver licensed under MIT (https://tldrlegal.com/license/mit-license), copyright Max Franz */
"use strict";var n=e("./is"),i=e("./util"),a=e("./thread"),o=e("./promise"),s=e("./define"),l=function(t){if(!(this instanceof l))return new l(t);this._private={pass:[]};var r=4;if(n.number(t),"undefined"!=typeof navigator&&null!=navigator.hardwareConcurrency)t=navigator.hardwareConcurrency;else try{t=e("os").cpus().length}catch(i){t=r}for(var o=0;t>o;o++)this[o]=new a;this.length=t},u=l.prototype;i.extend(u,{instanceString:function(){return"fabric"},require:function(e,t){for(var r=0;r<this.length;r++){var n=this[r];n.require(e,t)}return this},random:function(){var e=Math.round((this.length-1)*Math.random()),t=this[e];return t},run:function(e){var t=this._private.pass.shift();return this.random().pass(t).run(e)},message:function(e){return this.random().message(e)},broadcast:function(e){for(var t=0;t<this.length;t++){var r=this[t];r.message(e)}return this},stop:function(){for(var e=0;e<this.length;e++){var t=this[e];t.stop()}return this},pass:function(e){var t=this._private.pass;if(!n.array(e))throw"Only arrays may be used with fabric.pass()";return t.push(e),this},spreadSize:function(){var e=Math.ceil(this._private.pass[0].length/this.length);return e=Math.max(1,e)},spread:function(e){for(var t=this,r=t._private,n=t.spreadSize(),i=r.pass.shift().concat([]),a=[],s=0;s<this.length;s++){var l=this[s],u=i.splice(0,n),c=l.pass(u).run(e);a.push(c);var d=0===i.length;if(d)break}return o.all(a).then(function(e){for(var t=[],r=0,n=0;n<e.length;n++)for(var i=e[n],a=0;a<i.length;a++){var o=i[a];t[r++]=o}return t})},map:function(e){var t=this;return t.require(e,"_$_$_fabmap"),t.spread(function(e){var t=[],r=resolve;resolve=function(e){t.push(e)};for(var n=0;n<e.length;n++){var i=t.length,a=_$_$_fabmap(e[n]),o=i===t.length;o&&t.push(a)}return resolve=r,t})},filter:function(e){var t=this._private,r=t.pass[0];return this.map(e).then(function(e){for(var t=[],n=0;n<r.length;n++){var i=r[n],a=e[n];a&&t.push(i)}return t})},sort:function(e){var t=this,r=this._private.pass[0].length,n=this.spreadSize();return e=e||function(e,t){return t>e?-1:e>t?1:0},t.require(e,"_$_$_cmp"),t.spread(function(e){var t=e.sort(_$_$_cmp);resolve(t)}).then(function(t){for(var i=function(n,i,a){i=Math.min(i,r),a=Math.min(a,r);for(var o=n,s=i,l=[],u=o;a>u;u++){var c=t[n],d=t[i];s>n&&(i>=a||e(c,d)<=0)?(l.push(c),n++):(l.push(d),i++)}for(var u=0;u<l.length;u++){var h=o+u;t[h]=l[u]}},a=n;r>a;a*=2)for(var o=0;r>o;o+=2*a)i(o,o+a,o+2*a);return t})}});var c=function(e){return e=e||{},function(t,r){var n=this._private.pass.shift();return this.random().pass(n)[e.threadFn](t,r)}};i.extend(u,{randomMap:c({threadFn:"map"}),reduce:c({threadFn:"reduce"}),reduceRight:c({threadFn:"reduceRight"})});var d=u;d.promise=d.run,d.terminate=d.halt=d.stop,d.include=d.require,i.extend(u,{on:s.on(),one:s.on({unbindSelfOnTrigger:!0}),off:s.off(),trigger:s.trigger()}),s.eventAliasesOn(u),t.exports=l},{"./define":44,"./is":83,"./promise":86,"./thread":98,"./util":100,os:void 0}],81:[function(e,t,r){/*!
Ported by Xueqiao Xu <xueqiaoxu@gmail.com>;

PSF LICENSE AGREEMENT FOR PYTHON 2.7.2

1. This LICENSE AGREEMENT is between the Python Software Foundation (“PSF”), and the Individual or Organization (“Licensee”) accessing and otherwise using Python 2.7.2 software in source or binary form and its associated documentation.
2. Subject to the terms and conditions of this License Agreement, PSF hereby grants Licensee a nonexclusive, royalty-free, world-wide license to reproduce, analyze, test, perform and/or display publicly, prepare derivative works, distribute, and otherwise use Python 2.7.2 alone or in any derivative version, provided, however, that PSF’s License Agreement and PSF’s notice of copyright, i.e., “Copyright © 2001-2012 Python Software Foundation; All Rights Reserved” are retained in Python 2.7.2 alone or in any derivative version prepared by Licensee.
3. In the event Licensee prepares a derivative work that is based on or incorporates Python 2.7.2 or any part thereof, and wants to make the derivative work available to others as provided herein, then Licensee hereby agrees to include in any such work a brief summary of the changes made to Python 2.7.2.
4. PSF is making Python 2.7.2 available to Licensee on an “AS IS” basis. PSF MAKES NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED. BY WAY OF EXAMPLE, BUT NOT LIMITATION, PSF MAKES NO AND DISCLAIMS ANY REPRESENTATION OR WARRANTY OF MERCHANTABILITY OR FITNESS FOR ANY PARTICULAR PURPOSE OR THAT THE USE OF PYTHON 2.7.2 WILL NOT INFRINGE ANY THIRD PARTY RIGHTS.
5. PSF SHALL NOT BE LIABLE TO LICENSEE OR ANY OTHER USERS OF PYTHON 2.7.2 FOR ANY INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES OR LOSS AS A RESULT OF MODIFYING, DISTRIBUTING, OR OTHERWISE USING PYTHON 2.7.2, OR ANY DERIVATIVE THEREOF, EVEN IF ADVISED OF THE POSSIBILITY THEREOF.
6. This License Agreement will automatically terminate upon a material breach of its terms and conditions.
7. Nothing in this License Agreement shall be deemed to create any relationship of agency, partnership, or joint venture between PSF and Licensee. This License Agreement does not grant permission to use PSF trademarks or trade name in a trademark sense to endorse or promote products or services of Licensee, or any third party.
8. By copying, installing or otherwise using Python 2.7.2, Licensee agrees to be bound by the terms and conditions of this License Agreement.
*/
"use strict";var n,i,a,o,s,l,u,c,d,h,p,f,v,g,y;a=Math.floor,h=Math.min,i=function(e,t){return t>e?-1:e>t?1:0},d=function(e,t,r,n,o){var s;if(null==r&&(r=0),null==o&&(o=i),0>r)throw new Error("lo must be non-negative");for(null==n&&(n=e.length);n>r;)s=a((r+n)/2),o(t,e[s])<0?n=s:r=s+1;return[].splice.apply(e,[r,r-r].concat(t)),t},l=function(e,t,r){return null==r&&(r=i),e.push(t),g(e,0,e.length-1,r)},s=function(e,t){var r,n;return null==t&&(t=i),r=e.pop(),e.length?(n=e[0],e[0]=r,y(e,0,t)):n=r,n},c=function(e,t,r){var n;return null==r&&(r=i),n=e[0],e[0]=t,y(e,0,r),n},u=function(e,t,r){var n;return null==r&&(r=i),e.length&&r(e[0],t)<0&&(n=[e[0],t],t=n[0],e[0]=n[1],y(e,0,r)),t},o=function(e,t){var r,n,o,s,l,u;for(null==t&&(t=i),s=function(){u=[];for(var t=0,r=a(e.length/2);r>=0?r>t:t>r;r>=0?t++:t--)u.push(t);return u}.apply(this).reverse(),l=[],n=0,o=s.length;o>n;n++)r=s[n],l.push(y(e,r,t));return l},v=function(e,t,r){var n;return null==r&&(r=i),n=e.indexOf(t),-1!==n?(g(e,0,n,r),y(e,n,r)):void 0},p=function(e,t,r){var n,a,s,l,c;if(null==r&&(r=i),a=e.slice(0,t),!a.length)return a;for(o(a,r),c=e.slice(t),s=0,l=c.length;l>s;s++)n=c[s],u(a,n,r);return a.sort(r).reverse()},f=function(e,t,r){var n,a,l,u,c,p,f,v,g,y;if(null==r&&(r=i),10*t<=e.length){if(u=e.slice(0,t).sort(r),!u.length)return u;for(l=u[u.length-1],v=e.slice(t),c=0,f=v.length;f>c;c++)n=v[c],r(n,l)<0&&(d(u,n,0,null,r),u.pop(),l=u[u.length-1]);return u}for(o(e,r),y=[],a=p=0,g=h(t,e.length);g>=0?g>p:p>g;a=g>=0?++p:--p)y.push(s(e,r));return y},g=function(e,t,r,n){var a,o,s;for(null==n&&(n=i),a=e[r];r>t&&(s=r-1>>1,o=e[s],n(a,o)<0);)e[r]=o,r=s;return e[r]=a},y=function(e,t,r){var n,a,o,s,l;for(null==r&&(r=i),a=e.length,l=t,o=e[t],n=2*t+1;a>n;)s=n+1,a>s&&!(r(e[n],e[s])<0)&&(n=s),e[t]=e[n],t=n,n=2*t+1;return e[t]=o,g(e,l,t,r)},n=function(){function e(e){this.cmp=null!=e?e:i,this.nodes=[]}return e.push=l,e.pop=s,e.replace=c,e.pushpop=u,e.heapify=o,e.updateItem=v,e.nlargest=p,e.nsmallest=f,e.prototype.push=function(e){return l(this.nodes,e,this.cmp)},e.prototype.pop=function(){return s(this.nodes,this.cmp)},e.prototype.peek=function(){return this.nodes[0]},e.prototype.contains=function(e){return-1!==this.nodes.indexOf(e)},e.prototype.replace=function(e){return c(this.nodes,e,this.cmp)},e.prototype.pushpop=function(e){return u(this.nodes,e,this.cmp)},e.prototype.heapify=function(){return o(this.nodes,this.cmp)},e.prototype.updateItem=function(e){return v(this.nodes,e,this.cmp)},e.prototype.clear=function(){return this.nodes=[]},e.prototype.empty=function(){return 0===this.nodes.length},e.prototype.size=function(){return this.nodes.length},e.prototype.clone=function(){var t;return t=new e,t.nodes=this.nodes.slice(0),t},e.prototype.toArray=function(){return this.nodes.slice(0)},e.prototype.insert=e.prototype.push,e.prototype.top=e.prototype.peek,e.prototype.front=e.prototype.peek,e.prototype.has=e.prototype.contains,e.prototype.copy=e.prototype.clone,e}(),t.exports=n},{}],82:[function(e,t,r){"use strict";e("./-preamble");var n=e("./window"),i=e("./is"),a=e("./core"),o=e("./extension"),s=e("./jquery-plugin"),l=e("./stylesheet"),u=e("./thread"),c=e("./fabric"),d=function(e){return void 0===e&&(e={}),i.plainObject(e)?new a(e):i.string(e)?o.apply(o,arguments):void 0};d.version=e("./version.json"),n&&n.jQuery&&s(n.jQuery,d),d.registerJquery=function(e){s(e,d)},d.stylesheet=d.Stylesheet=l,d.thread=d.Thread=u,d.fabric=d.Fabric=c,t.exports=d},{"./-preamble":1,"./core":37,"./extension":46,"./fabric":80,"./is":83,"./jquery-plugin":84,"./stylesheet":97,"./thread":98,"./version.json":106,"./window":107}],83:[function(e,t,r){"use strict";var n=e("./window"),i=n?n.navigator:null,a=n?n.document:null,o="string",s=typeof{},l="function",u=typeof HTMLElement,c=function(e){return e&&e.instanceString&&d.fn(e.instanceString)?e.instanceString():null},d={defined:function(e){return null!=e},string:function(e){return null!=e&&typeof e==o},fn:function(e){return null!=e&&typeof e===l},array:function(e){return Array.isArray?Array.isArray(e):null!=e&&e instanceof Array},plainObject:function(e){return null!=e&&typeof e===s&&!d.array(e)&&e.constructor===Object},object:function(e){return null!=e&&typeof e===s},number:function(e){return null!=e&&"number"==typeof e&&!isNaN(e)},integer:function(e){return d.number(e)&&Math.floor(e)===e},bool:function(e){return null!=e&&typeof e==typeof!0},htmlElement:function(e){return"undefined"===u?void 0:null!=e&&e instanceof HTMLElement},elementOrCollection:function(e){return d.element(e)||d.collection(e)},element:function(e){return"collection"===c(e)&&e._private.single},collection:function(e){return"collection"===c(e)&&!e._private.single},core:function(e){return"core"===c(e)},style:function(e){return"style"===c(e)},stylesheet:function(e){return"stylesheet"===c(e)},event:function(e){return"event"===c(e)},thread:function(e){return"thread"===c(e)},fabric:function(e){return"fabric"===c(e)},emptyString:function(e){return void 0===e||null===e?!0:!(""!==e&&!e.match(/^\s+$/))},nonemptyString:function(e){return!(!e||!d.string(e)||""===e||e.match(/^\s+$/))},domElement:function(e){return"undefined"==typeof HTMLElement?!1:e instanceof HTMLElement},boundingBox:function(e){return d.plainObject(e)&&d.number(e.x1)&&d.number(e.x2)&&d.number(e.y1)&&d.number(e.y2)},promise:function(e){return d.object(e)&&d.fn(e.then)},touch:function(){return n&&("ontouchstart"in n||n.DocumentTouch&&a instanceof DocumentTouch)},gecko:function(){return n&&("undefined"!=typeof InstallTrigger||"MozAppearance"in a.documentElement.style)},webkit:function(){return n&&("undefined"!=typeof webkitURL||"WebkitAppearance"in a.documentElement.style)},chromium:function(){return n&&"undefined"!=typeof chrome},khtml:function(){return i&&i.vendor.match(/kde/i)},khtmlEtc:function(){return d.khtml()||d.webkit()||d.chromium()},ms:function(){return i&&i.userAgent.match(/msie|trident|edge/i)},windows:function(){return i&&i.appVersion.match(/Win/i)},mac:function(){return i&&i.appVersion.match(/Mac/i)},linux:function(){return i&&i.appVersion.match(/Linux/i)},unix:function(){return i&&i.appVersion.match(/X11/i)}};t.exports=d},{"./window":107}],84:[function(e,t,r){"use strict";var n=e("./is"),i=function(e){var t=e[0]._cyreg=e[0]._cyreg||{};return t},a=function(e,t){e&&(e.fn.cytoscape||(e.fn.cytoscape=function(r){var a=e(this);if("get"===r)return i(a).cy;if(n.fn(r)){var o=r,s=i(a).cy;if(s&&s.isReady())s.trigger("ready",[],o);else{var l=i(a),u=l.readies=l.readies||[];u.push(o)}}else if(n.plainObject(r))return a.each(function(){var n=e.extend({},r,{container:e(this)[0]});t(n)})},e.cytoscape=t,null==e.fn.cy&&null==e.cy&&(e.fn.cy=e.fn.cytoscape,e.cy=e.cytoscape)))};t.exports=a},{"./is":83}],85:[function(e,t,r){"use strict";var n={};n.arePositionsSame=function(e,t){return e.x===t.x&&e.y===t.y},n.copyPosition=function(e){return{x:e.x,y:e.y}},n.array2point=function(e){return{x:e[0],y:e[1]}},n.deg2rad=function(e){return Math.PI*e/180},n.log2=Math.log2||function(e){return Math.log(e)/Math.log(2)},n.signum=function(e){return e>0?1:0>e?-1:0},n.dist=function(e,t){return Math.sqrt(n.sqdist(e,t))},n.sqdist=function(e,t){var r=t.x-e.x,n=t.y-e.y;return r*r+n*n},n.qbezierAt=function(e,t,r,n){return(1-n)*(1-n)*e+2*(1-n)*n*t+n*n*r},n.qbezierPtAt=function(e,t,r,i){return{x:n.qbezierAt(e.x,t.x,r.x,i),y:n.qbezierAt(e.y,t.y,r.y,i)}},n.lineAt=function(e,t,r,i){var a={x:t.x-e.x,y:t.y-e.y},o=n.dist(e,t),s={x:a.x/o,y:a.y/o};r=null==r?0:r;var i=null!=i?i:r*o;return{x:e.x+s.x*i,y:e.y+s.y*i}},n.lineAtDist=function(e,t,r){return n.lineAt(e,t,void 0,r)},n.triangleAngle=function(e,t,r){var i=n.dist(t,r),a=n.dist(e,r),o=n.dist(e,t);return Math.acos((i*i+a*a-o*o)/(2*i*a))},n.bound=function(e,t,r){return Math.max(e,Math.min(r,t))},n.makeBoundingBox=function(e){if(null==e)return{x1:1/0,y1:1/0,x2:-(1/0),y2:-(1/0),w:0,h:0};if(null!=e.x1&&null!=e.y1){if(null!=e.x2&&null!=e.y2&&e.x2>=e.x1&&e.y2>=e.y1)return{x1:e.x1,y1:e.y1,x2:e.x2,y2:e.y2,w:e.x2-e.x1,h:e.y2-e.y1};if(null!=e.w&&null!=e.h&&e.w>=0&&e.h>=0)return{x1:e.x1,y1:e.y1,x2:e.x1+e.w,y2:e.y1+e.h,w:e.w,h:e.h}}},n.updateBoundingBox=function(e,t){e.x1=Math.min(e.x1,t.x1),e.x2=Math.max(e.x2,t.x2),e.w=e.x2-e.x1,e.y1=Math.min(e.y1,t.y1),e.y2=Math.max(e.y2,t.y2),e.h=e.y2-e.y1},n.expandBoundingBox=function(e,t){return e.x1-=t,e.x2+=t,e.y1-=t,e.y2+=t,e.w=e.x2-e.x1,e.h=e.y2-e.y1,e},n.boundingBoxesIntersect=function(e,t){return e.x1>t.x2?!1:t.x1>e.x2?!1:e.x2<t.x1?!1:t.x2<e.x1?!1:e.y2<t.y1?!1:t.y2<e.y1?!1:e.y1>t.y2?!1:!(t.y1>e.y2)},n.inBoundingBox=function(e,t,r){return e.x1<=t&&t<=e.x2&&e.y1<=r&&r<=e.y2},n.pointInBoundingBox=function(e,t){return this.inBoundingBox(e,t.x,t.y)},n.boundingBoxInBoundingBox=function(e,t){return n.inBoundingBox(e,t.x1,t.y1)&&n.inBoundingBox(e,t.x2,t.y2)},n.roundRectangleIntersectLine=function(e,t,r,n,i,a,o){var s,l=this.getRoundRectangleRadius(i,a),u=i/2,c=a/2,d=r-u+l-o,h=n-c-o,p=r+u-l+o,f=h;if(s=this.finiteLinesIntersect(e,t,r,n,d,h,p,f,!1),s.length>0)return s;var v=r+u+o,g=n-c+l-o,y=v,m=n+c-l+o;if(s=this.finiteLinesIntersect(e,t,r,n,v,g,y,m,!1),s.length>0)return s;var b=r-u+l-o,x=n+c+o,w=r+u-l+o,E=x;if(s=this.finiteLinesIntersect(e,t,r,n,b,x,w,E,!1),s.length>0)return s;var _=r-u-o,P=n-c+l-o,S=_,k=n+c-l+o;if(s=this.finiteLinesIntersect(e,t,r,n,_,P,S,k,!1),s.length>0)return s;var T,D=r-u+l,C=n-c+l;if(T=this.intersectLineCircle(e,t,r,n,D,C,l+o),T.length>0&&T[0]<=D&&T[1]<=C)return[T[0],T[1]];var M=r+u-l,N=n-c+l;if(T=this.intersectLineCircle(e,t,r,n,M,N,l+o),T.length>0&&T[0]>=M&&T[1]<=N)return[T[0],T[1]];var B=r+u-l,z=n+c-l;if(T=this.intersectLineCircle(e,t,r,n,B,z,l+o),T.length>0&&T[0]>=B&&T[1]>=z)return[T[0],T[1]];var I=r-u+l,L=n+c-l;return T=this.intersectLineCircle(e,t,r,n,I,L,l+o),T.length>0&&T[0]<=I&&T[1]>=L?[T[0],T[1]]:[]},n.inLineVicinity=function(e,t,r,n,i,a,o){var s=o,l=Math.min(r,i),u=Math.max(r,i),c=Math.min(n,a),d=Math.max(n,a);return e>=l-s&&u+s>=e&&t>=c-s&&d+s>=t},n.inBezierVicinity=function(e,t,r,n,i,a,o,s,l){var u={x1:Math.min(r,o,i)-l,x2:Math.max(r,o,i)+l,y1:Math.min(n,s,a)-l,y2:Math.max(n,s,a)+l};return!(e<u.x1||e>u.x2||t<u.y1||t>u.y2)},n.solveCubic=function(e,t,r,n,i){t/=e,r/=e,n/=e;var a,o,s,l,u,c,d,h;return o=(3*r-t*t)/9,s=-(27*n)+t*(9*r-2*(t*t)),s/=54,a=o*o*o+s*s,i[1]=0,d=t/3,a>0?(u=s+Math.sqrt(a),u=0>u?-Math.pow(-u,1/3):Math.pow(u,1/3),c=s-Math.sqrt(a),c=0>c?-Math.pow(-c,1/3):Math.pow(c,1/3),i[0]=-d+u+c,d+=(u+c)/2,i[4]=i[2]=-d,d=Math.sqrt(3)*(-c+u)/2,i[3]=d,void(i[5]=-d)):(i[5]=i[3]=0,0===a?(h=0>s?-Math.pow(-s,1/3):Math.pow(s,1/3),i[0]=-d+2*h,void(i[4]=i[2]=-(h+d))):(o=-o,l=o*o*o,l=Math.acos(s/Math.sqrt(l)),h=2*Math.sqrt(o),i[0]=-d+h*Math.cos(l/3),i[2]=-d+h*Math.cos((l+2*Math.PI)/3),void(i[4]=-d+h*Math.cos((l+4*Math.PI)/3))))},n.sqdistToQuadraticBezier=function(e,t,r,n,i,a,o,s){var l=1*r*r-4*r*i+2*r*o+4*i*i-4*i*o+o*o+n*n-4*n*a+2*n*s+4*a*a-4*a*s+s*s,u=9*r*i-3*r*r-3*r*o-6*i*i+3*i*o+9*n*a-3*n*n-3*n*s-6*a*a+3*a*s,c=3*r*r-6*r*i+r*o-r*e+2*i*i+2*i*e-o*e+3*n*n-6*n*a+n*s-n*t+2*a*a+2*a*t-s*t,d=1*r*i-r*r+r*e-i*e+n*a-n*n+n*t-a*t,h=[];this.solveCubic(l,u,c,d,h);for(var p=1e-7,f=[],v=0;6>v;v+=2)Math.abs(h[v+1])<p&&h[v]>=0&&h[v]<=1&&f.push(h[v]);f.push(1),f.push(0);for(var g,y,m,b,x=-1,w=0;w<f.length;w++)y=Math.pow(1-f[w],2)*r+2*(1-f[w])*f[w]*i+f[w]*f[w]*o,m=Math.pow(1-f[w],2)*n+2*(1-f[w])*f[w]*a+f[w]*f[w]*s,b=Math.pow(y-e,2)+Math.pow(m-t,2),x>=0?x>b&&(x=b,g=f[w]):(x=b,g=f[w]);return x},n.sqdistToFiniteLine=function(e,t,r,n,i,a){var o=[e-r,t-n],s=[i-r,a-n],l=s[0]*s[0]+s[1]*s[1],u=o[0]*o[0]+o[1]*o[1],c=o[0]*s[0]+o[1]*s[1],d=c*c/l;return 0>c?u:d>l?(e-i)*(e-i)+(t-a)*(t-a):u-d},n.pointInsidePolygonPoints=function(e,t,r){for(var n,i,a,o,s,l=0,u=0,c=0;c<r.length/2;c++)if(n=r[2*c],i=r[2*c+1],c+1<r.length/2?(a=r[2*(c+1)],o=r[2*(c+1)+1]):(a=r[2*(c+1-r.length/2)],o=r[2*(c+1-r.length/2)+1]),n==e&&a==e);else{if(!(n>=e&&e>=a||e>=n&&a>=e))continue;s=(e-n)/(a-n)*(o-i)+i,s>t&&l++,t>s&&u++}return l%2!==0},n.pointInsidePolygon=function(e,t,r,i,a,o,s,l,u){var c,d=new Array(r.length);null!=l[0]?(c=Math.atan(l[1]/l[0]),l[0]<0?c+=Math.PI/2:c=-c-Math.PI/2):c=l;for(var h=Math.cos(-c),p=Math.sin(-c),f=0;f<d.length/2;f++)d[2*f]=o/2*(r[2*f]*h-r[2*f+1]*p),d[2*f+1]=s/2*(r[2*f+1]*h+r[2*f]*p),d[2*f]+=i,d[2*f+1]+=a;var v;if(u>0){var g=this.expandPolygon(d,-u);v=this.joinLines(g)}else v=d;return n.pointInsidePolygonPoints(e,t,v)},n.joinLines=function(e){for(var t,r,n,i,a,o,s,l,u=new Array(e.length/2),c=0;c<e.length/4;c++){t=e[4*c],r=e[4*c+1],n=e[4*c+2],i=e[4*c+3],c<e.length/4-1?(a=e[4*(c+1)],o=e[4*(c+1)+1],s=e[4*(c+1)+2],l=e[4*(c+1)+3]):(a=e[0],o=e[1],s=e[2],l=e[3]);var d=this.finiteLinesIntersect(t,r,n,i,a,o,s,l,!0);u[2*c]=d[0],u[2*c+1]=d[1]}return u},n.expandPolygon=function(e,t){for(var r,n,i,a,o=new Array(2*e.length),s=0;s<e.length/2;s++){r=e[2*s],n=e[2*s+1],s<e.length/2-1?(i=e[2*(s+1)],a=e[2*(s+1)+1]):(i=e[0],a=e[1]);var l=a-n,u=-(i-r),c=Math.sqrt(l*l+u*u),d=l/c,h=u/c;o[4*s]=r+d*t,o[4*s+1]=n+h*t,o[4*s+2]=i+d*t,o[4*s+3]=a+h*t}return o},n.intersectLineEllipse=function(e,t,r,n,i,a){var o=r-e,s=n-t;o/=i,s/=a;var l=Math.sqrt(o*o+s*s),u=l-1;if(0>u)return[];var c=u/l;return[(r-e)*c+e,(n-t)*c+t]},n.intersectLineCircle=function(e,t,r,n,i,a,o){var s=[r-e,n-t],l=[i,a],u=[e-i,t-a],c=s[0]*s[0]+s[1]*s[1],d=2*(u[0]*s[0]+u[1]*s[1]),l=u[0]*u[0]+u[1]*u[1]-o*o,h=d*d-4*c*l;if(0>h)return[];var p=(-d+Math.sqrt(h))/(2*c),f=(-d-Math.sqrt(h))/(2*c),v=Math.min(p,f),g=Math.max(p,f),y=[];if(v>=0&&1>=v&&y.push(v),g>=0&&1>=g&&y.push(g),0===y.length)return[];var m=y[0]*s[0]+e,b=y[0]*s[1]+t;if(y.length>1){if(y[0]==y[1])return[m,b];var x=y[1]*s[0]+e,w=y[1]*s[1]+t;return[m,b,x,w]}return[m,b]},n.findCircleNearPoint=function(e,t,r,n,i){var a=n-e,o=i-t,s=Math.sqrt(a*a+o*o),l=a/s,u=o/s;return[e+l*r,t+u*r]},n.findMaxSqDistanceToOrigin=function(e){for(var t,r=1e-6,n=0;n<e.length/2;n++)t=e[2*n]*e[2*n]+e[2*n+1]*e[2*n+1],t>r&&(r=t);return r},n.midOfThree=function(e,t,r){return e>=t&&r>=e||e>=r&&t>=e?e:t>=e&&r>=t||t>=r&&e>=t?t:r},n.finiteLinesIntersect=function(e,t,r,n,i,a,o,s,l){var u=e-i,c=r-e,d=o-i,h=t-a,p=n-t,f=s-a,v=d*h-f*u,g=c*h-p*u,y=f*c-d*p;if(0!==y){var m=v/y,b=g/y,x=.001,w=0-x,E=1+x;return m>=w&&E>=m&&b>=w&&E>=b?[e+m*c,t+m*p]:l?[e+m*c,t+m*p]:[]}return 0===v||0===g?this.midOfThree(e,r,o)===o?[o,s]:this.midOfThree(e,r,i)===i?[i,a]:this.midOfThree(i,o,r)===r?[r,n]:[]:[]},n.polygonIntersectLine=function(e,t,r,i,a,o,s,l){for(var u,c=[],d=new Array(r.length),h=0;h<d.length/2;h++)d[2*h]=r[2*h]*o+i,d[2*h+1]=r[2*h+1]*s+a;var p;if(l>0){var f=n.expandPolygon(d,-l);p=n.joinLines(f)}else p=d;for(var v,g,y,m,h=0;h<p.length/2;h++)v=p[2*h],g=p[2*h+1],h<p.length/2-1?(y=p[2*(h+1)],m=p[2*(h+1)+1]):(y=p[0],m=p[1]),u=this.finiteLinesIntersect(e,t,i,a,v,g,y,m),0!==u.length&&c.push(u[0],u[1]);return c},n.shortenIntersection=function(e,t,r){var n=[e[0]-t[0],e[1]-t[1]],i=Math.sqrt(n[0]*n[0]+n[1]*n[1]),a=(i-r)/i;return 0>a&&(a=1e-5),[t[0]+a*n[0],t[1]+a*n[1]]},n.generateUnitNgonPointsFitToSquare=function(e,t){var r=n.generateUnitNgonPoints(e,t);return r=n.fitPolygonToSquare(r)},n.fitPolygonToSquare=function(e){for(var t,r,n=e.length/2,i=1/0,a=1/0,o=-(1/0),s=-(1/0),l=0;n>l;l++)t=e[2*l],r=e[2*l+1],i=Math.min(i,t),o=Math.max(o,t),a=Math.min(a,r),s=Math.max(s,r);for(var u=2/(o-i),c=2/(s-a),l=0;n>l;l++)t=e[2*l]=e[2*l]*u,r=e[2*l+1]=e[2*l+1]*c,i=Math.min(i,t),o=Math.max(o,t),a=Math.min(a,r),s=Math.max(s,r);if(-1>a)for(var l=0;n>l;l++)r=e[2*l+1]=e[2*l+1]+(-1-a);return e},n.generateUnitNgonPoints=function(e,t){var r=1/e*2*Math.PI,n=e%2===0?Math.PI/2+r/2:Math.PI/2;n+=t;for(var i,a,o,s=new Array(2*e),l=0;e>l;l++)i=l*r+n,a=s[2*l]=Math.cos(i),o=s[2*l+1]=Math.sin(-i);return s},n.getRoundRectangleRadius=function(e,t){return Math.min(e/4,t/4,8)},t.exports=n},{}],86:[function(e,t,r){/*!
Embeddable Minimum Strictly-Compliant Promises/A+ 1.1.1 Thenable
Copyright (c) 2013-2014 Ralf S. Engelschall (http://engelschall.com)
Licensed under The MIT License (http://opensource.org/licenses/MIT)
*/
"use strict";var n=0,i=1,a=2,o=function(e){return this instanceof o?(this.id="Thenable/1.0.7",this.state=n,this.fulfillValue=void 0,this.rejectReason=void 0,this.onFulfilled=[],this.onRejected=[],this.proxy={then:this.then.bind(this)},void("function"==typeof e&&e.call(this,this.fulfill.bind(this),this.reject.bind(this)))):new o(e)};o.prototype={fulfill:function(e){return s(this,i,"fulfillValue",e)},reject:function(e){return s(this,a,"rejectReason",e)},then:function(e,t){var r=this,n=new o;return r.onFulfilled.push(c(e,n,"fulfill")),r.onRejected.push(c(t,n,"reject")),l(r),n.proxy}};var s=function(e,t,r,i){return e.state===n&&(e.state=t,e[r]=i,l(e)),e},l=function(e){e.state===i?u(e,"onFulfilled",e.fulfillValue):e.state===a&&u(e,"onRejected",e.rejectReason)},u=function(e,t,r){if(0!==e[t].length){var n=e[t];e[t]=[];var i=function(){for(var e=0;e<n.length;e++)n[e](r)};"function"==typeof setImmediate?setImmediate(i):setTimeout(i,0)}},c=function(e,t,r){return function(n){if("function"!=typeof e)t[r].call(t,n);else{var i;try{i=e(n)}catch(a){return void t.reject(a)}d(t,i)}}},d=function(e,t){if(e===t||e.proxy===t)return void e.reject(new TypeError("cannot resolve promise with itself"));var r;if("object"==typeof t&&null!==t||"function"==typeof t)try{r=t.then}catch(n){return void e.reject(n)}if("function"!=typeof r)e.fulfill(t);else{var i=!1;try{r.call(t,function(r){i||(i=!0,r===t?e.reject(new TypeError("circular thenable chain")):d(e,r))},function(t){i||(i=!0,e.reject(t))})}catch(n){i||e.reject(n)}}};o.all=function(e){return new o(function(t,r){for(var n=new Array(e.length),i=0,a=function(r,a){n[r]=a,i++,i===e.length&&t(n)},o=0;o<e.length;o++)!function(t){var n=e[t],i=null!=n&&null!=n.then;if(i)n.then(function(e){a(t,e)},function(e){r(e)});else{var o=n;a(t,o)}}(o)})},o.resolve=function(e){return new o(function(t,r){t(e)})},o.reject=function(e){return new o(function(t,r){r(e)})},t.exports="undefined"!=typeof Promise?Promise:o},{}],87:[function(e,t,r){"use strict";var n=e("./is"),i=e("./util"),a=function(e){if(!(this instanceof a))return new a(e);var t=this;t._private={selectorText:null,invalid:!0};var r=function(){return{classes:[],colonSelectors:[],data:[],group:null,ids:[],meta:[],collection:null,filter:null,parent:null,ancestor:null,subject:null,child:null,descendant:null}};if(!e||n.string(e)&&e.match(/^\s*$/))t.length=0;else if("*"===e||"edge"===e||"node"===e)t[0]=r(),t[0].group="*"===e?e:e+"s",t[0].groupOnly=!0,t._private.invalid=!1,t._private.selectorText=e,t.length=1;else if(n.elementOrCollection(e)){var o=e.collection();t[0]=r(),t[0].collection=o,t.length=1}else if(n.fn(e))t[0]=r(),t[0].filter=e,t.length=1;else{if(!n.string(e))return void i.error("A selector must be created from a string; found "+e);var s=null,l={metaChar:"[\\!\\\"\\#\\$\\%\\&\\'\\(\\)\\*\\+\\,\\.\\/\\:\\;\\<\\=\\>\\?\\@\\[\\]\\^\\`\\{\\|\\}\\~]",comparatorOp:"=|\\!=|>|>=|<|<=|\\$=|\\^=|\\*=",boolOp:"\\?|\\!|\\^",string:'"(?:\\\\"|[^"])+"|'+"'(?:\\\\'|[^'])+'",number:i.regex.number,meta:"degree|indegree|outdegree",separator:"\\s*,\\s*",descendant:"\\s+",child:"\\s+>\\s+",subject:"\\$"};l.variable="(?:[\\w-]|(?:\\\\"+l.metaChar+"))+",l.value=l.string+"|"+l.number,l.className=l.variable,l.id=l.variable;for(var u=function(e){return e.replace(new RegExp("\\\\("+l.metaChar+")","g"),function(e,t,r,n){return t})},c=l.comparatorOp.split("|"),d=0;d<c.length;d++){var h=c[d];l.comparatorOp+="|@"+h}for(var c=l.comparatorOp.split("|"),d=0;d<c.length;d++){var h=c[d];h.indexOf("!")>=0||"="!==h&&(l.comparatorOp+="|\\!"+h)}var p=[{name:"group",query:!0,regex:"(node|edge|\\*)",populate:function(e){this.group="*"===e?e:e+"s"}},{name:"state",query:!0,regex:"(:selected|:unselected|:locked|:unlocked|:visible|:hidden|:transparent|:grabbed|:free|:removed|:inside|:grabbable|:ungrabbable|:animated|:unanimated|:selectable|:unselectable|:orphan|:nonorphan|:parent|:child|:loop|:simple|:active|:inactive|:touch|:backgrounding|:nonbackgrounding)",populate:function(e){this.colonSelectors.push(e)}},{name:"id",query:!0,regex:"\\#("+l.id+")",populate:function(e){this.ids.push(u(e))}},{name:"className",query:!0,regex:"\\.("+l.className+")",populate:function(e){this.classes.push(u(e))}},{name:"dataExists",query:!0,regex:"\\[\\s*("+l.variable+")\\s*\\]",populate:function(e){this.data.push({field:u(e)})}},{name:"dataCompare",query:!0,regex:"\\[\\s*("+l.variable+")\\s*("+l.comparatorOp+")\\s*("+l.value+")\\s*\\]",populate:function(e,t,r){var n=null!=new RegExp("^"+l.string+"$").exec(r);r=n?r.substring(1,r.length-1):parseFloat(r),this.data.push({field:u(e),operator:t,value:r})}},{name:"dataBool",query:!0,regex:"\\[\\s*("+l.boolOp+")\\s*("+l.variable+")\\s*\\]",populate:function(e,t){this.data.push({field:u(t),operator:e})}},{name:"metaCompare",query:!0,regex:"\\[\\[\\s*("+l.meta+")\\s*("+l.comparatorOp+")\\s*("+l.number+")\\s*\\]\\]",populate:function(e,t,r){this.meta.push({field:u(e),operator:t,value:parseFloat(r)})}},{name:"nextQuery",separator:!0,regex:l.separator,populate:function(){t[++d]=r(),s=null}},{name:"child",separator:!0,regex:l.child,populate:function(){var e=r();e.parent=this,e.subject=s,t[d]=e}},{name:"descendant",separator:!0,regex:l.descendant,populate:function(){var e=r();e.ancestor=this,e.subject=s,t[d]=e}},{name:"subject",modifier:!0,regex:l.subject,populate:function(){return null!=s&&this.subject!=this?(i.error("Redefinition of subject in selector `"+e+"`"),!1):(s=this,void(this.subject=this))}}];t._private.selectorText=e;var f=e,d=0,v=function(e){for(var t,r,i,a=0;a<p.length;a++){var o=p[a],s=o.name;if(!n.fn(e)||e(s,o)){var l=f.match(new RegExp("^"+o.regex));if(null!=l){r=l,t=o,i=s;var u=l[0];f=f.substring(u.length);break}}}return{expr:t,match:r,name:i}},g=function(){var e=f.match(/^\s+/);if(e){var t=e[0];f=f.substring(t.length)}};for(t[0]=r(),g();;){var y=v();if(null==y.expr)return void i.error("The selector `"+e+"`is invalid");for(var m=[],b=1;b<y.match.length;b++)m.push(y.match[b]);var x=y.expr.populate.apply(t[d],m);if(x===!1)return;if(f.match(/^\s*$/))break}t.length=d+1;for(var b=0;b<t.length;b++){var w=t[b];if(null!=w.subject){for(;w.subject!=w;)if(null!=w.parent){var E=w.parent,_=w;_.parent=null,E.child=_,w=E}else{if(null==w.ancestor){i.error("When adjusting references for the selector `"+w+"`, neither parent nor ancestor was found");break}var P=w.ancestor,S=w;S.ancestor=null,P.descendant=S,w=P}t[b]=w.subject}}}t._private.invalid=!1},o=a.prototype;o.size=function(){return this.length},o.eq=function(e){return this[e]};var s=function(e,t){var r=t._private;if(e.groupOnly)return"*"===e.group||e.group===r.group;if(null!=e.group&&"*"!=e.group&&e.group!=r.group)return!1;for(var i=t.cy(),a=!0,o=0;o<e.colonSelectors.length;o++){var l=e.colonSelectors[o];switch(l){case":selected":a=t.selected();break;case":unselected":a=!t.selected();break;case":selectable":a=t.selectable();break;case":unselectable":a=!t.selectable();break;case":locked":a=t.locked();break;case":unlocked":a=!t.locked();break;case":visible":a=t.visible();break;case":hidden":a=!t.visible();break;case":transparent":a=t.transparent();break;case":grabbed":a=t.grabbed();break;case":free":a=!t.grabbed();break;case":removed":a=t.removed();break;case":inside":a=!t.removed();break;case":grabbable":a=t.grabbable();break;case":ungrabbable":a=!t.grabbable();break;case":animated":a=t.animated();break;case":unanimated":a=!t.animated();break;case":parent":a=t.isNode()&&t.children().nonempty();break;case":child":case":nonorphan":a=t.isNode()&&t.parent().nonempty();break;case":orphan":a=t.isNode()&&t.parent().empty();break;case":loop":a=t.isEdge()&&t.data("source")===t.data("target");break;case":simple":a=t.isEdge()&&t.data("source")!==t.data("target");break;case":active":a=t.active();break;case":inactive":a=!t.active();break;case":touch":a=n.touch();break;case":backgrounding":a=t.backgrounding();break;case":nonbackgrounding":a=!t.backgrounding()}if(!a)break}if(!a)return!1;for(var u=!0,o=0;o<e.ids.length;o++){var c=e.ids[o],d=r.data.id;if(u=u&&c==d,!u)break}if(!u)return!1;for(var h=!0,o=0;o<e.classes.length;o++){var p=e.classes[o];if(h=h&&t.hasClass(p),!h)break}if(!h)return!1;var f=function(t){for(var r=!0,i=0;i<e[t.name].length;i++){var a,o=e[t.name][i],s=o.operator,l=o.value,u=o.field;if(null!=s&&null!=l){var c=t.fieldValue(u),d=n.string(c)||n.number(c)?""+c:"",h=""+l,p=!1;s.indexOf("@")>=0&&(d=d.toLowerCase(),h=h.toLowerCase(),s=s.replace("@",""),p=!0);var f=!1;s.indexOf("!")>=0&&(s=s.replace("!",""),f=!0),p&&(l=h.toLowerCase(),c=d.toLowerCase());var v=!1;switch(s){case"*=":a=d.indexOf(h)>=0;break;case"$=":a=d.indexOf(h,d.length-h.length)>=0;break;case"^=":a=0===d.indexOf(h);break;case"=":a=c===l;break;case">":v=!0,a=c>l;break;case">=":v=!0,a=c>=l;break;case"<":v=!0,a=l>c;break;case"<=":v=!0,a=l>=c;break;default:a=!1}!f||null==c&&v||(a=!a)}else if(null!=s)switch(s){case"?":a=t.fieldTruthy(u);break;case"!":a=!t.fieldTruthy(u);break;case"^":a=t.fieldUndefined(u)}else a=!t.fieldUndefined(u);if(!a){r=!1;break}}return r},v=f({name:"data",fieldValue:function(e){return r.data[e]},fieldUndefined:function(e){return void 0===r.data[e]},fieldTruthy:function(e){return!!r.data[e]}});if(!v)return!1;var g=f({name:"meta",fieldValue:function(e){return t[e]()},fieldUndefined:function(e){return null==t[e]()},fieldTruthy:function(e){return!!t[e]()}});if(!g)return!1;if(null!=e.collection){var y=e.collection.hasElementWithId(t.id());if(!y)return!1}if(null!=e.filter&&0===t.collection().filter(e.filter).size())return!1;var m=function(e,t){if(null!=e){var r=!1;if(!i.hasCompoundNodes())return!1;t=t();for(var n=0;n<t.length;n++)if(s(e,t[n])){r=!0;break}return r}return!0};return m(e.parent,function(){return t.parent()})&&m(e.ancestor,function(){return t.parents()})&&m(e.child,function(){return t.children()})?!!m(e.descendant,function(){return t.descendants()}):!1};o.filter=function(e){var t=this,r=e.cy();if(t._private.invalid)return r.collection();var n=function(e,r){for(var n=0;n<t.length;n++){var i=t[n];if(s(i,r))return!0}return!1};null==t._private.selectorText&&(n=function(){return!0});var i=e.filter(n);return i},o.matches=function(e){var t=this;if(t._private.invalid)return!1;for(var r=0;r<t.length;r++){var n=t[r];if(s(n,e))return!0}return!1},o.toString=o.selector=function(){for(var e="",t=function(e){return null==e?"":e},r=function(e){return n.string(e)?'"'+e+'"':t(e)},i=function(e){return" "+e+" "},a=function(e){var n="";e.subject===e&&(n+="$");var s=t(e.group);n+=s.substring(0,s.length-1);for(var l=0;l<e.data.length;l++){var u=e.data[l];n+=u.value?"["+u.field+i(t(u.operator))+r(u.value)+"]":"["+t(u.operator)+u.field+"]"}for(var l=0;l<e.meta.length;l++){var c=e.meta[l];n+="[["+c.field+i(t(c.operator))+r(c.value)+"]]"}for(var l=0;l<e.colonSelectors.length;l++){var d=e.colonSelectors[o];n+=d}for(var l=0;l<e.ids.length;l++){var d="#"+e.ids[o];n+=d}for(var l=0;l<e.classes.length;l++){var d="."+e.classes[l];n+=d}return null!=e.parent&&(n=a(e.parent)+" > "+n),null!=e.ancestor&&(n=a(e.ancestor)+" "+n),null!=e.child&&(n+=" > "+a(e.child)),null!=e.descendant&&(n+=" "+a(e.descendant)),n},o=0;o<this.length;o++){var s=this[o];e+=a(s),this.length>1&&o<this.length-1&&(e+=", ")}return e},t.exports=a},{"./is":83,"./util":100}],88:[function(e,t,r){"use strict";var n=e("../util"),i=e("../is"),a={};a.apply=function(e){var t=this,r=t._private;r.newStyle&&(r.contextStyles={},r.propDiffs={},t.cleanElements(e,!0));for(var n=0;n<e.length;n++){var i=e[n],a=t.getContextMeta(i),o=t.getContextStyle(a),s=t.applyContextStyle(a,o,i);t.updateTransitions(i,s.diffProps),t.updateStyleHints(i)}r.newStyle=!1},a.getPropertiesDiff=function(e,t){var r=this,n=r._private.propDiffs=r._private.propDiffs||{},i=e+"-"+t,a=n[i];if(a)return a;for(var o=[],s={},l=0;l<r.length;l++){var u=r[l],c="t"===e[l],d="t"===t[l],h=c!==d,p=u.mappedProperties.length>0;if(h||p){var f;h&&p?f=u.properties:h?f=u.properties:p&&(f=u.mappedProperties);for(var v=0;v<f.length;v++){for(var g=f[v],y=g.name,m=!1,b=l+1;b<r.length;b++){var x=r[b],w="t"===t[b];if(w&&(m=null!=x.properties[g.name]))break}s[y]||m||(s[y]=!0,o.push(y))}}}return n[i]=o,o},a.getContextMeta=function(e){var t,r=this,n="",i=e._private.styleCxtKey||"";r._private.newStyle&&(i="");for(var a=0;a<r.length;a++){var o=r[a],s=o.selector&&o.selector.matches(e);n+=s?"t":"f"}return t=r.getPropertiesDiff(i,n),e._private.styleCxtKey=n,{key:n,diffPropNames:t}},a.getContextStyle=function(e){var t=e.key,r=this,n=this._private.contextStyles=this._private.contextStyles||{};if(n[t])return n[t];for(var i={_private:{key:t}},a=0;a<r.length;a++){var o=r[a],s="t"===t[a];if(s)for(var l=0;l<o.properties.length;l++){var u=o.properties[l],c=i[u.name]=u;c.context=o}}return n[t]=i,i},a.applyContextStyle=function(e,t,r){for(var n=this,i=e.diffPropNames,a={},o=0;o<i.length;o++){var s=i[o],l=t[s],u=r.pstyle(s);if(!l){if(!u)continue;l=u.bypass?{name:s,deleteBypassed:!0}:{name:s,"delete":!0}}if(u!==l){var c=a[s]={prev:u};n.applyParsedProperty(r,l),c.next=r.pstyle(s),c.next&&c.next.bypass&&(c.next=c.next.bypassed)}}return{diffProps:a}},a.updateStyleHints=function(e){var t=e._private,r=this;if(!e.removed()){var n=!1;if("nodes"===t.group)for(var i=1;i<=r.pieBackgroundN;i++){var a=e.pstyle("pie-"+i+"-background-size").value;if(a>0){n=!0;break}}t.hasPie=n;var o=e.pstyle("text-transform").strValue,s=e.pstyle("label").strValue,l=e.pstyle("source-label").strValue,u=e.pstyle("target-label").strValue,c=e.pstyle("font-style").strValue,a=e.pstyle("font-size").pfValue+"px",d=e.pstyle("font-family").strValue,h=e.pstyle("font-weight").strValue,p=e.pstyle("text-valign").strValue,f=e.pstyle("text-valign").strValue,v=e.pstyle("text-outline-width").pfValue,g=e.pstyle("text-wrap").strValue,y=e.pstyle("text-max-width").pfValue,m=c+"$"+a+"$"+d+"$"+h+"$"+o+"$"+p+"$"+f+"$"+v+"$"+g+"$"+y;t.labelStyleKey=m,t.sourceLabelKey=m+"$"+l,t.targetLabelKey=m+"$"+u,t.labelKey=m+"$"+s,t.fontKey=c+"$"+h+"$"+a+"$"+d,t.styleKey=Date.now()}},a.applyParsedProperty=function(e,t){var r,a,o=this,s=t,l=e._private.style,u=o.types,c=o.properties[s.name].type,d=s.bypass,h=l[s.name],p=h&&h.bypass,f=e._private;if("curve-style"===t.name&&"haystack"===t.value&&e.isEdge()&&(e.isLoop()||e.source().isParent()||e.target().isParent())&&(s=t=this.parse(t.name,"bezier",d)),s["delete"])return l[s.name]=void 0,!0;if(s.deleteBypassed)return h?h.bypass?(h.bypassed=void 0,!0):!1:!0;if(s.deleteBypass)return h?h.bypass?(l[s.name]=h.bypassed,!0):!1:!0;var v=function(){n.error("Do not assign mappings to elements without corresponding data (e.g. ele `"+e.id()+"` for property `"+s.name+"` with data field `"+s.field+"`); try a `["+s.field+"]` selector to limit scope to elements with `"+s.field+"` defined")};switch(s.mapped){case u.mapData:case u.mapLayoutData:case u.mapScratch:var r,g=s.mapped===u.mapLayoutData,y=s.mapped===u.mapScratch,m=s.field.split(".");r=y||g?f.scratch:f.data;for(var b=0;b<m.length&&r;b++){var x=m[b];r=r[x]}var w;if(w=i.number(r)?(r-s.fieldMin)/(s.fieldMax-s.fieldMin):0,0>w?w=0:w>1&&(w=1),c.color){var E=s.valueMin[0],_=s.valueMax[0],P=s.valueMin[1],S=s.valueMax[1],k=s.valueMin[2],T=s.valueMax[2],D=null==s.valueMin[3]?1:s.valueMin[3],C=null==s.valueMax[3]?1:s.valueMax[3],M=[Math.round(E+(_-E)*w),Math.round(P+(S-P)*w),Math.round(k+(T-k)*w),Math.round(D+(C-D)*w)];a={bypass:s.bypass,name:s.name,value:M,strValue:"rgb("+M[0]+", "+M[1]+", "+M[2]+")"}}else{if(!c.number)return!1;var N=s.valueMin+(s.valueMax-s.valueMin)*w;a=this.parse(s.name,N,s.bypass,!0)}a||(a=this.parse(s.name,h.strValue,s.bypass,!0)),a||v(),a.mapping=s,s=a;break;case u.data:case u.layoutData:case u.scratch:var r,g=s.mapped===u.layoutData,y=s.mapped===u.scratch,m=s.field.split(".");if(r=y||g?f.scratch:f.data)for(var b=0;b<m.length;b++){var x=m[b];r=r[x]}if(a=this.parse(s.name,r,s.bypass,!0),!a){var B=h?h.strValue:"";a=this.parse(s.name,B,s.bypass,!0)}a||v(),a.mapping=s,s=a;break;case u.fn:var z=s.value,I=z(e);a=this.parse(s.name,I,s.bypass,!0),a.mapping=s,s=a;break;case void 0:break;default:return!1}return d?(p?s.bypassed=h.bypassed:s.bypassed=h,l[s.name]=s):p?h.bypassed=s:l[s.name]=s,!0},a.cleanElements=function(e,t){for(var r=this,n=r.properties,i=0;i<e.length;i++){var a=e[i];if(t)for(var o=a._private.style,s=0;s<n.length;s++){var l=n[s],u=o[l.name];u&&(u.bypass?u.bypassed=null:o[l.name]=null)}else a._private.style={}}},a.update=function(){var e=this._private.cy,t=e.mutableElements();t.updateStyle()},a.updateMappers=function(e){for(var t=this,r=0;r<e.length;r++){for(var n=e[r],i=n._private.style,a=0;a<t.properties.length;a++){var o=t.properties[a],s=i[o.name];if(s&&s.mapping){var l=s.mapping;this.applyParsedProperty(n,l)}}this.updateStyleHints(n)}},a.updateTransitions=function(e,t,r){var n=this,a=e._private,o=e.pstyle("transition-property").value,s=e.pstyle("transition-duration").pfValue,l=e.pstyle("transition-delay").pfValue;if(o.length>0&&s>0){for(var u={},c=!1,d=0;d<o.length;d++){var h=o[d],p=e.pstyle(h),f=t[h];if(f){var v,g=f.prev,y=g,m=null!=f.next?f.next:p,b=!1,x=1e-6;y&&(i.number(y.pfValue)&&i.number(m.pfValue)?(b=m.pfValue-y.pfValue,v=y.pfValue+x*b):i.number(y.value)&&i.number(m.value)?(b=m.value-y.value,v=y.value+x*b):i.array(y.value)&&i.array(m.value)&&(b=y.value[0]!==m.value[0]||y.value[1]!==m.value[1]||y.value[2]!==m.value[2],v=y.strValue),b&&(u[h]=m.strValue,this.applyBypass(e,h,v),c=!0))}}if(!c)return;a.transitioning=!0,e.stop(),l>0&&e.delay(l),e.animate({css:u},{duration:s,easing:e.pstyle("transition-timing-function").value,queue:!1,complete:function(){r||n.removeBypasses(e,o),a.transitioning=!1}})}else a.transitioning&&(e.stop(),this.removeBypasses(e,o),a.transitioning=!1)},t.exports=a},{"../is":83,"../util":100}],89:[function(e,t,r){"use strict";var n=e("../is"),i=e("../util"),a={};a.applyBypass=function(e,t,r,a){var o=this,s=[],l=!0;if("*"===t||"**"===t){if(void 0!==r)for(var u=0;u<o.properties.length;u++){var c=o.properties[u],t=c.name,d=this.parse(t,r,!0);d&&s.push(d)}}else if(n.string(t)){var d=this.parse(t,r,!0);d&&s.push(d)}else{if(!n.plainObject(t))return!1;var h=t;a=r;for(var u=0;u<o.properties.length;u++){var c=o.properties[u],t=c.name,r=h[t];if(void 0===r&&(r=h[i.dash2camel(t)]),void 0!==r){var d=this.parse(t,r,!0);d&&s.push(d)}}}if(0===s.length)return!1;for(var p=!1,u=0;u<e.length;u++){for(var f,v=e[u],g={},y=0;y<s.length;y++){var c=s[y];if(a){var m=v.pstyle(c.name);f=g[c.name]={prev:m}}p=this.applyParsedProperty(v,c)||p,a&&(f.next=v.pstyle(c.name))}p&&this.updateStyleHints(v),a&&this.updateTransitions(v,g,l)}return p},a.overrideBypass=function(e,t,r){t=i.camel2dash(t);for(var n=0;n<e.length;n++){var a=e[n],o=a._private.style[t],s=this.properties[t].type,l=s.color,u=s.mutiple;o&&o.bypass?(o.value=r,null!=o.pfValue&&(o.pfValue=r),l?o.strValue="rgb("+r.join(",")+")":u?o.strValue=r.join(" "):o.strValue=""+r):this.applyBypass(a,t,r)}},a.removeAllBypasses=function(e,t){return this.removeBypasses(e,this.propertyNames,t)},a.removeBypasses=function(e,t,r){for(var n=!0,i=0;i<e.length;i++){for(var a=e[i],o={},s=0;s<t.length;s++){var l=t[s],u=this.properties[l],c=a.pstyle(u.name);if(c&&c.bypass){var d="",h=this.parse(l,d,!0),p=o[u.name]={prev:c};this.applyParsedProperty(a,h),p.next=a.pstyle(u.name)}}this.updateStyleHints(a),r&&this.updateTransitions(a,o,n)}},t.exports=a},{"../is":83,"../util":100}],90:[function(e,t,r){"use strict";var n=e("../window"),i={};i.getEmSizeInPixels=function(){var e=this.containerCss("font-size");return null!=e?parseFloat(e):1},i.containerCss=function(e){var t=this._private.cy,r=t.container();return n&&r&&n.getComputedStyle?n.getComputedStyle(r).getPropertyValue(e):void 0},t.exports=i},{"../window":107}],91:[function(e,t,r){"use strict";var n=e("../util"),i=e("../is"),a={};a.getRenderedStyle=function(e){return this.getRawStyle(e,!0)},a.getRawStyle=function(e,t){var r=this,e=e[0];if(e){for(var i={},a=0;a<r.properties.length;a++){var o=r.properties[a],s=r.getStylePropertyValue(e,o.name,t);s&&(i[o.name]=s,i[n.dash2camel(o.name)]=s)}return i}},a.getStylePropertyValue=function(e,t,r){var n=this,e=e[0];if(e){var i=n.properties[t],a=i.type,o=e.pstyle(i.name),s=e.cy().zoom();if(o){var l=o.units?a.implicitUnits||"px":null,u=l?[].concat(o.pfValue).map(function(e){return e*(r?s:1)+l}).join(" "):o.strValue;return u}}},a.getAnimationStartStyle=function(e,t){for(var r={},n=0;n<t.length;n++){var a=t[n],o=a.name,s=e.pstyle(o);void 0!==s&&(s=i.plainObject(s)?this.parse(o,s.strValue):this.parse(o,s)),s&&(r[o]=s)}return r},a.getPropsList=function(e){var t=this,r=[],i=e,a=t.properties;if(i)for(var o=Object.keys(i),s=0;s<o.length;s++){var l=o[s],u=i[l],c=a[l]||a[n.camel2dash(l)],d=this.parse(c.name,u);r.push(d)}return r},t.exports=a},{"../is":83,"../util":100}],92:[function(e,t,r){"use strict";var n=e("../is"),i=e("../util"),a=e("../selector"),o=function(e){return this instanceof o?n.core(e)?(this._private={cy:e,coreStyle:{}},this.length=0,void this.resetToDefault()):void i.error("A style must have a core reference"):new o(e)},s=o.prototype;s.instanceString=function(){return"style"},s.clear=function(){for(var e=0;e<this.length;e++)this[e]=void 0;this.length=0;var t=this._private;return t.newStyle=!0,this},s.resetToDefault=function(){return this.clear(),this.addDefaultStylesheet(),this},s.core=function(){return this._private.coreStyle},s.selector=function(e){var t="core"===e?null:new a(e),r=this.length++;return this[r]={selector:t,properties:[],mappedProperties:[],index:r},this},s.css=function(){var e=this,t=arguments;switch(t.length){case 1:for(var r=t[0],n=0;n<e.properties.length;n++){var a=e.properties[n],o=r[a.name];void 0===o&&(o=r[i.dash2camel(a.name)]),void 0!==o&&this.cssRule(a.name,o)}break;case 2:this.cssRule(t[0],t[1])}return this},s.style=s.css,s.cssRule=function(e,t){var r=this.parse(e,t);if(r){var n=this.length-1;this[n].properties.push(r),this[n].properties[r.name]=r,r.name.match(/pie-(\d+)-background-size/)&&r.value&&(this._private.hasPie=!0),r.mapped&&this[n].mappedProperties.push(r);var i=!this[n].selector;i&&(this._private.coreStyle[r.name]=r)}return this},o.fromJson=function(e,t){var r=new o(e);return r.fromJson(t),r},o.fromString=function(e,t){return new o(e).fromString(t)},[e("./apply"),e("./bypass"),e("./container"),e("./get-for-ele"),e("./json"),e("./string-sheet"),e("./properties"),e("./parse")].forEach(function(e){i.extend(s,e)}),o.types=s.types,o.properties=s.properties,t.exports=o},{"../is":83,"../selector":87,"../util":100,"./apply":88,"./bypass":89,"./container":90,"./get-for-ele":91,"./json":93,"./parse":94,"./properties":95,"./string-sheet":96}],93:[function(e,t,r){"use strict";var n={};n.applyFromJson=function(e){for(var t=this,r=0;r<e.length;r++){var n=e[r],i=n.selector,a=n.style||n.css,o=Object.keys(a);t.selector(i);for(var s=0;s<o.length;s++){var l=o[s],u=a[l];t.css(l,u)}}return t},n.fromJson=function(e){var t=this;return t.resetToDefault(),t.applyFromJson(e),t},n.json=function(){for(var e=[],t=this.defaultLength;t<this.length;t++){for(var r=this[t],n=r.selector,i=r.properties,a={},o=0;o<i.length;o++){var s=i[o];a[s.name]=s.strValue}e.push({selector:n?n.toString():"core",style:a})}return e},t.exports=n},{}],94:[function(e,t,r){"use strict";var n=e("../util"),i=e("../is"),a=e("../math"),o={};o.parse=function(e,t,r,a){var o=this;if(i.fn(t))return o.parseImpl(e,t,r,a);var s,l=[e,t,r,a].join("$"),u=o.propCache=o.propCache||{};return(s=u[l])||(s=u[l]=o.parseImpl(e,t,r,a)),s=n.copy(s),s&&(s.value=n.copy(s.value)),s};var s=function(e,t,r,o){var s=this;e=n.camel2dash(e);var l=s.properties[e],u=t,c=s.types;if(!l)return null;if(void 0===t||null===t)return null;l.alias&&(l=l.pointsTo,e=l.name);var d=i.string(t);d&&(t=t.trim());var h=l.type;if(!h)return null;if(r&&(""===t||null===t))return{name:e,value:t,bypass:!0,deleteBypass:!0};if(i.fn(t))return{name:e,value:t,strValue:"fn",mapped:c.fn,bypass:r};var p,f,v,g,y,m;if(!d||o);else{if((p=new RegExp(c.data.regex).exec(t))||(v=new RegExp(c.layoutData.regex).exec(t))||(y=new RegExp(c.scratch.regex).exec(t))){if(r)return!1;var b;return b=p?c.data:v?c.layoutData:c.scratch,p=p||v||y,{name:e,value:p,strValue:""+t,mapped:b,field:p[1],bypass:r}}if((f=new RegExp(c.mapData.regex).exec(t))||(g=new RegExp(c.mapLayoutData.regex).exec(t))||(m=new RegExp(c.mapScratch.regex).exec(t))){if(r)return!1;if(h.multiple)return!1;var b;if(b=f?c.mapData:g?c.mapLayoutData:c.mapScratch,f=f||g||m,!h.color&&!h.number)return!1;var x=this.parse(e,f[4]);if(!x||x.mapped)return!1;var w=this.parse(e,f[5]);if(!w||w.mapped)return!1;if(x.value===w.value)return!1;if(h.color){var E=x.value,_=w.value,P=!(E[0]!==_[0]||E[1]!==_[1]||E[2]!==_[2]||E[3]!==_[3]&&(null!=E[3]&&1!==E[3]||null!=_[3]&&1!==_[3]));if(P)return!1}return{name:e,value:f,strValue:""+t,mapped:b,field:f[1],fieldMin:parseFloat(f[2]),fieldMax:parseFloat(f[3]),valueMin:x.value,valueMax:w.value,bypass:r}}}if(h.multiple&&"multiple"!==o){var S;if(S=d?t.split(/\s+/):i.array(t)?t:[t],h.evenMultiple&&S.length%2!==0)return null;var k=S.map(function(t){var n=s.parse(e,t,r,"multiple");return null!=n.pfValue?n.pfValue:n.value});return{name:e,value:k,pfValue:k,strValue:k.join(" "),bypass:r,units:h.number&&!h.unitless?h.implicitUnits||"px":void 0}}var T=function(){for(var n=0;n<h.enums.length;n++){var i=h.enums[n];if(i===t)return{name:e,value:t,strValue:""+t,bypass:r}}return null};if(h.number){var D,C="px";if(h.units&&(D=h.units),h.implicitUnits&&(C=h.implicitUnits),!h.unitless)if(d){var M="px|em"+(h.allowPercent?"|\\%":"");D&&(M=D);var N=t.match("^("+n.regex.number+")("+M+")?$");N&&(t=N[1],D=N[2]||C)}else D&&!h.implicitUnits||(D=C);if(t=parseFloat(t),isNaN(t)&&void 0===h.enums)return null;if(isNaN(t)&&void 0!==h.enums)return t=u,T();if(h.integer&&!i.integer(t))return null;if(void 0!==h.min&&t<h.min||void 0!==h.max&&t>h.max)return null;var B={name:e,value:t,strValue:""+t+(D?D:""),units:D,bypass:r};return h.unitless||"px"!==D&&"em"!==D?B.pfValue=t:B.pfValue="px"!==D&&D?this.getEmSizeInPixels()*t:t,"ms"!==D&&"s"!==D||(B.pfValue="ms"===D?t:1e3*t),"deg"!==D&&"rad"!==D||(B.pfValue="rad"===D?t:a.deg2rad(t)),B}if(h.propList){var z=[],I=""+t;if("none"===I);else{for(var L=I.split(","),O=0;O<L.length;O++){var A=L[O].trim();s.properties[A]&&z.push(A)}if(0===z.length)return null}return{name:e,value:z,strValue:0===z.length?"none":z.join(", "),bypass:r}}if(h.color){var R=n.color2tuple(t);return R?{name:e,value:R,strValue:""+t,bypass:r,roundValue:!0}:null}if(h.regex||h.regexes){if(h.enums){var q=T();if(q)return q}for(var V=h.regexes?h.regexes:[h.regex],O=0;O<V.length;O++){var F=new RegExp(V[O]),j=F.exec(t);if(j)return{name:e,value:j,strValue:""+t,bypass:r}}return null}return h.string?{name:e,value:t,strValue:""+t,bypass:r}:h.enums?T():null};o.parseImpl=s,t.exports=o},{"../is":83,"../math":85,"../util":100}],95:[function(e,t,r){"use strict";var n=e("../util"),i={};!function(){var e=n.regex.number,t=n.regex.rgbaNoBackRefs,r=n.regex.hslaNoBackRefs,a=n.regex.hex3,o=n.regex.hex6,s=function(e){return"^"+e+"\\s*\\(\\s*([\\w\\.]+)\\s*\\)$"},l=function(n){var i=e+"|\\w+|"+t+"|"+r+"|"+a+"|"+o;return"^"+n+"\\s*\\(([\\w\\.]+)\\s*\\,\\s*("+e+")\\s*\\,\\s*("+e+")\\s*,\\s*("+i+")\\s*\\,\\s*("+i+")\\)$"};i.types={time:{number:!0,min:0,units:"s|ms",implicitUnits:"ms"},percent:{number:!0,min:0,max:100,units:"%",implicitUnits:"%"},zeroOneNumber:{number:!0,min:0,max:1,unitless:!0},nOneOneNumber:{number:!0,min:-1,max:1,unitless:!0},nonNegativeInt:{number:!0,min:0,integer:!0,unitless:!0},position:{enums:["parent","origin"]},nodeSize:{number:!0,min:0,enums:["label"]},number:{number:!0,unitless:!0},numbers:{number:!0,unitless:!0,multiple:!0},size:{number:!0,min:0},bidirectionalSize:{number:!0},bidirectionalSizes:{number:!0,multiple:!0},bgSize:{number:!0,min:0,allowPercent:!0},bgWH:{number:!0,min:0,allowPercent:!0,enums:["auto"]},bgPos:{number:!0,allowPercent:!0},bgRepeat:{enums:["repeat","repeat-x","repeat-y","no-repeat"]},bgFit:{enums:["none","contain","cover"]},bgClip:{enums:["none","node"]},color:{color:!0},bool:{enums:["yes","no"]},lineStyle:{enums:["solid","dotted","dashed"]},borderStyle:{enums:["solid","dotted","dashed","double"]},curveStyle:{enums:["bezier","unbundled-bezier","haystack","segments"]},fontFamily:{regex:'^([\\w- \\"]+(?:\\s*,\\s*[\\w- \\"]+)*)$'},fontVariant:{enums:["small-caps","normal"]},fontStyle:{enums:["italic","normal","oblique"]},fontWeight:{enums:["normal","bold","bolder","lighter","100","200","300","400","500","600","800","900",100,200,300,400,500,600,700,800,900]},textDecoration:{enums:["none","underline","overline","line-through"]},textTransform:{enums:["none","uppercase","lowercase"]},textWrap:{enums:["none","wrap"]},textBackgroundShape:{enums:["rectangle","roundrectangle"]},nodeShape:{enums:["rectangle","roundrectangle","ellipse","triangle","square","pentagon","hexagon","heptagon","octagon","star","diamond","vee","rhomboid","polygon"]},compoundIncludeLabels:{enums:["include","exclude"]},arrowShape:{enums:["tee","triangle","triangle-tee","triangle-backcurve","half-triangle-overshot","vee","square","circle","diamond","none"]},arrowFill:{enums:["filled","hollow"]},display:{enums:["element","none"]},visibility:{enums:["hidden","visible"]},valign:{enums:["top","center","bottom"]},halign:{enums:["left","center","right"]},text:{string:!0},data:{mapping:!0,regex:s("data")},layoutData:{mapping:!0,regex:s("layoutData")},scratch:{mapping:!0,regex:s("scratch")},mapData:{mapping:!0,regex:l("mapData")},mapLayoutData:{mapping:!0,regex:l("mapLayoutData")},mapScratch:{mapping:!0,regex:l("mapScratch")},fn:{mapping:!0,fn:!0},url:{regex:"url\\s*\\(\\s*['\"]?(.+?)['\"]?\\s*\\)|none|(.+)$"},propList:{propList:!0},angle:{number:!0,units:"deg|rad",implicitUnits:"rad"},textRotation:{number:!0,units:"deg|rad",implicitUnits:"rad",enums:["none","autorotate"]},polygonPointList:{number:!0,multiple:!0,evenMultiple:!0,min:-1,max:1,unitless:!0},edgeDistances:{enums:["intersection","node-position"]},easing:{regexes:["^(spring)\\s*\\(\\s*("+e+")\\s*,\\s*("+e+")\\s*\\)$","^(cubic-bezier)\\s*\\(\\s*("+e+")\\s*,\\s*("+e+")\\s*,\\s*("+e+")\\s*,\\s*("+e+")\\s*\\)$"],enums:["linear","ease","ease-in","ease-out","ease-in-out","ease-in-sine","ease-out-sine","ease-in-out-sine","ease-in-quad","ease-out-quad","ease-in-out-quad","ease-in-cubic","ease-out-cubic","ease-in-out-cubic","ease-in-quart","ease-out-quart","ease-in-out-quart","ease-in-quint","ease-out-quint","ease-in-out-quint","ease-in-expo","ease-out-expo","ease-in-out-expo","ease-in-circ","ease-out-circ","ease-in-out-circ"]}};var u=i.types,c=i.properties=[{name:"label",type:u.text},{name:"text-rotation",type:u.textRotation},{name:"text-margin-x",type:u.bidirectionalSize},{name:"text-margin-y",type:u.bidirectionalSize},{name:"source-label",type:u.text},{name:"source-text-rotation",type:u.textRotation},{name:"source-text-margin-x",type:u.bidirectionalSize},{name:"source-text-margin-y",type:u.bidirectionalSize},{name:"source-text-offset",type:u.size},{name:"target-label",type:u.text},{name:"target-text-rotation",type:u.textRotation},{name:"target-text-margin-x",type:u.bidirectionalSize},{name:"target-text-margin-y",type:u.bidirectionalSize},{name:"target-text-offset",type:u.size},{name:"text-valign",type:u.valign},{name:"text-halign",type:u.halign},{name:"color",type:u.color},{name:"text-outline-color",type:u.color},{name:"text-outline-width",type:u.size},{name:"text-outline-opacity",type:u.zeroOneNumber},{name:"text-opacity",type:u.zeroOneNumber},{name:"text-background-color",type:u.color},{name:"text-background-margin",type:u.size},{name:"text-background-opacity",type:u.zeroOneNumber},{name:"text-border-opacity",type:u.zeroOneNumber},{name:"text-border-color",type:u.color},{name:"text-border-width",type:u.size},{name:"text-border-style",type:u.borderStyle},{name:"text-background-shape",type:u.textBackgroundShape},{name:"text-transform",type:u.textTransform},{name:"text-wrap",type:u.textWrap},{name:"text-max-width",type:u.size},{name:"text-events",type:u.bool},{name:"font-family",type:u.fontFamily},{name:"font-style",type:u.fontStyle},{name:"font-weight",type:u.fontWeight},{name:"font-size",type:u.size},{name:"min-zoomed-font-size",
type:u.size},{name:"events",type:u.bool},{name:"display",type:u.display},{name:"visibility",type:u.visibility},{name:"opacity",type:u.zeroOneNumber},{name:"z-index",type:u.nonNegativeInt},{name:"overlay-padding",type:u.size},{name:"overlay-color",type:u.color},{name:"overlay-opacity",type:u.zeroOneNumber},{name:"shadow-blur",type:u.size},{name:"shadow-color",type:u.color},{name:"shadow-opacity",type:u.zeroOneNumber},{name:"shadow-offset-x",type:u.bidirectionalSize},{name:"shadow-offset-y",type:u.bidirectionalSize},{name:"text-shadow-blur",type:u.size},{name:"text-shadow-color",type:u.color},{name:"text-shadow-opacity",type:u.zeroOneNumber},{name:"text-shadow-offset-x",type:u.bidirectionalSize},{name:"text-shadow-offset-y",type:u.bidirectionalSize},{name:"transition-property",type:u.propList},{name:"transition-duration",type:u.time},{name:"transition-delay",type:u.time},{name:"transition-timing-function",type:u.easing},{name:"height",type:u.nodeSize},{name:"width",type:u.nodeSize},{name:"shape",type:u.nodeShape},{name:"shape-polygon-points",type:u.polygonPointList},{name:"background-color",type:u.color},{name:"background-opacity",type:u.zeroOneNumber},{name:"background-blacken",type:u.nOneOneNumber},{name:"padding-left",type:u.size},{name:"padding-right",type:u.size},{name:"padding-top",type:u.size},{name:"padding-bottom",type:u.size},{name:"border-color",type:u.color},{name:"border-opacity",type:u.zeroOneNumber},{name:"border-width",type:u.size},{name:"border-style",type:u.borderStyle},{name:"background-image",type:u.url},{name:"background-image-opacity",type:u.zeroOneNumber},{name:"background-position-x",type:u.bgPos},{name:"background-position-y",type:u.bgPos},{name:"background-repeat",type:u.bgRepeat},{name:"background-fit",type:u.bgFit},{name:"background-clip",type:u.bgClip},{name:"background-width",type:u.bgWH},{name:"background-height",type:u.bgWH},{name:"position",type:u.position},{name:"compound-sizing-wrt-labels",type:u.compoundIncludeLabels},{name:"line-style",type:u.lineStyle},{name:"line-color",type:u.color},{name:"curve-style",type:u.curveStyle},{name:"haystack-radius",type:u.zeroOneNumber},{name:"control-point-step-size",type:u.size},{name:"control-point-distances",type:u.bidirectionalSizes},{name:"control-point-weights",type:u.numbers},{name:"segment-distances",type:u.bidirectionalSizes},{name:"segment-weights",type:u.numbers},{name:"edge-distances",type:u.edgeDistances},{name:"selection-box-color",type:u.color},{name:"selection-box-opacity",type:u.zeroOneNumber},{name:"selection-box-border-color",type:u.color},{name:"selection-box-border-width",type:u.size},{name:"active-bg-color",type:u.color},{name:"active-bg-opacity",type:u.zeroOneNumber},{name:"active-bg-size",type:u.size},{name:"outside-texture-bg-color",type:u.color},{name:"outside-texture-bg-opacity",type:u.zeroOneNumber}],d=i.aliases=[{name:"content",pointsTo:"label"},{name:"control-point-distance",pointsTo:"control-point-distances"},{name:"control-point-weight",pointsTo:"control-point-weights"},{name:"edge-text-rotation",pointsTo:"text-rotation"}];i.pieBackgroundN=16,c.push({name:"pie-size",type:u.bgSize});for(var h=1;h<=i.pieBackgroundN;h++)c.push({name:"pie-"+h+"-background-color",type:u.color}),c.push({name:"pie-"+h+"-background-size",type:u.percent}),c.push({name:"pie-"+h+"-background-opacity",type:u.zeroOneNumber});var p=i.arrowPrefixes=["source","mid-source","target","mid-target"];[{name:"arrow-shape",type:u.arrowShape},{name:"arrow-color",type:u.color},{name:"arrow-fill",type:u.arrowFill}].forEach(function(e){p.forEach(function(t){var r=t+"-"+e.name,n=e.type;c.push({name:r,type:n})})},{}),i.propertyNames=c.map(function(e){return e.name});for(var h=0;h<c.length;h++){var f=c[h];c[f.name]=f}for(var h=0;h<d.length;h++){var v=d[h],g=c[v.pointsTo],y={name:v.name,alias:!0,pointsTo:g};c.push(y),c[v.name]=y}}(),i.getDefaultProperty=function(e){return this.getDefaultProperties()[e]},i.getDefaultProperties=n.memoize(function(){for(var e=n.extend({events:"yes","text-events":"no","text-valign":"top","text-halign":"center",color:"#000","text-outline-color":"#000","text-outline-width":0,"text-outline-opacity":1,"text-opacity":1,"text-decoration":"none","text-transform":"none","text-wrap":"none","text-max-width":9999,"text-background-color":"#000","text-background-opacity":0,"text-background-margin":0,"text-border-opacity":0,"text-border-width":0,"text-border-style":"solid","text-border-color":"#000","text-background-shape":"rectangle","font-family":"Helvetica Neue, Helvetica, sans-serif","font-style":"normal","font-weight":"normal","font-size":16,"min-zoomed-font-size":0,"text-rotation":"none","source-text-rotation":"none","target-text-rotation":"none",visibility:"visible",display:"element",opacity:1,"z-index":0,label:"","text-margin-x":0,"text-margin-y":0,"source-label":"","source-text-offset":0,"source-text-margin-x":0,"source-text-margin-y":0,"target-label":"","target-text-offset":0,"target-text-margin-x":0,"target-text-margin-y":0,"overlay-opacity":0,"overlay-color":"#000","overlay-padding":10,"shadow-opacity":0,"shadow-color":"#000","shadow-blur":10,"shadow-offset-x":0,"shadow-offset-y":0,"text-shadow-opacity":0,"text-shadow-color":"#000","text-shadow-blur":5,"text-shadow-offset-x":0,"text-shadow-offset-y":0,"transition-property":"none","transition-duration":0,"transition-delay":0,"transition-timing-function":"linear","background-blacken":0,"background-color":"#999","background-opacity":1,"background-image":"none","background-image-opacity":1,"background-position-x":"50%","background-position-y":"50%","background-repeat":"no-repeat","background-fit":"none","background-clip":"node","background-width":"auto","background-height":"auto","border-color":"#000","border-opacity":1,"border-width":0,"border-style":"solid",height:30,width:30,shape:"ellipse","shape-polygon-points":"-1, -1,   1, -1,   1, 1,   -1, 1","padding-top":0,"padding-bottom":0,"padding-left":0,"padding-right":0,position:"origin","compound-sizing-wrt-labels":"include"},{"pie-size":"100%"},[{name:"pie-{{i}}-background-color",value:"black"},{name:"pie-{{i}}-background-size",value:"0%"},{name:"pie-{{i}}-background-opacity",value:1}].reduce(function(e,t){for(var r=1;r<=i.pieBackgroundN;r++){var n=t.name.replace("{{i}}",r),a=t.value;e[n]=a}return e},{}),{"line-style":"solid","line-color":"#999","control-point-step-size":40,"control-point-weights":.5,"segment-weights":.5,"segment-distances":20,"edge-distances":"intersection","curve-style":"bezier","haystack-radius":0},[{name:"arrow-shape",value:"none"},{name:"arrow-color",value:"#999"},{name:"arrow-fill",value:"filled"}].reduce(function(e,t){return i.arrowPrefixes.forEach(function(r){var n=r+"-"+t.name,i=t.value;e[n]=i}),e},{})),t={},r=0;r<this.properties.length;r++){var a=this.properties[r];if(!a.pointsTo){var o=a.name,s=e[o],l=this.parse(o,s);t[o]=l}}return t}),i.addDefaultStylesheet=function(){this.selector("$node > node").css({shape:"rectangle","padding-top":10,"padding-right":10,"padding-left":10,"padding-bottom":10,"background-color":"#eee","border-color":"#ccc","border-width":1}).selector("edge").css({width:3,"curve-style":"haystack"}).selector(":selected").css({"background-color":"#0169D9","line-color":"#0169D9","source-arrow-color":"#0169D9","target-arrow-color":"#0169D9","mid-source-arrow-color":"#0169D9","mid-target-arrow-color":"#0169D9"}).selector("node:parent:selected").css({"background-color":"#CCE1F9","border-color":"#aec8e5"}).selector(":active").css({"overlay-color":"black","overlay-padding":10,"overlay-opacity":.25}).selector("core").css({"selection-box-color":"#ddd","selection-box-opacity":.65,"selection-box-border-color":"#aaa","selection-box-border-width":1,"active-bg-color":"black","active-bg-opacity":.15,"active-bg-size":30,"outside-texture-bg-color":"#000","outside-texture-bg-opacity":.125}),this.defaultLength=this.length},t.exports=i},{"../util":100}],96:[function(e,t,r){"use strict";var n=e("../util"),i=e("../selector"),a={};a.applyFromString=function(e){function t(){c=c.length>a.length?c.substr(a.length):""}function r(){o=o.length>s.length?o.substr(s.length):""}var a,o,s,l=this,u=this,c=""+e;for(c=c.replace(/[\/][*](\s|.)+?[*][\/]/g,"");;){var d=c.match(/^\s*$/);if(d)break;var h=c.match(/^\s*((?:.|\s)+?)\s*\{((?:.|\s)+?)\}/);if(!h){n.error("Halting stylesheet parsing: String stylesheet contains more to parse but no selector and block found in: "+c);break}a=h[0];var p=h[1];if("core"!==p){var f=new i(p);if(f._private.invalid){n.error("Skipping parsing of block: Invalid selector found in string stylesheet: "+p),t();continue}}var v=h[2],g=!1;o=v;for(var y=[];;){var d=o.match(/^\s*$/);if(d)break;var m=o.match(/^\s*(.+?)\s*:\s*(.+?)\s*;/);if(!m){n.error("Skipping parsing of block: Invalid formatting of style property and value definitions found in:"+v),g=!0;break}s=m[0];var b=m[1],x=m[2],w=l.properties[b];if(w){var E=u.parse(b,x);E?(y.push({name:b,val:x}),r()):(n.error("Skipping property: Invalid property definition in: "+s),r())}else n.error("Skipping property: Invalid property name in: "+s),r()}if(g){t();break}u.selector(p);for(var _=0;_<y.length;_++){var w=y[_];u.css(w.name,w.val)}t()}return u},a.fromString=function(e){var t=this;return t.resetToDefault(),t.applyFromString(e),t},t.exports=a},{"../selector":87,"../util":100}],97:[function(e,t,r){"use strict";var n=e("./is"),i=e("./util"),a=e("./style"),o=function(){return this instanceof o?void(this.length=0):new o},s=o.prototype;s.instanceString=function(){return"stylesheet"},s.selector=function(e){var t=this.length++;return this[t]={selector:e,properties:[]},this},s.css=function(e,t){var r=this.length-1;if(n.string(e))this[r].properties.push({name:e,value:t});else if(n.plainObject(e))for(var o=e,s=0;s<a.properties.length;s++){var l=a.properties[s],u=o[l.name];if(void 0===u&&(u=o[i.dash2camel(l.name)]),void 0!==u){var e=l.name,t=u;this[r].properties.push({name:e,value:t})}}return this},s.style=s.css,s.generateStyle=function(e){for(var t=new a(e),r=0;r<this.length;r++){var n=this[r],i=n.selector,o=n.properties;t.selector(i);for(var s=0;s<o.length;s++){var l=o[s];t.css(l.name,l.value)}}return t},t.exports=o},{"./is":83,"./style":92,"./util":100}],98:[function(_dereq_,module,exports){/*! Weaver licensed under MIT (https://tldrlegal.com/license/mit-license), copyright Max Franz */
"use strict";var window=_dereq_("./window"),util=_dereq_("./util"),Promise=_dereq_("./promise"),Event=_dereq_("./event"),define=_dereq_("./define"),is=_dereq_("./is"),Thread=function(e){if(!(this instanceof Thread))return new Thread(e);var t=this._private={requires:[],files:[],queue:null,pass:[],disabled:!1};is.plainObject(e)&&null!=e.disabled&&(t.disabled=!!e.disabled)},thdfn=Thread.prototype,stringifyFieldVal=function(e){var t=is.fn(e)?e.toString():"JSON.parse('"+JSON.stringify(e)+"')";return t},fnAsRequire=function(e){var t,r;is.object(e)&&e.fn?(t=fnAs(e.fn,e.name),r=e.name,e=e.fn):is.fn(e)?(t=e.toString(),r=e.name):is.string(e)?t=e:is.object(e)&&(t=e.proto?"":e.name+" = {};",r=e.name,e=e.obj),t+="\n";var n=function(e,r){if(e.prototype){var n=!1;for(var i in e.prototype){n=!0;break}n&&(t+=fnAsRequire({name:r,obj:e,proto:!0},e))}};if(e.prototype&&null!=r)for(var i in e.prototype){var a="",o=e.prototype[i],s=stringifyFieldVal(o),l=r+".prototype."+i;a+=l+" = "+s+";\n",a&&(t+=a),n(o,l)}if(!is.string(e))for(var i in e){var u="";if(e.hasOwnProperty(i)){var o=e[i],s=stringifyFieldVal(o),l=r+'["'+i+'"]';u+=l+" = "+s+";\n"}u&&(t+=u),n(o,l)}return t},isPathStr=function(e){return is.string(e)&&e.match(/\.js$/)};util.extend(thdfn,{instanceString:function(){return"thread"},require:function(e,t){var r=this._private.requires;if(isPathStr(e))return this._private.files.push(e),this;if(t)e=is.fn(e)?{name:t,fn:e}:{name:t,obj:e};else if(is.fn(e)){if(!e.name)throw'The function name could not be automatically determined.  Use thread.require( someFunction, "someFunction" )';e={name:e.name,fn:e}}return r.push(e),this},pass:function(e){return this._private.pass.push(e),this},run:function(fn,pass){var self=this,_p=this._private;if(pass=pass||_p.pass.shift(),_p.stopped)throw"Attempted to run a stopped thread!  Start a new thread or do not stop the existing thread and reuse it.";if(_p.running)return _p.queue=_p.queue.then(function(){return self.run(fn,pass)});var useWW=null!=window&&!_p.disabled,useNode=!window&&"undefined"!=typeof module&&!_p.disabled;self.trigger("run");var runP=new Promise(function(resolve,reject){_p.running=!0;var threadTechAlreadyExists=_p.ran,fnImplStr=is.string(fn)?fn:fn.toString(),fnStr="\n"+_p.requires.map(function(e){return fnAsRequire(e)}).concat(_p.files.map(function(e){if(useWW){var t=function(e){return e.match(/^\.\//)||e.match(/^\.\./)?window.location.origin+window.location.pathname+e:e.match(/^\//)?window.location.origin+"/"+e:e};return'importScripts("'+t(e)+'");'}if(useNode)return'eval( require("fs").readFileSync("'+e+'", { encoding: "utf8" }) );';throw"External file `"+e+"` can not be required without any threading technology."})).concat(["( function(){","var ret = ("+fnImplStr+")("+JSON.stringify(pass)+");","if( ret !== undefined ){ resolve(ret); }","} )()\n"]).join("\n");if(_p.requires=[],_p.files=[],useWW){var fnBlob,fnUrl;if(!threadTechAlreadyExists){var fnPre=fnStr+"";fnStr=["function _ref_(o){ return eval(o); };","function broadcast(m){ return message(m); };","function message(m){ postMessage(m); };","function listen(fn){",'  self.addEventListener("message", function(m){ ','    if( typeof m === "object" && (m.data.$$eval || m.data === "$$start") ){',"    } else { ","      fn( m.data );","    }","  });","};",'self.addEventListener("message", function(m){  if( m.data.$$eval ){ eval( m.data.$$eval ); }  });',"function resolve(v){ postMessage({ $$resolve: v }); };","function reject(v){ postMessage({ $$reject: v }); };"].join("\n"),fnStr+=fnPre,fnBlob=new Blob([fnStr],{type:"application/javascript"}),fnUrl=window.URL.createObjectURL(fnBlob)}var ww=_p.webworker=_p.webworker||new Worker(fnUrl);threadTechAlreadyExists&&ww.postMessage({$$eval:fnStr});var cb;ww.addEventListener("message",cb=function(e){var t=is.object(e)&&is.object(e.data);t&&"$$resolve"in e.data?(ww.removeEventListener("message",cb),resolve(e.data.$$resolve)):t&&"$$reject"in e.data?(ww.removeEventListener("message",cb),reject(e.data.$$reject)):self.trigger(new Event(e,{type:"message",message:e.data}))},!1),threadTechAlreadyExists||ww.postMessage("$$start")}else if(useNode){_p.child||(_p.child=_dereq_("child_process").fork(_dereq_("path").join(__dirname,"thread-node-fork")));var child=_p.child,cb;child.on("message",cb=function(e){is.object(e)&&"$$resolve"in e?(child.removeListener("message",cb),resolve(e.$$resolve)):is.object(e)&&"$$reject"in e?(child.removeListener("message",cb),reject(e.$$reject)):self.trigger(new Event({},{type:"message",message:e}))}),child.send({$$eval:fnStr})}else{var promiseResolve=resolve,promiseReject=reject,timer=_p.timer=_p.timer||{listeners:[],exec:function(){fnStr=["function _ref_(o){ return eval(o); };","function broadcast(m){ return message(m); };",'function message(m){ self.trigger( new Event({}, { type: "message", message: m }) ); };',"function listen(fn){ timer.listeners.push( fn ); };","function resolve(v){ promiseResolve(v); };","function reject(v){ promiseReject(v); };"].join("\n")+fnStr,eval(fnStr)},message:function(e){for(var t=timer.listeners,r=0;r<t.length;r++){var n=t[r];n(e)}}};timer.exec()}}).then(function(e){return _p.running=!1,_p.ran=!0,self.trigger("ran"),e});return null==_p.queue&&(_p.queue=runP),runP},message:function(e){var t=this._private;return t.webworker&&t.webworker.postMessage(e),t.child&&t.child.send(e),t.timer&&t.timer.message(e),this},stop:function(){var e=this._private;return e.webworker&&e.webworker.terminate(),e.child&&e.child.kill(),e.timer,e.stopped=!0,this.trigger("stop")},stopped:function(){return this._private.stopped}});var fnAs=function(e,t){var r=e.toString();return r=r.replace(/function\s*?\S*?\s*?\(/,"function "+t+"(")},defineFnal=function(e){return e=e||{},function(t,r){var n=fnAs(t,"_$_$_"+e.name);return this.require(n),this.run(["function( data ){","  var origResolve = resolve;","  var res = [];","  ","  resolve = function( val ){","    res.push( val );","  };","  ","  var ret = data."+e.name+"( _$_$_"+e.name+(arguments.length>1?", "+JSON.stringify(r):"")+" );","  ","  resolve = origResolve;","  resolve( res.length > 0 ? res : ret );","}"].join("\n"))}};util.extend(thdfn,{reduce:defineFnal({name:"reduce"}),reduceRight:defineFnal({name:"reduceRight"}),map:defineFnal({name:"map"})});var fn=thdfn;fn.promise=fn.run,fn.terminate=fn.halt=fn.stop,fn.include=fn.require,util.extend(thdfn,{on:define.on(),one:define.on({unbindSelfOnTrigger:!0}),off:define.off(),trigger:define.trigger()}),define.eventAliasesOn(thdfn),module.exports=Thread},{"./define":44,"./event":45,"./is":83,"./promise":86,"./util":100,"./window":107,child_process:void 0,path:void 0}],99:[function(e,t,r){"use strict";var n=e("../is");t.exports={hex2tuple:function(e){if((4===e.length||7===e.length)&&"#"===e[0]){var t,r,n,i=4===e.length,a=16;return i?(t=parseInt(e[1]+e[1],a),r=parseInt(e[2]+e[2],a),n=parseInt(e[3]+e[3],a)):(t=parseInt(e[1]+e[2],a),r=parseInt(e[3]+e[4],a),n=parseInt(e[5]+e[6],a)),[t,r,n]}},hsl2tuple:function(e){function t(e,t,r){return 0>r&&(r+=1),r>1&&(r-=1),1/6>r?e+6*(t-e)*r:.5>r?t:2/3>r?e+(t-e)*(2/3-r)*6:e}var r,n,i,a,o,s,l,u,c=new RegExp("^"+this.regex.hsla+"$").exec(e);if(c){if(n=parseInt(c[1]),0>n?n=(360- -1*n%360)%360:n>360&&(n%=360),n/=360,i=parseFloat(c[2]),0>i||i>100)return;if(i/=100,a=parseFloat(c[3]),0>a||a>100)return;if(a/=100,o=c[4],void 0!==o&&(o=parseFloat(o),0>o||o>1))return;if(0===i)s=l=u=Math.round(255*a);else{var d=.5>a?a*(1+i):a+i-a*i,h=2*a-d;s=Math.round(255*t(h,d,n+1/3)),l=Math.round(255*t(h,d,n)),u=Math.round(255*t(h,d,n-1/3))}r=[s,l,u,o]}return r},rgb2tuple:function(e){var t,r=new RegExp("^"+this.regex.rgba+"$").exec(e);if(r){t=[];for(var n=[],i=1;3>=i;i++){var a=r[i];if("%"===a[a.length-1]&&(n[i]=!0),a=parseFloat(a),n[i]&&(a=a/100*255),0>a||a>255)return;t.push(Math.floor(a))}var o=n[1]||n[2]||n[3],s=n[1]&&n[2]&&n[3];if(o&&!s)return;var l=r[4];if(void 0!==l){if(l=parseFloat(l),0>l||l>1)return;t.push(l)}}return t},colorname2tuple:function(e){return this.colors[e.toLowerCase()]},color2tuple:function(e){return(n.array(e)?e:null)||this.colorname2tuple(e)||this.hex2tuple(e)||this.rgb2tuple(e)||this.hsl2tuple(e)},colors:{transparent:[0,0,0,0],aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],grey:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}}},{"../is":83}],100:[function(e,t,r){"use strict";var n=e("../is"),i=e("../math"),a={trueify:function(){return!0},falsify:function(){return!1},zeroify:function(){return 0},noop:function(){},error:function(e){console.error?(console.error.apply(console,arguments),console.trace&&console.trace()):(console.log.apply(console,arguments),console.trace&&console.trace())},clone:function(e){return this.extend({},e)},copy:function(e){return null==e?e:n.array(e)?e.slice():n.plainObject(e)?this.clone(e):e},uuid:function(e,t){for(t=e="";e++<36;t+=51*e&52?(15^e?8^Math.random()*(20^e?16:4):4).toString(16):"-");return t}};a.makeBoundingBox=i.makeBoundingBox.bind(i),a._staticEmptyObject={},a.staticEmptyObject=function(){return a._staticEmptyObject},a.extend=null!=Object.assign?Object.assign:function(e){for(var t=arguments,r=1;r<t.length;r++){var n=t[r];if(n)for(var i=Object.keys(n),a=0;a<i.length;a++){var o=i[a];e[o]=n[o]}}return e},a["default"]=function(e,t){return void 0===e?t:e},a.removeFromArray=function(e,t,r){for(var n=e.length;n>=0&&(e[n]!==t||(e.splice(n,1),r));n--);},a.clearArray=function(e){e.splice(0,e.length)},a.getPrefixedProperty=function(e,t,r){return r&&(t=this.prependCamel(r,t)),e[t]},a.setPrefixedProperty=function(e,t,r,n){r&&(t=this.prependCamel(r,t)),e[t]=n},[e("./colors"),e("./maps"),{memoize:e("./memoize")},e("./regex"),e("./strings"),e("./timing")].forEach(function(e){a.extend(a,e)}),t.exports=a},{"../is":83,"../math":85,"./colors":99,"./maps":101,"./memoize":102,"./regex":103,"./strings":104,"./timing":105}],101:[function(e,t,r){"use strict";var n=e("../is");t.exports={mapEmpty:function(e){var t=!0;return null!=e?0===Object.keys(e).length:t},pushMap:function(e){var t=this.getMap(e);null==t?this.setMap(this.extend({},e,{value:[e.value]})):t.push(e.value)},setMap:function(e){for(var t,r=e.map,i=e.keys,a=i.length,o=0;a>o;o++){var t=i[o];n.plainObject(t)&&this.error("Tried to set map with object key"),o<i.length-1?(null==r[t]&&(r[t]={}),r=r[t]):r[t]=e.value}},getMap:function(e){for(var t=e.map,r=e.keys,i=r.length,a=0;i>a;a++){var o=r[a];if(n.plainObject(o)&&this.error("Tried to get map with object key"),t=t[o],null==t)return t}return t},deleteMap:function(e){for(var t=e.map,r=e.keys,i=r.length,a=e.keepChildren,o=0;i>o;o++){var s=r[o];n.plainObject(s)&&this.error("Tried to delete map with object key");var l=o===e.keys.length-1;if(l)if(a)for(var u=Object.keys(t),c=0;c<u.length;c++){var d=u[c];a[d]||(t[d]=void 0)}else t[s]=void 0;else t=t[s]}}}},{"../is":83}],102:[function(e,t,r){"use strict";t.exports=function(e,t){t||(t=function(){if(1===arguments.length)return arguments[0];if(0===arguments.length)return"undefined";for(var e=[],t=0;t<arguments.length;t++)e.push(arguments[t]);return e.join("$")});var r=function(){var n,i=this,a=arguments,o=t.apply(i,a),s=r.cache;return(n=s[o])||(n=s[o]=e.apply(i,a)),n};return r.cache={},r}},{}],103:[function(e,t,r){"use strict";var n="(?:[-+]?(?:(?:\\d+|\\d*\\.\\d+)(?:[Ee][+-]?\\d+)?))",i="rgb[a]?\\(("+n+"[%]?)\\s*,\\s*("+n+"[%]?)\\s*,\\s*("+n+"[%]?)(?:\\s*,\\s*("+n+"))?\\)",a="rgb[a]?\\((?:"+n+"[%]?)\\s*,\\s*(?:"+n+"[%]?)\\s*,\\s*(?:"+n+"[%]?)(?:\\s*,\\s*(?:"+n+"))?\\)",o="hsl[a]?\\(("+n+")\\s*,\\s*("+n+"[%])\\s*,\\s*("+n+"[%])(?:\\s*,\\s*("+n+"))?\\)",s="hsl[a]?\\((?:"+n+")\\s*,\\s*(?:"+n+"[%])\\s*,\\s*(?:"+n+"[%])(?:\\s*,\\s*(?:"+n+"))?\\)",l="\\#[0-9a-fA-F]{3}",u="\\#[0-9a-fA-F]{6}";t.exports={regex:{number:n,rgba:i,rgbaNoBackRefs:a,hsla:o,hslaNoBackRefs:s,hex3:l,hex6:u}}},{}],104:[function(e,t,r){"use strict";var n=e("./memoize"),i=e("../is");t.exports={camel2dash:n(function(e){return e.replace(/([A-Z])/g,function(e){return"-"+e.toLowerCase()})}),dash2camel:n(function(e){return e.replace(/(-\w)/g,function(e){return e[1].toUpperCase()})}),prependCamel:n(function(e,t){return e+t[0].toUpperCase()+t.substring(1)},function(e,t){return e+"$"+t}),capitalize:function(e){return i.emptyString(e)?e:e.charAt(0).toUpperCase()+e.substring(1)}}},{"../is":83,"./memoize":102}],105:[function(e,t,r){"use strict";var n=e("../window"),i=e("../is"),a=n?n.performance:null,o={},s=n?n.requestAnimationFrame||n.mozRequestAnimationFrame||n.webkitRequestAnimationFrame||n.msRequestAnimationFrame:null;s=s||function(e){e&&setTimeout(function(){e(l())},1e3/60)},o.requestAnimationFrame=function(e){s(e)};var l=a&&a.now?function(){return a.now()}:function(){return Date.now()};o.performanceNow=l,o.throttle=function(e,t,r){var n=!0,a=!0;return r===!1?n=!1:i.plainObject(r)&&(n="leading"in r?r.leading:n,a="trailing"in r?r.trailing:a),r=r||{},r.leading=n,r.maxWait=t,r.trailing=a,o.debounce(e,t,r)},o.now=function(){return Date.now()},o.debounce=function(e,t,r){var n,a,o,s,l,u,c,d=this,h=0,p=!1,f=!0;if(i.fn(e)){if(t=Math.max(0,t)||0,r===!0){var v=!0;f=!1}else i.plainObject(r)&&(v=r.leading,p="maxWait"in r&&(Math.max(t,r.maxWait)||0),f="trailing"in r?r.trailing:f);var g=function(){var r=t-(d.now()-s);if(0>=r){a&&clearTimeout(a);var i=c;a=u=c=void 0,i&&(h=d.now(),o=e.apply(l,n),u||a||(n=l=null))}else u=setTimeout(g,r)},y=function(){u&&clearTimeout(u),a=u=c=void 0,(f||p!==t)&&(h=d.now(),o=e.apply(l,n),u||a||(n=l=null))};return function(){if(n=arguments,s=d.now(),l=this,c=f&&(u||!v),p===!1)var r=v&&!u;else{a||v||(h=s);var i=p-(s-h),m=0>=i;m?(a&&(a=clearTimeout(a)),h=s,o=e.apply(l,n)):a||(a=setTimeout(y,i))}return m&&u?u=clearTimeout(u):u||t===p||(u=setTimeout(g,t)),r&&(m=!0,o=e.apply(l,n)),!m||u||a||(n=l=null),o}}},t.exports=o},{"../is":83,"../window":107}],106:[function(e,t,r){t.exports="2.7.11"},{}],107:[function(e,t,r){t.exports="undefined"==typeof window?null:window},{}]},{},[82])(82)});
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
// Generated by CoffeeScript 1.7.1

/*
jQuery.Turbolinks ~ https://github.com/kossnocorp/jquery.turbolinks
jQuery plugin for drop-in fix binded events problem caused by Turbolinks

The MIT License
Copyright (c) 2012-2013 Sasha Koss & Rico Sta. Cruz
 */


(function() {
  var $, $document;

  $ = window.jQuery || (typeof require === "function" ? require('jquery') : void 0);

  $document = $(document);

  $.turbo = {
    version: '2.1.0',
    isReady: false,
    use: function(load, fetch) {
      return $document.off('.turbo').on("" + load + ".turbo", this.onLoad).on("" + fetch + ".turbo", this.onFetch);
    },
    addCallback: function(callback) {
      if ($.turbo.isReady) {
        callback($);
      }
      return $document.on('turbo:ready', function() {
        return callback($);
      });
    },
    onLoad: function() {
      $.turbo.isReady = true;
      return $document.trigger('turbo:ready');
    },
    onFetch: function() {
      return $.turbo.isReady = false;
    },
    register: function() {
      $(this.onLoad);
      return $.fn.ready = this.addCallback;
    }
  };

  $.turbo.register();

  $.turbo.use('page:load', 'page:fetch');

}).call(this);
/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);
/*
Turbolinks 5.0.0
Copyright © 2016 Basecamp, LLC
 */

(function(){(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame}(),visit:function(e,r){return t.controller.visit(e,r)},clearCache:function(){return t.controller.clearCache()}}}).call(this)}).call(this);var t=this.Turbolinks;(function(){(function(){var e,r;t.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},t.closest=function(t,r){return e.call(t,r)},e=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),t.defer=function(t){return setTimeout(t,1)},t.dispatch=function(t,e){var r,n,o,i,s;return i=null!=e?e:{},s=i.target,r=i.cancelable,n=i.data,o=document.createEvent("Events"),o.initEvent(t,!0,r===!0),o.data=null!=n?n:{},(null!=s?s:document).dispatchEvent(o),o},t.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),t.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){t.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=e(this.requestCanceled,this),this.requestTimedOut=e(this.requestTimedOut,this),this.requestFailed=e(this.requestFailed,this),this.requestLoaded=e(this.requestLoaded,this),this.requestProgressed=e(this.requestProgressed,this),this.url=t.Location.wrap(n).requestURL,this.referrer=t.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return t.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return t.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ProgressBar=function(){function t(){this.trickle=e(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,t.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",t.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},t.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},t.prototype.setValue=function(t){return this.value=t,this.refresh()},t.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},t.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},t.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},t.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},t.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},t.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},t.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},t.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},t.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},t.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=e(this.showProgressBar,this),this.progressBar=new t.ProgressBar}var n,o,i,s;return s=t.HttpRequest,n=s.NETWORK_FAILURE,i=s.TIMEOUT_FAILURE,o=500,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case i:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,o)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var e,r=function(t,e){return function(){return t.apply(e,arguments)}};e=!1,addEventListener("load",function(){return t.defer(function(){return e=!0})},!1),t.History=function(){function n(t){this.delegate=t,this.onPopState=r(this.onPopState,this)}return n.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),this.started=!0)},n.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),this.started=!1):void 0},n.prototype.push=function(e,r){return e=t.Location.wrap(e),this.update("push",e,r)},n.prototype.replace=function(e,r){return e=t.Location.wrap(e),this.update("replace",e,r)},n.prototype.onPopState=function(e){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=e.state)?n.turbolinks:void 0)?(r=t.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},n.prototype.shouldHandlePopState=function(){return e===!0},n.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},n}()}.call(this),function(){t.Snapshot=function(){function e(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return e.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},e.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},e.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},e.prototype.clone=function(){return new e({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},e.prototype.getRootLocation=function(){var e,r;return r=null!=(e=this.getSetting("root"))?e:"/",new t.Location(r)},e.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},e.prototype.hasAnchor=function(t){try{return null!=this.body.querySelector("[id='"+t+"']")}catch(e){}},e.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},e.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},e.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},e}()}.call(this),function(){var e=[].slice;t.Renderer=function(){function t(){}var r;return t.render=function(){var t,r,n,o;return n=arguments[0],r=arguments[1],t=3<=arguments.length?e.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,t,function(){}),o.delegate=n,o.render(r),o},t.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},t.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},t.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},t}()}.call(this),function(){t.HeadDetails=function(){function t(t){var e,r,i,s,a,u,c;for(this.element=t,this.elements={},c=this.element.childNodes,s=0,u=c.length;u>s;s++)i=c[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.SnapshotRenderer=function(r){function n(e,r){this.currentSnapshot=e,this.newSnapshot=r,this.currentHeadDetails=new t.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new t.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return e(n,r),n.prototype.render=function(t){return this.trackedElementsAreIdentical()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},n.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},n.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},n.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},n.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},n.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},n.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},n.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},n.prototype.assignNewBody=function(){return document.body=this.newBody},n.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},n.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},n.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},n.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},n.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},n.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},n.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},n.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},n.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},n}(t.Renderer)}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.ErrorRenderer=function(t){function r(t){this.html=t}return e(r,t),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(t.Renderer)}.call(this),function(){t.View=function(){function e(t){this.delegate=t,this.element=document.documentElement}return e.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},e.prototype.getSnapshot=function(){return t.Snapshot.fromElement(this.element)},e.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,e):this.renderError(r,e)},e.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},e.prototype.renderSnapshot=function(e,r){return t.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),t.Snapshot.wrap(e))},e.prototype.renderError=function(e,r){return t.ErrorRenderer.render(this.delegate,r,e)},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ScrollManager=function(){function t(t){this.delegate=t,this.onScroll=e(this.onScroll,this)}return t.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},t.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},t.prototype.scrollToElement=function(t){return t.scrollIntoView()},t.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},t.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},t.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},t}()}.call(this),function(){t.SnapshotCache=function(){function e(t){this.size=t,this.keys=[],this.snapshots={}}var r;return e.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},e.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},e.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},e.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},e.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},e.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},e.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(e){return t.Location.wrap(e).toCacheKey()},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=e(this.performScroll,this),this.identifier=t.uuid(),this.location=t.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new t.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(e,r){return this.response=e,null!=r&&(this.redirectedToLocation=t.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return t.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Controller=function(){function r(){this.clickBubbled=e(this.clickBubbled,this),this.clickCaptured=e(this.clickCaptured,this),this.pageLoaded=e(this.pageLoaded,this),this.history=new t.History(this),this.view=new t.View(this),this.scrollManager=new t.ScrollManager(this),this.restorationData={},this.clearCache()}return r.prototype.start=function(){return t.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new t.SnapshotCache(10)},r.prototype.visit=function(e,r){var n,o;return null==r&&(r={}),e=t.Location.wrap(e),this.applicationAllowsVisitingLocation(e)?this.locationIsVisitable(e)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(e,n)):window.location=e:void 0},r.prototype.startVisitToLocationWithAction=function(e,r,n){var o;return t.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(e,r,{restorationData:o})):window.location=e},r.prototype.startHistory=function(){return this.location=t.Location.wrap(window.location),this.restorationIdentifier=t.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(e,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(e,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=t.Location.wrap(e)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},r.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=document.getElementById(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(e,r){return t.dispatch("turbolinks:click",{target:e,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(e){return t.dispatch("turbolinks:before-visit",{data:{url:e.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(e){return t.dispatch("turbolinks:visit",{data:{url:e.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return t.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(e){return t.dispatch("turbolinks:before-render",{data:{newBody:e}})},r.prototype.notifyApplicationAfterRender=function(){return t.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(e){return null==e&&(e={}),t.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:e}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(e,r,n){
var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new t.Visit(this,e,r),u.restorationIdentifier=null!=a?a:t.uuid(),u.restorationData=t.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(e){return this.nodeIsVisitable(e)?t.closest(e,"a[href]:not([target])"):void 0},r.prototype.getVisitableLocationForLink=function(e){var r;return r=new t.Location(e.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(e){var r;return(r=t.closest(e,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){var e,r,n;t.start=function(){return r()?(null==t.controller&&(t.controller=e()),t.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=t),n()},e=function(){var e;return e=new t.Controller,e.adapter=new t.BrowserAdapter(e),e},n=function(){return window.Turbolinks===t},n()&&t.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd&&define(t)}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//








var steemaccount;
document.addEventListener('turbolinks:load', function(){
steemaccount = window.currentUser.steemaccount.toString();
/*global $*/
/*global cytoscape*/
var cy = window.cy = cytoscape({
    container: document.getElementById('cy'),
    boxSelectionEnabled: false,
    autounselectify: false,
    autoungrabify: true,
    zoom: .5,
    layout: {
        name: 'cose'
    },
    style: [{
            selector: 'node',
            style: {
                'height': 10,
                'width': 10,
                'background-color': '#FEE003',
                'label': 'data(label)',
                'color': '#FFFFFF',
                'text-transform': 'lowercase',
                'font-size': 8,
                'font-weight': 'bold',
                'font-style': 'italic',
                'font-family': '"Times New Roman", Georgia, Serif',
                'text-shadow-blur': 100,
                'shadow-blur': 10,
                'background-opacity': 0.6
            }
        }, {
            selector: 'edge',
            style: {
                'line-color': '#FFFF',
                'width': 1,
                'opacity': 0.4
            }
           },
           {
            selector: '.mutual',
            style: {
                'background-color': 'green',
                'label': 'data(label)',
                'color': '#FFFFFF',
                'text-transform': 'lowercase',
                'font-weight': 'bold',
                'font-style': 'italic',
                'font-family': '"Times New Roman", Georgia, Serif',
                'text-shadow-blur': 100,
                'shadow-blur': 10,
                'background-opacity': 0.6
            }
           },
            {
            selector: '.follows',
            style: {
                'background-color': 'blue',
                'label': 'data(label)',
                'color': '#FFFFFF',
                'text-transform': 'lowercase',
                'font-weight': 'bold',
                'font-style': 'italic',
                'font-family': '"Times New Roman", Georgia, Serif',
                'text-shadow-blur': 100,
                'shadow-blur': 10,
                'background-opacity': 0.6
            }
            },
            {
            selector: ':selected',
            style: {
                'height': 20,
                'width': 20,
                'label': 'data(label)',
                'font-size': 18,
                'color': '#FFFFFF',
                'text-transform': 'uppercase',
                'font-weight': 'bold',
                'font-style': 'italic',
                'font-family': '"Times New Roman", Georgia, Serif',
                'text-shadow-blur': 100,
                'shadow-blur': 10,
                'background-opacity': 0.6
            }
        }
          ],
    elements: [{
            data: {
                id: steemaccount,
                label: steemaccount
                   },
            classes: 'background'
              }]
});
addFollowers();
setTimeout(function() {
    addFollows();
}, 2000);
/*global layout*/
setTimeout(function() {
    cy.layout({name: 'cose',
            // Called on `layoutready`
            ready: function() {},
            // Called on `layoutstop`
            stop: function() {},
            // Whether to animate while running the layout
            animate: false,
            // The layout animates only after this many milliseconds
            // (prevents flashing on fast runs)
            animationThreshold: 0,
            // Number of iterations between consecutive screen positions update
            // (0 -> only updated on the end)
            refresh: 50,
            // Whether to fit the network view after when done
            fit: true,
            // Padding on fit
            padding: 0,
            // Constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
            boundingBox: false,
            // Randomize the initial positions of the nodes (true) or use existing positions (false)
            randomize: true,
            // Extra spacing between components in non-compound graphs
            componentSpacing: 50,
            // Node repulsion (non overlapping) multiplier
            nodeRepulsion: function(node) {
                return 500;
            },
            // Node repulsion (overlapping) multiplier
            nodeOverlap: 10,
            // Ideal edge (non nested) length
            idealEdgeLength: function(edge) {
                return 25;
            },
            // Divisor to compute edge forces
            edgeElasticity: function(edge) {
                return 50;
            },
            // Nesting factor (multiplier) to compute ideal edge length for nested edges
            nestingFactor: 5,
            // Gravity force (constant)
            gravity: 80,
            // Maximum number of iterations to perform
            numIter: 1000,
            // Initial temperature (maximum node displacement)
            initialTemp: 200,
            // Cooling factor (how the temperature is reduced between consecutive iterations
            coolingFactor: 0.95,
            // Lower temperature threshold (below this point the layout will end)
            minTemp: 1.0,
            // Whether to use threading to speed up the layout
            useMultitasking: true});
}, 7000);
//setTimeout(function() {
//    addEdges();
//}, 9000);

});
function addFollowers(){
console.log("adding followers");
$.getJSON('/accounts/' + steemaccount + '/followers.json', function(followerS) {
   for (var prop in followerS) {
       cy.add({group: "nodes", data: {id: followerS[prop], label: followerS[prop]}, position: {}});
       cy.add({group: "edges", data: {source: followerS[prop], target: steemaccount}});
        }
        console.log("Followers:" + followerS.length);
        cy.emit('done followers');
    });
cy.layout({name: 'cose'});
}
function addFollows(){
console.log("adding follows");
$.getJSON('/accounts/' + steemaccount + '/follows.json', function(followS) {
           for (var prop in followS) {
               /*global cy*/
               if (cy.getElementById(followS[prop]).length==0){
               cy.add({group: "nodes", data: {id: followS[prop], label: followS[prop]}, position: {}});
               cy.add({group: "edges", data: {source: followS[prop], target: steemaccount}});
               cy.getElementById(followS[prop]).addClass('follows')
               }
               else {cy.getElementById(followS[prop]).addClass('mutual')}
               }
        console.log("Follows:" + followS.length);
    });
}
function addEdges(){
console.log("adding edges");
cy.nodes().forEach(function( ele ){
    $.getJSON('/accounts/' + ele.id() + '/followers.json', function(accountsdata){
        console.log(JSON.stringify(accountsdata));
        ele.scratch(JSON.stringify(accountsdata));
        });
    //$.getJSON('/accounts/' + ele.id() + '/followers.json', function(){
       // for (var prop in selectedAccount) {
    //        ele.scratch(responseJSON);
        //if (cy.getElementById(selectedAccount[prop]).length==1){
        //        cy.add({group: "edges", data: {source: ele.id(), target: selectedAccount[prop]}});
    //            console.log(data.responseJSON());
    //            console.log("yes");
        //        };
        //    };
    //    });
    });
}
;
