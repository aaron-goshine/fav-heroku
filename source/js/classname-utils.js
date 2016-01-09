// ** ============================================**//
// DOM utility functions to enable class name manipulation
// Now all DOM element should have inherited the following methods

/**
 * This is an existing namespace used in the DOM elements prototype chain
 * @namespace Element
 */

/**
 * Method that test for a CSS class by name
 * @param {string} className - the name of a CSS class to test for
 * @return {boolean}
 * @namespace Element.prototype
 * @method Element.prototype.hasClassName
 */
Element.prototype.hasClassName = function (className) {
  return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(this.className);
};

/**
 * Method that adds a class if it does not already have one with the same name
 * @param {string} className - The name of a CSS class add
 * @return {element}
 * @namespace Element.prototype
 * @method Element.prototype.addClassName
 */
Element.prototype.addClassName = function (className) {
  if (!this.hasClassName(className)) {
    this.className = [this.className, className].join(' ');
  }
  return this;
};

/**
 * Method that remove a CSS class name
 * @param {string} classNamE - the name of the CSS class to remove
 * @return {element}
 * @namespace Element.prototype
 * @method Element.prototype.removeClassName
 */
Element.prototype.removeClassName = function (className) {
  if (this.hasClassName(className)) {
    var localClassName = this.className;
    this.className = localClassName.replace(new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)'), ' ');
  }
  return this;
};
/**
 * Method that toggle a CSS class name
 * @param {string} className - The name of the CSS class to toggle
 * @return {element}
 * @namespace Element.prototype
 * @method Element.prototype.toggleClassName
 */
Element.prototype.toggleClassName = function (className) {
  this[this.hasClassName(className) ? 'removeClassName' : 'addClassName'](className);
  return this;
};
