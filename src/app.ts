import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';

import cookieParser from 'cookie-parser';

const app: Application = express();

//! cors add for frontend api to server api connection. This will be change after final deploy link
// app.use(
//   cors({
//     origin: [
//       'http://localhost:3000' ||
//         'https://softsyncinc.com' ||
//         'https://www.softsyncinc.com' ||
//         'http://softsyncinc.com',
//     ],
//     credentials: true,
//   })
// );

app.use(cors())

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*' );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.use(cookieParser());

//! parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

//! global error handler
app.use(globalErrorHandler);

//! handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
