# react-ssg-data

this an example with react-router-dom in **Static site generation**

`note: this is not targets CSS Optimization, Redux, Mobx, etc. targets react-router-dom and static data fetching`

# Features

- Code splitting
- Static site generation
- Hot reload
- React-router-dom

## Installation

```bash
$ git clone https://github.com/healthpackdev/react-ssg-data
$ npm install
```

## Development

```bash
$ npm run dev
```

Go `localhost:3000` or `http://localhost:{process.env.port}`

[Mentioned in](https://github.com/healthpackdev/react-ssg-data/blob/master/tools/dev-server.js#L12) you can also development the server.

## Production

```bash
$ npm run build
```

this builds the **server** and **client** then runs `npm run export` your static files will be generated din `./dist`

## Analyze

```bash
$ npm run analyze
```

Analyze with `Statoscope`

---

### add a new page

to the first add your route to `./src/routes.ts`

```ts
const routes: Route[] = [
  {
    path: '/',
    exact: true,
    component: importPage('index'),
  },
  {
    path: '/profile',
    component: importPage('profile'),
  },
  {
    path: '/404',
    component: importPage('404'),
  },
  {
    path: '/nested/page',
    component: importPage('nested/page'),
  },
  // add like this
  {
    path: '/my/new/page',
    component: importPage('my/new/page'),
  },
];
```

then create a `./src/pages/my/new/page.tsx` or `.js, .jsx`

```tsx
const myNewPage = () => (
  <div>
    <h1>My New Page</h1>
  </div>
);

export default myNewPage;
```

if you want to load a static data for page create a `./src/data/my/new/page.tsx` or `.js, .jsx`

```tsx
const myNewPageData = () => {
  return {
    myNewPageData: getMyNewPageData(),
  };
};

export default myNewPageData;
```

then use with

```tsx
import { useRouteData } from '@/lib/use-route-data';

const myNewPage = () => {
  const { myNewPageData } = useRouteData();

  <div>
    <h1>My New Page {myNewPageData}</h1>
  </div>;
};

export default myNewPage;
```

### Known issues

`Hot reload`: not working with css files.

### License

[MIT](https://github.com/healthpackdev/react-ssg-data/blob/master/LICENSE.md)
