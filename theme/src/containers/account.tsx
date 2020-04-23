import React from "react"
import { themeSettings, text } from "../lib/settings"
import MetaTags from "../components/metaTags"
import Account from "../components/account/index"

const AccountContainer = props => {
	const {
		state: { pageDetails, loginUser },
	} = props

	return (
		<>
			<section className="section">
				<div className="container">
					<div className="content">
						<Account {...props} />
					</div>
				</div>
			</section>
		</>
	)
}

export default AccountContainer
