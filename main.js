const app = require('./lambda_dir/index');

const main = async function() {
  const res = await app.handler();

  console.log('-- response --\n', res);
};


main();
