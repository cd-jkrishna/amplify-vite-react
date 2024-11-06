import { a, defineData, type ClientSchema } from '@aws-amplify/backend';
import { sayHello } from "../functions/say-hello/resource"

const schema = a.schema({
  Todo: a.model({
      content: a.string(),
      isDone: a.boolean(),
      isFinal:a.string()
    }),

    sayHello: a
        .query()
        .arguments({
            name: a.string(),
        })
        .returns(a.string())
        .handler(a.handler.function(sayHello))

    .authorization(allow => [allow.publicApiKey()])
});

// Used for code completion / highlighting when making requests from frontend
export type Schema = ClientSchema<typeof schema>;

// defines the data resource to be deployed
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: { expiresInDays: 30 }
  }
});
