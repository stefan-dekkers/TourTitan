import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
  
    if (!token) {
      this.logger.warn('No token provided');
      return false;
    }
  
    try {
      const decoded = this.jwtService.verify(token);
      this.logger.debug(`Decoded token: ${JSON.stringify(decoded)}`);
      request.user = decoded; 
      this.logger.debug('Token successfully verified');
      return true;
    }catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Token verification failed: ${error.message}`);
      } else {
        this.logger.error(`Token verification failed: ${String(error)}`);
      }
      return false;
    }
  }
  
}
