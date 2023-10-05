import { TabType } from '@/types';
import styles from './navigation.module.scss';
import { Link } from 'react-router-dom';

interface NavigationComponentType {
    tabs: TabType;
    current_tab_id: string | undefined;
};

const NavigationComponent: React.FC<NavigationComponentType> = ({
    tabs,
    current_tab_id
}) => {
	return (
        <ul className={styles.navigation}>
            {
                Object.keys(tabs).map(key => {
                    const navigationItemClass = current_tab_id === key ? `${styles.navigation__item} ${styles.navigation__item_active}` : styles.navigation__item;
                    return (
                        <li
                            key={key}
                            className={navigationItemClass}
                        >
                            <Link
                                className={styles.navigation__item__link}
                                to={`/${key}`}
                            >
                                {
                                    tabs[key].icon && (
                                        <img
                                            className={styles.navigation__item__link__icon}
                                            src={`images/${tabs[key].icon}.png`}
                                        />
                                    )
                                }
                                <span className={styles.navigation__item__link__text}>{tabs[key].title}</span>
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
	)
};

export default NavigationComponent;
