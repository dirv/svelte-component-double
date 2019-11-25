const deepEql = require("deep-eql");

const toHaveBeenCalled = (spyCalls) => {
  if (spyCalls.length === 0) throw new Error('Spy was not called');
}

const toHaveBeenCalledWithProps = (spyCalls, props) => {
  let found = false;
  spyCalls.forEach(spyCall => {
    if (!found && deepEql(spyCall[0].props, props)) {
      found = true;
    }
  })
  if (!found) {
    throw new Error('Spy was not called with props');
  }
}

exports.matchers = [
  toHaveBeenCalled,
  toHaveBeenCalledWithProps
];
