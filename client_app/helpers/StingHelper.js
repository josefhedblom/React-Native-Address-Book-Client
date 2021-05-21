String.prototype.titleize = function() {
    return this.split("_").map(letter => letter.capitalizeFirstLetter()).join(" ");
};

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};