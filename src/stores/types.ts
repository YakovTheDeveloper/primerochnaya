export type Stage = 'countdown' | 'processing' | 'idle'

export type StatusData = {
    status: 'face-not-detected'
} | {
    status: 'success'
    data: Payload
} | null

export type ResultFetchData = {
    result: null | Payload
    isError: boolean
    message: string
}

export type Payload = { imgUrl: string }