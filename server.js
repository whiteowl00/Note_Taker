
var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express apps
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);


// The server to begin listening
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

