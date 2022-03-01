import {
  createCookieSessionStorage,
  Links,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'remix';
import type { MetaFunction, LinksFunction } from 'remix';
import {
  ThemeProvider,
  useTheme,
  PreventFlashOnWrongTheme,
  createThemeSessionResolver,
} from 'remix-themes';
import clsx from 'clsx';

import styles from './tailwind.css';
import Header from './components/Header';
import Footer from './components/Footer';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

//TODO: update twitter options
export const meta: MetaFunction = () => {
  const description = `SuperSuite Hotel is the best hotel in the world.`;
  return {
    description,
    keywords: 'Hotel, Luxury, Luxury Hotel, Luxury Rooms, Luxury Rooms',
    'twitter:image': 'https://remix-jokes.lol/social.png',
    'twitter:card': 'summary_large_image',
    'twitter:creator': '@remix_run',
    'twitter:site': '@remix_run',
    'twitter:title': 'Remix Jokes',
    'twitter:description': description,
  };
};

export const themeSessionResolver = createThemeSessionResolver(
  createCookieSessionStorage({
    cookie: {
      name: 'super-suite-hotel-theme',
      secure: true,
      sameSite: 'lax',
      secrets: ['super-suite-hotel-theme'],
      path: '/',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      httpOnly: true,
    },
  })
);

export const loader: LoaderFunction = async ({ request }) => {
  const { getTheme } = await themeSessionResolver(request);

  return {
    theme: getTheme(),
  };
};

function Document({
  children,
  title = `Home`,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const data = useLoaderData();
  const [theme] = useTheme();
  return (
    <html lang='en' className={clsx(theme)}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <title>{title} | SuperSuite Hotel</title>
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <body className='bg-slate-100 dark:bg-slate-900 text-base-300 dark:text-base-content'>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

export default function AppWithProvider() {
  const data = useLoaderData();
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction='/action/set-theme'>
      <App />
    </ThemeProvider>
  );
}
