module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
var app = new alexa.app( 'skill' );
var _ = require('lodash');
var request = require('sync-request');
var ENDPOINT = 'https://trvin-developer-edition.ap5.force.com/services/apexrest/JobStatus?Name=';


app.launch( function( request, response ) {
	response.say( 'Welcome to Target recruit skills.' ).reprompt( 'Way to go. You got it to run.' ).shouldEndSession( false );
} );


app.error = function( exception, request, response ) {
	console.log(exception)
	console.log(request);
	console.log(response);	
	response.say( 'Sorry an error occured ' + error.message);
};

app.intent('JobIntent',
  {
    "slots":{"jobnumber":"AMAZON.NUMBER"}
	,"utterances":[ 
		"say the number {jobnumber}",
		"give me the number {jobnumber}",
		"tell me the number {jobnumber}",
		"I want to hear you say the number {jobnumber}"]
  },
  function(request,response) {
    var jobnumber = request.slot('jobnumber');
    //response.say("You asked for the number " + jobnumber);

    if (_.isEmpty(jobnumber)) {
      	var prompt = 'I didn\'t hear a jobnumber. Tell me a jobnumber.';
      	response.say(prompt).reprompt(reprompt).shouldEndSession(false);
      	return true;
    } else {
    	try{
			var request = require('sync-request');
			var res = request('GET', ENDPOINT + jobnumber ,{
				timeout:3000
			});
			
			var s = JSON.parse(res.getBody());
			console.log(s);
			response.say(s);
		}catch(e){
			console.log(e.message);
			response.say('Sorry, Some error occured ');
		}
      	return true;

	}
    	

  }
);

module.exports = app;