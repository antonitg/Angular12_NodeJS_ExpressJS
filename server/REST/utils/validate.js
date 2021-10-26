isEmpty = (nom) => {
    if (nom) {
        if (nom.length > 0) {
            return true;
        }
    }
    return false;
}

exists = (num) => {
    if (num) {
        return true;
    }
    return false;
}

checkEmail = (email) => {
    let emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (!emailRegex.test(email)) {
        return false;
    }

    return true;
}

checkPasswd = (passwd, repasswd) => {
    let strongRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
    if (strongRegex.test(passwd) && passwd === repasswd) {
        return true;
    }
    return false;
}

module.exports.validateUser = (nom, passwd, repasswd, email) => {
    let c_nom = isEmpty(nom);
    let c_passwd = checkPasswd(passwd, repasswd);
    let c_email = checkEmail(email);

    let check = true;
    let errors = {
        error_nom: "",
        error_email: "",
        error_passwd: ""
    };
    if (!c_nom) {
        check = false;
        errors.error_nom = "El nombre es incorrecto";
    }
    if (!c_passwd) {
        check = false;
        errors.error_passwd = "Las contraseñas no coinciden o son incorrectas";
    }
    if (!c_email) {
        check = false;
        errors.error_email = "El email es incorrecto";
    }

    if (check) {
        return true;
    } else {
        return errors;
    }
}

module.exports.validateValoration = (rate, descr) => {
    let c_rate = exists(rate);
    let c_descr = isEmpty(descr);

    let check = true;
    let errors = {
        error_rate: "",
        error_descr: ""
    };

    if (!c_rate) {
        check = false;
        errors.error_rate = "La valoracion esta vacia";
    } else {

    }
    if (!c_descr) {
        check = false;
        errors.error_descr = "La descripcion esta vacia";
    }

    if (check) {
        return true;
    } else {
        return errors;
    }
}