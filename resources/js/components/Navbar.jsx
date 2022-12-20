//import { Link, useLocation } from "react-router-dom";
import { Link, usePage } from '@inertiajs/inertia-react'
//import Logo1 from "../assets/images/logo/1.png";
//import Logo2 from "../assets/images/logo/2.png";
//import { navigations } from "./Data";
import { FiGlobe } from "react-icons/fi";
import { RiArrowDownSFill } from "react-icons/ri";
import React, { useState } from "react";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  let dark = false;
  const { pathname } = usePage().props;
  if (pathname === route('client.home.index')) {
    dark = true;
  }

  const {localizations, locales, currentLocale, locale_urls, categories} = usePage().props;

    const navigations = [
        {
            text: __('client.nav_home',localizations),
            link: route('client.home.index'),
        },
        {
            text: __('client.nav_projects',localizations),
            link: route('client.project.index'),
        },
        {
            text: __('client.nav_products',localizations),
            link: route('client.product.index'),
            drops: [
                {
                    text: "ჰიდროიზოლაცია",
                    link: "/",
                },
                {
                    text: "მყარი ზედაპირები",
                    link: "/",
                },
                {
                    text: "გეოსინთეზური მასალები",
                    link: "/",
                },
                {
                    text: "სინთეზური ქვა",
                    link: "/",
                },
                {
                    text: "ხმის იზოლაცია",
                    link: "/",
                },
            ],
        },
        {
            text: __('client.nav_about',localizations),
            link: route('client.about.index'),
        },
        {
            text: __('client.nav_contact',localizations),
            link: route('client.contact.index'),
        },
    ];

  return (
    <div
      className={`absolute w-full left-0 top-0 z-50 xl:text-lg ${
        dark ? "text-white" : ""
      }`}
    >
      <div className="wrapper flex items-start justify-between ">
        <Link href={route('client.home.index')} className="pt-3 relative md:-ml-36 -ml-16">
          <img className="md:w-auto w-44" src={dark ? "/client/assets/images/logo/2.png" : "/client/assets/images/logo/1.png"} alt="" />
          <div
            className={`absolute h-0.5 w-full bottom-7 right-full ${
              dark ? "bg-white" : "bg-black"
            }`}
          ></div>
        </Link>
        <div
          className={`flex items-center justify-center mobileMenu lg:flex-row flex-col text-center ${
            menu ? "show " : ""
          }`}
        >
          <ul>
            {navigations.map((item, index) => {
              return (
                <li key={index} className="inline-block relative group">
                  <Link
                    href={item.link}
                    className={`p-5 py-6 inline-block bold group-hover:bg-zinc-100 group-hover:text-zinc-900 group-hover:opacity-100 transition-all opacity-60  ${
                      pathname === item.link
                        ? `opacity-100 activeLink
                        ${
                          dark
                            ? "!bg-white text-zinc-900"
                            : "!bg-zinc-900 !text-white"
                        }`
                        : ""
                    }`}
                  >
                    {item.text}
                    {item.drops && (
                      <RiArrowDownSFill className="mb-2 group-hover:rotate-180  transition-all" />
                    )}
                  </Link>

                  {item.drops && (
                    <div className="absolute left-0 top-full bg-zinc-100 text-zinc-900 text-left py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                      {categories.map((item, index) => {
                        return (
                          <Link
                            href={route('client.category.show',item.slug)}
                            key={index}
                            className="inline-block w-full py-1 px-4 whitespace-nowrap hover:bg-zinc-300"
                          >
                            {item.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="relative bold lg:ml-10 mt-10 lg:mt-0 group">
              {Object.keys(locales).map((name, index) => {
                  if (locales[name] === currentLocale) {
                      return (
                          <span>
                            {name}
                              <FiGlobe className="text-xl ml-2 mb-1 inline-block" />
                            </span>
                      );
                  }
              })}

            <div className="absolute left-0 top-full bold text-left opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all ">
                {Object.keys(locales).map((name, index) => {
                    if (locales[name] !== currentLocale) {
                        return (
                            <a
                                key={index}
                                className="block"
                                href={locale_urls[name]}
                            >
                                {name}
                            </a>
                        );
                    }
                })}
                {/*<a className="block" href="#">
                ENG
              </a>
              <a className="block" href="#">
                ARM
              </a>*/}
            </div>
          </div>
        </div>
        <button
          onClick={() => setMenu(!menu)}
          className={`menuBtn ${menu ? "clicked" : ""}`}
        >
          <div
            className={`span ${dark ? "bg-white" : "bg-black"} ${
              menu ? "!bg-black" : ""
            }`}
          ></div>
          <div
            className={`span ${dark ? "bg-white" : "bg-black"} ${
              menu ? "!bg-black" : ""
            }`}
          ></div>
          <div
            className={`span ${dark ? "bg-white" : "bg-black"} ${
              menu ? "!bg-black" : ""
            }`}
          ></div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
