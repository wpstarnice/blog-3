const parser = require('js-yaml');
const optionalByteOrderMark = '\\ufeff?';
const pattern = '^(' +
  optionalByteOrderMark +
  '(= yaml =|---)' +
  '$([\\s\\S]*?)' +
  '^(?:\\2|\\.\\.\\.)' +
  '$' +
  (process.platform === 'win32' ? '\\r?' : '') +
  '(?:\\n)?)';

let regex = new RegExp(pattern, 'm');

function extractor(string) {
  string = string || '';

  const lines = string.split(/(\r?\n)/);
  if (lines[0] && /= yaml =|---/.test(lines[0])) {
    return parse(string)
  } else {
    return {attributes: {}, body: string}
  }
}

function parse(string) {
  const match = regex.exec(string);

  if (!match) {
    return {
      attributes: {},
      body: string
    }
  }

  const yaml = match[match.length - 1].replace(/^\s+|\s+$/g, '');
  const attributes = parser.load(yaml) || {};
  const body = string.replace(match[0], '');

  return {attributes: attributes, body: body, frontmatter: yaml}
}

function test(string) {
  string = string || '';

  return regex.test(string)
}

module.exports = extractor;
module.exports.test = test;
