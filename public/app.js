document.getElementById("explanation").addEventListener("mouseover", showExplanation);
document.getElementById("explanation").addEventListener("mouseout", hideExplanation);

alert('app.js');

var exp = document.getElementById("explanation");
var img = document.getElementById("imgcontainer");

// GET the thingy
var xmlhttp = new XMLHttpRequest();
var url = "https://api.nasa.gov/planetary/apod?api_key=yI8IPZwsLPL9RRAnV67PEixBxc1izfhrs1bnr92V&hd=False&date=2016-05-28";
xmlhttp.open("GET", url, true);  // open just specifies and defines the request
xmlhttp.send();  								 // send actually sends the request that I opened. (use with GET) 

// Setup 
function initialize() {
  url = "https://api.nasa.gov/planetary/apod?api_key=yI8IPZwsLPL9RRAnV67PEixBxc1izfhrs1bnr92V&hd=False&date=";
  url += handlerFunc();
  //alert(url);
  console.log(url);
  xmlhttp.open("GET", url, true);  
  xmlhttp.send(); 
  
  //alert("about to set styles");
  img.style.width = '100%';
  //img.style.height = '100%';
  img.style.opacity = 1;
  setInterval(function(){ changeURL() }, 43000);
  
}

// Run this forevor 
//setInterval(changeURL(), 5000);

function opacto1() {
  //alert("waiting in opacto1");
  img.style.opacity = '1';  
}

function opacto0() {
  //alert("waiting in opacto0");
  img.style.opacity = '0';
}

function changeURL() {
  opacto0();
  url = "https://api.nasa.gov/planetary/apod?api_key=yI8IPZwsLPL9RRAnV67PEixBxc1izfhrs1bnr92V&hd=False&date=";
  url += handlerFunc();
  //alert(url);
  console.log(url);
  xmlhttp.open("GET", url, true);  
  xmlhttp.send();
  opacto1();
}

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        //alert(xmlhttp.responseText);
			  t=xmlhttp.responseText;
				t=JSON.parse(t);
				//alert(t.url);
        document.getElementById("pix").src = t.url; //"http://apod.nasa.gov/apod/image/1605/marsglobe_viking_1552.jpg";
        document.getElementById("explanation").innerHTML = t.explanation;
    }
}

function showExplanation() {
	exp.style.opacity = '.5';
}

function hideExplanation() {
  	exp.style.opacity = '0';
}

function handlerFunc() {
	a = generateDateString();
  return a;
}

function generateDateString() {
	var d = new Date;
	var currYr = d.getFullYear();
	var currMo = d.getMonth();
	var currDa = d.getDay();
	var randMo = getRandomInRange(1,12);
	var randYr = getRandomInRange(2000,currYr);
	var maxDa  = daysInMonth(randMo, randYr);
	var randDa = getRandomInRange(1, maxDa);
  
  //Make sure the random date isn't in the future.
  //  We already know the year won't be in the future.
  //  Only check if the randYr === currYr
  var tempo = 'past';
  while (tempo === 'past') {
    if (randYr === currYr) { // Continue if randYr is same as currYr
      if (randMo > currMo) { // probs
        tempo = 'future';
      } else {  // at this point we know the randMo is LT or EQ currMo
        if (randDa > currDa) { // probs
          tempo = 'future'
        } else {
          return randYr + '-' + randMo + '-' + randDa;
        }
      }
    } else { // randYr < currYr so no prob
      return randYr + '-' + randMo + '-' + randDa;
    }
  } // end of while
}

function getRandomInRange(min, max) {
// Returns inclusive random whole number between min and max
	return Math.floor(Math.random() * (max - min +1) + min);
}

function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}

