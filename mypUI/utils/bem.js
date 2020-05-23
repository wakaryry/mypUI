// block element modifier
const array = require('./array.js');
const object = require('./object.js');
const PREFIX = 'myp-';

function join(name, mods) {
  name = PREFIX + name;
  mods = mods.map(function(mod) {
    return name + '--' + mod;
  });
  mods.unshift(name);
  return mods.join(' ');
}

function traversing(mods, conf) {
  if (!conf) {
    return;
  }
  if (typeof conf === 'string' || typeof conf === 'number') {
    mods.push(conf);
  } else if (array.isArray(conf)) {
    conf.forEach(function(item, index) {
					traversing(mods, item);
    });
  } else if (typeof conf === 'object') {
    object.keys(conf).forEach(function(key) {
      conf[key] && mods.push(key);
    });
  }
}

function bem(name, conf) {
  const mods = [];
  traversing(mods, conf);
  return join(name, mods);
}

module.exports.bem = bem;
