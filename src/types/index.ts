export interface PluginType extends PluginTypeEditableType {
    id: string;
};

export interface PluginTypeEditableType {
    title: string;
    description: string;
    enabled: boolean;
    active: boolean;
};

export interface TabType {
    [key: string]: {
        title: string;
        icon: string;
        plugins: string[];
    };
};

export interface ModifyPluginType {
    id: string,
    params: PluginTypeEditableType
};
