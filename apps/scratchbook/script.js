
window.addEventListener('load', () => {
  const notebook = RunKit.createNotebook({
    element: document.getElementById('io-editor'),
    source: $('.list-group-item-action code').first().text(),
    env: [`TOKEN=${accessToken}`],
    preamble: 'const sipgate = require("sipgate-bp-lib")();'
  });

  $('.list-group-item-action').click(function clicked(event) {
    event.stopPropagation();
    $('.list-group-item-action').removeClass("active");
    $(this).addClass("active");
    notebook.setSource($(this).find('code').text(), () => {});
  });
});
