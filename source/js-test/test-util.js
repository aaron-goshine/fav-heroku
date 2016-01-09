(function (win) {
  /**
   * @namespace testUtil
   */
  win.testUtil = {};

  /**
   * simple assert function
   * @param {string} message - The error message
   * @param {boo} expr - An expression the evaluate to a boolean
   * @return {bool}
   * @namespace
   * @function testUtil.assert
   */
  win.testUtil.assert = function (message, expr) {
    if (!expr) {
      throw new Error(message);
    }
    win.testUtil.assert.count ++;
    return true;
  };

  win.testUtil.assert.count = 0;
  /**
   * output formatter
   * @param {string} message - The message to out put
   * @param {string} color - A color name or html
   * @namespace testUtil
   * @function testUtil.output
   */
  win.testUtil.output = function (message, color) {
    var p = document.createElement('p');
    p.style.color = color;
    p.style.backgroundColor = (color === 'green' ? '#c0de01' : '#facade');
    p.innerHTML = message;
    document.getElementById('console').appendChild(p);
  };

  /**
   * The testcase funcntion
   * @param {string} testCaseName
   * @param {object} tests - The test cases passed in as configuration object
   * @namespace testUtil
   * @function testUtil.testCase
   */
  win.testUtil.testCase = function (testCaseName, tests) {
    win.testUtil.assert.count = 0;
    var successful = 0;
    var testCount = 0;

    for (var testName in tests) {
      if (!/^test/.test(testName)) {
        continue;
      }
      testCount++;
      try {
        tests[testName]();
        win.testUtil.output(testName, 'green');
        successful++;
      } catch (e) {
        win.testUtil.output(testName + ' failed: ' + e.message, 'red');
      }
    }

    var color = successful === testCount ? 'green' : 'red';
    var message = '<strong>' + testCaseName + ' ' + testCount + ' tests, ' +
      (testCount - successful) + ' failure </strong>';
    win.testUtil.output(message, color);
  };
})(window);
