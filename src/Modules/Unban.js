import Module from "./Module";

export default class Unban extends Module {
    constructor () {
        super("Unban");
    }

    onEnable () {
        document.cookie.split(";").forEach(function (cookie) {
            document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });

        location.reload();
    }
};