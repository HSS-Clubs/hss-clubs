//initialize datatables plugin
$(document).ready(function() {
    $('#example').DataTable( {
        dom: 'Bfrtip',
        buttons: [
            'colvis'
        ],
        "columnDefs": [
            {
                "targets": [ 0 ],
                "visible": false,
                "searchable": true
            }],
        "pageLength": 100,
        "ordering":false
    } );
} );

console.log("hello");

// //typewriter effect on banner
// document.addEventListener('DOMContentLoaded',function(event){
//     // array with texts to type in typewriter
//     var dataText = [ "Club Fair.", "Made Easy.", "HSS Clubs"];
    
//     // type one text in the typwriter
//     // keeps calling itself until the text is finished
//     function typeWriter(text, i, fnCallback) {
//       // chekc if text isn't finished yet
//       if (i < (text.length)) {
//         // add next character to h1
//        document.querySelector("h1").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';
  
//         // wait for a while and call this function again for next character
//         setTimeout(function() {
//           typeWriter(text, i + 1, fnCallback)
//         }, 100);
//       }
//       // text finished, call callback if there is a callback function
//       else if (typeof fnCallback == 'function') {
//         // call callback after timeout
//         setTimeout(fnCallback, 700);
//       }
//     }
//     // start a typewriter animation for a text in the dataText array
//      function StartTextAnimation(i) {
//        if (typeof dataText[i] == 'undefined'){
//           setTimeout(function() {
//             StartTextAnimation(0);
//           }, 20000);
//        }
//        // check if dataText[i] exists
//       if (i < dataText[i].length) {
//         // text exists! start typewriter animation
//        typeWriter(dataText[i], 0, function(){
//          // after callback (and whole text has been animated), start next text
//          StartTextAnimation(i + 1);
//        });
//       }
//     }
//     // start the text animation
//     StartTextAnimation(0);
//   });

//color selector for squares
var squares = document.querySelectorAll(".square");
var colors = [];

console.log(squares.length);

init();

function init() {
    reset();
    setupSquares();
}

function reset() {
    colors = generateRandomColors(10);
}
function setupSquares() {
    for(var i = 0; i<squares.length;i++) {
        squares[i].style.backgroundColor = colors[i];
    }
}

function generateRandomColors(num) {
    var arr = [];
    for(var i = 0;i < num; i++) {
        if(i % 2 == 0) {
            arr.push("rgb(" + 186 +", " + 212 + ", " + 170 + ")");
        } else {
            arr.push("rgb(" + 237 +", " + 180 + ", " + 88 + ")");
        }
        console.log(arr[i]);
        // squares[0].style.backgroundColor=arr[i];
    }
    return arr;
}

var linkClicked = document.getElementsByClassName('nav-link');
var numClass = linkClicked.length;

for (var i = 0; i < numClass; i++) {
		linkClicked[i].addEventListener('click', function(){
      var onTheMoment = document.getElementsByClassName('active');
			onTheMoment[0].className = onTheMoment[0].className.replace(' active', '');
			this.className += ' active';
    }, false);
	}