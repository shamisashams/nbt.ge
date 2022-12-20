import React, { useState,useEffect } from "react";
import { BiDownArrowAlt } from "react-icons/bi";
import { FaPhoneSquare } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
//import { Link } from "react-router-dom";
//import Tile17 from "../assets/images/tiles/17.png";
import { FaCheckSquare } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Layout from "@/Layouts/Layout";
import { Link, usePage } from '@inertiajs/inertia-react'
import { Inertia } from "@inertiajs/inertia";

const Contact = ({seo}) => {
  const [showPopup, setShowPopup] = useState(false);

    const { info, errors } = usePage().props;
    let {msg_status} = usePage().props

    const [values, setValues] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        message: "",
    });

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post(route("client.contact.mail"), values);
    }

    useEffect(()=>{
        if(msg_status)setShowPopup(true);
        msg_status = null;
    })

    return (
      <Layout seo={seo}>
          <>
              <div className="wrapper flex items-stretch justify-between  md:pt-44 pt-32 pb-20 flex-col-reverse lg:flex-row">
                  <div className="lg:w-1/3 mb-10">
                      {" "}
                      <div className="md:text-4xl text-2xl bold mb-6">მოგვწერეთ</div>
                      <p>ჩვენ მზად ვართ გიპასუხოთ</p>
                      <div className="mt-10">
                          {/* <form action=""> */}
                          <div className="grid grid-cols-2 gap-6">
                              <div>
                                  <label>სახელი</label> <input name="name" type="text" placeholder="სახელი" onChange={handleChange} />
                                  {errors.name && <div>{errors.name}</div>}
                              </div>
                              <div>
                                  <label>გვარი</label>
                                  <input name="surname" type="text" placeholder="გვარი" onChange={handleChange} />
                                  {errors.surname && <div>{errors.surname}</div>}
                              </div>
                          </div>
                          <label>ელ. ფოსტა</label>
                          <input name="email" type="text" placeholder="name@mail.com" onChange={handleChange} />
                          {errors.email && <div>{errors.email}</div>}
                          <label>ტელეფონი</label>
                          <input name="phone" type="text" placeholder="+995 000 000 000" onChange={handleChange} />
                          {errors.phone && <div>{errors.phone}</div>}
                          <label>შეტყობინება</label>
                          <textarea name="message" onChange={handleChange}></textarea>
                          {errors.message && <div>{errors.message}</div>}
                          <button
                              onClick={(event) => {

                                  handleSubmit(event)
                              }}
                              className="w-full h-14 bold bg-zinc-900 text-white rounded-full"
                          >
                              გაგზავნა
                          </button>{" "}
                          {/* </form> */}
                      </div>
                  </div>
                  <div className="grayscale xl:mx-20 lg:mx-6 lg:w-1/3 mb-10 ">
                      <iframe
                          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d49051.766794932744!2d44.831684206308985!3d41.710593702644985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sge!4v1670924575441!5m2!1sen!2sge"
                          width="100%"
                          height="100%"
                          style={{ border: "0" }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                  </div>
                  <div className=" lg:w-1/3 mb-10 flex flex-col justify-between items-start">
                      <div>
                          <div className="flex items-center justify-start text-xl bold mb-8">
                              <BiDownArrowAlt className="text-4xl mb-2 -rotate-45" />
                              <span>კონტაქტი</span>
                          </div>
                          <a href="#" className="mb-5 block w-fit bg-zinc-100 p-2 px-3">
                              <MdLocationOn className="inline-block text-lg mr-2" />
                              <span>{info.address}</span>
                          </a>
                          <a
                              href="#"
                              className="mb-5 block w-fit bg-zinc-100 p-2 px-3 uppercase"
                          >
                              <IoMdMail className="inline-block text-lg mr-2" />
                              <span>{info.email}</span>
                          </a>
                          <a href="#" className="mb-10 block w-fit bg-zinc-100 p-2 px-3">
                              <FaPhoneSquare className="inline-block text-lg mr-2" />
                              <span>{info.phone}</span>
                          </a>
                      </div>
                      <div className="w-auto h-full">
                          <img className="w-full h-full object-cover" src="/client/assets/images/tiles/17.png" alt="" />
                      </div>
                  </div>
              </div>
              <div
                  className={`fixed left-0 top-0 w-screen h-screen bg-zinc-900/[0.6] flex items-center justify-center transition-all duration-500 ${
                      showPopup
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-60"
                  }`}
              >
                  <div className="relative bg-white md:p-20 p-10 text-center">
                      <button
                          onClick={() => setShowPopup(false)}
                          className="absolute top-2 right-2 text-3xl"
                      >
                          <IoMdClose />
                      </button>
                      <FaCheckSquare className="text-4xl" />
                      <div className="bold text-2xl my-3 max-w-xs">
                          თქვენი შეტყობინება წარმატებით გაიგზავნა
                      </div>
                      <Link
                          className="py-4 px-6 border rounded-full border-black inline-block bold"
                          href={route('client.home.index')}
                      >
                          მთავარი გვერდი
                      </Link>
                  </div>
              </div>
          </>
      </Layout>

  );
};

export default Contact;
