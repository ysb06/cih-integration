'use strict';

const http = require('http');
const functions = require('firebase-functions');
const fetch = require('node-fetch');
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(async (request, response) => {

    let fulfillment = request.body.queryResult;
    let currentIntent = fulfillment.intent;
    var currentDate = new Date();

    console.log(currentIntent.name);

    if(currentIntent.displayName == 'attending-test.ask-location') {
        console.log('No');
    }
    else if(currentIntent.displayName == 'answer.teasing') {
        response.json({ fulfillmentText: '아주 기분이 안 좋네요' });
	}
  	else if (currentIntent.displayName === 'ask.weather') {
		const weatherResult = await fetch('http://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=3092a1443316a00e2a06506060e0b558&units=metric&lang=kr');
    	const weatherInfo = await weatherResult.json();
      
      	
      	response.json({ fulfillmentText: '오늘의 날씨는 ' + weatherInfo.weather[0].description + '이며 온도는 ' + weatherInfo.main.temp +  '도 입니다.' });
  	}
});