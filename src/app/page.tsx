import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faComments,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import GoogleAuthButton from "@/components/auth/GoogleAuthButton";
import Image from "next/image";
export default function Home() {
  return (
    <>
      <header
        id="header"
        className="fixed w-full bg-white shadow-sm z-50"
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-xl font-bold text-primary">
                ScreenEasy
              </span>
            </div>
            <div className="flex items-center space-x-8">
            
                <GoogleAuthButton placeHolder="Get Started"/>
            
            </div>
       
          </div>
        </nav>
      </header>
      <section
        id="hero"
        className="pt-24 pb-16 bg-gradient-to-b from-white to-blue-50"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Land
                Your
                Dream
                Job
                with
                AI-Driven
                Tools
              </h1>
              <p className="mt-6 text-xl text-gray-600">
                Create
                perfect
                resumes,
                ace
                interviews,
                and
                develop
                essential
                skills
                with
                our
                AI-powered
                career
                platform.
              </p>
            </div>
            <div className="lg:w-1/2">
              <Image
                width={500}
                height={500}
                className="w-full h-auto"
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/e9f4ab2317-cd76dd040e4bc64fc8d8.png"
                alt="modern minimalist illustration of AI robot helping with career development, resume writing, and job interviews, clean vector style, blue and orange color scheme"
              />
            </div>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Supercharge
              Your
              Job
              Search
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              All-in-one
              platform
              for
              your
              career
              success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              id="feature-1"
              className="p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <FontAwesomeIcon
                  icon={
                    faFileLines
                  }
                  className="w-5 h-7  text-primary text-2xl  italic"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                AI
                Resume
                Builder
              </h3>
              <p className="mt-4 text-gray-600">
                Generate
                tailored
                resumes
                that
                match
                job
                descriptions
                using
                advanced
                AI
                technology.
              </p>
            </div>

            <div
              id="feature-2"
              className="p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition"
            >
              <div className="w-14 h-14 bg-[#FFA726]/10 rounded-full flex items-center justify-center mb-6">
                <FontAwesomeIcon
                  icon={
                    faComments
                  }
                  className="w-5 h-7  text-[#FFA726] text-2xl  italic"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                AI
                Mock
                Interviews
              </h3>
              <p className="mt-4 text-gray-600">
                Practice
                with
                our
                AI
                interviewer
                and
                get
                instant
                feedback
                to
                improve
                your
                skills.
              </p>
            </div>

            <div
              id="feature-3"
              className="p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <FontAwesomeIcon
                  icon={
                    faStar
                  }
                  className="w-5 h-7  text-primary text-2xl  italic"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                STAR
                Method
                Prep
              </h3>
              <p className="mt-4 text-gray-600">
                Master
                behavioral
                interviews
                with
                our
                structured
                STAR
                method
                training
                system.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        id="cta"
        className="py-20 bg-primary"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready
            to
            Transform
            Your
            Career?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join
            thousands
            of
            successful
            professionals
            who
            found
            their
            dream
            jobs
            using
            ScreenEasy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <span className="px-8 py-4  text-primary  text-lg font-semibold  transition cursor-pointer">
             <GoogleAuthButton />
            </span>

         
          </div>
        </div>
      </section>
   
    </>
  );
}
