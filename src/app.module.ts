import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CinemaModule } from './cinema/cinema.module';
import { PrismaModule } from './shared/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // 3rd party modules
    ConfigModule.forRoot({
      isGlobal: true, // [1],
      cache: true, // [2]
    }),
    CinemaModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
