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
function createTopics(topicname)
{
    var createTopicPromise = sns.createTopic({Name: topicname}).promise();

    // Handle promise's fulfilled/rejected states
    createTopicPromise.then(
        function (data) {
            console.log("Topic's ARN: ", data.TopicArn);
        }).catch(
            function (err) {
                console.error(err, err.stack);
            }
        );
}

//list topics
function listAllTopics()
{
    var listTopicsPromise = sns.listTopics({}).promise();
    var arr = []

    // Handle promise's fulfilled/rejected states
    listTopicsPromise.then(
        function (data) 
        {
            arr = data.Topics
            console.log(arr);

            //print elements in the array
            // arr.forEach(element => {
            //     console.log(element)
            // })
        }).catch(
            function (err) {
                console.error(err, err.stack);
            }
        );
}

// //delete a topic
function deleteTopics(arn)
{
    //'arn:aws:sns:us-east-1:171645004892:TestTopic1'
    var deleteTopicPromise = sns.deleteTopic({ TopicArn: arn }).promise();

    // Handle promise's fulfilled/rejected states
    deleteTopicPromise.then(
        function (data) {
            console.log("Topic Deleted");
        }).catch(
            function (err) {
                console.error(err, err.stack);
            }
        );
}

//get topic attributes
function getTopicAttr(arn)
{
    //'arn:aws:sns:us-east-1:171645004892:TestTopic2'
    var getTopicAttribsPromise = sns.getTopicAttributes({ TopicArn: arn }).promise();

    // Handle promise's fulfilled/rejected states
    getTopicAttribsPromise.then(
        function (data) {
            console.log(data);
        }).catch(
            function (err) {
                console.error(err, err.stack);
            }
        );
}

//setting topic attributes
function setTopicAttr(attrName, arn, attrValue)
{
    var params = {
        AttributeName: attrName, /* required */ //'DisplayName'
        TopicArn: arn, /* required */ //'arn:aws:sns:us-east-1:171645004892:TestTopic2'
        AttributeValue: attrValue //'testtopic2'
    };

    var setTopicAttribsPromise = sns.setTopicAttributes(params).promise();

    // Handle promise's fulfilled/rejected states
    setTopicAttribsPromise.then(
        function (data) {
            console.log(data);
        }).catch(
            function (err) {
                console.error(err, err.stack);
            }
        );
}

//Listing Subscriptions to a Topic
function listSubscription(arn)
{
    const params = {
        //'arn:aws:sns:us-east-1:171645004892:TestTopic2'
        TopicArn: arn
    }

    var subslistPromise = sns.listSubscriptionsByTopic(params).promise();

    // Handle promise's fulfilled/rejected states
    subslistPromise.then(
        function (data) {
            console.log(data);
        }).catch(
            function (err) {
                console.error(err, err.stack);
            }
        );
}


//Subscribing an Email Address to a Topic
function subscribeEmail(arn, endpoint)
{
    // Create subscribe/email parameters
    var params2 = {
        Protocol: 'EMAIL', /* required */
        TopicArn: arn, /* required */ //'arn:aws:sns:us-east-1:171645004892:TestTopic2'
        Endpoint: endpoint //'meiguo1969@gmail.com'
    };

    var subscribePromise = sns.subscribe(params2).promise();

    // Handle promise's fulfilled/rejected states
    subscribePromise.then(
        function (data) {
            console.log("Subscription ARN is " + data.SubscriptionArn);
        }).catch(
            function (err) {
                console.error(err, err.stack);
            }
        );
}

//Subscribing an Application Endpoint to a Topic
function subscribeApplication(arn,endpoint)
{
    // Create subscribe/email parameters
    var params = {
        Protocol: 'application', /* required */
        TopicArn: arn, /* required */
        Endpoint: endpoint
    };

    // Create promise and SNS service object
    var subscribePromise = new AWS.SNS({ apiVersion: '2010-03-31' }).subscribe(params).promise();

    // Handle promise's fulfilled/rejected states
    subscribePromise.then(
        function (data) {
            console.log("Subscription ARN is " + data.SubscriptionArn);
        }).catch(
            function (err) {
                console.error(err, err.stack);
            });
}

//Unsubscribing from a Topic
function unSubscribe(subArn)
{
    var unsubscribePromise = sns.unsubscribe({ SubscriptionArn: subArn }).promise();

    // Handle promise's fulfilled/rejected states
    unsubscribePromise.then(
        function (data) {
            console.log(data);
        }).catch(
            function (err) {
                console.error(err, err.stack);
            }
        );
}

//Getting SMS Attributes
function getSMSAttr()
{
    var params3 = {
        attributes: [
            'DefaultSMSType',
        ]
    };

    var getSMSTypePromise = sns.getSMSAttributes(params3).promise();

    // Handle promise's fulfilled/rejected states
    getSMSTypePromise.then(
        function (data) {
            console.log(data);
        }).catch(
            function (err) {
                console.error(err, err.stack);
            }
        );
}

//Checking If a Phone Number Has Opted Out
function checkPhoneOptedOut(phoneNum)
{
    var phonenumPromise = sns.checkIfPhoneNumberIsOptedOut({ phoneNumber: phoneNum }).promise();

    // Handle promise's fulfilled/rejected states
    phonenumPromise.then(
        function (data) {
            console.log("Phone Opt Out is " + data.isOptedOut);
        }).catch(
            function (err) {
                console.error(err, err.stack);
            }
        );
}

//Subscribing an phoen number Address to a Topic
function subscribePhoneToTopic(arn,endpoint)
{
    // Create subscribe/email parameters
    var params5 = {
        Protocol: 'SMS', /* required */
        TopicArn: arn, /* required */ //'arn:aws:sns:us-east-1:171645004892:TestTopic2'
        Endpoint: endpoint //'+16265608207'
    };

    var subscribePromise = sns.subscribe(params5).promise();

    // Handle promise's fulfilled/rejected states
    subscribePromise.then(
        function (data) {
            console.log("Subscription ARN is " + data.SubscriptionArn);
        }).catch(
            function (err) {
                console.error(err, err.stack);
            }
        );
}

//Publishing an SMS Message
function publishSMS()
{
    var params4 = {
        Message: '  Hello World', /* required */
        // PhoneNumber: '+10016265608207',
        Subject: 'Message from Peter',
        TargetArn: 'arn:aws:sns:us-east-1:171645004892:Phone',
    };

    var publishTextPromise = sns.publish(params4).promise();

    // Handle promise's fulfilled/rejected states
    publishTextPromise.then(
        function (data) {
            console.log("MessageID is " + data.MessageId);
        }).catch(
            function (err) {
                console.error(err, err.stack);
            }
        );

}

publishSMS()
