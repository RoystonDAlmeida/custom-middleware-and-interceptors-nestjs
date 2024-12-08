import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Registering Interceptor Globally
import { TransformInterceptor } from './interceptors/transform.interceptor';

// Registering Error Interceptor Gloablly
import { ErrorInterceptor } from './interceptors/error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use TransformInterceptor globally to format responses
  app.useGlobalInterceptors(new TransformInterceptor(), new ErrorInterceptor());

  await app.listen(process.env.PORT ?? 3000); // Listening at 'Port:3000'
}
bootstrap();
