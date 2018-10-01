console.log("We are in");

$(document).ready(function() {
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

$(".btn-primary").on("click", function (event) {
    event.preventDefault(); 

    var name = $("<#name>").val().trim();
    var dest = $("<#destination>").val().trim();    
    var next = moment($("#train-time").val().trim(), "hh:mm").subtract(1, "years").format("X");
    var freq = $("<#frequency>").val().trim();

    // var currentTime = moment();
    // console.log(currentTime);

    var Newtrain = {

        train:       name,
        trainGoing:  dest,
        trainComing: next,
        everyXMin:   freq
        
    };

    //Uploads train info to firebase
    database.ref().push(Newtrain);

    $("<#name>").val("");
    $("<#destination>").val("");
    $("#train-time").val("");
    $("<#frequency>").val("");

    return false; // I read about it
});

database.ref().on("child_added", function(snapshot){
    console.log(snapshot.val());

    var name = snapshot.val().train;
    var dest = snapshot.val().trainGoing;
    var next = snapshot.val().trainComing;
    var freq = snapshot.val().everyXMin;

    //Time format 
    var trainTime = moment.unix(next).format("hh:mm");

    //Diff btwn times 
    var difference = moment().diff(moment(trainTime),"minutes");

    //Remaining time
    var trainRemain = difference % freq;

    //Min until arrival 
    var minUntil = freq - trainRemain;

    //Next Arrival Time
    var nextArrival = moment().add(minUntil, "minutes").format("hh:mm");

    //Appending info to table tag 
    $("<tbody>").append("<tr><td>") + name + "<td>" + dest + "<td>" + freq + "<td>" + nextArrival + "<td>" + minUntil + "<td>";

});

});