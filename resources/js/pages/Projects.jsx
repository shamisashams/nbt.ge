import React from "react";
import ProjectTabs from "../components/ProjectTabs";
//import bg from "../assets/images/bg/1.png";
import Layout from "@/Layouts/Layout";

const Projects = ({seo}) => {
  return (
      <Layout seo={seo}>
          <div className="md:pt-52 pt-32">
              <img className="absolute top-0 left-0 w-full -z-10" src="/client/assets/images/bg/1.png" alt="" />
              <ProjectTabs />
              {/*<div className="flex justify-end text-xl text-black bold wrapper">
                  <button className="ml-3">1</button>
                  <button className="ml-3 opacity-50">2</button>
                  <button className="ml-3 opacity-50">3</button>
              </div>*/}
          </div>
      </Layout>

  );
};

export default Projects;
