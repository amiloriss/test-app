import style from './Button.module.scss';

const Button = ({ onClick }) => {
	return (
		<button className={style.button} onClick={onClick}>
			Click me!
		</button>
	);
};

export default Button;
