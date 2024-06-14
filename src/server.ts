// server.ts
import app from './index';

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => console.log(`User service running on port ${PORT}`));