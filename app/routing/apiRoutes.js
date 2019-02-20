const friends = require("../data/friends");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    $("#submit").on("click", function(event) {
        event.preventDefault();
        if (validateForm()) {
            friendArray.push(req.body);
            res.json(true);
        }
    })
  });
};

