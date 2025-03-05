export { type ApiResponse, sendApiRequest }

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

async function sendApiRequest<T>(
    apiUrl: string,
    data: Record<string, any>,
    token: string,
    method: 'POST' | 'GET' = 'POST'
): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(apiUrl, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: method !== 'GET' ? JSON.stringify(data) : undefined,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Ошибка ${response.status}: ${errorText || 'Неизвестная ошибка'}`);
        }

        const result = await response.json();
        return { success: true, data: result as T };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Неизвестная ошибка',
        };
    }
}