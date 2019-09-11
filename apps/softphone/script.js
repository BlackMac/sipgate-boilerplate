
window.addEventListener('load', () => {
  //$('.card.state').hide();
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

  simple.on('registered', () => {
    $('.card.state').hide();
    $('.card.state.idle').show();
    $('.card.state.idle .btn').removeAttr('disabled');
  })

  $('.hangup').click(() => {
    $('.hangup').attr('disabled', true);
    simple.hangup();
  });

  $('.reject').click(() => {
    $('.reject').attr('disabled', true);
    simple.reject();
  });

  $('.answer').click(() => {
    $('.answer').attr('disabled', true);
    simple.answer();
  });

  $('.dial').click(() => {
    if ($('.number').val()) {
      $('.dial').attr('disabled', true);
      simple.call($('.number').val());
      $('.remotenumber').text($('.number').val());
      $('.card.state').hide();
      $('.card.state.preparing').show();
      $('.card.state.preparing .btn').removeAttr('disabled');
    }
  })

  $('.number').on('keyup', (k) => {
    if (k.key === 'Enter') {
      $('.dial').attr('disabled', true);
      simple.call($('.number').val());
    }
  });
});
