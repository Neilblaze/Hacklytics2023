import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

export const Landing = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const youtubeLink = 'https://www.youtube.com/watch?v=e4ZOZ8Dzr2M'

  return (
    <div className="text-white">
      {/* {user ? <div><p> {`signed in as ${user.email}`}</p><button className="bg-blue-700 text-2xl text-white rounded-xl p-4 w-full mt-4" onClick={() => { signOut(auth); alert("refresh page") }}>Sign Out</button></div> : <p>No user found. go to /signup</p>} */}



      <div className="flex flex-col min-h-screen overflow-hidden">
        <header className="w-full  transition duration-300 ease-in-out false">
          <div className="max-w-6xl mx-auto px-5 sm:px-6">
            <div className="flex items-center justify-between h-16 md:h-20">
              <div className="flex-shrink-0 mr-4">
                <a className="block" aria-label="Cruip" href="/">
                  <svg className="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <radialGradient cx="21.152%" cy="86.063%" fx="21.152%" fy="86.063%" r="79.941%" id="header-logo">
                        <stop stopColor="#4FD1C5" offset="0%" />
                        <stop stopColor="#81E6D9" offset="25.871%" />
                        <stop stopColor="#338CF5" offset="100%" />
                      </radialGradient>
                    </defs>
                    <rect width={32} height={32} rx={16} fill="url(#header-logo)" fillRule="nonzero" />
                  </svg>
                </a>
              </div>
              <nav className="flex flex-grow">
                {!user ? <ul className="flex flex-grow justify-end flex-wrap items-center">
                  <li><Link className="font-medium text-black bg-white hover:bg-gray-800 hover:text-gray-100 border-white border btn-sm flex items-center transition duration-150 ease-in-out" to="/login">Sign in</Link></li>
                  <li>
                    <Link className="btn-sm text-gray-200 bg-gray-700 hover:bg-gray-800 ml-3 border-white border" to="/signup">
                      <span>Sign up</span>
                    </Link>
                  </li>
                </ul> : <ul className="flex flex-grow justify-end flex-wrap items-center">
                  <div className="border-white border btn-sm bg-gray-800">Hi! {user.email.split('@')[0]}</div>
                  <div className="font-medium cursor-pointer text-black bg-white hover:bg-gray-800 hover:text-gray-100 border-white border btn-sm flex items-center transition duration-150 ease-in-out ml-3" onClick={() => auth.signOut().then(e => window.location.reload())}>
                    <span>Logout</span>
                  </div>
                </ul>}
              </nav>
            </div>
          </div>
        </header>


        <section className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none" aria-hidden="true">
            <svg width={1360} height={578} viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01">
                  <stop stopColor="#FFF" offset="0%" />
                  <stop stopColor="#EAEAEA" offset="77.402%" />
                  <stop stopColor="#DFDFDF" offset="100%" />
                </linearGradient>
              </defs>
              <g fill="url(#illustration-01)" fillRule="evenodd">
                <circle cx={1232} cy={128} r={128} />
                <circle cx={155} cy={443} r={64} />
              </g>
            </svg>
          </div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-10 pb-12 ">
              <div className="text-center pb-12 md:pb-16">
                <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 aos-init aos-animate" data-aos="zoom-y-out">Providing seamless solutions to <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-600">healthcare providers</span></h1>
                <div className="max-w-3xl mx-auto">
                  <p className="text-xl text-gray-500 mb-8 aos-init aos-animate space-x-1" data-aos="zoom-y-out" data-aos-delay={150}>
                    <span>We tackle several key pain points in the healthcare industry and mainly help in</span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                      provider shortage & burnout
                    </span>
                    <span>
                      and
                    </span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600">
                      access to care.
                    </span>
                  </p>
                  <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center aos-init aos-animate" data-aos="zoom-y-out" data-aos-delay={300}>
                    <div>

                      {user ? <Link className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0" href="#0" to='/login'>
                        Go to dashboard
                      </Link>

                        : <Link className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0" href="#0" to='/login'>
                          Get started
                        </Link>}

                    </div>
                    <div><a className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4" target='_blank' href="https://github.com/Neilblaze/HealthifAI">Checkout us on GitHub</a></div>
                  </div>
                </div>
              </div>
              <div>
                <div className="relative flex justify-center mb-8 aos-init aos-animate" data-aos="zoom-y-out" data-aos-delay={450}>
                  <div className="flex flex-col justify-center">
                    <img className="mx-auto" src="/image-container.png" width='60%' alt="Hero" />
                    <svg className="absolute inset-0 max-w-full mx-auto md:max-w-none h-auto" width='60%' viewBox="0 0 768 432" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                      <defs>
                        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="hero-ill-a">
                          <stop stopColor="#FFF" offset="0%" />
                          <stop stopColor="#EAEAEA" offset="77.402%" />
                          <stop stopColor="#DFDFDF" offset="100%" />
                        </linearGradient>
                        <linearGradient x1="50%" y1="0%" x2="50%" y2="99.24%" id="hero-ill-b">
                          <stop stopColor="#FFF" offset="0%" />
                          <stop stopColor="#EAEAEA" offset="48.57%" />
                          <stop stopColor="#DFDFDF" stopOpacity={0} offset="100%" />
                        </linearGradient>
                        <radialGradient cx="21.152%" cy="86.063%" fx="21.152%" fy="86.063%" r="79.941%" id="hero-ill-e">
                          <stop stopColor="#4FD1C5" offset="0%" />
                          <stop stopColor="#81E6D9" offset="25.871%" />
                          <stop stopColor="#338CF5" offset="100%" />
                        </radialGradient>
                        <circle id="hero-ill-d" cx={384} cy={216} r={64} />
                      </defs>
                      <g fill="none" fillRule="evenodd">
                        <circle fillOpacity=".04" fill="url(#hero-ill-a)" cx={384} cy={216} r={128} />
                        <circle fillOpacity=".16" fill="url(#hero-ill-b)" cx={384} cy={216} r={96} />
                        <g fillRule="nonzero">
                          <use fill="#000" xlinkHref="#hero-ill-d" />
                          <use fill="url(#hero-ill-e)" xlinkHref="#hero-ill-d" />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <a target='_blank' href={youtubeLink} className="absolute text-xs sm:text-sm top-full flex items-center transform -translate-y-1/2 bg-white rounded-full font-medium group p-4 shadow-lg" aria-controls="modal">
                    <svg className="w-6 h-6 fill-current text-gray-400 group-hover:text-blue-600 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0 2C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12z" />
                      <path d="M10 17l6-5-6-5z" />
                    </svg>
                    <span className="ml-3 text-black">Watch the full video on youtube (2 min)</span>
                  </a>
                </div>

              </div>
            </div>
          </div>
        </section>

        <div className="flex text-gray-100 pb-10 items-center space-x-1 justify-center">
        <div>Built with ❤️ using</div> <a target='_blank' href='https://linode.com'><img width='30px' src='/linode-logo-square-rgb.png'/></a> <div>and</div> <a href='https://dev.to/neilblaze/healthifai--5ad4' target='_blank'><img width='30px' src='/dev-black.png'/></a>
      </div>
      </div>

    



    </div>
  );
};
