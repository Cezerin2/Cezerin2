import React from 'react';
import api from 'lib/api';
import ImageUpload from 'modules/shared/imageUpload';

const ThemeImageUpload = () => {

	onDelete = () => {
		const fileName = this.props.input.value;
		api.theme.assets.deleteFile(fileName).then(() => {
			this.props.input.onChange('');
		});
	};

	onUpload = formData => {
		api.theme.assets.uploadFile(formData).then(({ status, json }) => {
			const fileName = json.file;
			this.props.input.onChange(fileName);
		});
	};

		let { input, label } = this.props;
		const imageUrl =
			input.value && input.value.length > 0
				? '/assets/images/' + input.value
				: null;

		return (
			<div>
				<p>{label}</p>
				<ImageUpload
					uploading={false}
					imageUrl={imageUrl}
					onDelete={this.onDelete}
					onUpload={this.onUpload}
				/>
			</div>
		);
	}
}

export default ThemeImageUpload