"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const prisma_client_exception_filter_1 = require("./shared/prisma-client-exception/prisma-client-exception.filter");
const swagger_2 = require("./shared/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    const PORT = configService.get('PORT');
    app.enableCors({
        origin: configService.get('NODE_ENV') === 'dev'
            ? '*'
            : configService.get('APP_ORIGIN'),
    });
    swagger_1.SwaggerModule.setup('/apis/docs', app, (0, swagger_2.createDocument)(app));
    const { httpAdapter } = app.get(core_1.HttpAdapterHost);
    app.useGlobalFilters(new prisma_client_exception_filter_1.PrismaClientExceptionFilter(httpAdapter));
    await app.listen(PORT);
    common_1.Logger.log(`Server started running on port ${PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map