import styles from './not_found.module.scss';

const NotFoundContainer: React.FC = () => {
	return (
		<div className={styles.not_found}>
			404: page is not found
		</div>
	)
};

export default NotFoundContainer;
