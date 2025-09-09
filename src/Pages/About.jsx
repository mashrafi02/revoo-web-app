import { motion } from "framer-motion";

function About() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-6 py-12 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full bg-gray-900/70 shadow-lg rounded-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-white mb-4">
          About Our App
        </h1>
        <p className="text-white leading-relaxed mb-6">
          Welcome to <span className="font-semibold">Revoo</span>, a place
          where movie lovers can discover, review, and share their thoughts on
          films from around the world. Our goal is to connect people through the
          stories that inspire, entertain, and challenge us.
        </p>

        <h2 className="text-2xl font-semibold text-white mb-3">
          What We Offer
        </h2>
        <ul className="md:list-disc md:list-inside text-white space-y-2 mb-6">
          <li>Browse movies and discover hidden gems</li>
          <li>Read and write honest reviews</li>
          <li>Like and interact with other users’ opinions</li>
          <li>Personalized recommendations based on your taste</li>
        </ul>

        <h2 className="text-2xl font-semibold text-white mb-3">
          Our Mission
        </h2>
        <p className="text-white leading-relaxed">
          We believe movies are more than entertainment—they’re experiences that
          connect us to different cultures, ideas, and perspectives. Our mission
          is to create a space where everyone’s voice matters and film
          discussions come alive.
        </p>
      </motion.div>
    </div>
  );
}


export default About;