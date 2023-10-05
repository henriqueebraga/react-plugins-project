import React, { ReactNode, useEffect } from 'react';
import {
	LogoComponent,
	EnablePluginsComponent,
	NavigationComponent,
	PluginsListingComponent
} from '@/components';
import { useAppSelector, useAppDispatch } from "@/appStore/hooks";
import {
	selectData,
	fetchPlugins,
	modifyPlugin,
	togglePluginsEnalability,
	Status
} from "@/appStore/reducers/pluginSlice";
import {
    ModifyPluginType,
} from "@/types";
import { useParams } from 'react-router-dom';
import styles from './plugins_container.module.scss';

const PluginsContainer: React.FC = () => {
	const dispatch = useAppDispatch();
	/*
		Retrieve state data from the redux
	*/
	const {
		tabs,
		plugins,
		status,
		error
	} = useAppSelector(selectData);
	/*
		Retrieve current tab id from the router
	*/
	const { tab_id } = useParams();
	const current_tab_id = (tab_id && tabs[tab_id]) ? tab_id : Object.keys(tabs)[0];
	/*
		Initial load of plugins data
	*/
	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchPlugins());
		}
	}, [status, dispatch]);
	/*
		Modify plugin
	*/
	const modifyPluginItem = async (data: ModifyPluginType) => {
		await dispatch(modifyPlugin(data));
	};
	const enablePluginsHandler = async () => {
		await dispatch(togglePluginsEnalability());
	};
 	/*
		Render our template
	*/
	const renderPluginsList = (): ReactNode => {
		switch(status) {
			case Status.loading: return (
				<div className={styles.loader_spinner}></div>
			)
			case Status.succeeded: {
				const listingPlugins = tabs[current_tab_id].plugins.map(plugin_id => {
					const k = plugins.findIndex(pl => pl.id === plugin_id);
					if (k > -1) {
						return plugins[k];
					}
					return null;
				}).filter(p => p !== null);
				return (
					<PluginsListingComponent
						plugins={listingPlugins}
						modifyPluginItem={modifyPluginItem}
						title={`${tabs[current_tab_id].title} Plugins`}
					/>
				)
			}
			case Status.failed: return (
				<div className={styles.errors}>{error}</div>
			)
		}
	};
	return (
		<main className={styles.plugins_container}>
			<aside className={styles.plugins_container__navi}>
				<LogoComponent />
				<NavigationComponent
					tabs={tabs}
					current_tab_id={current_tab_id}
				/>
				<EnablePluginsComponent
					enablePluginsHandler={enablePluginsHandler}
					plugins={plugins}
				/>
			</aside>
			<div className={styles.plugins_container__content}>
				{renderPluginsList()}
			</div>
		</main>
	)
};

export default PluginsContainer;
