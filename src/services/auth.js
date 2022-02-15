import {Gatekeeper} from 'gatekeeper-client-sdk';

const getError = (error) => {
    const message = error.message || 'Failed';
    return new Error(message);
};

export const loginByAuth = async (email, password) => {
    try {
        const token = await Gatekeeper.loginByAuth(email, password);
        return token;
    } catch (error) {
        throw getError(error);
    }
};

export const registerByAuth = async (email, password) => {
    try {
        const token = await Gatekeeper.registerByAuth(email, password);
        return token;
    } catch (error) {
        throw getError(error);
    }
};

export const loginByGoogle = async () => {
    try {
        const token = await Gatekeeper.loginByGoogle();
        return token;
    } catch (error) {
        throw getError(error);
    }
};

export const registerByGoogle = async () => {
    try {
        const token = await Gatekeeper.registerByGoogle();
        return token;
    } catch (error) {
        throw getError(error);
    }
};

export const loginByFacebook = async () => {
    try {
        const token = await Gatekeeper.loginByFacebook();
        return token;
    } catch (error) {
        throw getError(error);
    }
};

export const registerByFacebook = async () => {
    try {
        const token = await Gatekeeper.registerByFacebook();
        return token;
    } catch (error) {
        throw getError(error);
    }
};
export const getProfile = async () => {
    try {
        const user = await Gatekeeper.getProfile();
        return user;
    } catch (error) {
        throw getError(error);
    }
};
