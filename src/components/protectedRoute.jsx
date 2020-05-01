import React from 'react';
import { Route, Redirect } from 'react-router';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const user = useSelector((state) => state.user.user);
	return (
		<Route
			{...rest}
			render={(props) =>
				user ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: '/', state: { from: props.location } }} />
				)
			}
		/>
	);
};

export default ProtectedRoute;
