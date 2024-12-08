import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Injectable decorator allows this class to be injected into other classes
@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  // Create a logger instance specific for HTTP requests
  private logger = new Logger('HTTP');

  // The use method is called for every incoming request.
  use(req: Request, res: Response, next: NextFunction) {
    // use is a middleware function:- bridge between the request and route handler

    // Destructure method and url from the request object
    const { method, url } = req;

    // Listen for the finish event on the response object
    res.on('finish', () => {
      // Get the status code from the response object
      const { statusCode } = res;
      // Log the HTTP method, URL and status code(in Postman Console)
      this.logger.log(`${method} ${url} ${statusCode}`);
    });

    // Call next() to pass control to the next middleware or route handler
    next();
  }
}
