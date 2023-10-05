import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
} from "@reduxjs/toolkit";
import { makeRequest } from '@/utils/requestUtil';
import { RootState } from "@/appStore/store";
import {
    TabType,
    PluginType,
    ModifyPluginType,
} from "@/types";

/*
    We define state structure
*/
export enum Status {
    idle = 'idle',
    loading = 'loading',
    succeeded = 'succeeded',
    failed = 'failed'
};
const PLUGINS_PER_TAB = 6;
interface initialStateType {
    tabs: TabType,
    plugins: PluginType[],
    status: Status.idle | Status.loading | Status.succeeded | Status.failed,
    error: string | null;
};
const initialState: initialStateType = {
    tabs: {
        'marketing': {
            title: "Marketing",
            icon: "icon-marketing",
            plugins: []
        },
        'finance': {
            title: "Finance",
            icon: "icon-finance",
            plugins: []
        },
        'personnel': {
            title: "Personnel",
            icon: "icon-people",
            plugins: []
        }
    },
    plugins: [],
    status: Status.idle,
    error: null
};

/*
    We load plugins data from the server
*/
export const fetchPlugins = createAsyncThunk('plugins/fetchPlugins', async () => {
    const pluginsData = await makeRequest({
        url: '/plugins'
    });
    return pluginsData;
});

/*
    We modify plguin
*/
export const modifyPlugin = createAsyncThunk('plugins/modifyPlugin', async (data: ModifyPluginType) => {
    const {id, params} = data;
    const pluginsData = await makeRequest({
        url: `/plugins/${id}`,
        params,
        method: 'PUT'
    });
    return pluginsData;
});

/*
    Enable / disabled all of the plugins
*/
export const togglePluginsEnalability = createAsyncThunk('plugins/enablePlugins', async () => {
    const pluginsData = await makeRequest({
        url: '/plugins/changeEnability',
        method: 'PUT'
    });
    return pluginsData;
});

/*
    Slice definition
*/
export const pluginSlice = createSlice({
    name: "tabs",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchPlugins.pending, (state) => {
                state.status = Status.loading;
            })
            .addCase(fetchPlugins.fulfilled, (state, action: PayloadAction<PluginType[]>) => {
                state.status = Status.succeeded;
                const plugins = action.payload;
                state.plugins = plugins;
                // distributing logic of the plugins among the tabs
                const tabKeys = Object.keys(state.tabs);
                const numberOfIterations = Math.ceil(plugins.length/PLUGINS_PER_TAB);
                for (let i = 0 ; i < numberOfIterations; i++) {
                    const startSlice = PLUGINS_PER_TAB * i;
                    const endSlice = startSlice + PLUGINS_PER_TAB;
                    const pluginsToAdd = (i === numberOfIterations - 1) ? plugins.slice(startSlice) : plugins.slice(startSlice, endSlice);
                    state.tabs[tabKeys[i]].plugins = pluginsToAdd.map(t => t.id);
                }
            })
            .addCase(fetchPlugins.rejected, (state) => {
                state.status = Status.failed;
                state.error = 'api error';
            })
            .addCase(modifyPlugin.fulfilled, (state, action: PayloadAction<ModifyPluginType>) => {
                const updatedPlugin = action.payload;
                const {id, ...rest} = updatedPlugin;
                const pluginKey = state.plugins.findIndex(p => p.id === id);
                if (pluginKey > -1) {
                    state.plugins[pluginKey] = Object.assign({}, state.plugins[pluginKey], rest);
                }
            })
            .addCase(togglePluginsEnalability.fulfilled, (state, action) => {
                const updatedPlugins = action.payload;
                state.plugins = updatedPlugins;
            })
    }
});

export const selectData = (state: RootState) => state.tabs;

export default pluginSlice.reducer;
