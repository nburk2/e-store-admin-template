import { Injectable } from '@angular/core';
import { LoginService } from '../../shared/services/login.service';
import * as AWS from "aws-sdk/global";
import * as AWSCognito from 'amazon-cognito-identity-js';
import * as DynamoDB from "aws-sdk/clients/dynamodb";


@Injectable()
export class DDBService {

  public dynamodb: DynamoDB.DocumentClient

  constructor(private loginService: LoginService = new LoginService()) {
    this.dynamodb = new DynamoDB.DocumentClient({
      apiVersion: '2012-08-10',
      region:'us-east-1',
      endpoint:"https://dynamodb.us-east-1.amazonaws.com",
      credentials: AWS.config.credentials
    });
  }

// {TableName:"", Limit: 10}
  scanTable(params, callback) {

    this.dynamodb.scan(params, function(err, data) {
       if (err) console.log(JSON.stringify(err)); // an error occurred
       else {
         callback(data.Items, data.LastEvaluatedKey);
       }           // successful response
     });
  }

  queryTable(params, callback) {

    this.dynamodb.query(params, function(err, data) {
       if (err) console.log(JSON.stringify(err)); // an error occurred
       else {
         callback(data.Items, data.LastEvaluatedKey);
       }           // successful response
     });
  }

  createItem(params = {TableName:"", Item: {}}, callback) {

    this.dynamodb.put(params, function(err, data) {
       if (err) console.log("error" + JSON.stringify(err)); // an error occurred
       else {
         callback(params.Item);
       }             // successful response
     });
  }

  getItem(params = {TableName:"", Key: {}}, callback) {

    this.dynamodb.get(params, function(err, data) {
       if (err) console.log(JSON.stringify(err)); // an error occurred
       else     {
         callback(data.Item);
       }           // successful response
     });
  }

  updateItem(params = {TableName:"", Key: {}, AttributeUpdates: {}}, callback) {
    this.dynamodb.update(params, function(err, data) {
       if (err) console.log(JSON.stringify(err)); // an error occurred
       else {
         // successful response
         callback(params.Key)
       }
     });
  }

  deleteItem(params = {TableName:"", Key: {}}, callback) {

    this.dynamodb.delete(params, function(err, data) {
       if (err) {
         console.log(JSON.stringify(err)); // an error occurred
         alert("Delete failed. Please try again later or contact your admin if this error persists.")
       }
       else     {
         callback();
       }           // successful response
     });
  }


}
