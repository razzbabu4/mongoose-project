import dotenv from 'dotenv'
import path from 'path'

dotenv.config({path: path.join((process.cwd(), 'dotenv'))})

export default {
    port : process.env.PORT,
    database_url: process.env.DATABASE_URL
}