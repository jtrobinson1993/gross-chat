const argsArray = process.argv.splice(2);
const argsObject = {};

argsArray.forEach((arg) => {
  const argArray = arg.split('=');
  argsObject[argArray[0].trim()] = argArray[1].trim();
});

module.exports = argsObject;
