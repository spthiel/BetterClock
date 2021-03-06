//META { "name": "BetterClock" } *//

var BetterClock = (function (){
  var injectCss, inject, formatDate, pad, ticktock, interval;

  class BetterClock {
    getName() { return "BetterClock"; }

    getDescription() { return "Adds a nice clock to Discord."; }

    getAuthor() { return "spthiel"; };

    getVersion() { return "1.0.0"; }

    load(){}

    start() {
      injectCss();
      inject();
      ticktock();
      interval = setInterval(ticktock, 1000);
    }

    stop() {
      BdApi.clearCSS("BetterClock");
    }

    onSwitch() {
    }
  }

  injectCss = function() {
    BdApi.clearCSS("appsize");
    BdApi.injectCSS("appsize",
      `        
      #clockline{
        
        font-size: 10px;
        width: 70%;
        padding-left: 30%;
        
      } 
        
      #clocktime {
        
        font-size: 4vw;
        
      } 
        
      #clockdate {
        
        font-size: 3.5vw;
        
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
      
      .frame:before {
        
          content: ' ';
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background-image: linear-gradient(to bottom right, grey, black);
          background-size: cover;
          background-position: center;
          z-index: -100;
        
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
      "SUN", "MON", "TUE", "WED",
      "THU", "FRI", "SAT"
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
    window.scrollTo(0,0);
    var time = document.getElementById("clocktime");
    time.innerHTML = getTime();
    var date = document.getElementById("clockdate");
    date.innerHTML = getDate();
  };

  return BetterClock;
})();
