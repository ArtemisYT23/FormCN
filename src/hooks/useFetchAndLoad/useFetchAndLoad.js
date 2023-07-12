import { useEffect } from "react";

const useFetchAndLoad = () => {
    let controller;

    const callEndpoint = async (axiosCall) => {
        if (axiosCall.controller) controller = axiosCall.controller;
        let result = {};
        // eslint-disable-next-line no-useless-catch
        try {
            result = await axiosCall.call;
        } catch (error) {
            throw error;
        }

        return result;
    }

    const cancelEnpoint = () => {
        controller && controller.abort();
    };

    useEffect(() => {
        return () => {
            cancelEnpoint();
        };
    }, []);

    return { callEndpoint };
};

export default useFetchAndLoad;