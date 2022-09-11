import style from './Notification.module.scss';

const Notification = ({ title, text }) => {
	return (
		<div className={style.notification}>
			<h4>{title}</h4>
			<div>{text}</div>
		</div>
	);
};

export default Notification;
