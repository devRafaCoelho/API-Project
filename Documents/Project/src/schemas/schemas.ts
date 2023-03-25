const Joi = require('joi')

export const schemaUser = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'O nome é obrigatório',
    'string.empty': 'O nome é obrigatório'
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'O campo email deve ser do tipo texto.',
    'string.email': 'O email precisa ser válido',
    'any.required': 'O email é obrigatório',
    'string.empty': 'O email é obrigatório'
  }),
  password: Joi.string().min(5).required().messages({
    'any.required': 'A senha é obrigatória',
    'string.empty': 'A senha é obrigatória',
    'string.min': 'A senha precisa conter, no mínimo, 5 caracteres'
  })
})

export const schemaUserLogin = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'O email precisa ser válido',
    'any.required': 'O email é obrigatório',
    'string.empty': 'O email é obrigatório'
  }),
  password: Joi.string().min(5).required().messages({
    'any.required': 'A senha é obrigatória',
    'string.empty': 'A senha é obrigatória',
    'string.min': 'A senha precisa conter, no mínimo, 5 caracteres'
  })
})

export const schemaRegisterComment = Joi.object({
  userId: Joi.number().required().messages({
    'any.required': 'O ID do usuário é obrigatório',
    'string.empty': 'O ID do usuário é obrigatório'
  }),
  description: Joi.string().required().messages({
    'any.required': 'A descrição é obrigatória',
    'string.empty': 'A descrição é obrigatória'
  })
})

export const schemaUpdateComment = Joi.object({
  description: Joi.string().required().messages({
    'any.required': 'A descrição é obrigatória',
    'string.empty': 'A descrição é obrigatória'
  })
})
