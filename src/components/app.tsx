import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import style from './app.module.scss';
import AvatarJpeg from '../assets/ImageJpeg.jpg';
import AvatarPng from '../assets/myImage.png';
import Svg from '../assets/mySVG.svg';

const App = () => {
	const [count, setCount] = useState(0);
	const arr: any[] = [];

	// Tree shaking
	function TODO() {
		TODO2();
	}
	function TODO2() {
		throw new Error();
	}

	// if (__PLATFORM__ === 'mobile') {
	// 	arr.push({
	// 		text: 'hello',
	// 	});
	// }

	// if (__PLATFORM__ === 'desktop') {
	// 	return <div>IsPlatformDesktop</div>;
	// }
	// TODO(1);

	// if (__ENV__ == 'development') {
	// 	//addDevtools
	// }

	return (
		<>
			<div data-testid={'AppTest'} className=''>
				<img src={AvatarPng} alt='avatar' width={100} height={100} />
				<img src={AvatarJpeg} alt='avatar' width={100} height={100} />
				{/* <img src={Svg} alt='svg' width={100} height={100} /> */}
				<Svg fill={'blue'} style={{ color: 'blue' }} width={100} height={100} />
			</div>

			{arr.map(({ text }) => {
				return <div>{text}</div>;
			})}

			<h1 data-testid={'platform'}>{__PLATFORM__}</h1>
			<Link to={'/shop'}>shop</Link>
			<br />
			<Link to={'/about'}>about</Link>
			<button
				className={style.button}
				onClick={() => {
					setCount((prev: number) => prev + 1);
				}}
			>
				+
			</button>
			<div>
				<span>{count}</span>
			</div>
			<button
				onClick={() => {
					TODO();
				}}
			>
				-
			</button>
			<div></div>
			<Outlet />
		</>
	);
};

export { App };
