
env = []

exports.get = (key) => { 
	if (!env[key]) {
		env[key] = 10;
	}
	return env[key];
}
