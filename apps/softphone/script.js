
window.addEventListener('load', () => {
  $('.card.state').hide();
  $('.card.state.idle').show();
  const options = {
    media: {
      constraints: {
        audio: true,
        video: false,
      },
      local: {
        audio: document.getElementById('localAudio'),
      },
      remote: {
        audio: document.getElementById('localAudio'),
      }
    },
    ua: {
      wsServers: creds.wsServers,
      uri: creds.uri,
      authorizationUser: creds.authorizationUser,
      password: creds.password,
    }
  };
  console.log(options);
  const simple = new SIP.Web.Simple(options);

  simple.on('ringing', (data) => {
    console.log("######*****#####", data.request.from);
    $('.remotenumber').text(data.request.from._displayName);
    $('.card.state').hide();
    $('.card.state.incoming').show();
    //simple.answer();
  });

  simple.on('hangup', (data) => {
    $('.card.state').hide();
    $('.card.state.idle').show();
    //simple.answer();
  });

  simple.on('reject', (data) => {
    $('.card.state').hide();
    $('.card.state.idle').show();
    //simple.answer();
  });

  simple.on('ended', (data) => {
    $('.card.state').hide();
    $('.card.state.idle').show();
    //simple.answer();
  });

  simple.on('connected', (data) => {
    $('.remotenumber').text(data.request.from._displayName);
    $('.card.state').hide();
    $('.card.state.active').show();
    //simple.answer();
  });

  simple.on('connecting', (data) => {
    $('.remotenumber').text(data.request.from._displayName);
    $('.card.state').hide();
    $('.card.state.initiating').show();
    //simple.answer();
  });

  $('.hangup').click(() => {
    simple.hangup();
  });

  $('.answer').click(() => {
    simple.answer();
  });

  $('.dial').click(() => {
    simple.call($('.number').val());
  })
});
