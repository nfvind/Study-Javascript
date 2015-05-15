/**
 * Created by NFV on 29-04-2015.
 */

'use strict';

/***
 *
 * When a function remembers it lexical scope even when the function is executing outside its lexical scope, it is closure
 *
 */


/***
 * Closure First example
 * Global scoped var 'i'. All the SetTimeout reference the same global variable 'i'
 * Commented out so not to run
 */

for(var i = 1;i<=5; i++) {
  /*  setTimeout(function () {
        console.log("i: "+i);
    }, i*1000);*/
}

/****
 * Closure second example
 * Putting an Immediately Invoked Function Expression - IIFE, around the setTimeout function will create a variable 'i' for each IIFE created.
 * Commented out so not to run
 */
for(var i = 1;i<=5;i++){
   /* (function (i) {
        setTimeout(function () {
            console.log("i: "+i);
        }, i*1000);
    })(i);*/
}

/***
 * Example with the let keyword that creates a new 'i' for each for loop iteration. wheras the var keyword creates a global variable
 * commented out as it gives error in IDE :( (but works in browser)
 */

/*for(let i = 1;i<=5; i++) {
    setTimeout(function () {
        console.log("i: "+i);
    }, i*1000);
}*/

/**
 *
 * Closure
 *  Example 1 - not closure (object reference) as its not transporting a function
 * */

var closure1 = (function () {
    var o = {bar:"bar closure"};
    return {
            obj:o
    }
})();
console.log(closure1.obj.bar);

/**
 *
 * Module Pattern version 1
 * Rules : There has to be atleast 1 out wrapping function and one more inner functions getting returned out.
 * */

var module = (function () {
        var o = {bar: "bar"};
        return {
            bar: function () {
                console.log(o.bar);
            }
        }
    })();
module.bar();
/**
 *
 * Module Pattern version 2 - simple
 * Returning one function, needs to be initiated like this module2()();
 * */

var module2 = (function () {
    var o = {bar: "bar2"};
    return (function () {
            console.log(o.bar);
    });
});
/**
 *
 * Module Pattern version 3 - Modified
 * Modified Module Pattern or as Kyle says its hes Public APi Module pattern
 * Its updatable at runtime which means you can add, remove or modify public functions within the API
 * */

var module3 = (function () {
    var publicAPI = {
      bar: function () {
          publicAPI.baz();
      },
        baz: function () {
            console.log("baz");
        }
    };
    return publicAPI;

})();
module3.bar();

/**
 *
 * Module Pattern version 4 - Revealing module pattern
 * Revealing module pattern
 * Kyle says always use function expression over functions... (no explaination) NEED TO KNOW WHY
 * */

var module4 = (function () {
    var o = {bar:""};

    var bar = function () {
        o.bar = "bar";
        console.log(o.bar);
    };

    var baz = function () {
        o.bar = "baz";
        console.log(o.bar);
    };
    return {
        variable:o,
        bar:bar,
        baz:baz
    };

})();
module4.bar();
module4.baz();

/**
 *
 * As From ECMA SCRIPT 6+ It will be file based
 *
 * So a module would be represented by a file i.ex.: module.js
 *
 * */

/*File moduleES6.js - imports only one function*/
/**
var oo = {bar: "bar"};
export function barES6(){
return oo.bar;
}
**/
/*File MainApp.js*/
/**
import barES6 from "moduleES6";
barES6();
**/
/*File MainApp.js - second method of importing - imports all functions as whole module */
/**
module modBar from "moduleES6";
modBar.barES6();
**/