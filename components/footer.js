import { VscArrowRight } from "react-icons/vsc";
import { VscChevronRight } from "react-icons/vsc";
import { PiCopyright } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa6";
import Clock from "./live-clock";

export default function Footer() {
     const now = new Date();
     const options = {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true, // 24-hour format, set to true for 12-hour format
     };

     const formattedDate = new Intl.DateTimeFormat("default", options).format(
          now
     );
     return (
          <div className="flex flex-col footer text-zinc-400 text-2xl px-36 border-t border-solid border-zinc-700 mt-20 py-8 gap-4">
               <div className="grid grid-cols-2">
                    <div className="flex flex-col justify-between gap-8">
                         <h2 className="text-white text-4xl font-medium">
                              Dont be shy! Say hello!
                         </h2>
                         <div>
                              <p>
                                   Hi, I'm Eric, please take a tour around my
                                   personal project.
                              </p>
                              <p>
                                   Feel interested? say hello to me, I really
                                   appreciate that!
                              </p>
                         </div>
                    </div>
                    <div className="flex flex-col justify-end items-center gap-8">
                         <div className="flex flex-col gap-2">
                              <a
                                   className="flex gap-4 items-center text-white text-4xl font-medium hover:text-indigo-200"
                                   href="mailto:giahaonguyen2207@gmail.com"
                              >
                                   <VscArrowRight /> Send me an Email
                              </a>
                              <p className="flex gap-4 items-center">
                                   <span className="flex items-center">
                                        Local time <VscChevronRight />
                                   </span>{" "}
                                   {/* <Clock /> */}
                              </p>
                         </div>
                    </div>
               </div>
               <div className="flex justify-between items-center">
                    <h1>PALPEDIA</h1>

                    <ul className="flex gap-4">
                         <li>
                              <a
                                   href="https://www.linkedin.com/in/eric-nguyen-953740261/"
                                   className="hover:text-indigo-100"
                              >
                                   <FaLinkedin />
                              </a>
                         </li>
                         <li>
                              <a
                                   href="https://github.com/ericgng220704"
                                   className="hover:text-indigo-100"
                              >
                                   <FaGithub />
                              </a>
                         </li>
                         <li>
                              <a
                                   href="https://www.instagram.com/heu.im/"
                                   className="hover:text-indigo-100"
                              >
                                   <BsInstagram />
                              </a>
                         </li>
                    </ul>

                    <div className="text-xl text-zinc-500">
                         <span className="flex items-center">
                              <PiCopyright /> 2024 Eric Nguyen
                         </span>
                         <span className="flex gap-2 items-center">
                              Made with <FaHeart /> for PalWorld
                         </span>
                    </div>
               </div>
          </div>
     );
}
