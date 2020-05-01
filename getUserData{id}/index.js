'use strict'
const AWS = require('aws-sdk');

exports.handler = async function (event, context) {
    const documentClient = new AWS.DynamoDB.DocumentClient();
    
    const { id } = event.pathParameters;

    let responseBody = "";
    let statusCode = 0;

    const params = {
      TableName : "Products",
      Key : {
		id : id,
	}
      }
    
    try{
      const data = await documentClient.get(params).promise();
      responseBody = JSON.stringify(data);
      statusCode = 200;
    }catch(err) {
      responseBody = `Unable to get product: ${err}`
      statusCode  = 403;
    }

    const response = {
      statusCode : statusCode,
      headers : {
        "Content-Type" : "application/json" 
      },
      body : responseBody
    };

    return response;
}
