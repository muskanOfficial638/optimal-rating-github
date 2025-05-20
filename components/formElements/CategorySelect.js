import React, { useEffect, useState, useCallback } from 'react';
import { Select, TreeSelect } from 'antd';
import { useSelector } from 'react-redux';
import { get } from '../../helpers';
import { useTranslation } from 'react-i18next';

const { OptGroup, Option } = Select;

const SelectCategory =React.forwardRef((props, ref) => {
	var initialValue = props.newCategory ? props.newCategory : undefined;
	const [value, setValue] = useState(initialValue);
	const { t } = useTranslation();
	const { data, loading } = useSelector((state) => state.global.tree);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const onChange = useCallback((e) => {
		setValue(e);
		props.onChange && props.onChange(e);
	});

	useEffect(() => {
		if (props.newCategory) {
			onChange(props.newCategory);
			//setValue(props.newCategory);
		}
	}, [onChange, props.newCategory]);


	return (
		<Select
			loading={loading}
			value={value}
			//style={{width: 200}}
			onChange={onChange}
		>
			{get(data, 'result.set', []).map((x, i) => (
				<OptGroup label={t(x.name)} key={i}>
					{x.children.map((y) => (
						<Option value={y.id} key={y.id}>
							{y.name}{' '}
							{y.status === 'pending' ? ' - Pending' : ''}
						</Option>
					))}
				</OptGroup>
			))}
		</Select>
	);

	/* return (
    <TreeSelect loading={loading} value={value} onChange={onChange}>
      {get(data, 'result.set', []).map(x => (
        <TreeSelect.TreeNode key={x.id} value={x.id} title={t(x.code)} selectable={false}>
          {x.children.map(y => (
            <TreeSelect.TreeNode key={y.id} value={y.id} title={y.name} />
          ))}
        </TreeSelect.TreeNode>
      ))}
    </TreeSelect>
  ); */
});
SelectCategory.displayName = "SelectCategory"
export default  SelectCategory