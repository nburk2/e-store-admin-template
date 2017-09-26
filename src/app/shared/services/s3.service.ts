import { Injectable } from '@angular/core';
import { LoginService } from '../../shared/services/login.service';
import * as AWS from "aws-sdk/global";
import * as AWSCognito from 'amazon-cognito-identity-js';
import * as S3 from "aws-sdk/clients/s3";


@Injectable()
export class S3Service {

  public s3client: S3

  constructor(private loginService: LoginService = new LoginService()) {
    this.s3client = new S3({
      apiVersion: '2006-03-01',
      params: {Bucket: "admin-template-images"},
      region: 'us-east-1',
      endpoint: "https://s3.amazonaws.com"
    })
  }

  // public listPhotos(albumName) {
  //       // var albumPhotosKey = encodeURIComponent(environment.albumName) + '//';
  //       this.s3client.listObjects({
  //         Bucket: "admin-template-images",
  //         Prefix: "filekeytest"
  //       }, function (err, data) {
  //           if (err) {
  //               console.log('There was an error viewing your album: ' + err);
  //           } else {
  //             console.log(data)
  //           }
  //
  //       });
  //   }

  uploadFile(file: File, itemName, type, callback) {

    this.s3client.upload({
      Bucket: "admin-template-images",
      Key: itemName + "/" + type + ".jpg",
      ContentType: file.type,
      Body: file,
      StorageClass: 'STANDARD',
      ACL: 'public-read'
      }, function(err, data) {
        if (err) {
          console.log("errorororororor")
          console.log(err)
          return alert('There was an error uploading your photo: ' + err.message);
        } else {
          callback(data.Location)
          return alert('Successfully uploaded photo.');
        }
      });
  }

  deleteFiles(objects, callback) {
      this.s3client.deleteObjects({Bucket: "admin-template-images", Delete: {Objects: objects}}, function (err, data) {
          if (err) {
              console.log('There was an error deleting your photo(s): ' + err.message);
              return;
          } else {
            callback()
            console.log('Successfully deleted photo(s).');
          }
      });
  }

}
