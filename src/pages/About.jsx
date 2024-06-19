import React from "react";
import Divider from "../components/global/Divider.jsx";

const About = () => {
  return (
    <div>
      <div className="flex justify-between items-center pr-5">
        <h2 className="heading-primary">About</h2>
      </div>

      <Divider />

      <div className="grid md:grid-cols-3 max-w-screen-lg gap-10 mx-10 my-5">
        <div className="flex gap-4 items-start flex-col ">
          <span className="bg-ap-primary text-white p-3 rounded-full">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 fill-white"
            >
              <path d="M12,23A1,1 0 0,1 11,22V19H7A2,2 0 0,1 5,17V7A2,2 0 0,1 7,5H21A2,2 0 0,1 23,7V17A2,2 0 0,1 21,19H16.9L13.2,22.71C13,22.89 12.76,23 12.5,23H12M13,17V20.08L16.08,17H21V7H7V17H13M3,15H1V3A2,2 0 0,1 3,1H19V3H3V15M9,9H19V11H9V9M9,13H17V15H9V13Z" />
            </svg>
          </span>
          <div>
            <h3 className="text-2xl">Need Help?</h3>
            <p className="text-base text-ap-text mt-2">
              Do you have any questions, suggestions, or feedback? Feel free to
              open a ticket on the plugin support page or reach out to me via
              email at{" "}
              <a href="mailto:madebyarif@gmail.com?subject=Awesome%20Posts%20WP" className="text-ap-primary" target="_blank">
                madebyarif@gmail.com
              </a>
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-start flex-col ">
          <span className="bg-ap-primary text-white p-3 rounded-full">
            <svg
              width="15"
              height="15"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
              ></path>
            </svg>
          </span>
          <div>
            <h3 className="text-2xl">My work brings joy?</h3>
            <p className="text-base text-ap-text mt-2">
              If you are satisfied with Awesome Posts plugin, I would greatly
              appreciate it if you could leave a rating. Thank you!
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-start flex-col ">
          <span className="bg-ap-primary text-white p-3 rounded-full">
            <svg
              width="15"
              height="15"
              viewBox="0 0 496 512"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
            >
              <path
                fill="currentColor"
                d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm105.6-151.4c-25.9 8.3-64.4 13.1-105.6 13.1s-79.6-4.8-105.6-13.1c-9.8-3.1-19.4 5.3-17.7 15.3 7.9 47.2 71.3 80 123.3 80s115.3-32.9 123.3-80c1.6-9.8-7.7-18.4-17.7-15.3zm-227.9-57.5c-1 6.2 5.4 11 11 7.9l31.3-16.3 31.3 16.3c5.6 3.1 12-1.7 11-7.9l-6-34.9 25.4-24.6c4.5-4.5 1.9-12.2-4.3-13.2l-34.9-5-15.5-31.6c-2.9-5.8-11-5.8-13.9 0l-15.5 31.6-34.9 5c-6.2.9-8.9 8.6-4.3 13.2l25.4 24.6-6.1 34.9zm259.7-72.7l-34.9-5-15.5-31.6c-2.9-5.8-11-5.8-13.9 0l-15.5 31.6-34.9 5c-6.2.9-8.9 8.6-4.3 13.2l25.4 24.6-6 34.9c-1 6.2 5.4 11 11 7.9l31.3-16.3 31.3 16.3c5.6 3.1 12-1.7 11-7.9l-6-34.9 25.4-24.6c4.5-4.6 1.8-12.2-4.4-13.2z"
              ></path>
            </svg>
          </span>
          <div>
            <h3 className="text-2xl">Delighted to contribute?</h3>
            <p className="text-base text-ap-text mt-2">
              If you are really satisfied with my work and value my efforts, you
              can simply{" "}
              <a
                href="https://buymeacoffee.com/arifix"
                className="text-ap-primary"
                target="_blank"
              >
                Buy me a Coffee
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
