import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { SWAGGER_CONFIG } from './swagger.config';

/**
 * Creates an OpenAPI document for an application, via swagger.
 * @param app the nestjs application
 * @returns the OpenAPI document
 */
export function createDocument(app: INestApplication): OpenAPIObject {
  // integrated swagger security module with basic auth strategy
  app.use(
    ['/apis/docs'],
    basicAuth({
      challenge: true,
      users: {
        cinema: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  const builder = new DocumentBuilder()
    .addSecurity('basic', {
      type: 'http',
      scheme: 'basic',
    })
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT-auth',
    )
    .setTitle(SWAGGER_CONFIG.TITLE)
    .setDescription(SWAGGER_CONFIG.DESCRIPTION)
    .setBasePath('v1')
    .setContact(
      process.env.SWAGGER_CONTACT_NAME,
      process.env.SWAGGER_CONTACT_EMAIL,
      process.env.SWAGGER_CONTACT_URL,
    )
    .setExternalDoc('Project on Github', process.env.SWAGGER_PROJECT_DETAILS)
    .setVersion(SWAGGER_CONFIG.VERSION)
    .addServer(process.env.SWAGGER_LOCAL_ENDPOINT, 'local env')
    .addServer(process.env.SWAGGER_STAG_ENDPOINT, 'stag env');
  // eslint-disable-next-line no-restricted-syntax
  for (const tag of SWAGGER_CONFIG.TAGS) {
    builder.addTag(tag);
  }

  const options = builder.build();

  const document = SwaggerModule.createDocument(app, options);

  app.use('/apis/docs/json', (_, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(document);
  });

  return document;
}
