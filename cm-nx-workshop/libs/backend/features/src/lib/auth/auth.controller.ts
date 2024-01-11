import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Req,
  Logger,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginFormDto } from '@cm-nx-workshop/backend/dto';
import { JwtAuthGuard } from './jwtAuth.guard';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Log in a user' })
  @ApiBody({ type: LoginFormDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful login' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async login(@Body() body: LoginFormDto) {
    // Using LoginFormDto for typing the body
    const { emailAddress, password } = body;

    return await this.authService.login(emailAddress, password);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ description: 'User registration details', type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'User has been successfully registered.',
    type: CreateUserDto,
  }) // Response type should be DTO, as it doesn't include password
  @ApiUnauthorizedResponse({ description: 'Registration failed' })
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.authService.register(createUserDto);
      // Exclude password and other sensitive details from the response
      const { password, ...result } = user;
      return result;
    } catch (error) {
      // In case of any exception, throw an UnauthorizedException
      throw new UnauthorizedException('Registration failed');
    }
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Profile retrieved successfully',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  getProfile(@Req() req: any): any {
    // req.user should be properly typed
    // const { password, ...userWithoutPassword } = req.user;
    Logger.debug('Get user profile', req.user);
    const user = this.authService.profile(req.user.sub);
    return user; // Exclude password when returning the profile
  }
}
