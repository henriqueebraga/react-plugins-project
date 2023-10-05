import { PluginTypeEditableType } from '@/types';
import { commonConfig } from '@/configs/common';

type MethodType = 'GET' | 'PUT';

interface MakeRequestType {
    url: string;
    params?: PluginTypeEditableType | PluginEnabilityType;
    method?: MethodType;
};

interface PluginEnabilityType {
    enable: boolean;
};

interface OptionsType {
    method: MethodType;
    headers?: {
        [key: string]: string
    },
    body?: string;
};

export const makeRequest = async ({
    url,
    params,
    method = 'GET'
}: MakeRequestType) => {
    const options: OptionsType = {
        method
    };
    if (method === 'PUT') {
        options.headers = {
            "Content-Type": "application/json"
        };
    }
    if (params) {
        options['body'] = JSON.stringify(params);
    }
    const apiUrl = `${commonConfig.apiEndpoint}${url}`;
    const response = await fetch(apiUrl, options);
    if (response) {
        const data = await response.json();
        return data;
    }
    return null;
};
