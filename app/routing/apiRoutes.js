const friends = require("../data/friends");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    let macthDiff = 0;
    let bestMatch = {
        name: "",
        photo: "",
        friendDiff: 1000
    };
    let userData = req.body;
    let userName = userData.name;
    let userScores = userData.scores

    let b = userScores.map(function(item){
        return parseInt(item, 10);
    })

    userData = {
        name: req.body.name,
        photo: req.body.photo,
        scores: b
    }

    let sum = b.reduce((a,b) => a + b, 0);

    for (let i = 0; i < friends.length; i++) {
        macthDiff = 0;
        let newFriendScore = friends[i].scores.reduce((a,b) => a + b, 0);
        macthDiff += Math.abs(sum - newFriendScore);

        if(macthDiff <= bestMatch.friendDiff){
            bestMatch.name = friends[i].name
            bestMatch.photo = friends[i].photo
            bestMatch.friendDiff = macthDiff;
        }
    }
    friends.push(userData);
    res.json(bestMatch);
  });



//   app.post("/api/friends", function(req, res) {
//     // Empty out the arrays of data
//     friends.length = [];
//     res.json({ ok: true });
//   });
};

