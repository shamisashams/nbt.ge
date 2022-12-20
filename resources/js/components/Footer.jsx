import React from "react";
//import { navigations } from "./Data";
import {
  FaPhoneSquare,
  FaFacebookSquare,
  FaInstagram,
  FaTwitterSquare,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
//import { Link, useLocation } from "react-router-dom";
import { Link, usePage } from '@inertiajs/inertia-react'

const Footer = () => {
  const { pathname, localizations, info } = usePage().props;

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
    <footer className={`relative ${pathname === "/contact" && "hidden"}`}>
      <div className="absolute left-0 bottom-0 w-1/3 h-full bg-zinc-50 -z-10"></div>
      <div className="wrapper flex items-start justify-between py-10 flex-col-reverse lg:flex-row">
        <div className="lg:w-1/2 w-full h-40 mr-10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3538.702688543393!2d44.77876289593893!3d41.77050480733346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sge!4v1670580829765!5m2!1sen!2sge"
            width="100%"
            height="100%"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="lg:text-right mb-10">
          <ul>
            {navigations.map((item, index) => {
              return (
                <li key={index} className="inline-block relative group">
                  <Link
                    href={item.link}
                    className="lg:ml-6 lg:mr-0 mr-5 bold transition-all"
                  >
                    {item.text}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className=" my-6 text-sm">
            <a href="#" className="mr-3 inline-block">
              <MdLocationOn className="inline-block text-lg mr-2" />
              <span>{info.address}</span>
            </a>
            <a href="#" className="mr-3 inline-block">
              <IoMdMail className="inline-block text-lg mr-2" />
              <span>{info.email}</span>
            </a>
            <a href="#" className=" inline-block">
              <FaPhoneSquare className="inline-block text-lg mr-2" />
              <span>{info.phone}</span>
            </a>
          </div>
          <div className="text-2xl">
            <a href="#" className="lg:ml-5 lg:mr-0 mr-5">
              <FaFacebookSquare />
            </a>
            <a href="#" className="lg:ml-5 lg:mr-0 mr-5">
              <FaInstagram />
            </a>
            <a href="#" className="lg:ml-5 lg:mr-0 mr-5">
              <FaTwitterSquare />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
