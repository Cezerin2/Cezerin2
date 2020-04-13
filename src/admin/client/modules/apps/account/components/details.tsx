import React,{useEffect} from 'react';
import messages from 'lib/text';
import style from './style.css';
import Account from './account';
import Developer from './developer';

const WebStoreAccountDetails = () => {
		useEffect(()=>props.fetchData(),[])
		const { account, onAccountSubmit, onDeveloperSubmit } = this.props;
		const developerData = account ? account.developer : null;

		if (account) {
			return (
				<div className={style.detailsContainer + ' scroll col-full-height'}>
					<Account initialValues={account} onSubmit={onAccountSubmit} />
					{account &&
						account.is_developer === true && (
							<Developer
								initialValues={developerData}
								onSubmit={onDeveloperSubmit}
							/>
						)}
				</div>
			);
		} else {
			return null;
		}
	}
}

export default WebStoreAccountDetails