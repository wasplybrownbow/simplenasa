document.getElementById("explanation").addEventListener("mouseover", showExplanation);
document.getElementById("explanation").addEventListener("mouseout", hideExplanation);

document.getElementById("menu").addEventListener("mouseover", showMenu);
document.getElementById("menu").addEventListener("mouseout", hideMenu);

var intervalMS = 50000;
var newMS;
var oldMS;

//document.getElementById("60").addEventListener("click", function() {
//  console.log("you clicked 60");
//  intervalMS = 60000;
//  setInterval(function(){ changeURL() }, 60000);}
//);  


var exp = document.getElementById("explanation");
var img = document.getElementById("imgcontainer");
var men = document.getElementById("menu");


// GET the thingy
var xmlhttp = new XMLHttpRequest();
var url = "https://api.nasa.gov/planetary/apod?api_key=yI8IPZwsLPL9RRAnV67PEixBxc1izfhrs1bnr92V&hd=False&date=2016-05-28";
xmlhttp.open("GET", url, true);  // open just specifies and defines the request
xmlhttp.send();  								 // send actually sends the request that I opened. (use with GET) 

setInterval(function(){ changeURL() }, 50000);

// Setup 
function initialize() {
  url = "https://api.nasa.gov/planetary/apod?api_key=yI8IPZwsLPL9RRAnV67PEixBxc1izfhrs1bnr92V&hd=False&date=";
  url += handlerFunc();
  //alert(url);
  newMS = Date.now()/1000;
  oldMS = Date.now()/1000;
  console.log('Initialize ' + newMS);
  xmlhttp.open("GET", url, true);  
  xmlhttp.send(); 
  
  //alert("about to set styles");
  img.style.width = '100%';
  //img.style.height = '100%';
  img.style.opacity = 1;
  
}

// Run this forevor 
//setInterval(changeURL(), 5000);

function showMenu() {
	men.style.opacity = '.5';
}

function hideMenu() {
  	men.style.opacity = '0';
}

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
  newMS = Date.now()/1000;    
  console.log(newMS-oldMS);
  xmlhttp.open("GET", url, true);  
  xmlhttp.send();
  opacto1();
  oldMS = newMS;
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

