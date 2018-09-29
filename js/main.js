 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyCRlvsiktEcC_HEz0F5h1HVX5dF9gaDzHc",
    authDomain: "train-schedule-61b7c.firebaseapp.com",
    databaseURL: "https://train-schedule-61b7c.firebaseio.com",
    projectId: "train-schedule-61b7c",
    storageBucket: "train-schedule-61b7c.appspot.com",
    messagingSenderId: "725778773260"
  };

  firebase.initializeApp(config);



var database = firebase.database();

$(".submit").on("click", function (event) {
    event.preventDefault();

    var name = $("<#name>").val().trim();
    var dest = $("<#destination>").val().trim();
    var next = $("<#train-time>").val().trim();
    var freq = $("<frequency>").val().trim();


    var train = {
        name : name,
        dest : dest,
        next : next,
        freq : freq,
};

console.log(train);

database.ref().push(train);

}); 






/*$(document).ready(function () {
    loadDocument();
};*/ 