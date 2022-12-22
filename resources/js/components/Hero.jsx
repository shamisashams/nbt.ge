import React, { useState } from "react";
//import bg1 from "../assets/images/hero/1.png";
//import bg2 from "../assets/images/hero/2.png";
//import bg3 from "../assets/images/hero/3.png";
//import bg4 from "../assets/images/hero/4.png";
//import bg5 from "../assets/images/hero/5.png";
//import img1 from "../assets/images/home/1.png";
import { BsArrowDownRightCircle, BsArrowDownCircle } from "react-icons/bs";
import { FaFacebookSquare, FaInstagram, FaTwitterSquare } from "react-icons/fa";
//import { Link } from "react-router-dom";
import { Link, usePage } from '@inertiajs/inertia-react'

const Hero = () => {
    const { sliders, localizations, info } = usePage().props;
  const [cIndex, setCIndex] = useState(0);
  const tabs = [
    {
      title: "Dupont",
      shortDec: `ჰიდროიზოლაცია ჰიდროიზოლაცია`,
      para: "გერმანული კომპანია რომელიც 1861 წელს დაარსდა და ჩაერთო ტექსილის წარმოებაში., ხოლო 1958 წლიდან ის ქმნის ზემძლავრ გეოკომპოზიტურ მასალებს, როლებიც უზრუნველყოფენ მიწის ვაკის არმირებას (მზიდუნარიანობის გაზრდას) გეოკომპოზიტური მასალები ასევე ახდენენ გზის შემადგენელი ფენების სეპარაციას, უზრუნველყოფენ დრენაჟისა და ფილტრაციის ბუნებრივი სისტემების გამართულ მუშაობას. HUESKER-ი აწარმოებს გეოსინთეზური მასალების სრულ სპექტრს. აღსანიშნავია, რომ კომპანიის ქარხნები მდებარეობს მხოლოდ გერმანიასა და ამერიკაში.",
      img: "/client/assets/images/hero/1.png",
      logo: "/client/assets/images/home/1.png",
      link: "/",
    },
    {
      title: "TheSize",
      shortDec: "სინთეზური ქვა",
      para: "გერმანული კომპანია რომელიც 1861 წელს დაარსდა და ჩაერთო ტექსილის წარმოებაში., ხოლო 1958 წლიდან ის ქმნის ზემძლავრ გეოკომპოზიტურ მასალებს, როლებიც უზრუნველყოფენ მიწის ვაკის არმირებას (მზიდუნარიანობის გაზრდას) გეოკომპოზიტუსპექტრს. აღსანიშნავია, რომ კომპანიის ქარხნები მდებარეობს მხოლოდ გერმანიასა და ამერიკაში.",
      img: "/client/assets/images/hero/2.png",
      logo: "/client/assets/images/home/1.png",
      link: "/",
    },
    {
      title: "Huesker",
      shortDec: "გეოსინთეზური მასალები",
      para: "გერმანული კომპანია რომელიც 1861 წელს დაარსდა და ჩაერთო ტექსილის წარმოებაში., ხოლო 1958 წლიდან ის ქმნის ზემძლავრ გეოკომპოზიტურ მასალებს, როლებიც უზრუნველყოფენ მიწის ვაკის არმირებას (მზიდუნარიანობის გაზრდას) გეოკომპოზიტური მასალერი მასალები ასევე ახდენენ გზის შემადგენელი ფენების სეპარაციას, უზრუნველყოფენ დრენაჟისა და ფილტრაციის ბუნებრივი სისტემების გამართულ მუშაობას. HUESKER-ი აწარმოებს გეოსინთეზური მასალების სრულ ბი ასევე ახდენენ გზის შემადგენელი ფენების სეპარაციას, უზრუნველყოფენ დრენაჟისა და ფილტრაციის ბუნებრივი სისტემების გამართულ მუშაობას. HUESKER-ი აწარმოებს გეოსინთეზური მასალების სრულ სპექტრს. აღსანიშნავია, რომ კომპანიის ქარხნები მდებარეობს მხოლოდ გერმანიასა და ამერიკაში.",
      img: "/client/assets/images/hero/3.png",
      logo: "/client/assets/images/home/1.png",
      link: "/",
    },
    {
      title: "Texsa",
      shortDec: "თბო  იზოლაცია ჰიდრო იზოლაცია",
      para: "გერმანული კომპანია რომელიც 1861 წელს დაარსდა და ჩაერთო ტექსილის წარმოებაში., ხოლო 1958 წლიდან ის ქმნის ზემძლავრ გეოკომპოზიტურ მასალებს, როლებიც უზრუნველყოფენ მიწის ვაკის არმირებას (მზიდუნარიანობის გაზრდას) გეოკომპოზიტური მასალები ასევე ახდენენ გზის შემადგენელი ფენების სეპარაციას, უზრუნველყოფენ დრენაჟისა და ფილტრაციის ბუნებრივი სისტემების გამართულ მუშაობას. HUESKER-ი აწარმოებს გეოსინთეზური მასალების სრულ სპექტრს. აღსანიშნავია, რომ კომპანიის ქარხნები მდებარეობს მხოლოდ გერმანიასა და ამერიკაში.",
      img: "/client/assets/images/hero/4.png",
      logo: "/client/assets/images/home/1.png",
      link: "/",
    },
    {
      title: "Technosonus",
      shortDec: "ხმის იზოლაცია ვიბრო იზოლაცია აკუსტიკური მასალები",
      para: "გერმანული კომპანია რომელიც 1861 წელს დაარსდა და ჩაერთო ტექსილის წარმოებაში., ხოლო 1958 წლიდან ის ქმნის ზემძლავრ გეოკომპოზიტურ მასალებს, როლებიც უზრუნველყოფენ მიწის ვაკის არმირებას (მზიდუნარიანობის გაზრდას) გეოკომპოზიტური მასალები ასევე ახდენენ გზის შემადგენელი ფენების სეპარაციას, უზრუნველყოფენ დრენაჟისა და ფილტრაციის ბუნებრივი სისტემების გამართულ მუშაობას. HUESKER-ი აწარმოებს გეოსინთეზური მასალების სრულ სპექტრს. აღსანიშნავია, რომ კომპანიის ქარხნები მდებარეობს მხოლოდ გერმანიასა და ამერიკაში.",
      img: "/client/assets/images/hero/5.png",
      logo: "/client/assets/images/home/1.png",
      link: "/",
    },
  ];

    const renderHTML = (rawHTML) =>
        React.createElement("p", {
            dangerouslySetInnerHTML: { __html: rawHTML },
        });

  return (
    <div
      className="lg:h-screen py-40 w-full relative bg-center bg-cover text-white"
      style={{ backgroundImage: `url(${sliders[cIndex].file ? sliders[cIndex].file.full_url: null})` }}
    >
      <div className="absolute left-0 top-0 w-full h-full bg-black/[0.7]"></div>
      <div className="wrapper h-full flex md:items-center items-end justify-between relative">
        <div>
          <div className="bold hidden md:block">
            <BsArrowDownCircle className="text-2xl mb-1 mr-2" /> {__('client.socials',localizations)}
          </div>
          <div className=" hidden md:block h-60 bg-white w-px my-8 ml-3 opacity-70"></div>
          <a href={info.facebook} className="block text-2xl mb-1">
            <FaFacebookSquare />
          </a>
          <a href={info.instagram} className="block text-2xl mb-1">
            <FaInstagram />
          </a>
          <a href={info.twitter} className="block text-2xl">
            <FaTwitterSquare />
          </a>
        </div>
        {sliders.map((item, index) => {
          return (
            <div
              key={index}
              className={`heroContent text-right mb-10 ${
                index === cIndex ? "show" : ""
              }`}
            >
              <img src={item.logo?item.logo.thumb_full_url:null} alt="" />
              <div className="xl:text-7xl md:text-5xl text-4xl bold xl:mt-10 mt-5">
                <BsArrowDownRightCircle className="md:text-6xl text-4xl mr-4 mb-3" />
                {item.title}
              </div>
              <p className="max-w-2xl mx-auto mr-0 mt-5 mb-10 text-sm md:text-base">
                {renderHTML(item.description)}
              </p>
              <Link
                href={item.link}
                className="inline-block bold border border-white rounded-full py-4 px-14"
              >
                  {__('client.learn_more',localizations)}
              </Link>
            </div>
          );
        })}
      </div>
      <div className="absolute w-full bottom-0 left-0 flex z-20">
        {sliders.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => setCIndex(index)}
              className={`xl:h-52 lg:h-40 md:h-28 h-20 w-1/5   flex items-center justify-start relative cursor-pointer transition-all duration-300 ${
                index === cIndex ? "bg-white text-black" : "bg-zinc-800/[0.8]"
              }`}
            >
              <div
                className={`h-full transition-all duration-300 ${
                  index === cIndex ? " w-1/2 " : "w-0"
                }`}
              >
                <img
                  className="w-full h-full object-cover"
                  src={item.file?item.file.full_url:null}
                  alt=""
                />
              </div>
              <div className="relative flex items-center justify-center w-full">
                <div className="bold xl:text-xl ">
                  <span className="hidden md:inline-block">
                    {`0${index + 1}`}.
                  </span>
                  <span className="xl:text-3xl md:text-2xl underline xl:pl-3">
                    {item.title}
                  </span>
                </div>
                <p className="lg:block hidden  opacity-50 xl:text-sm text-xs absolute top-full pl-8 ">
                  {item.title_2}
                </p>
              </div>
              {sliders.length !== index + 1 && (
                <div className=" hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 bg-white opacity-70 w-px h-14"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
