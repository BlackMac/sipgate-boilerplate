
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
    $('.card.state.incoming .btn').removeAttr('disabled');
    //simple.answer();
  });

  simple.on('hangup', (data) => {
    $('.card.state').hide();
    $('.card.state.idle').show();
    $('.card.state.idle .btn').removeAttr('disabled');
    //simple.answer();
  });

  simple.on('reject', (data) => {
    $('.card.state').hide();
    $('.card.state.idle').show();
    $('.card.state.idle .btn').removeAttr('disabled');
    //simple.answer();
  });

  simple.on('ended', (data) => {
    $('.card.state').hide();
    $('.card.state.idle').show();
    $('.card.state.idle .btn').removeAttr('disabled');
    //simple.answer();
  });

  simple.on('connected', (data) => {
    console.log("+++###", data.request);
    $('.remotenumber').text(data.request.from._displayName || data.request.to.friendlyName.replace('@sipgate.de', ''));
    $('.card.state').hide();
    $('.card.state.active').show();
    $('.card.state.active .btn').removeAttr('disabled');
    //simple.answer();
  });

  simple.on('connecting', (data) => {
    console.log("+++###", data.request);
    $('.remotenumber').text(data.request.from._displayName || data.request.to.friendlyName.replace('@sipgate.de', ''));
    $('.card.state').hide();
    $('.card.state.initiating').show();
    $('.card.state.initiating .btn').removeAttr('disabled');
    //simple.answer();
  });

  $('.hangup').click(() => {
    $('.hangup').attr('disabled', true);
    simple.hangup();
  });

  $('.answer').click(() => {
    $('.answer').attr('disabled', true);
    simple.answer();
  });

  $('.dial').click(() => {
    $('.dial').attr('disabled', true);
    simple.call($('.number').val());
  })

  $('.number').on('keyup', (k) => {
    if (k.key === 'Enter') {
      $('.dial').attr('disabled', true);
      simple.call($('.number').val());
    }
  });
});
