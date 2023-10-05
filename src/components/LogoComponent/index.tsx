import styles from './logo.module.scss';

const LogoComponent: React.FC = () => {
	return (
        <div className={styles.logo}>
            React<span className={styles.logo__bold}>Plugins</span>
        </div>
	)
};

export default LogoComponent;
