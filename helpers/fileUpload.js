import { postData } from '../store/requests/global';
import {ApiUrl} from '../config';

export default async (file, type = 'sa') => {
	try {
		const imageData = new FormData();
		imageData.append('file', file);
		imageData.append('type', type);
		imageData.append('width', 240);
		imageData.append('height', 240);

		let response = await postData({
			url: `${ApiUrl}file/upload`,
			data: imageData,
		});
		return response.result.set[0].name;
	} catch (error) {
	}
};
// ../../pages/store/requests/global