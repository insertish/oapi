# OAPI Client

This is a CLI for auto-generating an API library for a given OpenAPI spec which uses JSON primarily and conforms to Revolt's API style.

## Goals

- Commit programming atrocities internally.
- Pretend everything is fine externally.
- Provide a simple strongly typed API experience to the user.

## Example

Here's what you can achieve with this library:

```typescript
import { API } from 'your-api';

let id = 'user_id';

// By default, we use the first server specified in the API spec.
new API()
    // Path parameters are specified using template strings.
    .get(`/users/${id}`)
    .then(user => {
        // User is still fully typed!
        return user.username;
    })
    .then(console.log);
```

You can also provide your query and body parameters at the same time:

```typescript
import { API } from 'your-api';

// PATCH /users/@me?preserve=true
// Body: { username: string }
new API()
    .patch(`/users/@me`, {
        // Specify query parameters
        preserve: true,
        // Or body parameters
        username: 'something'
    });
```

This removes the overhead of having to remember exactly what goes where and provides a much nicer (and still strongly typed) API experience.

Currently this only supports rauth and Revolt authentication, but you can still provide your own Axios config or add your own authentication.

```typescript
new API({
    baseURL: 'https://example.com',
    authentication: {
        rauth: 'session token'
    }
})
```

## Usage

Add package locally:

```sh
yarn add --dev @insertish/oapi
```

Place your OpenAPI specification at the root of your API library at `OpenAPI.json`.

Update your `package.json` to include a new script:

```json
{
    "scripts": {
        "generate": "oapilib"
    },
    ...
}
```

Now generate the library: (`src` folder will be overwritten!)

```sh
yarn generate
```
