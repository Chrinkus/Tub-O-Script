// this and Its Scope
var test = {
    prop: 10,
    addPropTo: function(array) {
        return array.map(function(elt) {
            return this.prop + elt;
        }.bind(this));
    }
};
console.log(test.addPropTo([5])); // [15]

var test2 = {
    prop: 15,
    addPropTo: function(array) {
        return array.map(function(elt) {
            return this.prop + elt;
        }, this);
    }
};
console.log(test2.addPropTo([5])); // [20]
