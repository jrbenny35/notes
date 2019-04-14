const util = require('util')
const fxa = require('fxa-js-client')

describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have a sign in button', async () => {
    await expect(element(by.id('signInButton'))).toBeVisible();
    await expect(element(by.text('Sign In'))).toBeVisible();
  });

  it('should be able to sign in', async () => {
    var client = new fxa('https://api.accounts.firefox.com/v1');
    var opts = {
      preVerified: true
    }
    var user = client.signUp('bforehandtest1@restmail.net', 'thisisatest123', opts);
    user.then(function(res){
      console.log(res)
    })
    await element(by.text('Sign In')).tap();
    await waitFor(element(by.id('listHeader'))).toBeVisible().withTimeout(20000);
    await expect(element(by.id('listHeader'))).toBeVisible();
  });
});
