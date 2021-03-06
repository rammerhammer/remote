(function() {

$(document).ready(function() {
  $.getJSON('remotes.json', function(remoteJSON) {
    $.each(remoteJSON, function(key, remote) {
      if (remote["type"] === "remote") {
        var div = "<div data-role='collapsible'>\n" +
        "<h3>" + remote["name"] + "</h3>\n" +  
        "<div data-role='controlgroup'>\n";

        $.each(remote["buttons"], function(key, value) {        
          // TODO: put if .. for send_once/pulse to do start and stop for pulse, onclick for send_once
          // note: pulse has both an onclick for send_once and a separate touch_start for pulse
          // TODO: remove type. Any button can pulse with the right events.
          div += "<a data-role='button' href='#' onclick=$.ajax('" + "/" + value["type"] + "?remote=" + remote["remote"] + "&key=" + value["key"] +  "')>" + key + "</a>";
        });

        div += "</div></div>";
      
        $('div#RemoteList').append(div);
      }
      else if (remote["type"] === "macro") {
        var button = "<a data-role='button' href='#' onclick=$.ajax('" + "/macro?command=" + remote["command"] + "')>" + remote["name"] + "</a>";
        $('div#Macros').append(button);
      }
    });
    $('div#page1').trigger('create');
  });
});

})();
