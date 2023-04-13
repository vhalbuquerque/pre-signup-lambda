const AWS = require('aws-sdk');

exports.lambdaHandler = async (event, context, callback) => {
    const userPoolId = process.env.USER_POOL_ID || "void";
    const email = event.request.userAttributes.email;

    // Call the ListUsers API to check if the email already exists in the user pool
    const params = {
        UserPoolId: userPoolId,
        Filter: `email = "${email}"`,
    };
    try {
        const data = await new AWS.CognitoIdentityServiceProvider().listUsers(params).promise();
        const users = data.Users;
        if (users.length > 0) {
            const error = new Error('Email already exists in user pool');
            return callback(error, event);
        } else {
            return callback(null, event);
        }
    } catch (err) {
        const error = new Error('Error checking if email exists in user pool');
        return callback(error, event);
    }
};
