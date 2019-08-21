/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  if (req.user) {
    return res.redirect('/overview');
  }
  res.render('home', {
    title: 'Home'
  });
};
