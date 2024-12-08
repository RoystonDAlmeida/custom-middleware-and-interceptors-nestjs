import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        // Log the error or handle it as needed
        console.error('Error occurred:', err);

        // Customize the error response
        const status = err.status || 500; // Default to 500 if no status is provided
        const message = err.message || 'Internal server error'; // Default message

        // Throw a new BadRequestException with a custom message
        return throwError(() => new BadRequestException(message));
      }),
    );
  }
}
