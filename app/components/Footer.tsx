import { Link } from 'remix';

type Props = {};

export default function Footer({}: Props) {
  return (
    <>
      <footer className='box-border pt-8 leading-7 border-0 border-slate-200 border-solid pb-7 w-full inset-x-0 bottom-0'>
        <div className='box-border px-4 mx-auto border-solid md:px-6 lg:px-8 max-w-7xl'>
          <div className='pt-4 mt-4 leading-7 text-center border-t border-slate-400 md:mt-5 md:pt-6'>
            <div>
              <Link
                to='/'
                className='text-xl font-black leading-none select-none logo'
              >
                SuperSuite
              </Link>
            </div>
            <p className='mt-8 text-base leading-6 text-center text-slate-400'>
              © {new Date().getFullYear()} Suraj Sankarsingh. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
