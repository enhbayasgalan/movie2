export const Footer = () => {
  return (
    <footer className="bg-indigo-700 py-10 px-5 w-screen text-[#fafafa]">
      <div className="flex flex-col justify-between gap-y-7  max-w-screen-xl lg:flex-row">
        <div className="space-y-3">
          <div className="flex items-center gap-x-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.83366 1.6665V18.3332M14.167 1.6665V18.3332M1.66699 9.99984H18.3337M1.66699 5.83317H5.83366M1.66699 14.1665H5.83366M14.167 14.1665H18.3337M14.167 5.83317H18.3337M3.48366 1.6665H16.517C17.5203 1.6665 18.3337 2.47985 18.3337 3.48317V16.5165C18.3337 17.5198 17.5203 18.3332 16.517 18.3332H3.48366C2.48034 18.3332 1.66699 17.5198 1.66699 16.5165V3.48317C1.66699 2.47985 2.48034 1.6665 3.48366 1.6665Z"
                stroke="#FAFAFA"
              />
            </svg>
            <h4 className="italic font-bold">Movie Z</h4>
          </div>
        </div>
        <div className="flex gap-x-12 lg:gap-x-24">
          <div className="space-y-3">
            <h4>Contact Information</h4>
            <div className="space-y-6">
              <div className="flex items-center gap-x-3">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.6663 4.66663L8.68634 8.46663C8.48052 8.59558 8.24255 8.66397 7.99967 8.66397C7.7568 8.66397 7.51883 8.59558 7.31301 8.46663L1.33301 4.66663M2.66634 2.66663H13.333C14.0694 2.66663 14.6663 3.26358 14.6663 3.99996V12C14.6663 12.7363 14.0694 13.3333 13.333 13.3333H2.66634C1.92996 13.3333 1.33301 12.7363 1.33301 12V3.99996C1.33301 3.26358 1.92996 2.66663 2.66634 2.66663Z"
                    stroke="#FAFAFA"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <h5 className="font-medium">Email</h5>
                  <p>support@movieZ.com</p>
                </div>
              </div>
              <div className="flex items-center gap-x-3">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1547_13436)">
                    <path
                      d="M14.6669 11.28V13.28C14.6677 13.4657 14.6297 13.6494 14.5553 13.8195C14.4809 13.9897 14.3718 14.1424 14.235 14.2679C14.0982 14.3934 13.9367 14.489 13.7608 14.5485C13.5849 14.6079 13.3985 14.63 13.2136 14.6133C11.1622 14.3904 9.19161 13.6894 7.46028 12.5667C5.8495 11.5431 4.48384 10.1774 3.46028 8.56665C2.3336 6.82745 1.63244 4.84731 1.41361 2.78665C1.39695 2.60229 1.41886 2.41649 1.47795 2.24107C1.53703 2.06564 1.63199 1.90444 1.75679 1.76773C1.88159 1.63102 2.03348 1.52179 2.20281 1.447C2.37213 1.37221 2.55517 1.33349 2.74028 1.33332H4.74028C5.06382 1.33013 5.37748 1.4447 5.62279 1.65567C5.8681 1.86664 6.02833 2.15961 6.07361 2.47998C6.15803 3.12003 6.31458 3.74847 6.54028 4.35332C6.62998 4.59193 6.64939 4.85126 6.59622 5.10057C6.54305 5.34988 6.41952 5.57872 6.24028 5.75998L5.39361 6.60665C6.34265 8.27568 7.72458 9.65761 9.39361 10.6067L10.2403 9.75998C10.4215 9.58074 10.6504 9.45722 10.8997 9.40405C11.149 9.35088 11.4083 9.37029 11.6469 9.45998C12.2518 9.68568 12.8802 9.84224 13.5203 9.92665C13.8441 9.97234 14.1399 10.1355 14.3513 10.385C14.5627 10.6345 14.6751 10.953 14.6669 11.28Z"
                      stroke="#FAFAFA"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1547_13436">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <div>
                  <h5 className="font-medium">Phone</h5>
                  <p>+976 (11) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h4>Follow us</h4>
            <div className="flex flex-col gap-3 lg:flex-row">
              <p className="font-medium">Facebook</p>
              <p className="font-medium">Instagram</p>
              <p className="font-medium">Twitter</p>
              <p className="font-medium">YouTube</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
