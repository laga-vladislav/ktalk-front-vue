export { type ApiResponse, sendApiRequest }

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

async function sendApiRequest<T>(
    apiUrl: string,
    data: Record<string, any> = {},
    token: string,
    method: 'POST' | 'GET' = 'POST',
    query: Record<string, any> = {} // Поддержка любых ключей и значений
): Promise<ApiResponse<T>> {
    try {
        let url = apiUrl;
        console.log(`url: ${url}`)
        if (Object.keys(query).length > 0) {
            const queryParams = new URLSearchParams();
            for (const [key, value] of Object.entries(query)) {
                if (value !== undefined && value !== null) {
                    queryParams.append(key, String(value));
                }
            }
            url += `?${queryParams.toString()}`;
        }
        
        console.log(method)
        const response = await fetch(url, {
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

        const text = await response.text();
        const result = text ? JSON.parse(text) as T : undefined;
        return { success: true, data: result };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Неизвестная ошибка',
        };
    }
}