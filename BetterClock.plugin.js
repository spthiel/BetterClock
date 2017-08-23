//META { "name": "BetterClock" } *//

var BetterClock = (function (){
  var injectCss, inject, formatDate, pad, ticktock, interval;

  class BetterClock {
    getName() { return "Character Counter"; }

    getDescription() { return "Adds a character counter to channel textarea."; }

    getAuthor() { return "Jiiks, square"; };

    getVersion() { return "1.0.0"; }

    load(){}

    start() {
      injectCss();
      inject();
      ticktock();
      interval = setInterval(ticktock, 1000);
    }

    stop() {
      $(".content textarea").off("keyup.BetterClock");
      BdApi.clearCSS("BetterClock");
    }

    onSwitch() {
    }
  }

  injectCss = function() {
    BdApi.clearCSS("appsize");
    BdApi.injectCSS("appsize",
      `
      :root{
        --Background-image: linear-gradient(to bottom right, grey, black); none;
        --screen-height: 1080px;
      } 
        
      #clockline{
        
        font-size: 10px;
        width: 50%;
        padding-left: 50%;
        
      } 
        
      #clocktime {
        
        font-size: 90px;
        
      } 
        
      #clockdate {
        
        font-size: 60px;
        
      } 
        
      #clockcontent {
        
        padding-top: 60px;
        color: white;
        text-align: right;
        width: 100%;
        
      } 
        
      .app {
        
        height: 85% !important;
        width: 80% !important;
        
      } 
      .clockframe {
        
        padding-left: 80%;
        height: 100%;
        width: 20%;
        
      } 
      .frame {
        
        background: black;
        background-image: var(--Background-image) !important;
        background-repeat: none !important;
        background-size: cover !important;
        max-height: 100% !important;
        max-width: 100% !important;
        height: var(--screen-height) !important;
        min-width: 100% !important;
        
      } 
        
      .customappsize {
        
        height: 100% !important;
        width: 100% !important;
        
      } `);
  };
  
  inject = function() {
    if( $(".customappsize").length >= 1 ) return;
    var ta = document.getElementsByClassName("app")[0];
    var toAddTo = ta.parentElement;
    var newdiv = document.createElement('div');
    newdiv.className += 'customappsize'
    var outerframe = document.createElement('div');
    outerframe.className += 'frame'
    var clockframe = document.createElement('div');
    clockframe.className += 'clockframe'
    var clockcontent = document.createElement('div');
    clockcontent.setAttribute("id", "clockcontent");
    var time = document.createElement('div');
    time.setAttribute("id", "clocktime");
    var outerline = document.createElement('div');
    var line = document.createElement('hr');
    outerline.setAttribute("id", "clockline");
    var date = document.createElement('div');
    date.setAttribute("id", "clockdate");
    
    toAddTo.appendChild(newdiv);
    newdiv.appendChild(outerframe)
    outerframe.appendChild(ta);
    outerframe.appendChild(clockframe);
    clockframe.appendChild(clockcontent);
    clockcontent.appendChild(time);
    clockcontent.appendChild(outerline);
    outerline.appendChild(line);
    clockcontent.appendChild(date);
  };
  
  function getDate() {
    var date = new Date();
    var monthNames = [
      "JAN", "FEB", "MAR",
      "APR", "MAY", "JUN", "JUL",
      "AUG", "SEP", "OCT",
      "NOV", "DEC"
    ];
    
    var dayNames = [
      "MON", "TUE", "WED",
      "THU", "FRI", "SAT", "SUN"
    ];

    var dayofweek = date.getDay();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return monthNames[monthIndex] + ' ' + year + "<br/>" + dayNames[dayofweek] + ' ' + day;
  }
  
  
	pad = function(x) {
		return x < 10 ? '0'+x : x;
	};
  
  function getTime(){
    
    date = new Date();
    
		var h = date.getHours();
		var m = pad(date.getMinutes());
		var s = pad(date.getSeconds());

    var suffix = "AM";
    
		if(h >= 12) {
			h -= 12;
			suffix = "PM";
		}
		if(h == 0) {
			h = 12;
		}
    
    return "<b>" + h + ":" + m + "</b> " + suffix;
    
  }


	ticktock = function() {
		var time = document.getElementById("clocktime");
    time.innerHTML = getTime();
		var date = document.getElementById("clockdate");
    date.innerHTML = getDate();
	};

  return BetterClock;
})();
