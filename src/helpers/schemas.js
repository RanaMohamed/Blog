import Joi from '@hapi/joi';

export const postSchema = Joi.object({
	title: Joi.string().required().messages({
		'string.empty': 'Name should not be empty',
		'any.required': `Name is required`,
	}),
	body: Joi.string().required().messages({
		'string.empty': 'Body should not be empty',
		'any.required': `Body is required`,
	}),
	tags: Joi.array(),
	_id: Joi.string(),
	imgUrl: Joi.any(),
});
