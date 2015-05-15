/**
 * Created by Nicklas.Vind on 02-05-2015.
 */
/**
 * Prototype Explaination 1
 * Every single 'object' is built by a constructor function
 * */

function Foo (who){
    this.me = who;
}
Foo.prototype.identify = function () {
    return "I AM " + this.me;
};

var a1 = new Foo("a1");
var a2 = new Foo("a2");

a2.speak = function () {
  alert("hello, " + this.identify() + ".");
};

a1.constructor === Foo;
a1.constructor === a2.constructor;
a1.__proto__ === Foo.prototype;
a1.__proto__ === a2.__proto__;


/**
 * the 'this' keyword references to the new a1 or a2 object and the .identify will return the correct value
 * even though they share the same instance of identify which they get from Foo.protoype Object.
 * **/
a1.identify(); // Identify is the same as Foo.prototype.identify
a2.identify(); // This is the same as a1 uses and therefore they don't copy the method and it saves resources.

/**
 * If we were to create a an identify function directly on our a1 or a2 object, the above calls would be
 * referenced on the object itself and not on the foo.prototype object which they share. This is called shadowing.
 * Which means it would be called instead of the Foo.prototype because when it searches for the function named identify
 * It will find it on the object and wont have to go up the chain to find the function on the prototype object. Shortest
 * linkage to function wins. Like placing an object above another object which will block the out sun on the first item.
 * */

a1.identify = function () { // Shadowing Foo.prototype.identify()
  return "GTFO "+this.me;
};

/**
 * Super Unicorn magic
 * Dont do shadowing use the power of the 'this' keyword when transporting variables around.
 * */

Foo.prototype.speak = function () {
    alert("hello, " + this.identify() + ".");
};

/**
* Watch out for jquery functions like $(elem).click(a1.speak) when using this in prototype pattern, as the 'this' keyword
 * will be bound to the e.x. button element (html element), you still need to do a hard binding.
*
* **/

function noteManager () {
    this.notes = [];
};
noteManager.prototype.handleDocumentClick = function(evt) {
    this.$notes.removeClass("active");
    this.$notes.children(".note").removeClass("highlighted");
};
noteManager.prototype.hideHelp = function() {
    this.$help.hide();
};
/**
 * If I dont reference this in a var called self, the 'this' keyword will change in the addEventListener to the button element.
 * Therefore in this case it would be a good way to use lexical scope mechanism to reference the correct this in a var called self.
 * Elsewhere it is not good practice and smells like you have a bad code smell  (you're doing something wrong in your code)
 * */

noteManager.prototype.showHelp = function () {
    var self = this;
    self.$help.show();
    document.addEventListener("click",function __handler__(evt){
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();

        document.removeEventListener("click",__handler__,true);
        self.hideHelp();
    },true);
};

/**
 * Same here
 * */
// this.$open_help.bind("click",this.handleOpenHelp.bind(this));