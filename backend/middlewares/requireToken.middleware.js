import crypto from 'crypto';

export function requireToken(req, res, next) {
  const { email, token } = req.query;

//   return next();
  if (!email || !token) {
    return res.status(400).send('Missing email or token');
  }

  const expected = crypto
    .createHmac('sha256', process.env.UNSUB_SECRET)
    .update(email)
    .digest('hex');

  if (token !== expected) {
    return res.status(403).send('Invalid token');
  }
  // attach email for next handler
  req.validatedEmail = email;

    next();
}
