import React,{useEffect} from 'react';
import api from '../../lib/api';
import PageList from './list';

const CustomPageList = () => {
		this.state = {
			pages: []
		};

	useEffect(() =>fetchData(this.props),[])

	componentWillReceiveProps(nextProps) {
		this.fetchData(nextProps);
	}

	fetchData = ({ tags, sort }) => {
		const filter = {
			tags: tags,
			sort: sort
		};

		api.ajax.pages.list(filter).then(({ status, json }) => {
			this.setState({
				pages: json
			});
		});
	};

		const { pages } = this.state;
		return <PageList pages={pages} />;
	}

export default CustomPageList