/**
 * Created by NFV on 29-04-2015.
 */
/***
 *
 * SCOPE, THIS og NEW
 * Dette dokument gennemgår Hoisting af funktioner, function expressions og variabler.
 * Herudover bliver der gennemgået eksempler på hvad this er og hvad den repræsentere - Default, Implicit og Explicit
 * Til sidst bliver der gennemgået hvad THIS gør.
 *
 */


/***
 *
 * First Binding rule of 'this'
 *  - Global
 */
var bar = "Thats global";
function globalBar(){
    console.log(this.bar);
}
/***
 *
 * Second binding rule of 'this'
 * - Emplicit - in a object context
 */

var obj = {bar:"objBar1", foo:thisBinding};

function thisBinding(){
    console.log(this.bar);
}

/****
 *
 * Third binding rule of 'this'
 * - Explicit, use of call or apply and hardbinding
 */

var callObj = {bar:"CallThisObj"};
thisBinding.call(callObj);// .Call Gør "this" til det object man indfører - i dette tilfælde callObj, hvor "bar" bliver "CallThisObj"...

/**
 * Hardbinding examples
 */
var obj2 = {bar:"objBar2"};
var obj3 = {bar:"objBar3"};

function foo (){
    console.log(this.bar);
}
/**
 * Bad global example
 * */
var orig = foo;
foo = function () {
    orig.call(obj2); // <-- Dette object vil altid blive kaldt uanset, hvordan foo bliver kaldt med i .call/.apply.
};
foo(); // objBar2
foo.call(obj3);// objBar2

/**
 * smukseret version af hardbind
 * */

function bind(fn, o){
    return function () {
      fn.call(o);
    };
}

thisBinding = bind(thisBinding, obj2);
thisBinding();
var op = obj.foo.bind(obj3);
op();

/**
 * stick it 2 the prototype func
 * */

if(!Function.prototype.bind2){
    Function.prototype.bind2 = function (o) {
        var fn = this; // The function !
        return function () {
            return fn.apply(o,arguments);
        }
    }
}
/***
 * Ultimately use the bind function included in ECMA 5
 */
var bar4 = "Bar 4";
var bar5 ={bar4: "Bar 5"};
function foobind(){
    console.log(this.bar4); /** <-- Writes out Bar 4 because of rule 1 (Global)*/
}
var bindthat = foobind.bind(bar5);
bindthat();

/****
 * - Fourth binding rule and the strongest (one to rule them all) - NEW
 * --- Intro ---
 * New Keyword - what does it do?
 Den initiere ikke et klasse eller object som I C#.
 Den gør 4 ting.
 1. Den laver et helt nyt Object
 2. Det nye objekt bliver linket til et andet objekt* (forklaring i fodnote længere nede)
 3. THIS bliver bundet til det nye objekt.
 4. Hvis det nye objekt/funktion ikke returnere noget, så vil implicit returnere this.

 Precedence - This bestemmes ud fra hvilken metode overruler de andre. 1 vigtigst -> 4 lavest
 1. Was the function called with the 'new' keyword? If so, use that object (as this). Can overwrite hardbinding.
 2. Was there a function being called with 'call' or 'apply' specifying an explicit 'this'?
 3. Was there an object owning/containing object (context)?
 4. Default - Global object. - Except for strict mode.
  */

function newObj(){
    this.baz = "baz";
    console.log(this.bar2 + " " + baz); // <--- returns undefined undefined
}
var bar2 = "ba2r";
var baz = new newObj();// <--- returns undefined undefined as it has not been set. Run it a second time and it returns correctly

