const app = require('./lambda_dir/index');

const main = async function() {
  const res = await app.handler();

  console.log(res);
};


main();
