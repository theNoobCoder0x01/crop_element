import './Drawer.css';

const Drawer = () => {

	const buttonProps = {
		className:"button"
	};

	return (
		<div className="drawer tc">
			<button {...buttonProps}>
				<div className="text dib v-mid">Crop Recommendation</div>
			</button>
			<button {...buttonProps}>
				<div className="text dib v-mid">Crop Disease Detection</div>
			</button>
			<button {...buttonProps}>
				<div className="text">Weather Forecasting</div>
			</button>
		</div>
	);
}

export default Drawer;