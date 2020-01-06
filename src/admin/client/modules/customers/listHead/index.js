import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import {
	fetchCustomers,
	deleteCustomers,
	setGroup,
	setFilterSearch,
	createDraftCustomer
} from '../actions';
import Buttons from './components/buttons';

const mapStateToProps = (state, ownProps) => {
	return {
		search: state.customers.search,
		selectedCount: state.customers.selected.length
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		setSearch: value => {
			dispatch(setFilterSearch(value));
			dispatch(fetchCustomers());
		},
		onDelete: () => {
			dispatch(deleteCustomers());
		},
		onSetGroup: group_id => {
			dispatch(setGroup(group_id));
		},
		onCreate: () => {
			dispatch(createDraftCustomer(ownProps));
		}
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Buttons)
);
