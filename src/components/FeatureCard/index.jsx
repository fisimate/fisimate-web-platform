import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

export default function FeatureCard({ img, title, description }) {
  return (
    <React.Fragment>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.9,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="flex flex-col bg-white border-2 border-gray rounded-xl lg:flex-row lg:max-w-xl w-2/3 lg:w-2/5"
      >
        <Image
          className="object-cover w-full h-48 rounded-t-xl lg:h-46 lg:w-40 lg:rounded-none lg:rounded-s-xl"
          src={img}
          alt="feature"
          width={400}
          height={320}
        />
        <div className="flex flex-col p-6 leading-normal text-start">
          <h5 className="text-xl font-bold tracking-tight text-black">
            {title}
          </h5>
          <p className="mt-2 font-normal text-body text-sm">{description}</p>
        </div>
      </motion.div>
    </React.Fragment>
  );
}
