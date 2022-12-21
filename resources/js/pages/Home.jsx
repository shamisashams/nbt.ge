import React, {useEffect, useState} from "react";
//import { Link } from "react-router-dom";
import { Link, usePage } from '@inertiajs/inertia-react'
import Hero from "../components/Hero";
import { BsArrowRightCircle } from "react-icons/bs";
//import Img1 from "../assets/images/home/2.png";
//import Img3 from "../assets/images/home/3.png";
import { products, projectSlider } from "../components/Data";
import ProjectTabs from "../components/ProjectTabs";
import ProjectSlider from "../components/ProjectSlider";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Layout from "@/Layouts/Layout";
import axios from "axios";

const Home = ({seo}) => {
  const [projectTab, setProjectTab] = useState(0);
  const [soundProof, setSoundProof] = useState(false);

    const [subCats, setSubCats] = useState([]);
    const [subCatTitle, setSubCatTitle] = useState('');

  const {categories,products,localizations,images} = usePage().props;

  console.log(products);

    const [sProducts, setSProducts] = useState([]);

    const [colorProducts, setColorProducts] = useState([]);
    const [colorLinks,setColorLinks] = useState([]);


    window.onload = function (e){
        axios.get(route('client.get-products',categories[0].id)).then(function (response){
            console.log(response.data);
            setSProducts(response.data);
        });

        axios.get(route('client.color-products')).then(function (response){
            console.log(response.data);
            setColorProducts(response.data.data);
            setColorLinks(response.data.links);
        });
    }

    useEffect(() => {


        axios.get(route('client.get-products',categories[0].id)).then(function (response){
            console.log(response.data);
            setSProducts(response.data);
        });

        axios.get(route('client.color-products')).then(function (response){
            console.log(response.data);
            setColorProducts(response.data.data);
            setColorLinks(response.data.links);
        });


    },[])


    function paginateColors(url){
        axios.get(url).then(function (response){
            console.log(response.data);
            setColorProducts(response.data.data);
            setColorLinks(response.data.links);
        });
    }


    function getProducts(categoryId){
        axios.get(route('client.get-products',categoryId)).then(function (response){
            console.log(response.data);
            setSProducts(response.data);
        });
    }

    const renderHTML = (rawHTML) =>
        React.createElement("div", {
            dangerouslySetInnerHTML: { __html: rawHTML },
        });

  return (
      <Layout seo={seo}>
          <>
              <Hero />
              <section className="wrapper pt-10 !mt-10 !mb-20 text-white border-t">
                  <Link
                      href={route('client.product.index')}
                      className="w-full text-center sm:pt-24 pt-12 sm:pb-12 pb-6 block bg-cover bg-center"
                      style={{ backgroundImage: `url("${images[0]}")` }}
                  >
                      <div className="sm:text-4xl text-2xl bold ">{__('client.color_catalog',localizations)}</div>
                      <div className="bold underline my-3">{__('client.all_colors',localizations)}</div>
                      <BsArrowRightCircle className="text-2xl" />
                  </Link>
                  <div className="grid my-5 sm:gap-5 gap-3 lg:grid-cols-4  grid-cols-2">
                      {colorProducts.map((item, index) => {
                          return (
                              <Link
                                  key={index}
                                  href={route('client.product.show',item.product.slug)}
                                  className="w-full h-44 relative overflow-hidden group"
                              >
                                  <img
                                      className="w-full h-full object-cover"
                                      src={item.product.latest_image?item.product.latest_image.full_url:null}
                                      alt=""
                                  />
                                  <div className="absolute left-0 bottom-0 w-full text-center pt-4 pb-2 bg-black/[0.7] sm:text-base text-sm translate-y-full group-hover:translate-y-0 transition-all duration-300">
                                      <div className="bold">{item.option.label}</div>
                                      <div className="text-xs">{item.option.color}</div>
                                  </div>
                              </Link>
                          );
                      })}
                  </div>
                  <div className="flex justify-end text-xl text-black bold">
                      {/*<button className="ml-3">1</button>
                      <button className="ml-3 opacity-50">2</button>
                      <button className="ml-3 opacity-50">3</button>*/}
                      {colorLinks.map(function (item, index) {
                          if (index > 0 && index < colorLinks.length - 1) {
                              return (
                                  <button
                                      onClick={() => {
                                          paginateColors(item.url)
                                      }}
                                      className={
                                          item.active
                                              ? "ml-3"
                                              : "ml-3 opacity-50"
                                      }
                                  >
                                      {item.label}
                                  </button>
                              );
                          }
                      })}
                  </div>
              </section>
              <section>
                  <ProjectTabs />
                  {/*<div className="flex justify-end text-xl text-black bold wrapper">
                      <button className="ml-3">1</button>
                      <button className="ml-3 opacity-50">2</button>
                      <button className="ml-3 opacity-50">3</button>
                  </div>*/}
              </section>
              <section className=" py-10">
                  <div className="wrapper flex items-center justify-between pb-10 flex-wrap">
                      <div className="xl:text-7xl lg:text-5xl text-4xl bold ">
                          {__('client.products',localizations)}
                      </div>
                      <p className="max-w-xl my-3">
                          {__('client.products_text',localizations)}
                      </p>
                      <Link
                          href={route('client.product.index')}
                          className="bg-zinc-900 text-white rounded-full py-3 px-8 text-sm"
                      >
                          {__('client.all_products',localizations)} <BsArrowRightCircle className="text-2xl ml-2" />
                      </Link>
                  </div>

                  <div className="wrapper relative flex lg:justify-between justify-start xl:gap-6 sm:gap-3 gap-1 pb-10  flex-wrap lg:flex-nowrap">
                      {categories.map((item) => {
                          return (
                              item.children.length > 0 ?
                                  <button
                                      onClick={() => {
                                          setSoundProof(true);
                                          setSubCats(item.children);
                                          setSubCatTitle(item.title)
                                      }}
                                      className="lg:h-32 p-2 lg:w-1/5 bg-zinc-100 bold text-sm sm:text-base xl:text-lg"
                                  >
                                      {item.title}{" "}
                                      <BiLeftArrowAlt className="mb-1 text-3xl inline-block" />
                                  </button>
                              :
                                  <button
                                      onClick={() => {
                                          setProjectTab(item.index)
                                          getProducts(item.id)
                                      }}
                                      key={item.index}
                                      className={`lg:h-32 p-2 lg:w-1/5 bold text-sm sm:text-base xl:text-lg ${
                                          projectTab === item.index
                                              ? "bg-zinc-900 text-white"
                                              : "bg-zinc-100 "
                                      }`}
                                  >
                                      {item.title}
                                  </button>
                          );
                      })}
                      {/*<button
                          onClick={() => setSoundProof(true)}
                          className="lg:h-32 p-2 lg:w-1/5 bg-zinc-100 bold text-sm sm:text-base xl:text-lg"
                      >
                          ხმის იზოლაცია{" "}
                          <BiLeftArrowAlt className="mb-1 text-3xl inline-block" />
                      </button>{" "}*/}
                      <div
                          className={`absolute lg:bg-transparent bg-white w-full left-0 top-0 opacity-50 flex lg:justify-between justify-start flex-wrap lg:flex-nowrap xl:gap-6 sm:gap-3 gap-1 mb-10 transition-all duration-500 ${
                              soundProof
                                  ? "visible opacity-100 translate-x-0"
                                  : "invisible opacity-0 -translate-x-40"
                          }`}
                      >
                          {subCats.map((item) => {
                              return (
                                  <button
                                      onClick={() => {
                                          setProjectTab(item.index)
                                          getProducts(item.id)
                                      }}
                                      key={item.index}
                                      className={`lg:h-32 p-2 lg:w-1/5 bold text-sm sm:text-base xl:text-lg ${
                                          projectTab === item.index
                                              ? "bg-zinc-900 text-white"
                                              : "bg-zinc-100 "
                                      }`}
                                  >
                                      {item.title}
                                  </button>
                              );
                          })}
                          <button
                              onClick={() => setSoundProof(false)}
                              className="lg:h-32 p-2 lg:w-1/5 bg-zinc-900 text-white bold text-sm sm:text-base xl:text-lg"
                          >
                              {subCatTitle}{" "}
                              <BiRightArrowAlt className="mb-1 text-3xl inline-block" />
                          </button>
                      </div>
                  </div>

                  <div className="wrapper">
                      <ProjectSlider data={sProducts} />
                  </div>
              </section>
              <section className="relative overflow-hidden">
                  {" "}
                  <img
                      className="absolute lg:w-1/2 w-full lg:h-full h-36 object-cover bottom-0 right-0 -z-10 opacity-70"
                      src={images[1]}
                      alt=""
                  />
                  <div className="wrapper lg:py-12 py-6 lg:pt-20 flex items-center justify-between flex-col lg:flex-row">
                      <div className="lg:text-2xl text-lg lg:max-w-2xl lg:w-1/2 lg:mb-0 mb-14">
                          {__('client.home_about_text',localizations)}
                          <Link
                              href={route('client.about.index')}
                              className="bg-zinc-900 text-white rounded-full py-3 px-8 text-sm block w-fit lg:mt-5 mt-2"
                          >
                              {__('client.learn_more_about',localizations)} <BsArrowRightCircle className="text-2xl ml-2" />
                          </Link>
                      </div>
                      <div className="lg:w-1/2  flex justify-center items-end whitespace-wrap">
                          <div className="text-sm bold ">
                              {renderHTML(__('client.experience_years',localizations).newLineToBr())}
                              <br />
                              <span className="md:text-5xl text-3xl">{__('client.experience_years_value',localizations)}</span>
                          </div>
                          <div className="text-sm bold md:mx-16 mx-5">
                              {renderHTML(__('client.naming_product',localizations).newLineToBr())}
                              <br />
                              <span className="md:text-5xl text-3xl">{__('client.naming_product_value',localizations)}</span>
                          </div>
                          <div className="text-sm bold ">
                              {renderHTML(__('client.successful_projects',localizations).newLineToBr())}
                              <br />
                              <span className="md:text-5xl text-3xl">{__('client.successful_projects_value',localizations)}</span>
                          </div>
                      </div>
                  </div>
              </section>
          </>
      </Layout>

  );
};

export default Home;
