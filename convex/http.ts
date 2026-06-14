import { httpRouter } from 'convex/server'
import { auth } from './auth'

const http = httpRouter()

// Registers the Convex Auth HTTP routes (OAuth callbacks, etc.).
auth.addHttpRoutes(http)

export default http
