import jwt from 'jsonwebtoken';
function generateToken(type: string, id: string, time: '5m'|'1h'|'15m') {
    const payload = { type, id };//type to identify token type, id to idetify token owner
    const secret: string = process.env.SECRET_KEY as string;
    return jwt.sign(payload, secret, {expiresIn: time});
}
export default generateToken;