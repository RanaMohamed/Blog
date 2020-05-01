// eslint-disable-next-line no-useless-escape
export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const url = process.env.REACT_APP_API_URL;

export const convertToFormData = (data) => {
	const fd = new FormData();
	Object.keys(data).forEach((k) => {
		if (Array.isArray(data[k])) {
			for (var i = 0; i < data[k].length; i++) {
				fd.append(`${k}[]`, data[k][i]);
			}
		} else {
			fd.append(k, data[k]);
		}
	});
	return fd;
};
