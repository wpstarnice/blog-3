const fs = require('fs-extra'),
  outputFileSync = require('../output-file-sync'),
  path = require('path'),
  config  = require('../config'),
  tel = require('../template'),
  generatePost = require('./post'),
  generatePage = require('./page'),
  generateCategory = require('./category'),
  template = new tel();

function generate() {

  console.log('generator');

  outputFileSync(path.resolve(config.public_dir, 'index.html'), template.index(), 'utf8');

  generatePost();

  generatePage();

  generateCategory();

}

module.exports = generate;
