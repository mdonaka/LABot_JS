
// const decrypter = require("./decrypt")
const decrypter = require("./../decrypt_local")

exports.handler = async (event, context, callback) => {
	const URL = await decrypter.get("WebhookURL");
	return URL;
};
