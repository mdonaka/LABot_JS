
const app = require("./lambda_dir/index")

const main = async function() {
	res = await app.handler();

	console.log(res);
}


main();
