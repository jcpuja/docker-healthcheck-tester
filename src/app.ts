// src/app.ts
import express, { Request, Response } from 'express';

const app = express();

let status = 'UP';
let slowed = false;
let throwing = false;

app.get('/health', (req: Request, res: Response) => {
  console.log(new Date().toISOString(), 'GET /health');

  if (slowed) {
    setTimeout(() => {
      res.send({
        status,
      });
    }, 30000);
    return;
  }

  if (throwing) {
    res.status(500).send({
      status,
    });
    return;
  }

  res.send({
    status,
  });
});

app.post('/health/:newStatus', (req: Request, res: Response) => {
  status = req.params.newStatus;
  slowed = false;
  throwing = false;

  if (status === 'SLOW') {
    slowed = true;
    status = 'UP';
  }

  if (status === 'THROW') {
    throwing = true;
    status = 'DOWN';
  }

  res.send({
    status
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
