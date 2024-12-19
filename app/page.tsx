import { ArrowRight, Dog, Swords, PartyPopper, ArrowBigDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
                <span className="block text-primary">Simplified Combat</span>
                <span className="dark:text-primary-foreground">With Homebrew Monsters</span>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl flex items-center">
                  Import any monster you want. Try it below <ArrowBigDown />
                </p>
              </h1>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <Link href="/my-encounters" prefetch={false}>
                  <Button className="bg-white hover:bg-gray-100 text-black border border-gray-200 rounded-full text-lg px-8 py-4 inline-flex items-center justify-center">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Features: */}
      {/* Hot Keys */}
      {/* Automated Saving Throws */}
      {/* Monster Waves */}
      <section className="py-16 bg-white dark:bg-background w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`
                ${index !== 0 ? "mt-10 lg:mt-0" : ""} 
                bg-white dark:bg-zinc-900 
                p-6 
                rounded-lg 
                shadow-sm 
                dark:shadow-none 
                border 
                border-gray-100 
                dark:border-zinc-800
                transition-colors 
                duration-300
              `}
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary dark:bg-primary/80 text-white">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div className="mt-5">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-primary-foreground">
                    {feature.title}
                  </h2>
                  <p className="mt-2 text-base text-gray-500 dark:text-zinc-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Ready to launch your SaaS?
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                Our template provides everything you need to get your SaaS up and running quickly.
                Don't waste time on boilerplate - focus on what makes your product unique.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 flex justify-center lg:justify-end">
              <a href="https://github.com/leerob/next-saas-starter" target="_blank">
                <Button className="bg-white hover:bg-gray-100 text-black border border-gray-200 rounded-full text-xl px-12 py-6 inline-flex items-center justify-center">
                  View the code
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section> */}
    </main>
  );
}

const features = [
  {
    icon: Swords,
    title: "Dead Simple Combat Management",
    description: "Add Monsters. Add Players (optional). Get Going.",
  },
  {
    icon: Dog,
    title: "Import Your Own Monsters",
    description: "Homebrew Welcome!",
  },
  {
    icon: PartyPopper,
    title: "Have Fun",
    description: "Yay!",
  },
];
