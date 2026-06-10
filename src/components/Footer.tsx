import { FaLinkedin, FaGithub, FaHeart } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import version from "../../package.json";

const Github = FaGithub as any;
const Linkedin = FaLinkedin as any;
const Mail = FiMail as any;
const Heart = FaHeart as any;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-zinc-800/40 text-center mt-24">
      <div className="flex flex-col items-center justify-center layout">
        <p className="pb-4 text-sm text-zinc-400">
          Feel free to connect or drop an email!
        </p>
        <div className="flex gap-6 pb-8">
          {/* github */}
          <a
            href="https://github.com/MrWaradana"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-zinc-100 transition duration-200"
          >
            <Github className="text-xl" />
          </a>
          {/* linkedin */}
          <a
            href="https://www.linkedin.com/in/mrwaradana/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-[#0077b5] transition duration-200"
          >
            <Linkedin className="text-xl" />
          </a>
          {/* email */}
          <a
            href="mailto:muhammadridhowaradanda@gmail.com"
            className="text-zinc-400 hover:text-zinc-100 transition duration-200"
          >
            <Mail className="text-xl" />
          </a>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 text-xs text-zinc-500">
          <p className="flex items-center gap-1">
            Made with{" "}
            <Heart className="text-rose-500 animate-pulse" />{" "}
            by{" "}
            <a href="#" className="hover:text-indigo-400 transition font-medium">
              MrWaradana
            </a>
          </p>
          <div className="flex items-center gap-2">
            <span>© {currentYear}</span>
            <span>•</span>
            <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-400">
              v{version.version}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
