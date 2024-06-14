import { IncomingHttpHeaders } from 'http'
import { Request } from 'express'
import { UserDetailType } from '../user-detail.repository'

declare global {
  namespace Express {
    interface Request {
      context : UserDetailType
      headers : IncomingHttpHeaders & {
        authorization?: string
      }
    }
  }
}

export {  }