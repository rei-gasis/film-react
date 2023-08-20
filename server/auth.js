import jwt from 'jsonwebtoken'

import crypto from 'crypto'
import dotenv from 'dotenv'
// let key = crypto.randomBytes(64).toString('hex')

const auth = () => {
    function generateAccessToken(username){
        return jwt.sign(username, process.env.JWT_SECRET, { expiresIn: '120s' });
    }
}



export default auth;