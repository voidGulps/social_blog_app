module.exports = {
    ensureAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            
            return next()
        } else {
            console.log('user sign-in fails')
            res.redirect('/')
        }
    },
    ensureGuest: function (req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/dashboard')
        } else {
             return next()
        }
    }
}