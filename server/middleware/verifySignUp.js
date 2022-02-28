const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
    // Email 중복체크
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            return res.status(401).send({
                message: "Failed! Email is already in use!"
            });
        }
        next();
    });
    // });
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        if (!ROLES[0] === req.body.role || !ROLES[1] === req.body.role) {
            return res.status(400).send({
                message: "Failed! Role does not exist = " + req.body.roles
            });
        }
    }
    next();
};

const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail,
    checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
