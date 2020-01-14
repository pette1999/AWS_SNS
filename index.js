var AWS = require("aws-sdk");
AWS.config.update({ region: 'us-east-1' });

AWS.config.getCredentials(function (err) {
    if (err) console.log(err.stack);
    // credentials not loaded
    else {
        console.log("Access key:", AWS.config.credentials.accessKeyId);
        console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
    }
});

var sns = new AWS.SNS({ apiVersion: '2010-03-31' });

// //create a topic
// var createTopicPromise = sns.createTopic({Name: "TestTopic2"}).promise();

// // Handle promise's fulfilled/rejected states
// createTopicPromise.then(
//     function (data) {
//         console.log("Topic's ARN: ", data.TopicArn);
//     }).catch(
//         function (err) {
//             console.error(err, err.stack);
//         }
// );

//list topics
// var listTopicsPromise = sns.listTopics({}).promise();
// var arr = []

// // Handle promise's fulfilled/rejected states
// listTopicsPromise.then(
//     function (data) 
//     {
//         arr = data.Topics
//         console.log(arr);

//         //print elements in the array
//         // arr.forEach(element => {
//         //     console.log(element)
//         // })
//     }).catch(
//         function (err) {
//             console.error(err, err.stack);
//         }
//     );

// //delete a topic
// var deleteTopicPromise = sns.deleteTopic({ TopicArn: 'arn:aws:sns:us-east-1:171645004892:TestTopic1' }).promise();

// // Handle promise's fulfilled/rejected states
// deleteTopicPromise.then(
//     function (data) 
//     {
//         console.log("Topic Deleted");
//     }).catch(
//         function (err) 
//         {
//             console.error(err, err.stack);
//         }
//     );

// //get topic attributes
// var getTopicAttribsPromise = sns.getTopicAttributes({ TopicArn: 'arn:aws:sns:us-east-1:171645004892:TestTopic2' }).promise();

// // Handle promise's fulfilled/rejected states
// getTopicAttribsPromise.then(
//     function (data) 
//     {
//         console.log(data);
//     }).catch(
//         function (err) 
//         {
//             console.error(err, err.stack);
//         }
//     );

// //setting topic attributes

// // Create setTopicAttributes parameters
// var params = {
//     AttributeName: 'DisplayName', /* required */
//     TopicArn: 'arn:aws:sns:us-east-1:171645004892:TestTopic2', /* required */
//     AttributeValue: 'testtopic2'
// };

// var setTopicAttribsPromise = sns.setTopicAttributes(params).promise();

// // Handle promise's fulfilled/rejected states
// setTopicAttribsPromise.then(
//     function (data) 
//     {
//         console.log(data);
//     }).catch(
//         function (err) 
//         {
//             console.error(err, err.stack);
//         }
//     );


//Listing Subscriptions to a Topic
// const params = {
//     TopicArn: 'arn:aws:sns:us-east-1:171645004892:TestTopic2'
// }

// var subslistPromise = sns.listSubscriptionsByTopic(params).promise();

// // Handle promise's fulfilled/rejected states
// subslistPromise.then(
//     function (data) 
//     {
//         console.log(data);
//     }).catch(
//         function (err) 
//         {
//             console.error(err, err.stack);
//         }
//     );


//Subscribing an Email Address to a Topic

// // Create subscribe/email parameters
// var params2 = {
//     Protocol: 'EMAIL', /* required */
//     TopicArn: 'arn:aws:sns:us-east-1:171645004892:TestTopic2', /* required */
//     Endpoint: 'meiguo1969@gmail.com'
// };

// var subscribePromise = sns.subscribe(params2).promise();

// // Handle promise's fulfilled/rejected states
// subscribePromise.then(
//     function (data) 
//     {
//         console.log("Subscription ARN is " + data.SubscriptionArn);
//     }).catch(
//         function (err) 
//         {
//             console.error(err, err.stack);
//         }
//     );

//Subscribing an Application Endpoint to a Topic

// // Load the AWS SDK for Node.js
// var AWS = require('aws-sdk');
// // Set region
// AWS.config.update({ region: 'REGION' });

// // Create subscribe/email parameters
// var params = {
//     Protocol: 'application', /* required */
//     TopicArn: 'TOPIC_ARN', /* required */
//     Endpoint: 'MOBILE_ENDPOINT_ARN'
// };

// // Create promise and SNS service object
// var subscribePromise = new AWS.SNS({ apiVersion: '2010-03-31' }).subscribe(params).promise();

// // Handle promise's fulfilled/rejected states
// subscribePromise.then(
//     function (data) {
//         console.log("Subscription ARN is " + data.SubscriptionArn);
//     }).catch(
//         function (err) {
//             console.error(err, err.stack);
//         });


//Unsubscribing from a Topic
// var unsubscribePromise = sns.unsubscribe({ SubscriptionArn: 'arn:aws:sns:us-east-1:171645004892:TestTopic2:4ccfccf1-376d-41b3-b809-5a390edc2e28' }).promise();

// // Handle promise's fulfilled/rejected states
// unsubscribePromise.then(
//     function (data) 
//     {
//         console.log(data);
//     }).catch(
//         function (err) 
//         {
//             console.error(err, err.stack);
//         }
//     );

//Getting SMS Attributes
// var params3 = {
//     attributes: [
//         'DefaultSMSType',
//     ]
// };

// var getSMSTypePromise = sns.getSMSAttributes(params3).promise();

// // Handle promise's fulfilled/rejected states
// getSMSTypePromise.then(
//     function (data) 
//     {
//         console.log(data);
//     }).catch(
//         function (err) 
//         {
//             console.error(err, err.stack);
//         }
//     );

//Checking If a Phone Number Has Opted Out
var phonenumPromise = sns.checkIfPhoneNumberIsOptedOut({ phoneNumber: '6265608207' }).promise();

// Handle promise's fulfilled/rejected states
phonenumPromise.then(
    function (data) 
    {
        console.log("Phone Opt Out is " + data.isOptedOut);
    }).catch(
        function (err) 
        {
            console.error(err, err.stack);
        }
    );

//Publishing an SMS Message
var params4 = {
    Message: 'Hello World', /* required */
    PhoneNumber: '+10016265608207',
};

var publishTextPromise = sns.publish(params4).promise();

// Handle promise's fulfilled/rejected states
publishTextPromise.then(
    function (data) 
    {
        console.log("MessageID is " + data.MessageId);
    }).catch(
        function (err) 
        {
            console.error(err, err.stack);
        }
    );