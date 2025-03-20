import MOCK_RESULT_IMG from '@/assets/img/photo/result.png';
import type { EmailResponse, GetQrResponse, GenerateQrPayload, GetCostumesResponse, SendEmailPayload, SendPhotoPayload, SendPhotoResponse } from './types/api';
import apiClient from './axios';
import { base64ToBlob } from '@/utils/base64toBlob';
import axios from 'axios';

export async function fetchSendUserPhoto(payload: SendPhotoPayload): Promise<SendPhotoResponse> {
    const { costumeId, userImage } = payload
    const mimeType = "image/jpeg";
    const blob = base64ToBlob(userImage, mimeType);
    const formData = new FormData();
    formData.append("costumeId", costumeId.toString());
    formData.append("userImage", blob, "123.jpg");

    return apiClient.post('/image_results', formData, {
        headers: {
            'accept': 'application/json',
        }
    });
}

export async function fetchGetCostumes(): Promise<GetCostumesResponse> {
    return apiClient.get('/costumes', {})
}

export function fetchSendEmail(payload: SendEmailPayload): Promise<EmailResponse> {
    return apiClient.post('/image_results/mail', payload)
}

export function fetchGetQr(payload: GenerateQrPayload): Promise<GetQrResponse> {
    return apiClient.post('/image_results/telegram_qr', payload)
}
