export const config = {
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/hyip',
  email: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    password: process.env.EMAIL_PASSWORD || 'your-email-password',
    from: 'HYIP System <noreply@hyip.com>'
  },
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key'
}; 