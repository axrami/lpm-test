$(document).ready(function() {
  $('#fullpage').fullpage({
    slidesNavigation: false,
    loopHotizontal: true,
    loopBottom: true,
    loopTop: true
  });

  var Demo = [],
      usedAccounts = {},
      usedSkills = {};
  var customer = {
    "63960994" : "o2", 
    "92148650" : "Toys R us", 
    "44153975" : "Verizon", 
    "90571995" : "Vodafone UK", 
    "42897133" : "Time Warner", 
    "30883292" : "Sleep Number", 
    "88310325" : "Liveperson",
    "76226072" : "AT&T"
  };

  var  buildClientSlide = function (accounts, skill, enabled) {
    var $page = $( '#slide1-content' ),
        name = setName(accounts);
    $page.empty()
         .append('<h1>'+ name +'</h1>')
         .append("<button id='client-chat' type='button' class='btn btn-primary btn-block'>Live Chat!</button>")
         .append("<div id='back-btn'class='row'><div class='col-xs-12 name back-btn'>Back</div></div>");
    bindSlideBtns(accounts, skill);
  };

  var bindSlideBtns = function(accounts, skill) {
    $('#back-btn').bind('click' , function() {
      $.fn.fullpage.moveSlideLeft();
    });
    $('#client-chat').bind('click', function() {
      LPMobile.beginChat(accounts,skill);
    });
    $.fn.fullpage.moveSlideRight();
  };

  var setName = function( accounts ) {
    if ( customer[accounts] ) {
      var name = customer[accounts];
    } else {
      var name = accounts
    }
    return name
  };

  var setAvail = function( data ) {
    var accountNum = data.account,
        skill = data.skill,
        skillAvail = data.enabled,
        id = accountNum + skill;
    if (skillAvail == true && skill in usedSkills) {
      $('#' + id ).removeClass()
        .addClass('col-xs-1 avail');
    } else if (skillAvail == false && skill in usedSkills) {
      $('#' + id).removeClass()
        .addClass('col-xs-1 away');
    } else {
      addAvail( data );
    }
  };

  var addAvail = function( data ) {
    var accountNum = data.account,
        skill = data.skill,
        skillAvail = data.enabled,
        id = accountNum + skill;
    if ( skillAvail == true ) {
      $( '#' + accountNum ).append('<div id="'+ id +'" class="col-xs-1 avail"></div>');
    } else {
      $('#' + accountNum).append('<div id="'+ id +'"class="col-xs-1 away"></div>');
    }
    usedSkills[skill] = "1";
  };

  Demo.buildUl = function(data) {
  var $list = $( '#list-container' ),
      accounts = data.account,
      skill = data.skill,
      enabled = data.enabled;
  if ( accounts in usedAccounts ) {} else {
    $list.append( '<div class="row" id="'+accounts+'"><div class="col-xs-11 name">' + setName(accounts) + '</div><div class="col-xs-2 avail></div></div>' );
    $("#" + accounts).bind('click', function(){
      buildClientSlide(accounts, skill, enabled);
    });
      usedAccounts[accounts] = "1";
    };
    setAvail(data);
  };
  $.fn.fullpage.setAllowScrolling(true, 'down');
  $.fn.fullpage.setAllowScrolling(false, 'right, left');

  window.Demo = Demo;
});