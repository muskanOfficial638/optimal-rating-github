import React from 'react';
import { useGet } from '../../hooks';
import { Spin, Select, notification } from 'antd';
import { exists } from '../../helpers';
import { privacyOrder } from '../../helpers/constants';
import { Empty } from '../../components';
import { postData } from '../../store/requests/global';
import {ApiUrl} from '../../config';

export default function Privacy ({ t })  {
	const { data, loading } = useGet({ url: `${ApiUrl}userPrivacySettings` });
	const privacyData = exists(data, 'result.set.privacies')
		? privacyOrder.map((i) => data.result.set.privacies[i])
		: [];
	const userPrivacyData = exists(data, 'result.set.user.privacy_settings')
		? privacyOrder.map((i) => data.result.set.user.privacy_settings[i])
		: [];

	const onChange = (option, privacy) => {
		postData({
			url: `${ApiUrl}userPrivacySettings`,
			data: { option, privacy },
		}).then(() => {
			notification.success({ message: t('msg.updated') });
		});
	};

	const getValue = (value, options) => {
		let item;

		options.forEach((option) => {
			userPrivacyData.forEach((data) => {
				if (option?.privacy_id === data?.privacy_id) {
					if (data.option?.id.toString() === option?.id.toString()) {
						item = option;
					}
				}
			});
		});
		/* options.privacy_id

    options.forEach(element => {
        
    }); */

		/* 	let item = options.find(
			(x) => x?.id.toString() === value?.id.toString()
		);
		if (!item) item = options.find((x) => x?.option === value?.option); */
		return item?.id.toString();
	};

	return (
		<Spin spinning={loading}>
			<div className="ProfilePrivacy">
				<h3 className="text-bold text-grey">{t('lbl.who_can_see')}</h3>
				<Empty isEmpty={!exists(data, 'result.set')}>
					<div className="content content-xs ml-0">
						<table>
							<tbody>
								{privacyData.map((x, index) => (
									<tr key={x.id}>
										<td className="Label">
											{t(`lbl.${x.translate_key}`)}
										</td>
										<td className="Value">
											<Select
											style={{pointerEvents:'all'}}
												className="full-width"
												defaultValue={getValue(
													userPrivacyData[index]
														?.option,
													x.options
												)}
												onChange={(e) =>
													onChange(
														e,
														x?.id.toString()
													)
												}
											>
												{x?.options.map((y) => (
													
													<Select.Option
													style={{pointerEvents:'all'}}
														key={y?.id.toString()}
													>
														{t(
															`lbl.${y?.option.toLowerCase()}`
														)}
													</Select.Option>
												))}
											</Select>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</Empty>
			</div>
		</Spin>
	);
};
