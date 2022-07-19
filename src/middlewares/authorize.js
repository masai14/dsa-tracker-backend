module.exports = function (permittedRoles) { 
    return (req, res, next) => {
        
        let isPermitted = false;
        
        permittedRoles.map((role) => {
            if (role == req.user.role) {
                isPermitted = true;
            }
        });

        if (!isPermitted) { 
            return res.status(403).send({message: "Permission denied"})
        }

        return next();
    }
}