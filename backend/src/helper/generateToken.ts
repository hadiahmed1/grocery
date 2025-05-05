import jwt from 'jsonwebtoken';
import TokenPayloadType from '../types/token.type';
function generateToken(type: 'accessToken'|'verificationToken', id: string, time: '5m'|'1h'|'15m') {
    const payload: TokenPayloadType = { type, id };//type to identify token type, id to idetify token owner
    const secret: string = process.env.SECRET_KEY as string;
    return jwt.sign(payload, secret, {expiresIn: time});
}
export default generateToken;