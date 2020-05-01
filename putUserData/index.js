'use strict'
const AWS = require('aws-sdk');

exports.handler = async function (event, context) {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    const { id , productname } = JSON.parse(event.body);

    let responseBody = "";
    let statusCode = 0;

    const params = {
      TableName : "Products",
      Item : {
          id : id,
          productname : productname
        }
      }
    
    try{
      const data = await documentClient.put(params).promise();
      responseBody = JSON.stringify(data);
      statusCode = 201;
    }catch(err) {
      responseBody = `Unable to put product: ${err}`
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