/* eslint-disable no-undef */
let notebook;

window.addEventListener('load', () => {
  notebook = RunKit.createNotebook({
    element: document.getElementById('io-editor'),
    source: $('.list-group-item-action code').first().text(),
    preamble: `const sipgate = require("sipgate-bp-lib")();
    process.env.TOKEN = "${accessToken}";`
  });

  $('.list-group-item-action').click(function clicked(event) {
    event.stopPropagation();
    $('.list-group-item-action').removeClass('active');
    $(this).addClass('active');
    notebook.setSource($(this).find('code').text(), () => {});
  });
  setInterval(() => {
    $.ajax({ url: '/token' })
      .done((data) => {
        notebook.setPreamble(`const sipgate = require("sipgate-bp-lib")();
        process.env.TOKEN = "${data}";`);
      });
  }, 20000);
});
