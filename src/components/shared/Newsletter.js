import Image from 'next/image'
import paperAirplane from '/public/images/paper-airplane.png'

export default function Newsletter() {
  return (
    <section className="bg-gray-50 py-12 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-screen-xl px-5 sm:px-6 lg:px-8">
        {/* Content */}
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <div className="relative h-auto w-24 animate-orbit">
            <Image
              src={paperAirplane}
              alt="Newsletter"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </div>

          <h2 className="mt-6 text-3xl font-medium tracking-normal text-gray-900 sm:mt-8 sm:text-4xl md:tracking-tight lg:text-5xl lg:leading-tight">
            Get the most talked about stories directly in your inbox
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-500">
            Every week we share the most relevant news in tech, culture and
            entertainment. Join our community of over 10,000 readers.
          </p>

          {/* Newsletter signup container */}
          <div className="mt-8 flex w-full flex-col items-center sm:mt-10">
            <div className="relative h-14 w-full max-w-xl rounded-3xl">
              {/* Newsletter signup form */}
              <form
                action="#"
                method="post"
                className="group rounded-3xl border border-gray-300/70 bg-transparent transition duration-300 ease-in-out"
              >
                <input
                  type="email"
                  className="h-14 w-full rounded-3xl border-0 border-transparent bg-white py-3.5 pl-6 pr-36 text-sm leading-5 text-gray-800 transition  duration-300 ease-in-out hover:bg-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-100"
                  required
                  placeholder="Enter your email"
                  autoComplete="email"
                />
                <button
                  type="submit"
                  className='absolute right-3 top-1.5 inline-flex h-11 items-center bg-transparent px-4 py-2 text-tiny uppercase tracking-widest text-red-700 outline-none transition duration-300 ease-in-out before:absolute before:left-0 before:right-auto before:h-6 before:w-px before:bg-gray-300/70 before:transition before:duration-300 before:ease-in-out before:content-[""] hover:text-red-600 focus:outline-none sm:font-medium md:px-6'
                >
                  Subscribe
                </button>
              </form>
            </div>
            <p className="mt-4 text-center text-sm text-gray-500">
              Your privacy is important to us. We promise not to send you spam!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
