module.exports = {
  checkLoggedIn: (redirectPath) =>{
    return (req, res, next) => {
      if (req.session.currentUser) {
        next();
      } else {
        res.redirect(redirectPath);
      }
    };
  },
  checkLogged: (req, res, next) => {
    if (req.session.currentUser) {
      next();
    } else {
      res.redirect('/');
    }
  },
  setCurrentUser:(req, res, next)=>{
    if(req.isAuthenticated()){
      res.locals.currentUser =req.user;
      res.locals.isUserLoggedIn =true;
    } else{
      res.locals.isUserLoggedIn=false;
    }
    next();
  },

};
