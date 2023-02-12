interface LabelVisualizarProps {
	label: string;
	children: string;
}

export const LabelVisualizar = ({ label, children }: LabelVisualizarProps) => {
	return (
		<div className="p-col-6">
			<label>{label}</label>
			<p>{children}</p>
		</div>
	);
};
