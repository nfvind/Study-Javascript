/**
 * Created by Nicklas.Vind on 02-05-2015.
 */

/**
 * Old way...
 * */
function oldFoo(who) {
this.me = who;
}
oldFoo.prototype.identify = function () {
    return "I AM "+this.me;
};

function oldBar(who){
oldFoo.call(this,who);
}
oldBar.prototype = Object.create(oldFoo.prototype);
oldBar.prototype.speak = function () {
    alert("Hello, "+this.identify() + ".")
};

var oldB1 = new oldBar("oldB1");

/**
 * Object Linked to Other Objects
 * */
var Foo = {
    init: function (who) {
        this.me = who;
    },
    identify: function () {
        return "I AM "+this.me;
    }
};

var Bar = Object.create(Foo);
Bar.speak = function () {
    alert("Hello, "+this.identify() + ".")
};

var b1 = Object.create(Bar);
b1.init("b1");
b1.speak();
