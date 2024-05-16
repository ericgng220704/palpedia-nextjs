import { useState, useEffect, useRef } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import Image from "next/image";

const ImageSlider = ({ slides }) => {
     const [current, setCurrent] = useState(0);
     const [loading, setLoading] = useState(true);
     const length = slides.length;
     const timeoutRef = useRef(null);

     const clearTimeoutRef = () => {
          if (timeoutRef.current) {
               clearTimeout(timeoutRef.current);
          }
     };

     const nextSlide = () => {
          setCurrent(current === length - 1 ? 0 : current + 1);
          setLoading(true);
     };

     const prevSlide = () => {
          setCurrent(current === 0 ? length - 1 : current - 1);
          setLoading(true);
     };

     useEffect(() => {
          clearTimeoutRef();
          timeoutRef.current = setTimeout(nextSlide, 4000);
          return () => clearTimeoutRef();
     }, [current]);

     if (!Array.isArray(slides) || slides.length <= 0) {
          return null;
     }

     return (
          <section className="relative flex justify-center items-center">
               <FaArrowAltCircleLeft
                    className="icon-imageSlider absolute top-1/2 left-8 text-white text-2xl cursor-pointer select-none z-10"
                    onClick={() => {
                         prevSlide();
                         clearTimeoutRef();
                    }}
               />
               <FaArrowAltCircleRight
                    className="icon-imageSlider absolute top-1/2 right-8 text-white text-2xl cursor-pointer select-none z-10"
                    onClick={() => {
                         nextSlide();
                         clearTimeoutRef();
                    }}
               />
               {slides.map((slide, index) => (
                    <div
                         className={
                              index === current
                                   ? "opacity-100 transition-opacity duration-5000 flex justify-center items-center imageContainer"
                                   : "opacity-0 transition-opacity duration-5000 imageContainer"
                         }
                         key={index}
                    >
                         {index === current && (
                              <>
                                   <div className="imageHolder">
                                        <Image
                                             src={slide.image}
                                             alt="slide"
                                             className="w-full h-auto"
                                             priority
                                             height={600}
                                             width={1000}
                                             onLoad={() => setLoading(false)}
                                             style={
                                                  loading
                                                       ? { display: "none" }
                                                       : { display: "block" }
                                             }
                                        />
                                   </div>
                              </>
                         )}
                    </div>
               ))}
          </section>
     );
};

export default ImageSlider;
