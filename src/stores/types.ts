export type Stage = 'countdown' | 'processing' | 'idle'

export type StatusData = {
    status: 'face-not-detected'
} | {
    status: 'success'
    data: Payload
} | null

export type ResultFetchData = FetchResponse<Payload>

export type Payload = { imgUrl: string }

export type ResultFetchEmail = FetchResponse<'success' | 'failure'>

export type GetPhotoStatusData = 'success' | 'failure'

type FetchResponse<T> = {
    result: null | T
    isError: boolean
    message: string
}