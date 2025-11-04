// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { fadeIn } from "@/features/home/animations/variants"; // Assuming @ alias is set to root

// // TODO: Define a proper props interface
// interface HeroProps {}

// export default function Hero() {
//   return (
//     <section className="relative w-full bg-primary overflow-hidden">
//       <div className="container mx-auto max-w-7xl">
//         <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
//           {/* Image Column */}
//           <motion.div
//             className="w-full lg:w-1/2 mt-12 lg:mt-0 order-1 lg:order-0"
//             variants={fadeIn("right", 0.2)}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true, amount: 0.3 }}
//           >
//             <Image
//               src="/images/hero.svg"
//               alt="Woman smiling and pointing"
//               width={950}
//               height={830}
//               className="w-full h-auto rounded-br-[50px] object-cover"
//               priority
//             />
//           </motion.div>

//           {/* Text Content Column */}
//           <motion.div
//             className="w-full lg:w-1/2 py-12 lg:py-24 px-6 order-2 lg:order-0"
//             variants={fadeIn("left", 0.4)}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true, amount: 0.3 }}
//           >
//             <div className="max-w-xl mx-auto lg:mx-0">
//               <div className="inline-block border-b-2 border-primary-foreground/30 pb-2">
//                 <h3 className="text-xl lg:text-3xl font-semibold text-primary-foreground">
//                   Transform Your ❤️ Health with
//                 </h3>
//               </div>
//               <h1 className="mt-4 text-4xl lg:text-6xl font-bold text-foreground tracking-tight">
//                 Personalized Nutrition Coaching
//               </h1>
//               <p className="mt-6 text-base lg:text-lg text-muted-foreground leading-relaxed">
//                 Welcome to Nutritionist, your partner in achieving optimal
//                 health through personalized nutrition coaching. Our certified
//                 nutritionists are here to guide you on your weight loss journey,
//                 providing customized plans and ongoing support. Start your
//                 transformation today and experience the power of personalized
//                 nutrition coaching.
//               </p>

//               {/* CTA Buttons */}
//               <div className="mt-10 flex flex-col sm:flex-row gap-4">
//                 <Link
//                   href="#"
//                   className="inline-flex items-center justify-center rounded-lg bg-sidebar px-6 py-3.5 text-base font-semibold text-sidebar-foreground shadow-sm transition hover:bg-sidebar/90"
//                 >
//                   Get Started Today
//                 </Link>
//                 <Link
//                   href="#"
//                   className="inline-flex items-center justify-center rounded-lg border border-primary-foreground/30 bg-background/50 px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition hover:bg-background"
//                 >
//                   Book a Demo
//                 </Link>
//               </div>

//               {/* Happy Customers */}
//               <div className="mt-12 flex items-center gap-4">
//                 <div className="flex -space-x-4">
//                   <Image
//                     src="/images/avatar-1.svg"
//                     alt="Customer 1"
//                     width={50}
//                     height={50}
//                     className="rounded-full border-2 border-primary"
//                   />
//                   <Image
//                     src="/images/avatar-2.svg"
//                     alt="Customer 2"
//                     width={50}
//                     height={50}
//                     className="rounded-full border-2 border-primary"
//                   />
//                   <Image
//                     src="/images/avatar-3.svg"
//                     alt="Customer 3"
//                     width={50}
//                     height={50}
//                     className="rounded-full border-2 border-primary"
//                   />
//                 </div>
//                 <div className="text-base font-medium text-muted-foreground">
//                   <span className="font-bold text-foreground">430+</span> Happy
//                   Customers
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Hero() {
  return (
    <section className="bg-background py-12 md:py-0 lg:py-0">
      <div className="container ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="order-2 lg:order-1"
          >
            <Image
              src="/images/hero.svg"
              alt="Woman smiling and pointing"
              width={950}
              height={830}
              className="w-full h-auto rounded-br-[50px] object-cover"
              priority
            />
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="order-1 lg:order-2 space-y-6"
          >
            <motion.div variants={fadeInUp} className="inline-block">
              <div className="bg-white px-4 py-2 rounded-full inline-flex items-center gap-2 shadow-sm">
                <div className="w-2 h-2 bg-[#CBEA7B] rounded-full animate-pulse"></div>
                <span className="text-sm text-[#234338]">
                  Transform Your ❤️ Health with
                </span>
              </div>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="leading-tight">
              Personalised Nutrition Coaching
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-[#234338]/70 text-lg">
              Welcome to Nutritionist, your partner in achieving optimal health
              through personalized nutrition coaching. Our team of certified
              nutritionists is here to guide you on your weight loss journey,
              providing customized plans and ongoing support. Start your
              transformation today and experience the power of personalized
              nutrition coaching.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button className="bg-[#CBEA7B] text-[#234338] hover:bg-[#B8D96D] px-8 h-12 group">
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                className="border-[#234338] text-[#234338] hover:bg-[#234338] hover:text-white px-8 h-12"
              >
                <Play className="mr-2 h-4 w-4" />
                Book a Demo
              </Button>
            </motion.div>

            {/* Testimonial */}
            <motion.div
              variants={fadeInUp}
              className="pt-8 flex items-center gap-4"
            >
              <div className="relative rounded-full border-khaki border-solid border box-border flex items-center py-2 px-2.5">
                <Image
                  src="/images/avatar-1.svg"
                  alt="Customer 1"
                  width={50}
                  height={50}
                  className="relative object-cover rounded-full border-2 border-primary"
                />
                <Image
                  src="/images/avatar-2.svg"
                  alt="Customer 2"
                  width={50}
                  height={50}
                  className="relative object-cover rounded-full border-2 border-primary"
                />
                <Image
                  src="/images/avatar-3.svg"
                  alt="Customer 3"
                  width={50}
                  height={50}
                  className="relative object-cover rounded-full border-2 border-primary"
                />
              </div>
              <div>
                <p className="text-sm">
                  <span className="text-[#234338]">430+ Happy Customers</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
