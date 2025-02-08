import { Apple, PlayIcon as PlayStore, Star } from "lucide-react";

export default function AppDownload() {
  return (
    <div className="flex items-center justify-center mt-8">
      <div>
        <div className="flex items-center justify-center mb-6 space-x-8">
          <div className="flex flex-col items-center">
            <svg
              className="w-8 h-8 mb-2"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#4285F4"
                d="M24 9.5c3.1 0 5.7 1.1 7.8 3.2l5.8-5.8C33.8 3.5 29.2 1.5 24 1.5 14.9 1.5 7.3 7.4 4.4 15.4l6.9 5.4C13.1 14.1 18 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M46.5 24c0-1.5-.1-3-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.4 5.8c4.3-4 6.8-9.9 6.8-16.5z"
              />
              <path
                fill="#FBBC05"
                d="M11.3 28.8c-1-3-1-6.3 0-9.2l-6.9-5.4c-2.8 5.6-2.8 12.4 0 18l6.9-5.4z"
              />
              <path
                fill="#EA4335"
                d="M24 46.5c5.2 0 9.8-1.8 13.1-4.8l-7.4-5.8c-2.1 1.4-4.7 2.2-7.7 2.2-6 0-11-4.1-12.8-9.8l-6.9 5.4C7.3 40.6 14.9 46.5 24 46.5z"
              />
              <path fill="none" d="M0 0h48v48H0z" />
            </svg>
            <div className="flex mb-1">
              {[...Array(4)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-500 fill-current"
                />
              ))}
              <div className="relative w-5 h-5">
                <Star className="absolute top-0 left-0 w-5 h-5 text-yellow-500 fill-current" />
                <Star className="absolute top-0 left-0 w-5 h-5 text-gray-300 fill-current clip-half" />
              </div>
            </div>
            <span className="text-sm text-gray-600">Reviews</span>
          </div>
          <div className="flex flex-col items-center">
            <svg
              className="w-8 h-8 mb-2"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#3b5998"
                d="M24 1C10.8 1 0 11.8 0 25s10.8 24 24 24 24-10.8 24-24S37.2 1 24 1zm4.5 24h-3v12h-5V25h-2v-4h2v-2.5c0-2.1 1.3-5.5 5.5-5.5l4 0v4h-3c-.5 0-1 .5-1 1V21h4l-1 4z"
              />
            </svg>
            <div className="flex mb-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-500 fill-current"
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">Reviews</span>
          </div>
        </div>
        <div className="flex flex-col w-full gap-2 p-2 md:flex-row">
          <a
            href=""
            target="_blank"
            className="flex items-center justify-center w-full px-5 py-3 text-center text-black border border-black rounded-2xl"
            rel="noreferrer"
          >
            <svg
              className="w-7"
              viewBox="0 0 40 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0)">
                <path
                  d="M32.6226 23.7016C32.6026 20.0267 34.2591 17.253 37.6118 15.2103C35.7359 12.5167 32.902 11.0347 29.1601 10.7443C25.6177 10.464 21.7461 12.8171 20.3292 12.8171C18.8324 12.8171 15.3998 10.8445 12.7057 10.8445C7.13769 10.9346 1.22048 15.3004 1.22048 24.1822C1.22048 26.8057 1.69945 29.516 2.65738 32.3131C3.93461 35.988 8.54465 45 13.3542 44.8498C15.8688 44.7897 17.645 43.0574 20.9179 43.0574C24.091 43.0574 25.7375 44.8498 28.5414 44.8498C33.3909 44.7797 37.5619 36.5888 38.7793 32.9039C32.2733 29.8298 32.6226 23.8919 32.6226 23.7016ZM26.9748 7.25968C29.6989 4.01535 29.4494 1.06142 29.3696 0C26.9648 0.140187 24.1808 1.64219 22.5943 3.49466C20.848 5.4773 19.8203 7.93058 20.0398 10.6943C22.6442 10.8945 25.019 9.55274 26.9748 7.25968Z"
                  fill="black"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="40" height="45" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
            <div className="flex flex-col ml-2 leading-4 text-left md:ml-3">
              <span className="text-sm text-black">Ladda ner från</span>
              <span className="text-base font-semibold text-black">
                App Store
              </span>
            </div>
          </a>
          <a
            href=""
            target="_blank"
            className="flex items-center justify-center w-full px-5 py-3 text-center text-black border border-black rounded-2xl"
            rel="noreferrer"
          >
            <svg
              className="w-7"
              viewBox="-9 0 274 274"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  d="M188.81319,178.874645 C221.272218,161.051727 245.880297,147.470853 248.001319,146.415618 C254.78648,142.806714 261.79324,133.256838 248.001319,125.838536 C243.548228,123.506467 219.573289,110.347687 188.81319,93.3795092 L146.171146,136.443648 L188.81319,178.874645 Z"
                  fill="#FFD900"
                ></path>
                <path
                  d="M146.171146,136.443648 L10.3940643,273.286517 C13.5808739,273.708611 17.1792251,272.864423 21.4212696,270.532353 C30.3274526,265.657168 124.739324,214.098388 188.81319,178.885198 L146.171146,136.443648 Z"
                  fill="#F43249"
                ></path>
                <path
                  d="M146.171146,136.443648 L188.81319,93.5905562 C188.81319,93.5905562 30.9711459,7.45172685 21.4212696,2.36549437 C17.8229184,0.233919759 13.7919209,-0.399221214 10.1830173,0.233919759 L146.171146,136.443648 Z"
                  fill="#00EE76"
                ></path>
                <path
                  d="M146.171146,136.443648 L10.1830173,0.233919759 C4.6641385,1.51075405 0,6.38593954 0,16.3579099 C0,32.270853 0,244.003747 0,257.162527 C0,266.290309 3.60890354,272.864423 10.3940643,273.497564 L146.171146,136.443648 Z"
                  fill="#00D3FF"
                ></path>
              </g>
            </svg>
            <div className="flex flex-col ml-2 leading-4 text-left md:ml-3">
              <span className="text-sm text-black">Ladda ner från</span>
              <span className="text-base font-semibold text-black">
                Play Store
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
