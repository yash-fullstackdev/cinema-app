"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDocument = void 0;
const swagger_1 = require("@nestjs/swagger");
const basicAuth = require("express-basic-auth");
const swagger_config_1 = require("./swagger.config");
function createDocument(app) {
    app.use(['/apis/docs'], basicAuth({
        challenge: true,
        users: {
            cinema: process.env.SWAGGER_PASSWORD,
        },
    }));
    const builder = new swagger_1.DocumentBuilder()
        .addSecurity('basic', {
        type: 'http',
        scheme: 'basic',
    })
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT-auth')
        .setTitle(swagger_config_1.SWAGGER_CONFIG.TITLE)
        .setDescription(swagger_config_1.SWAGGER_CONFIG.DESCRIPTION)
        .setBasePath('v1')
        .setContact(process.env.SWAGGER_CONTACT_NAME, process.env.SWAGGER_CONTACT_EMAIL, process.env.SWAGGER_CONTACT_URL)
        .setExternalDoc('Project on Github', process.env.SWAGGER_PROJECT_DETAILS)
        .setVersion(swagger_config_1.SWAGGER_CONFIG.VERSION)
        .addServer(process.env.SWAGGER_LOCAL_ENDPOINT, 'local env')
        .addServer(process.env.SWAGGER_STAG_ENDPOINT, 'stag env');
    for (const tag of swagger_config_1.SWAGGER_CONFIG.TAGS) {
        builder.addTag(tag);
    }
    const options = builder.build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    app.use('/apis/docs/json', (_, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(document);
    });
    return document;
}
exports.createDocument = createDocument;
//# sourceMappingURL=index.js.map