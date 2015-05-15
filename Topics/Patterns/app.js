/**
 * Created by Nicklas.Vind on 14-02-2015.
 */
'use strict';
function cl(logEvent){
    console.log(logEvent);
    return logEvent;
}

var bar = "bar";
function foo(str) {
    eval(str);
    cl(bar);
}
foo("var bar = 42");

(function IIFEHandler (_global) {

    function foo(){
        var bar = "fodo";
        for(var i = 0; bar.length > i;++i){
            cl(bar[i]);
        }
        cl(i);
    }
    foo();
}(window));
