import { Router } from 'express'
import {
  deleteComment,
  detailComment,
  listComments,
  registerComment,
  updateComment
} from './controllers/comments'
import { detailUser, login, registerUser, updateUser } from './controllers/user'
import { validateAuthentication } from './middlewares/validateAuthentication'
import { validateRequest } from './middlewares/validateRequest'
import {
  schemaRegisterComment,
  schemaUpdateComment,
  schemaUser,
  schemaUserLogin
} from './schemas/schemas'

const routes = Router()

routes.post('/register', validateRequest(schemaUser), registerUser)
routes.post('/login', validateRequest(schemaUserLogin), login)

routes.use(validateAuthentication)

routes.get('/user', detailUser)
routes.put('/user', validateRequest(schemaUser), updateUser)

routes.get('/comments', listComments)
routes.post('/comments', validateRequest(schemaRegisterComment), registerComment)
routes.get('/comments/:id', detailComment)
routes.put('/comments/:id', validateRequest(schemaUpdateComment), updateComment)
routes.delete('/comments/:id', deleteComment)

export default routes
