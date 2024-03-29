import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import type {
  MetaFunction,
  LinksFunction,
  LoaderFunction,
} from '@remix-run/node';
import {
  ThemeProvider,
  useTheme,
  PreventFlashOnWrongTheme,
} from 'remix-themes';
import { themeSessionResolver } from '~/utils/session.server';
import clsx from 'clsx';

import styles from '~/styles/app.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { getUser } from '~/utils/session.server';
import { AnimatePresence } from 'framer-motion';
import { useCatch } from '@remix-run/react';

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

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const { getTheme } = await themeSessionResolver(request);
  const user = await getUser(request);

  return {
    theme: getTheme(),
    user,
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
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='true'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Mukta:wght@400;600;700&family=Poppins:ital,wght@0,300;0,400;0,600;1,700&display=swap'
          rel='stylesheet'
        />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
          integrity='sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=='
          crossOrigin='anonymous'
          referrerPolicy='no-referrer'
        />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<LoaderData>();

  return (
    <>
      <Header user={data.user} />
      <main>{children}</main>
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
      <AnimatePresence>
        <App />
      </AnimatePresence>
    </ThemeProvider>
  );
}

// export function ErrorBoundary({ error }: { error: Error }) {
//   return (
//     <Document title='Uh-oh!'>
//       <div className='text-red-500'>
//         <h1>App Error</h1>
//         <pre>{error.message}</pre>
//       </div>
//     </Document>
//   );
// }

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div className='flex items-center justify-center w-full min-h-screen bg-slate-400'>
      <div className='flex flex-col text-gray-700 lg:flex-row lg:space-x-16 lg:space-x-reverse'>
        <div className='order-1 max-w-md px-2 text-sm md:text-base lg:px-0'>
          <header className='mb-6'>
            <h2 className='text-4xl font-bold leading-none text-gray-400 select-none lg:text-6xl'>
              {caught.status}
            </h2>
            <h3 className='text-xl font-light leading-normal lg:text-3xl md:text-3xl'>
              Sorry, we couldn't find this page.
            </h3>
          </header>

          <p className='max-w-sm mb-5 leading-5 md:leading-7'>
            Don't worry, sometimes even we make mistakes. You can find plenty of
            other things on our homepage.
          </p>

          <Link to='/'>
            <button className='inline px-4 py-2 text-sm font-medium leading-5 text-white uppercase transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg shadow focus:outline-none focus:shadow-outline-blue active:bg-blue-600 hover:bg-blue-700'>
              Back to Homepage
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
