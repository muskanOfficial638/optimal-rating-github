// pages/api/logout.js
export default function handler(req, res) {
  res.setHeader('Set-Cookie', [
    'next-auth.callback-url=; Path=/; Max-Age=0',
    'next-auth.csrf-token=; Path=/; Max-Age=0',
    // Clear other cookies if needed
  ]);
  res.status(200).json({ message: 'Logged out' });
}
