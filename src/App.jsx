import { useState } from 'react';
import Lottie from 'react-lottie';
import style from './App.module.scss';
import Button from './components/Button/Button';
import Notification from './components/Notification/Notification';
import animationData from './assets/INITIALIZE_1_HQ.json';

const TEXT_TITLE = 'Привет';
const TEXT_CONTENT = 'чем могу помочь?';

const App = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isShowNotification, setIsShowNotification] = useState(false);

	const onButtonHandler = () => {
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
			setIsShowNotification(true);
		}, 3000);
	};

	return (
		<div className={style.container}>
			{!isLoading && !isShowNotification && (
				<Button onClick={onButtonHandler} />
			)}
			{isLoading && (
				<Lottie
					options={{ animationData: animationData }}
					height={200}
					width={200}
				/>
			)}
			{isShowNotification && (
				<Notification title={TEXT_TITLE} text={TEXT_CONTENT} />
			)}
		</div>
	);
};

export default App;
