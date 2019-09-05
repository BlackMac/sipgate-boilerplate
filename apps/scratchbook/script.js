/* eslint-disable no-undef */
let notebook;

const decodeHTML = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

window.addEventListener('load', () => {
  $('.hooksconnect').hide();
  const code = $('.list-group-item-action script.invisible').first().text();
  console.log(code);
  notebook = RunKit.createNotebook({
    element: document.getElementById('io-editor'),
    source: code,
    preamble: `const sipgate = require("sipgate-bp-lib")();
    process.env.TOKEN = "${accessToken}";`
  });

  $('.connectbtn').click((event) => {
    event.stopPropagation();
    console.log('go');
    $.post('/apps/scratchbook/webhook', { URL: notebook.endpointURL })
      .done((data) => {
        if (data === 'OK') {
          $('.hooksconnect').hide();
          $('.hooksconnected').show();
        }
      });
  });

  $('.disconnectbtn').click((event) => {
    event.stopPropagation();
    console.log('go');
    $.post('/apps/scratchbook/webhook', { URL: '' })
      .done((data) => {
        if (data === 'OK') {
          $('.hooksconnect').show();
          $('.hooksconnected').hide();
        }
      });
  });

  $('.list-group-item-action').click(function clicked(event) {
    event.stopPropagation();
    $('.list-group-item-action').removeClass('active');
    $(this).addClass('active');
    notebook.setSource(decodeHTML($(this).find('script').text()), () => {});
    if ($(this).hasClass('endpoint')) {
      notebook.setMode('endpoint', () => {
        window.setTimeout(() => {
          $('.runkiturl').text(notebook.endpointURL);
        }, 1000);
      });
      $('.hooksconnect').show();
    } else {
      notebook.setMode('default', () => {});
      $('.hooksconnect').hide();
    }
  });
  setInterval(() => {
    $.ajax({ url: '/token' })
      .done((data) => {
        notebook.setPreamble(`const sipgate = require("sipgate-bp-lib")();
        process.env.TOKEN = "${data}";`, () => {});
      });
  }, 20000);
});
