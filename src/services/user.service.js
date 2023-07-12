import { autenticated, client } from '../config/axios';
import { loadAbort } from '../utilities';

export const userSesion = (requestData) => {
    const controller = loadAbort();
    return {
        call: autenticated().post(`user/login`, requestData, {
            signal: controller.signal,
        }
        ),
    };
};

export const userVerify = (requestCedula, TockenUser) => {
    const controller = loadAbort();
    return {
        call: client(TockenUser).get(`VerifyUserByCedula/${requestCedula}`, {
            signal: controller.signal,
        })
    }
}