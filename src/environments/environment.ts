// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'http://ec2-13-125-222-53.ap-northeast-2.compute.amazonaws.com/api/v1',
  naver: {
    clientId: 's_brdfQHOF5ygOo6wszb',
    callbackUrl: 'http://ec2-13-125-222-53.ap-northeast-2.compute.amazonaws.com/'
  },
  facebook: {
    appId: '129076064471163'
  },
  bucket: {
    accessKeyId: 'AKIAJLDOFMO2PAHE675Q',
    secretAccessKey: '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',
    region: 'ap-northeast-2',
    downloadUrl: 'https://we2winimage.s3.ap-northeast-2.amazonaws.com/'
  }
};
