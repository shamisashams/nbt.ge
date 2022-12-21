import React, { useState } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { BiDownArrowAlt } from "react-icons/bi";
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";
import { brands, products } from "../components/Data";
//import { Link } from "react-router-dom";
import { ProductBox } from "../components/Shared";
import Layout from "@/Layouts/Layout";
import { Link, usePage } from '@inertiajs/inertia-react'
import { Inertia } from "@inertiajs/inertia";

const Products = ({seo}) => {
    const {brands,category,product_category, categories,product_quantity, localizations, products} = usePage().props;

    console.log(categories,product_category);

  const [activeBrand, setActiveBrand] = useState(0);
  const [activeMaterial, setActiveMaterial] = useState(category?category.id:0);
  const [filter, setFilter] = useState(false);
  const materials = [
    {
      name: "ყველა პროდუქტი",
      quantity: "2541",
    },
    {
      name: "ხელოვნური ქვა",
      quantity: "756",
    },
    {
      name: "სინთეზური ქვა",
      quantity: "89",
    },
    {
      name: "მყარი ზედაპირები",
      quantity: "23",
    },
    {
      name: "გეოსინთეზური მასალები",
      quantity: "90",
    },
    {
      name: "ჰიდროიზოლაცია",
      quantity: "145",
    },
  ];


    let links = function (links) {
        let rows = [];
        //links.shift();
        //links.splice(-1);
        {
            links.map(function (item, index) {
                if (index > 0 && index < links.length - 1) {
                    rows.push(
                        <Link
                            href={item.url}
                            className={
                                item.active
                                    ? "ml-3"
                                    : "ml-3 opacity-50"
                            }
                        >
                            {item.label}
                        </Link>
                    );
                }
            });
        }
        return rows.length > 1 ? rows : null;
    };

    let linksPrev = function (links) {
        let rowCount = 0;
        links.map(function (item, index) {
            if (index > 0 && index < links.length - 1) {
                rowCount++;
            }
        });
        return rowCount > 1 ? (
            <Link href={links[0].url}>
                <Arrow color="#2F3E51" rotate="90" />
                <Arrow color="#2F3E51" rotate="90" />
            </Link>
        ) : null;
    };
    let linksNext = function (links) {
        let rowCount = 0;
        links.map(function (item, index) {
            if (index > 0 && index < links.length - 1) {
                rowCount++;
            }
        });
        return rowCount > 1 ? (
            <Link href={links[links.length - 1].url}>
                <Arrow color="#2F3E51" rotate="-90" />
                <Arrow color="#2F3E51" rotate="-90" />
            </Link>
        ) : null;
    };

    function removeA(arr) {
        var what,
            a = arguments,
            L = a.length,
            ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax = arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
    }


    let appliedFilters = [];
    let urlParams = new URLSearchParams(window.location.search);

    urlParams.forEach((value, index) => {
        appliedFilters[index] = value.split(",");
    });


    const handleFilterClick = function (event, code, value) {
        //Inertia.visit('?brand=12');
        console.log(event.target.parentElement.classList.contains("grayscale-0"));
        if (!event.target.parentElement.classList.contains("grayscale-0")) {
            if (appliedFilters.hasOwnProperty(code)) {
                appliedFilters[code].push(value.toString());
            } else appliedFilters[code] = [value.toString()];
        } else {
            if (appliedFilters[code].length > 1){
                console.log('exxx')
                removeA(appliedFilters[code], value.toString());
            }

            else delete appliedFilters[code];
        }

        let params = [];

        for (let key in appliedFilters) {
            params.push(key + "=" + appliedFilters[key].join(","));
        }

        Inertia.visit("?" + params.join("&"));
    };



    return (
      <Layout seo={seo}>
          <div className="wrapper md:pt-52 pt-32 pb-20">
              <div className="lg:flex hidden items-start justify-start ">
                  <div className="bold">
                      {__('client.filter_by_brands',localizations)}
                      <BsArrowRightCircle className="text-2xl mb-1 ml-2" />
                  </div>
                  <div className="flex justify-start flex-wrap ml-10">
                      {brands.map((brand, index) => {

                          let checked;

                          if (appliedFilters.hasOwnProperty('brand')) {
                              if (
                                  appliedFilters['brand'].includes(
                                      brand.id.toString()
                                  )
                              ) {
                                  checked = true;
                              } else checked = false;
                          } else checked = false;


                          return (
                              <button
                                  onClick={(event) => {
                                      /*activeBrand !== index + 1 ? setActiveBrand(index + 1) :setActiveBrand(0)*/
                                      handleFilterClick(event,'brand',brand.id)
                                  }}
                                  key={index}
                                  className={`bold grayscale hover:grayscale-0 transition-all duration-300 ml-20 mb-4 ${
                                      checked ? "grayscale-0" : ""
                                  }`}
                              >
                                  <img className="mb-3" src={brand.image_url} alt="" />
                                  <p>{brand.label}</p>
                              </button>
                          );
                      })}
                  </div>
              </div>
              <div className="flex items-start justify-start lg:mt-12 flex-col lg:flex-row relative">
                  <button
                      onClick={() => setFilter(true)}
                      className="text-xl bold mb-5 block lg:hidden"
                  >
                      <HiOutlineAdjustmentsVertical className="text-4xl" />
                      {__('client.filter',localizations)}
                  </button>
                  <div className="shrink-0 mr-10 lg:inline-block hidden">
                      <Link
                          key={0}
                          className={`relative lg:block lg:w-full group hover:bg-zinc-100 mb-2 py-3 px-5 lg:-ml-5 text-left  transition-all ${
                              activeMaterial === 0 && "bg-zinc-100"
                          }`}
                          href={route('client.product.index')}
                      >
                          <div
                              className={`lg:block hidden absolute top-0 right-full w-full h-full bg-zinc-100 opacity-0 group-hover:opacity-100 transition-all text-right ${
                                  activeMaterial === 0 && "!opacity-100"
                              }`}
                          >
                              <BiDownArrowAlt
                                  className={"text-3xl -rotate-45 mt-1 -mr-5"}
                              />
                          </div>
                          {__('client.all_products',localizations)} ({product_quantity})
                      </Link>
                      {categories.map((item, index) => {
                          index++;
                          return (
                              <Link
                                  key={index}
                                  className={`relative lg:block lg:w-full group hover:bg-zinc-100 mb-2 py-3 px-5 lg:-ml-5 text-left  transition-all ${
                                      activeMaterial === item.id && "bg-zinc-100"
                                  }`}
                                  href={route('client.category.show',item.slug)}
                              >
                                  <div
                                      className={`lg:block hidden absolute top-0 right-full w-full h-full bg-zinc-100 opacity-0 group-hover:opacity-100 transition-all text-right ${
                                          activeMaterial === item.id && "!opacity-100"
                                      }`}
                                  >
                                      <BiDownArrowAlt
                                          className={"text-3xl -rotate-45 mt-1 -mr-5"}
                                      />
                                  </div>
                                  {item.title} ({product_category[item.id]})
                              </Link>
                          );
                      })}
                  </div>
                  <div className="grid 2xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 lg:gap-10 gap-5">
                      {products.data.map((item, index) => {
                          return (
                              <ProductBox
                                  key={index}
                                  link={route('client.product.show',item.slug)}
                                  img={item.latest_image?item.latest_image.thumb_full_url:null}
                                  name={item.attributes.color}
                                  size={item.attributes.size}
                              />
                          );
                      })}
                  </div>
                  <div
                      className={`lg:hidden absolute top-0 left-0 bg-white w-full sm:p-10 p-3  transition-all duration-500 ${
                          filter ? "translate-x-0" : "-translate-x-full"
                      }`}
                  >
                      <div className="text-center">
                          {brands.map((brand, index) => {
                              return (
                                  <button
                                      onClick={() => setActiveBrand(index + 1)}
                                      key={index}
                                      className={`bold grayscale hover:grayscale-0 transition-all duration-300 mx-4 mb-4 ${
                                          activeBrand === index + 1 ? "grayscale-0" : ""
                                      }`}
                                  >
                                      <img className="mb-3" src={brand.logo} alt="" />
                                      <p>{brand.name}</p>
                                  </button>
                              );
                          })}
                      </div>
                      <div className="mt-6">
                          <Link
                              href={route('client.product.index')}
                              key={0}
                              className={`relative block w-full group hover:bg-zinc-100 mb-2 py-3 px-5 text-left transition-all ${
                                  activeMaterial === 0 && "bg-zinc-100"
                              }`}
                          >
                              <div
                                  className={`block  absolute top-0 right-full w-full h-full bg-zinc-100 opacity-0 group-hover:opacity-100 transition-all text-right ${
                                      activeMaterial === 0 && "!opacity-100"
                                  }`}
                              >
                                  <BiDownArrowAlt
                                      className={"text-3xl -rotate-45 mt-1 -mr-5"}
                                  />
                              </div>
                              {__('client.all_products',localizations)} ({product_quantity})
                          </Link>
                          {categories.map((item, index) => {
                              index++;
                              return (
                                  <Link
                                      href={route('client.category.show',item.slug)}
                                      key={index}
                                      className={`relative block w-full group hover:bg-zinc-100 mb-2 py-3 px-5 text-left transition-all ${
                                          activeMaterial === item.id && "bg-zinc-100"
                                      }`}
                                  >
                                      <div
                                          className={`block  absolute top-0 right-full w-full h-full bg-zinc-100 opacity-0 group-hover:opacity-100 transition-all text-right ${
                                              activeMaterial === item.id && "!opacity-100"
                                          }`}
                                      >
                                          <BiDownArrowAlt
                                              className={"text-3xl -rotate-45 mt-1 -mr-5"}
                                          />
                                      </div>
                                      {item.title} ({product_category[item.id]})
                                  </Link>
                              );
                          })}
                      </div>
                      <button
                          onClick={() => setFilter(false)}
                          className="text-red-500 block mx-auto mr-0 bold my-5"
                      >
                          {" "}
                          {__('client.close',localizations)}
                      </button>
                  </div>
              </div>{" "}
              <div className="flex justify-end text-xl text-black bold mt-10">
                  {/*<button className="ml-3">1</button>
                  <button className="ml-3 opacity-50">2</button>
                  <button className="ml-3 opacity-50">3</button>*/}
                  {links(products.links)}
              </div>
          </div>
      </Layout>

  );
};

export default Products;
