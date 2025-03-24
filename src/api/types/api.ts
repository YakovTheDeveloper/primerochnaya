import type { Costume } from "@/entities"

export type Payload = { imgUrl: string }

export type GetPhotoStatusData = 'success' | 'failure'

export type ApiResponse<T> =
    | { isError: false; data: T }
    | { isError: true; description: string, status: number };



export type GetCostumesResponse = ApiResponse<Costume[]>

export type SendPhotoResponse = ApiResponse<{
    "id": number,
    "code": string,
    "message": 'success'
}>

export type SendPhotoPayload = {
    userImage: string
    costumeId: number
    backgroundId: number
}

export type SendEmailPayload = {
    "email": string,
    "imageResults": IdList
}

export type GenerateQrPayload = {
    "imageResults": IdList
}

export type EmailResponse = ApiResponse<DownloadDataResponse>
export type TelegramResponse = ApiResponse<DownloadDataResponse>
export type ImageResultResponse = ApiResponse<{
    "id": number,
    "code": string,
    "image": string
}>

type IdList = number[]

type DownloadDataResponse = {
    "id": number,
    "code": string,
    "imageFile": string,
    "image": string,
    "imageTask": {
        "id": number,
        "imageFile": string,
        "image": string,
        "imageResults": [
            string
        ],
        "costume": string,
        "background": string
    },
    "email": string,
    "qr": string
}

export type GetQrResponse = ApiResponse<string>