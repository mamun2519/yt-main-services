import { Model } from "mongoose";

export type IDownload = {
    assetsId: string
    userId: string
    userEmail: string
}

export type downloadModel = Model<IDownload>;

