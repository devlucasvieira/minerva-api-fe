import { Link, useNavigate } from 'react-router-dom';
import './BreadCrumbGov.css';

export const BreadCrumbGov = (props: any) => {
	const navigate = useNavigate();
	const isActualPage = (index: number) => {
		return props?.breadCrumb?.length === index + 1 ? true : false;
	};

	return (
		<div className="bread-wrapper">
			<div className="br-breadcrumb pt-3" aria-label="Breadcumb">
				<ul className="crumb-list">
					<li onClick={() => navigate('/')} className="crumb home">
						<div className="br-button circle">
							<i className="pi pi-home"></i>
						</div>
					</li>

					{props?.breadCrumb?.map((bc: any, index: number) => (
						<li
							key={index}
							className="crumb"
							data-active={`${isActualPage(index) ? 'active' : ''}`}
						>
							<i className="icon pi pi-chevron-right"></i>

							{isActualPage(index) ? (
								<span>{bc}</span>
							) : (
								<Link to="">{bc}</Link>
							)}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
