// JSON Server and Auth modules
const jsonServer = require("json-server");
const auth = require("json-server-auth");
const server = jsonServer.create();
const router = jsonServer.router("db/db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
// Add this before server.use(router)
server.use(
	// Add custom route here if needed
	jsonServer.rewriter({
		"/api/*": "/$1",
	})
);

// Bind the router db to the auth module
server.db = router.db;

server.use(auth);
server.use(router);
server.listen(3001, () => {
	console.log("JSON Server is running with authentication");
});

// Export the Server API
module.exports = server;
