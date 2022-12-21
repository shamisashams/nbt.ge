import React from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
//import { Link } from "react-router-dom";
import { Link, usePage } from '@inertiajs/inertia-react'
//import Project1 from "../assets/images/hero/1.png";
//import Project2 from "../assets/images/hero/2.png";
//import Project3 from "../assets/images/hero/3.png";
//import Project4 from "../assets/images/hero/4.png";
//import Tile10 from "../assets/images/tiles/10.png";
//import Tile11 from "../assets/images/tiles/11.png";
//import Tile12 from "../assets/images/tiles/12.png";
//import Tile13 from "../assets/images/tiles/13.png";
//import Tile14 from "../assets/images/tiles/14.png";
import Layout from "@/Layouts/Layout";

const SingleProject = ({seo}) => {

    const {project,products,categories_object, localizations} = usePage().props;
    console.log(products)

  const data1 = [
    {
      img: "/client/assets/images/tiles/10.png",
      name: "დასახელება",
      producer: "NEOLITH",
    },
    {
      img: "/client/assets/images/tiles/11.png",
      name: "დასახელება",
      producer: "Corian",
    },
    {
      img: "/client/assets/images/tiles/12.png",
      name: "დასახელება",
      producer: "NEOLITH",
    },
  ];
  const data2 = [
    {
      img: "/client/assets/images/tiles/13.png",
      name: "დასახელება",
      producer: "NEOLITH",
    },
    {
      img: "/client/assets/images/tiles/14.png",
      name: "დასახელება",
      producer: "Corian",
    },
  ];


    const renderHTML = (rawHTML) =>
        React.createElement("p", {
            dangerouslySetInnerHTML: { __html: rawHTML },
        });

  return (
      <Layout seo={seo}>
          <div className="wrapper md:pt-52 pt-32 pb-20 flex justify-between items-start flex-col lg:flex-row">
              <div className="lg:w-1/2 lg:mr-10">
                  <Link className="bold inline-block" href={route('client.project.index')}>
                      <BsArrowLeftCircle className="text-2xl mb-1 mr-2" />
                      {__('client.nav_projects',localizations)}
                  </Link>
                  <div className="md:text-4xl text-2xl bold mt-3 mb-10">
                      {project.title}
                  </div>
                  {/*<p>
                      გერმანული კომპანია რომელიც 1861 წელს დაარსდა და ჩაერთო ტექსილის
                      წარმოებაში., ხოლო 1958 წლიდან ის ქმნის ზემძლავრ გეოკომპოზიტურ
                      მასალებს, როლებიც უზრუნველყოფენ მიწის ვაკის არმირებას (მზიდუნარიანობის
                      გაზრდას) გეოკომპოზიტური მასალები ასევე ახდენენ გზის შემადგენელი
                      ფენების სეპარაციას, უზრუნველყოფენ დრენაჟისა და ფილტრაციის ბუნებრივი
                      სისტემების გამართულ მუშაობას. HUESKER-ი აწარმოებს გეოსინთეზური
                      მასალების სრულ სპექტრს. აღსანიშნავია, რომ კომპანიის ქარხნები
                      მდებარეობს მხოლოდ გერმანიასა და ამერიკაში.
                  </p>*/}
                  {renderHTML(project.description)}
                  <div className="opacity-50 text-sm mt-10 mb-4">
                      {__('client.used_materials',localizations)}
                  </div>
                  {Object.keys(products).map((key,index)=>{
                      return (<>
                          <div className="text-lg bold mb-5">{categories_object[key].title}</div>
                          <div className="flex justify-start items-start flex-wrap sm:gap-6 gap-3 mb-10">
                              {products[key].map((item, index) => {
                                  return (
                                      <Link key={index} href={route('client.product.show',item.slug)} className="w-40">
                                          <div className="h-52 w-full mb-3">
                                              <img
                                                  className="w-full h-full object-cover"
                                                  src={item.latest_image?item.latest_image.thumb_full_url:null}
                                                  alt=""
                                              />
                                          </div>
                                          <div>{item.title}</div>
                                          <div className="flex justify-between mt-2 text-xs">
                                              <div className="">{__('client.brand',localizations)}</div>
                                              <div className="uppercase bold">{item.attributes.brand}</div>
                                          </div>
                                      </Link>
                                  );
                              })}
                          </div>
                      </>)
                  })}
                  {/*<div className="text-lg bold mb-5">სინთეზური ქვა</div>*/}
                  {/*<div className="flex justify-start items-start flex-wrap sm:gap-6 gap-3 mb-10">
                      {project.products.map((item, index) => {
                          return (
                              <Link key={index} href={route('client.product.show',item.slug)} className="w-40">
                                  <div className="h-52 w-full mb-3">
                                      <img
                                          className="w-full h-full object-cover"
                                          src={item.latest_image?item.latest_image.thumb_full_url:null}
                                          alt=""
                                      />
                                  </div>
                                  <div>{item.title}</div>
                                  <div className="flex justify-between mt-2 text-xs">
                                      <div className="">მწარმოებელი:</div>
                                      <div className="uppercase bold">{item.attributes.brand}</div>
                                  </div>
                              </Link>
                          );
                      })}
                  </div>*/}
                  {/*<div className="text-lg bold mb-5">ჰიდროზიოლაცია</div>
                  <div className="flex justify-start items-start flex-wrap sm:gap-6 gap-3 mb-10">
                      {data2.map((item, index) => {
                          return (
                              <Link key={index} href="/single-product" className="w-40">
                                  <div className="h-52 w-full mb-3">
                                      <img
                                          className="w-full h-full object-cover"
                                          src={item.img}
                                          alt=""
                                      />
                                  </div>
                                  <div>{item.name}</div>
                                  <div className="flex justify-between mt-2 text-xs">
                                      <div className="">მწარმოებელი:</div>
                                      <div className="uppercase bold">{item.producer}</div>
                                  </div>
                              </Link>
                          );
                      })}
                  </div>*/}
              </div>
              <div className="lg:w-1/2 text-right text-sm">
                  {project.files.map((item,index)=>{
                      let n = index < 9 ? '0' + (index+1): index+1
                      return (<>
                          <span>{n}</span>
                          <div className="w-full xl:h-[32rem] mt-3 sm:mb-10 mb-5">
                              <img className="w-full h-full object-cover " src={item.thumb_full_url} alt="" />
                          </div>
                      </>)
                  })}
                  {/*<span>01</span>
                  <div className="w-full xl:h-[32rem] mt-3 sm:mb-10 mb-5">
                      <img className="w-full h-full object-cover " src="/client/assets/images/hero/1.png" alt="" />
                  </div>
                  <span>02</span>
                  <div className="w-full xl:h-[32rem] mt-3 sm:mb-10 mb-5">
                      <img className="w-full h-full object-cover " src="/client/assets/images/hero/2.png" alt="" />
                  </div>
                  <span>03</span>
                  <div className="w-full xl:h-[32rem] mt-3 sm:mb-10 mb-5">
                      <img className="w-full h-full object-cover " src="/client/assets/images/hero/3.png" alt="" />
                  </div>
                  <span>04</span>
                  <div className="w-full xl:h-[32rem] mt-3 sm:mb-10 mb-5">
                      <img className="w-full h-full object-cover " src="/client/assets/images/hero/4.png" alt="" />
                  </div>*/}
              </div>
          </div>
      </Layout>

  );
};

export default SingleProject;
