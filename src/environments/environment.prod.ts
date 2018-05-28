export const environment = {
  production: true,
  homeUrl: 'http://ec2-13-125-222-53.ap-northeast-2.compute.amazonaws.com/',
  apiUrl: 'http://ec2-13-125-222-53.ap-northeast-2.compute.amazonaws.com/api/v2',
  naver: {
    reqUrl: 'https://nid.naver.com/oauth2.0/authorize?response_type=code&' +
      'client_id=' + 's_brdfQHOF5ygOo6wszb' +
      '&state=' + 'we2win_state' +
      '&redirect_uri=' + 'http://ec2-13-125-222-53.ap-northeast-2.compute.amazonaws.com/',
    clientId: 's_brdfQHOF5ygOo6wszb',
    registerUrl: 'http://ec2-13-125-222-53.ap-northeast-2.compute.amazonaws.com/signup/form',
    callbackUrl: 'http://ec2-13-125-222-53.ap-northeast-2.compute.amazonaws.com/signup/form'
  },
  kakao: {
    clientId: 'b560ff0ff0ea7935612a6555fb53c516'
  },
  facebook: {
    appId: '129076064471163'
  },
  google: {
    apiKey: 'AIzaSyCr5TwZvjA3cgimw3yOJad_FbX5UZd-CEw'
  },
  bucket: {
    accessKeyId: 'AKIAJLDOFMO2PAHE675Q',
    secretAccessKey: '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',
    region: 'ap-northeast-2',
    downloadUrl: 'https://we2winimage.s3.ap-northeast-2.amazonaws.com/'
  }
};
