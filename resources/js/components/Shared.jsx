import React from "react";
//import { Link } from "react-router-dom";
import { Link, usePage } from '@inertiajs/inertia-react'
import { BsArrowRightCircle } from "react-icons/bs";
import { BiDownArrowAlt } from "react-icons/bi";

export const ProjectBox = (props) => {
    const {categories_object,localizations} = usePage().props;
  return (
    <>
      {" "}
      <div className="wrapper h-px bg-zinc-200 mt-10"></div>
      <div className="bg-zinc-50 my-8 text-sm sm:text-base">
        <div
          className={`flex justify-between items-stretch flex-col xl:gap-14 lg:gap-5 wrapper ${
            props.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
          }`}
        >
          {props.img2 ? (
            <div className="flex lg:w-1/2 ">
              <img
                className="w-2/3 object-cover pr-3"
                src={props.img1}
                alt=""
              />
              <img className="w-1/3 object-cover" src={props.img2} alt="" />
            </div>
          ) : (
            <div className="lg:w-1/2 ">
              <img
                className="w-full h-full object-cover"
                src={props.img1}
                alt=""
              />
            </div>
          )}
          <div className="lg:w-1/2 xl:py-10 py-5 ">
            <div className="flex items-center justify-between text-xl bold">
              <span>{props.name}</span>
              <BiDownArrowAlt className="text-5xl rotate-45" />
            </div>
            <div className="text-sm opacity-50 mb-8">{__('client.project_details',localizations)}</div>
            <div className="flex justify-between items-center pb-2 mb-5 border-b">
              <div>{__('client.project_materials',localizations)}</div>
              <div>{props.material}</div>
            </div>
            <div className="flex justify-between items-center pb-2 mb-5 border-b">
              <div>{__('client.project_brand',localizations)}</div>
              <div>{props.producer}</div>
            </div>
            <div className="flex justify-between items-center pb-2 mb-5 border-b">
              <div>{__('client.project_customer',localizations)}</div>
              <div>{props.customer}</div>
            </div>
            <div className="text-sm opacity-50 mb-8 mt-10">
                {__('client.project_product_cats',localizations)}
            </div>
            <div className="flex justify-between items-center bold text-sm flex-wrap">
              <div>
                  {props.categories.map((item,index)=>{
                      return (
                          <button key={index} className="py-2 px-8 border-2 border-black bold rounded-full mr-3 mb-2">
                              {categories_object[item]?categories_object[item].title:null}
                          </button>
                      )
                  })}
                {/*<button className="py-2 px-8 border-2 border-black bold rounded-full mr-3 mb-2">
                  ჰიდროიზოლაცია
                </button>
                <button className="py-2 px-8 border-2 border-black bold rounded-full mb-2">
                  სინთეზური ქვა
                </button>*/}
              </div>
              <Link
                href={props.link}
                className="flex items-center whitespace-nowrap "
              >
                <span>{__('client.project_view',localizations)}</span>
                <BsArrowRightCircle className="text-2xl mb-1 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const ProductBox = (props) => {
  return (
    <Link className="text-right" href={props.link}>
      <div className="w-full h-80 mb-4">
        <img className="w-full h-full object-cover" src={props.img} alt="" />
      </div>
      <p className="my-1">{props.name}</p>
      <p>{props.size}</p>
    </Link>
  );
};
