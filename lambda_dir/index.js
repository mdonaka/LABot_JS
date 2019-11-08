
// const decrypter = require("./env")
const decrypter = require("./../env_local")

exports.handler = async (event, context, callback) => {
	const URL = await decrypter.get("WebhookURL");
	return URL;
};
