let liveServer = require("live-server");

let params = {
  port: 3000, // Set the server port. Defaults to 8080.
  host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
  root: ".", // Set root directory that's being served. Defaults to cwd.
  open: false, // When false, it won't load your browser by default.
  ignore: "node_modules", // comma-separated string for paths to ignore
  wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
};

liveServer.start(params);
