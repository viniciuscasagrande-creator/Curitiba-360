import { onRequest } from 'firebase-functions/v2/https'
import express from 'express'
import cors from 'cors'

import { authenticate } from './middleware/auth.js'
import { requireRole } from './middleware/roles.js'
import { rateLimit } from './middleware/rateLimit.js'

import { createOrder } from './controllers/orderController.js'
import { checkinTicket } from './controllers/checkinController.js'

const app = express()

app.use(cors({ origin: true }))
app.use(express.json())
app.use(rateLimit({ windowMs: 60000, max: 120 }))

app.post(
  '/orders',
  authenticate,
  requireRole(['customer', 'operator', 'manager', 'admin']),
  createOrder
)

app.post(
  '/checkin',
  authenticate,
  requireRole(['operator', 'manager', 'admin']),
  checkinTicket
)

export const api = onRequest(
  {
    region: 'southamerica-east1'
  },
  app
)
