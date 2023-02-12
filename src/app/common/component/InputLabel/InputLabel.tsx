import { Tooltip } from 'primereact/tooltip';
import { ReactNode } from 'react';

interface InputLabelProps {
	target: string;
	placeholder: string;
	children: ReactNode;
}

export const InputLabel = ({
	target,
	placeholder,
	children,
}: InputLabelProps) => {
	return (
		<div className="p-field p-col-6">
			<Tooltip target={`.${target}`} />
			<i
				className={`pi pi-question-circle ${target}`}
				data-pr-tooltip={placeholder}
				data-pr-position="left"
				data-pr-at="right+5 top"
				data-pr-my="left center-2"
				style={{ color: `#666`, cursor: 'pointer' }}
			/>
			<span className="p-input-icon-left">{children}</span>
		</div>
	);
};
