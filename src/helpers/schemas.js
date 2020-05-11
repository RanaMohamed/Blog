import Joi from '@hapi/joi';
import { emailRegex } from './helper';

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

export const registerSchema = Joi.object({
	name: Joi.string().required().messages({
		'string.empty': 'Name should not be empty',
		'any.required': `Name is required`,
	}),
	email: Joi.string().required().pattern(emailRegex).messages({
		'string.pattern.base': 'Email is invalid',
		'string.empty': 'Email should not be empty',
		'any.required': `Email is required`,
	}),
	password: Joi.string().min(8).required().messages({
		'string.empty': 'Password should not be empty',
		'string.min': `Password should have a minimum length of {#limit}`,
		'any.required': `Password is required`,
	}),
});

export const loginSchema = Joi.object({
	email: Joi.string().required().pattern(emailRegex).messages({
		'string.pattern.base': 'Email is invalid',
		'string.empty': 'Email should not be empty',
		'any.required': `Email is required`,
	}),
	password: Joi.string().min(8).required().messages({
		'string.empty': 'Password should not be empty',
		'string.min': `Password should have a minimum length of {#limit}`,
		'any.required': `Password is required`,
	}),
});

export const editProfileSchema = Joi.object({
	name: Joi.string().required().messages({
		'string.empty': 'Name should not be empty',
		'any.required': `Name is required`,
	}),
	email: Joi.string().required().pattern(emailRegex).messages({
		'string.pattern.base': 'Email is invalid',
		'string.empty': 'Email should not be empty',
		'any.required': `Email is required`,
	}),
	password: Joi.string().min(8).messages({
		'string.empty': 'Password should not be empty',
		'string.min': `Password should have a minimum length of {#limit}`,
		'any.required': `Password is required`,
	}),
	_id: Joi.string(),
	desc: Joi.string(),
	imgUrl: Joi.any(),
	following: Joi.any(),
});
