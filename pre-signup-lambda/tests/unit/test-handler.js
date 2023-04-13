const { expect } = require('chai');
const AWSMock = require('aws-sdk-mock');
const { lambdaHandler } = require('../../app');

describe('lambdaHandler', () => {
  afterEach(() => {
    AWSMock.restore();
  });

  it('should return event when email does not exist in the user pool', async () => {
    const event = {
      request: {
        userAttributes: {
          email: 'test@test.com',
          'custom:domain': 'example.com',
        },
      },
      response: {},
    };
    AWSMock.mock('CognitoIdentityServiceProvider', 'listUsers', {
      Users: [],
    });
    const result = await lambdaHandler(event, null, (err, data) => {
      if (err) {
        return err;
      }
      return data;
    });
    console.log(result)
    expect(result).to.deep.equal(event);
  });

  it('should return error when email already exists in the user pool', async () => {
    const event = {
      request: {
        userAttributes: {
          email: 'test@test.com',
          'custom:domain': 'example.com',
        },
      },
      response: {},
    };
    AWSMock.mock('CognitoIdentityServiceProvider', 'listUsers', {
      Users: [
        {
          Username: 'user1',
          Attributes: [
            {
              Name: 'email',
              Value: 'test@test.com',
            },
          ],
        },
      ],
    });
    const result = await lambdaHandler(event, null, (err, data) => {
      if (err) {
        return err;
      }
      return data;
    });
    expect(result).to.be.an.instanceof(Error);
    expect(result.message).to.equal('Email already exists in user pool');
  });

  it('should return error when listUsers API call fails', async () => {
    const event = {
      request: {
        userAttributes: {
          email: 'test@test.com',
          'custom:domain': 'example.com',
        },
      },
      response: {},
    };
    const errorMessage = 'listUsers API call failed';
    AWSMock.mock('CognitoIdentityServiceProvider', 'listUsers', () => {
      throw new Error(errorMessage);
    });
    const result = await lambdaHandler(event, null, (err, data) => {
      if (err) {
        return err
      }
      return data;
    });
    expect(result).to.be.an.instanceof(Error);
    expect(result.message).to.equal('Error checking if email exists in user pool');
  });
});
