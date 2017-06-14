module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
var app = new alexa.app( 'skill' );
var _ = require('lodash');
var request = require('sync-request');
var ENDPOINT = process.env.ENDPOINT_URL;//'https://trvin-developer-edition.ap5.force.com/services/apexrest/JobStatus?Name=';


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
		"to get status for job {jobnumber}",
		"status of job {jobnumber}"]
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
				timeout:5000
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
app.intent('AMAZON.HelpIntent',
  { 
	"utterances":[ 
		"help",
		"help me"]
  },
  function(request,response) {
    response.say('You can ask to status of job by number of job.');
  }
);

module.exports = app;