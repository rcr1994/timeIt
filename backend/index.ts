import express from 'express';
import cors from 'cors';
import prisma from './lib/prisma';
import sessionsSummary from './routes/api/sessions/summary';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/sessions/summary', sessionsSummary);

app.get('/', (req, res) => {
  res.send('Welcome to the Time Tracker backend!');
});

app.post('/api/sessions', async function (req, res) {
  console.log('Received request:', req.body);
  const { startTime, endTime, durationSec, tag, color } = req.body;

  if (!startTime || !endTime || !durationSec) {
    return res.status(400).json({ error: 'Missing data' });
  }

  const session = await prisma.session.create({
    data: {
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      durationSec,
      tag,
      color,
    },
  });

  res.json(session);
});

app.get('/api/sessions', async function (req, res) {
  const sessions = await prisma.session.findMany({
    orderBy: { startTime: 'desc' }
  });
  res.json(sessions);
});

app.listen(3001, () => console.log('Backend running on http://localhost:3001'));
