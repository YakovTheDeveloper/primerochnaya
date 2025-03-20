import type { Payload } from "@/api/types/api"

export type Stage = 'countdown' | 'processing' | 'idle'

export type StatusData = {
    status: 'face-not-detected'
} | {
    status: 'success'
} | null
