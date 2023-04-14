# pre-signup-lambda

**Lambda Function** for AWS Cognito Pre Signup Trigger that assures e-mail (username) as unique in the Cognito User Pool.

**Username duplication is a common issue for apps that use multiple authentication methods like Social Sign-in and E-mail.**

This project contains source code and supporting files for a serverless application that you can deploy with the SAM CLI. It includes the following files and folders.

- pre-signup-lambda - Code for the application's Lambda function.
- events - Invocation events that you can use to invoke the function.
- pre-signup-lambda/tests - Unit tests for the application code.
- template.yaml - A template that defines the application's AWS resources.
- template.local.yaml - A template as the previous but including env variables key to run locally.
- env.example.yaml - A sample of environment variables JSON file

## Install dependencies

```bash
$ cd pre-signup-lambda
pre-signup-lambda$ npm install
```

## Deploy

```bash
$ sam deploy --guided
```

The first command will build the source of your application. The second command will package and deploy your application to AWS, with a series of prompts:

* **Stack Name**: The name of the stack to deploy to CloudFormation. This should be unique to your account and region, and a good starting point would be something matching your project name.
* **AWS Region**: The AWS region you want to deploy your app to.
* **Confirm changes before deploy**: If set to yes, any change sets will be shown to you before execution for manual review. If set to no, the AWS SAM CLI will automatically deploy application changes.
* **Allow SAM CLI IAM role creation**: Many AWS SAM templates, including this example, create AWS IAM roles required for the AWS Lambda function(s) included to access AWS services. By default, these are scoped down to minimum required permissions. To deploy an AWS CloudFormation stack which creates or modifies IAM roles, the `CAPABILITY_IAM` value for `capabilities` must be provided. If permission isn't provided through this prompt, to deploy this example you must explicitly pass `--capabilities CAPABILITY_IAM` to the `sam deploy` command.
* **Save arguments to samconfig.toml**: If set to yes, your choices will be saved to a configuration file inside the project, so that in the future you can just re-run `sam deploy` without parameters to deploy changes to your application.

You can find your API Gateway Endpoint URL in the output values displayed after deployment.

## Use the SAM CLI to build and test locally

Build your application with the `sam build` command.

```bash
pre-signup-lambda$ sam build
```

The SAM CLI installs dependencies defined in `pre-signup-lambda/package.json`, creates a deployment package, and saves it in the `.aws-sam/build` folder.

Test a single function by invoking it directly with a test event. An event is a JSON document that represents the input that the function receives from the event source. Test events are included in the `events` folder in this project.

Run functions locally and invoke them with the `sam local invoke` command.

```bash
pre-signup-lambda$ sam local invoke PreSignupFunction --template ../template.local.yaml --env-vars ../env.example.json -e ../events/event.json
```

## Unit tests

Tests are defined in the `pre-signup-lambda/tests` folder in this project. Use NPM to install the [Mocha test framework](https://mochajs.org/) and [AWS SDK Mock](https://github.com/dwyl/aws-sdk-mock)  and run unit tests.

```bash
$ cd pre-signup-lambda
pre-signup-lambda$ npm install
pre-signup-lambda$ npm run test
```

## Cleanup

To delete the sample application that you created, use the AWS CLI. Assuming you used your project name for the stack name, you can run the following:

```bash
aws cloudformation delete-stack --stack-name pre-signup-lambda
```
