import { PluginType } from '@/types';
import styles from './enable_plugins.module.scss';

interface EnablePluginsComponentType {
    plugins: PluginType[],
    enablePluginsHandler: () => void;
};

const EnablePluginsComponent: React.FC<EnablePluginsComponentType> = ({
    plugins,
    enablePluginsHandler
}) => {
    const isEnabled = plugins.every(p => p.enabled);
    const toggleClass = isEnabled ? 'alt_toggle_switch alt_toggle_switch_active' : 'alt_toggle_switch';
    const enablePluginsClass = isEnabled ? `${styles.enable_plugins} ${styles.enable_plugins__enabled}` : styles.enable_plugins;
    const text = isEnabled ? 'enabled' : 'disabled';
	return (
        <div className={enablePluginsClass}>
            <div className={styles.enable_plugins__inside}>
                <p className={styles.enable_plugins__inside__text}>All plugins {text}</p>
                <div
                    onClick={() => enablePluginsHandler()}
                    className={styles.enable_plugins__inside__toggle}
                >
                    <div className={toggleClass}></div>
                </div>
            </div>
        </div>
	)
};

export default EnablePluginsComponent;
