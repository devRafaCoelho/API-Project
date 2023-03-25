import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export const listComments = async (req: Request, res: Response) => {
  try {
    const allComments = await prisma.comment.findMany()

    return res.json(allComments)
  } catch {
    return res.status(500).json({ message: 'Erro interno do servidor' })
  }
}

export const registerComment = async (req: Request, res: Response) => {
  const { userId, description } = req.body

  try {
    const isUser = await prisma.user.findUnique({ where: { id: userId } })
    if (!isUser) return res.status(400).json({ error: { userId: 'Usuário não encontrado.' } })

    const data = { userId, description }

    const comment = await prisma.comment.create({ data })

    return res.status(201).json(comment)
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor' })
  }
}

export const detailComment = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)

  try {
    const comment = await prisma.comment.findUnique({ where: { id: id } })
    if (!comment) return res.status(404).json({ message: 'Comentário não encontrado.' })

    return res.json(comment)
  } catch {
    return res.status(500).json({ message: 'Erro interno do servidor' })
  }
}

export const updateComment = async (req: Request, res: Response) => {
  const { description } = req.body
  const idParams = parseInt(req.params.id)
  const { id } = req.user

  try {
    const comment = await prisma.comment.findUnique({ where: { id: idParams } })
    if (!comment) return res.status(404).json({ message: 'Comentário não encontrado.' })

    if (comment.userId !== id)
      return res.status(404).json({ message: 'Você só pode editar comentários feitos por você.' })

    await prisma.comment.update({ where: { id: Number(idParams) }, data: { description } })

    return res.status(204).send()
  } catch {
    return res.status(500).json({ message: 'Erro interno do servidor' })
  }
}

export const deleteComment = async (req: Request, res: Response) => {
  const idParams = parseInt(req.params.id)
  const { id, email } = req.user

  const allowedEmails = ['portalmaisbonfim@gmail.com', 'caiooliveira9.co@gmail.com']

  const deletePrisma = async () => {
    await prisma.comment.delete({ where: { id: idParams } })
    return res.status(204).send()
  }

  try {
    const comment = await prisma.comment.findUnique({ where: { id: idParams } })
    if (!comment) return res.status(404).json({ message: 'Comentário não encontrado.' })

    if (allowedEmails.includes(email)) return deletePrisma()

    if (comment.userId !== id)
      return res.status(403).json({ message: 'Você só pode excluir comentários feitos por você.' })

    return deletePrisma()
  } catch {
    return res.status(500).json({ message: 'Erro interno do servidor.' })
  }
}
