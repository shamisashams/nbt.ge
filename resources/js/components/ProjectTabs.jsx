import React, { useState,useEffect } from "react";
//import { projects } from "./Data";
import { ProjectBox } from "./Shared";
//import Project1 from "../assets/images/hero/1.png";
//import Project2 from "../assets/images/hero/2.png";
//import Project3 from "../assets/images/hero/3.png";
//import Project4 from "../assets/images/hero/4.png";
//import Project5 from "../assets/images/hero/5.png";
import { Link, usePage } from '@inertiajs/inertia-react'
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";

const ProjectTabs = () => {

    const {pathname,localizations} = usePage().props;

  const [tabIndex, setTabIndex] = useState(0);
  const [allProjects,setAllProjects] = useState([]);
  const [projectsLinks,setProjectsLinks] = useState([]);
    const [type,setType] = useState('all');





    window.onload = function (e){
        axios.get(route('client.get-all-projects')).then(function (response){
            console.log(response.data);
            setAllProjects(response.data.data);
            setProjectsLinks(response.data.links)
        });
    }


    useEffect(() => {


                axios.get(route('client.get-all-projects',type)).then(function (response){
                    console.log(response.data);
                    setAllProjects(response.data.data);
                    setProjectsLinks(response.data.links)
                });


    },[])
    function paginate(type,url){
        axios.get(url ).then(function (response){
            console.log(response.data);
            setAllProjects(response.data.data);
            setProjectsLinks(response.data.links)
        });
    }

    function getProjects(type){
        axios.get(route('client.get-all-projects',type)).then(function (response){
            console.log(response.data);
            setAllProjects(response.data.data);
            setProjectsLinks(response.data.links)
        });
    }

  const tabs = [
    {
      tab: __('client.all_projects',localizations),
      projects: [
        {
          img1: "/client/assets/images/hero/1.png",
          img2: "/client/assets/images/hero/5.png",
          name: "დასახელება",
          material: "სინთეზური ქვა",
          producer: "NEOLITH, Corian",
          customer: "Dune Prima [E]",
          link: "/single-project",
        },
        {
          img1: "/client/assets/images/hero/2.png",
          name: "დასახელება",
          material: "სინთეზური ქვა",
          producer: "NEOLITH, Corian",
          customer: "Dune Prima [E]",
          link: "/single-project",
        },
        {
          img1: "/client/assets/images/hero/3.png",
          name: "დასახელება",
          material: "სინთეზური ქვა",
          producer: "NEOLITH, Corian",
          customer: "Dune Prima [E]",
          link: "/single-project",
        },
        {
          img1: "/client/assets/images/hero/4.png",
          name: "დასახელება",
          material: "სინთეზური ქვა",
          producer: "NEOLITH, Corian",
          customer: "Dune Prima [E]",
          link: "/single-project",
        },
      ],
    },
    {
      tab: __('client.commercial',localizations),
      projects: [
        {
          img1: "/client/assets/images/hero/3.png",
          name: "დასახელება",
          material: "სინთეზური ქვა",
          producer: "NEOLITH, Corian",
          customer: "Dune Prima [E]",
          link: "/single-project",
        },
      ],
    },
    {
      tab: __('client.individual',localizations),
      projects: [
        {
          img1: "/client/assets/images/hero/2.png",
          name: "დასახელება",
          material: "სინთეზური ქვა",
          producer: "NEOLITH, Corian",
          customer: "Dune Prima [E]",
          link: "/single-project",
        },
        {
          img1: "/client/assets/images/hero/3.png",
          img2: "/client/assets/images/hero/4.png",
          name: "დასახელება",
          material: "სინთეზური ქვა",
          producer: "NEOLITH, Corian",
          customer: "Dune Prima [E]",
          link: "/single-project",
        },
      ],
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
                        <button
                            onClick={() => {
                                paginate('type',item.url)
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
            });
        }
        return rows.length > 1 ? rows : null;
    };

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

  return (
    <div className="projectTabs">
      <div className="flex md:items-end items-start justify-between wrapper pb-10 flex-col md:flex-row">
        <div className="xl:text-7xl lg:text-5xl text-4xl bold ">{__('client.projects',localizations)}</div>
        <div className="bold">
          {tabs.map((item, index) => {
            return (
              <button
                onClick={() => {
                    setTabIndex(index)
                    switch (index){
                        case 0:
                            getProjects('all');
                            break;
                        case 1:
                            getProjects('commercial');
                            break;
                        case 2:
                            getProjects('individual');
                            break;
                    }
                }}
                key={index}
                className={`lg:ml-10 md:ml-4 md:mr-0 mr-3 my-2 lg:text-lg ${
                  tabIndex === index ? "underline" : "opacity-50"
                }`}
              >
                {item.tab}
              </button>
            );
          })}
        </div>
      </div>
      {tabs.map((item, index) => {
        let slide = "slide";
        if (tabIndex === index) {
          slide = "activeSlide";
        } else if (index + 1 === tabIndex) {
          slide = "prevSlide";
        } else if (index - 1 === tabIndex) {
          slide = "nextSlide";
        }
        return (
          <div
            key={index}
            className={`${
              tabIndex === index ? "block " : "hidden"
            } ${slide}  transition-all duration-500`}
          >
            {allProjects.map((item, index) => {
              let reverse = false;
              if (index % 2 !== 0) {
                reverse = true;
              }

              let material = [];
              let brand = [];
              let category = [];




              item.products.map((item,i)=>{
                  material.push(item.attributes.material);
                  brand.push(item.attributes.brand);
                  category.push(item.category);
              })

                material = material.filter(onlyUnique);
                brand = brand.filter(onlyUnique);
                category = category.filter(onlyUnique);

                console.log(category);

              return (
                <ProjectBox
                  reverse={reverse}
                  key={index}
                  img1={item.latest_image?item.latest_image.thumb_full_url:null}
                  img2={item.img2}
                  name={item.title}
                  material={material.join(', ')}
                  producer={brand.join(', ')}
                  customer={item.customer_title}
                  link={route('client.project.show',item.slug)}
                  categories={category}
                />
              );
            })}
          </div>
        );
      })}
        <div className="flex justify-end text-xl text-black bold wrapper">
            {/*<button className="ml-3">1</button>
            <button className="ml-3 opacity-50">2</button>
            <button className="ml-3 opacity-50">3</button>*/}
            {projectsLinks.map(function (item, index) {
                if (index > 0 && index < projectsLinks.length - 1) {
                    return (
                        <button
                            onClick={() => {
                                paginate(type,item.url)
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
    </div>
  );
};

export default ProjectTabs;
