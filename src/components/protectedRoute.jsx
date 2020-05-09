import React from 'react';
import { Route, Redirect } from 'react-router';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const token = useSelector((state) => state.user.token);
	return (
		<Route
			{...rest}
			render={(props) =>
				token ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{ pathname: '/login', state: { from: props.location } }}
					/>
				)
			}
		/>
	);
};

export default ProtectedRoute;
