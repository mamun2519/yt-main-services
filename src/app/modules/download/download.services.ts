import { IDownload } from "./download.interface";
import { Download } from "./download.model";

// URL/download/asset-download (POST)
const saveDownloadIntoDB = async (data: IDownload): Promise<IDownload> => {
    const result = await Download.create(data);
    return result;
}

// URL/download/my-download-list (GET)
const getDownloadListFromDB = async (): Promise<IDownload[]> => {
    const result = await Download.find();
    return result;
}

const getOneDownloadFromDB = async (id: string): Promise<IDownload | null> => {
    const result = await Download.findById(id);
    return result;
}

// URL/favorite/delete-favorite/:id (DELETE)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deleteOneDownloadFromDB = async (id: string): Promise<any> => {
    const result = await Download.deleteOne({ _id: id});
    return result;
}

export const downloadServices = {
    saveDownloadIntoDB,
    getDownloadListFromDB,
    getOneDownloadFromDB,
    deleteOneDownloadFromDB
}