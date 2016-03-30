# who-quote
WhoQuote.com

## Development

`npm run dev` to run the local server.

## Deployment

1. Add the Openshift repo as a remote (you have to have you public key added to the app first):
> git remote add openshift ssh://56fc24c42d5271e533000101@whoquote-devskwod.rhcloud.com/~/git/whoquote.git/

2. Push to the openshift remote:
> git push openshift master
