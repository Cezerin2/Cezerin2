import React, { Fragment } from 'react';
import { themeSettings, text } from '../lib/settings';
import MetaTags from '../components/metaTags';
import ForgotPassword from '../components/forgotPassword/index';

const ForgotPasswordContainer = props => {
	const {
		state: { pageDetails, loginUser}
	} = props;

	return (
		<Fragment>
			<section className="section">
				<div className="container">
					<div className="content">
						<ForgotPassword {...props} />
					</div>
				</div>
			</section>
		</Fragment>
	);
};

export default ForgotPasswordContainer;