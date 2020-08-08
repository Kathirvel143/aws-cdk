import { expect as expectCDK, haveResource } from '@aws-cdk/assert'
import * as cdk from '@aws-cdk/core'
import { AuthenticationStack } from '../lib/authentication-stack'

test('User pool created as case insensitive', () => {
  const app = new cdk.App()
  // WHEN
  const stack = new AuthenticationStack(app, 'MyTestStack', {
    account: 'XXX',
    region: 'us-east-1',
    envName: 'dev',
    appName: 'my-app'
  })

  // THEN
  expectCDK(stack).to(haveResource('AWS::Cognito::UserPool', {
    MfaConfiguration: 'OPTIONAL',
    UsernameConfiguration: {
      CaseSensitive: false
    }
  }))
})