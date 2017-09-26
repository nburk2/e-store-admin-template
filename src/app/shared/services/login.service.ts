import { Injectable } from '@angular/core';
import * as AWS from "aws-sdk/global";
import * as AWSCognito from 'amazon-cognito-identity-js';
import * as DynamoDB from "aws-sdk/clients/dynamodb";


@Injectable()
export class LoginService {

  constructor() { }

  public poolDatas = {
          UserPoolId : 'us-east-1_n3VY6JlJ0', // Your user pool id here
          ClientId : 'vd6ekf8p4l8cpr0uj1pht3apo' // Your client id here
      };

  myData() {
    console.log("inside service")
    return 'This is my data, man!';
  }

  userLogin(username, password, callback) {
    console.log("inside login service")
    // Later on
    const userPool = new AWSCognito.CognitoUserPool(this.poolDatas);
    const authDetails = new AWSCognito.AuthenticationDetails({
      Username: username,
      Password: password
    });
    const cognitoUser = new AWSCognito.CognitoUser({
      Username: username,
      Pool: userPool
    });
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => {
        // console.log(`access token = ${result.getAccessToken().getJwtToken()}`);
        /*Use the idToken for Logins Map when Federating User Pools with Cognito Identity or when passing through an Authorization Header to an API Gateway Authorizer*/
            // console.log('idToken + ' + result.getIdToken().getJwtToken());
        //POTENTIAL: Region needs to be set if not already set previously elsewhere.
            AWS.config.region = 'us-east-1';

            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId : 'us-east-1:2e260017-20a4-4644-b726-22547cb91396', // your identity pool id here
                Logins : {
                    // Change the key below according to the specific region your user pool is in.
                    'cognito-idp.us-east-1.amazonaws.com/us-east-1_n3VY6JlJ0' : result.getIdToken().getJwtToken()
                }
            });
            callback()
      },
      //need to add page for updating password
      newPasswordRequired: function(userAttributes, requiredAttributes) {
            // User was signed up by an admin and must provide new
            // password and required attributes, if any, to complete
            // authentication.

            // userAttributes: object, which is the user's current profile. It will list all attributes that are associated with the user.
            // Required attributes according to schema, which don’t have any values yet, will have blank values.
            // requiredAttributes: list of attributes that must be set by the user along with new password to complete the sign-in.

            // the api doesn't accept this field back
            delete userAttributes.email_verified;

            // Get these details and call
            // newPassword: password that user has given
            // attributesData: object with key as attribute name and value that the user has given.
            cognitoUser.completeNewPasswordChallenge(password, userAttributes, this)
        },
      onFailure: (err) => {
        // alert(err);
        callback()
        alert("Invalid username or password");
      }
    });
  }

  isAuthenticated() {
   const userPool = new AWSCognito.CognitoUserPool(this.poolDatas);
   var cognitoUser = userPool.getCurrentUser();
   var isValid = false
   if (cognitoUser != null) {
       cognitoUser.getSession(function(err, session) {
           if (err) {
              alert(err);
               return;
           }

           AWS.config.region = 'us-east-1';

           AWS.config.credentials = new AWS.CognitoIdentityCredentials({
               IdentityPoolId : 'us-east-1:2e260017-20a4-4644-b726-22547cb91396', // your identity pool id here
               Logins : {
                   // Change the key below according to the specific region your user pool is in.
                   'cognito-idp.us-east-1.amazonaws.com/us-east-1_n3VY6JlJ0' : session.getIdToken().getJwtToken()
               }
           });

           isValid = session.isValid()

           // Instantiate aws sdk service objects now that the credentials have been updated.
           // example: var s3 = new AWS.S3();

       });
   }
   return isValid
  }

  logoutUser() {
      const userPool = new AWSCognito.CognitoUserPool(this.poolDatas);
      var cognitoUser = userPool.getCurrentUser();
       cognitoUser.signOut();
  }

  refresh() {
    const userPool = new AWSCognito.CognitoUserPool(this.poolDatas);
    var cognitoUser = userPool.getCurrentUser();
    cognitoUser.getSession(function (err, session) {
            if (err) {
                console.log("CognitoUtil: Can't set the credentials:" + err);
            }

            else {
                if (session.isValid()) {
                    console.log("CognitoUtil: refreshed successfully");
                    AWS.config.region = 'us-east-1';
                    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                        IdentityPoolId : 'us-east-1:2e260017-20a4-4644-b726-22547cb91396', // your identity pool id here
                        Logins : {
                            // Change the key below according to the specific region your user pool is in.
                            'cognito-idp.us-east-1.amazonaws.com/us-east-1_n3VY6JlJ0' : session.getIdToken().getJwtToken()
                        }
                    });
                } else {
                    console.log("CognitoUtil: refreshed but session is still not valid");
                }
            }
        });
  }

  ddbClient() {
    const userPool = new AWSCognito.CognitoUserPool(this.poolDatas);
    var cognitoUser = userPool.getCurrentUser();
    var dynamodb
    // this.refresh()
    this.refresh()
    // var dynamodb2 = new AWS.DynamoDB({apiVersion: '2012-08-10'});
    cognitoUser.getSession(function(err, session) {
      // console.log(AWS.config.credentials.identityId)
      dynamodb = new DynamoDB.DocumentClient({
        apiVersion: '2012-08-10',
        region:'us-east-1',
        endpoint:"https://dynamodb.us-east-1.amazonaws.com",
        // accessKeyId: session.getIdToken(),
        // secretAccessKey: session.getAccessToken()
        credentials: AWS.config.credentials
      });

    })

    return dynamodb;
  }

}
