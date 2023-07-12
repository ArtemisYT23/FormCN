import { client, documental } from "../config/axios";
import { loadAbort } from "../utilities";

export const getAllIndex = (documentId, TockenUser) => {
    const controller = loadAbort();
    return {
        call: documental(TockenUser).get(`metadatabydocument/${documentId}`, {
            signal: controller.signal,
        }),
    }
}

export const getAllIndexComparative = (cedula, TockenUser) => {
    const controller = loadAbort();
    return {
        call: client(TockenUser).get(`indexbycedula/${cedula}`, {
            signal: controller.signal,
        }),
    }
}

export const getAllFileType = (documentId, TockenUser) => {
    const controller = loadAbort();
    return {
        call: client(TockenUser).get(`filetype/${documentId}`, {
            signal: controller.signal,
        }),
    }
}

export const updateMetadataService = (metadata, TockenUser) => {
    const controller = loadAbort();
    return {
        call: documental(TockenUser).put(`updatedocumentmetadata`, metadata, {
            signal: controller.signal,
        }),
    }
}

export const uploaderFiles = (fileData, TockenUser) => {
    const controller = loadAbort();
    return {
        call: client(TockenUser).put(`file`, fileData, {
            signal: controller.signal,
        }),
    }
}

export const sendEmail = (Cedula, TockenUser) => {
    const controller = loadAbort();
    return {
        call: client(TockenUser).post(`EmailSender/${Cedula}`, {
            signal: controller.signal,
        }),
    }
}

