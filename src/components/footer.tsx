export const Footer = () => {
  return (
    <footer className="bg-indigo-700 py-10  text-[#fafafa]">
      <div className="flex flex-col justify-between gap-y-7  max-w-screen-xl flex-row">
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
      </div>
    </footer>
  );
};
