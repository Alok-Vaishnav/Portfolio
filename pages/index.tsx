import React, { useState } from "react";
import Head from "next/head";
import { cubicBezier, motion } from "framer-motion";
import { Navigation } from "../components/Navigation/Navigation";
import ReactGa from "react-ga";

interface indexProps {}

interface Tool {
  name: string;
  icon: string;
}

// Move third-party libs to dynamic imports inside useEffect to avoid module-level side effects

const transition: { duration: number; ease: any } = {
  duration: 1.4,
  ease: cubicBezier(0.6, 0.01, -0.05, 0.9),
  // ease: [0.6, 0.01, -0.05, 0.9],
};


const Index: React.FC<indexProps> = () => {
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);
  
  const cursorRef = React.useRef<HTMLDivElement>(null);
  const lscrollRef = React.useRef<any>(null);

  

  const refScroll = React.useRef(null);
  // store LocomotiveScroll instance in a ref to survive Fast Refresh

  React.useEffect(() => {
    ReactGa.initialize("UA-177100391-3");
    ReactGa.pageview(window.location.pathname + window.location.search);

    if (!refScroll.current) return;

    const setupScrollAndEffects = async () => {
      const [{ default: LocomotiveScroll }, { default: HoverEffect }] = await Promise.all([
        import("locomotive-scroll"),
        import("hover-effect")
      ]);

      // init locomotive scroll
      // @ts-ignore
      lscrollRef.current = new LocomotiveScroll({
        el: refScroll.current,
        smooth: true,
        reloadOnContextChange: true,
        multiplier: 0.75,
        inertia: 0.5,
      });

      // update locomotive scroll on load
      window.addEventListener("load", () => {
        if (lscrollRef.current) {
          lscrollRef.current.update();
        }
      });

      // image hover effect
      Array.from(document.querySelectorAll(".project-card__middle")).forEach((el: any) => {
        const imgs: any = Array.from(el.querySelectorAll("img"));
        new HoverEffect({
          parent: el,
          intensity: 0.2,
          speedIn: el.dataset.speedin || undefined,
          speedOut: el.dataset.speedout || undefined,
          easing: el.dataset.easing || undefined,
          hover: el.dataset.hover || undefined,
          image1: imgs[0].getAttribute("src"),
          image2: imgs[1].getAttribute("src"),
          displacementImage: el.dataset.displacement,
        });
      });
    };

    setupScrollAndEffects();

    // moved hover effects and scroll init into dynamic import block above

    // header cursor
    const cursorEl = cursorRef.current;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    if (!cursorEl || isTouch) return;

    const move = (e: MouseEvent) => {
      cursorEl.style.setProperty("--x", `${e.clientX}px`);
      cursorEl.style.setProperty("--y", `${e.clientY}px`);
    };

    const show = () => {
      cursorEl.classList.remove("custom-cursor--hidden");
      cursorEl.style.setProperty("opacity", "1");
      
    };
    const hide = () => {
      cursorEl.classList.add("custom-cursor--hidden");
      cursorEl.style.setProperty("opacity", "0");
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseenter", show, { passive: true });
    window.addEventListener("mouseleave", hide, { passive: true });

    // Set initial position to center and show immediately for browsers that delay mouseenter
    cursorEl.style.setProperty("--x", `${window.innerWidth / 2}px`);
    cursorEl.style.setProperty("--y", `${window.innerHeight / 2}px`);
    show();

    

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseenter", show);
      window.removeEventListener("mouseleave", hide);
      if (lscrollRef.current && typeof lscrollRef.current.destroy === "function") {
        lscrollRef.current.destroy();
        lscrollRef.current = null;
      }
    };
  }, []);

  function toggleBodyScroll(isToggleOpen: boolean) {
    if (isToggleOpen === false) {
      setIsToggleOpen(true);
    } else if (isToggleOpen === true) {
      setIsToggleOpen(false);
    }
  }

  // list of tools to show in the .tools section
  const tools: Tool[] = [
    {
      name: "Git & GitHub",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    },
    {
      name: "HTML",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    },
    {
      name: "CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    },
    {
      name: "Tailwind CSS",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@vlatest/icons/tailwindcss.svg",
    },
    {
      name: "Bootstrap",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    },
    {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "C",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    },
    {
      name: "C++",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    },
    {
      name: "React.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Vite.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg",
    },
    {
      name: "Next.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    },
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "Express.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    },
    {
      name: "MongoDB",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
    {
      name: "MySQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    },
    {
      name: "WebSockets",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
    },
    {
      name: "GraphQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
    },
    {
      name: "REST APIs",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
    },
    {
      name: "Redis",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    },
    {
      name: "Redux",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
    },
    {
      name: "Docker",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    },
    {
      name: "Kubernetes",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    },
    {
      name: "Jenkins",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
    },
    {
      name: "Postman",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
    },
    {
      name: "Figma",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    },
    {
      name: "Vercel",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
    },
    {
      name: "Netlify",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg",
    },
    {
      name: "Canva",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg",
    },
  ];

  return (
    <>
      <div ref={cursorRef} className="custom-cursor custom-cursor--hidden" />
      <div id="menu-target" data-scroll-container ref={refScroll}>
        <Head>
          <link rel="icon" href="/Fav/favicon.ico" />
          <link href="https://aalok.codes" rel="canonical" />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/Fav/apple-touch-icon.png"
          />

          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/Fav/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/Fav/favicon-16x16.png"

            
          />

        
          <meta name="theme-color" content="#10101A" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="#10101A"
          />
          <title>Aalok👲</title>
          <meta
            name="description"
            content="I'm a self-taught Front End Developer and turning ideas into real life products is my calling."
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Alok Vaishnav &mdash; Frontend Developer"
          />
          <meta property="og:url" content="https://aalok.codes" />
          <meta property="og:image" content="webp/preview-image.png" />
          <meta
            property="og:description"
           content="I'm a Full Stack Developer and turning ideas into real life products is my calling."
          />
          <meta
            name="twitter:title"
            content="Alok Vaishnav &mdash; Full Stack Developer"
          />
          <meta
            name="twitter:description"
            content="I'm a Full Stack Developer and turning ideas into real life products is my calling."
          />
          <meta name="twitter:image" content="webp/preview-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://aalok.codes" />
        </Head>

        <motion.div
          data-scroll
          data-scroll-sticky
          data-scroll-target="#menu-target"
          animate={{ top: "-100vh", transition: { ...transition, delay: 6 } }}
          className="preloader"
        >
          <div className="preloader__wrapper">
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { ...transition } }}
              className="preloader__left"
            ></motion.div>
            <motion.div
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { ...transition } }}
              className="preloader__right"
            >
              <p className="preloader__text">Code</p>
              <p className="preloader__text">Web</p>
              <p className="preloader__text">Cloud</p>
              <p className="preloader__text">Full-Stack</p>
            </motion.div>
          </div>
        </motion.div>

        {/* <div className="cursor">

        </div> */}

        <Navigation
          isOpen={isToggleOpen}
          toggleOpen={() => toggleBodyScroll(isToggleOpen)}
        />
        <div className="header-wrapper">
          <header className="header">
            <div className="header__hero">
              <div className="header__hero__content">
                <div className="header__hero--heading">
                  <div>turning ideas into</div>
                  <div>real life <span className="header__hero--heading-gradient">products</span></div>
                  <div>is my calling.</div>
                </div>

                <a
                  className="header__hero--cta"
                  href="https://drive.google.com/file/d/1-Kyl0sg2u7H18g3sRIX3GpK9MAsNyhRy/view?usp=sharing"
                  rel="noopener"
                  target="_blank"
                >
                 The Paperwork
                </a>

              </div>

              <div className="header__hero__photo">

                <img
                  src="webp/Profile.png"
                  alt="Alok Vaishnav portrait"
                  loading="lazy"
                  className="profile-image"
                />

              </div>
              
            </div>


          </header>
          <div className="header__footer">
            <div className="header__footer--left"></div>
          </div>
        </div>

        <main className="container">

          {/* About-me */}
          
          <p className="about-text">
            “Hello stranger!” 👋 I’m Alok Vaishnav — a Full-Stack Developer and Cloud Enthusiast.
            <br />I focus on creating reliable, scalable web applications and cloud-based solutions, with an emphasis on

            <br />clean code, performance, and real-world usability.
          </p>

          {/* projects */}
          <section id="sectionProjects" className="section-projects">
            <h1 className="heading-1">
              <span>CodeCrafts</span> <small>💼</small>
            </h1>

            {/* 01 */}
            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">
                  Vite JS, Java-Script, Socket.io, Express JS, Node JS
                </h4>
              </div>

              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="/webp/Chatify-1.png" alt="chatify model" />
                <img src="/webp/Chatify-2.png" alt="chatify logo" />
              </div>

              <div className="project-card__right">
                <h2 className="heading-2 chatify-anim">
                  Chatify
                  <br /> <span className="project-card__tag">ChatApp</span>
                </h2> 
                
                <div className="project-card__details">
                  <p>
                    Real-time chat built with Socket.io, Express and Node. Fast,
                    secure rooms with presence and typing indicators.
                  </p>
                  <ul>
                    <li>One-to-one and group conversations</li>
                    <li>Online status and message delivery</li>
                    <li>Responsive UI with smooth animations</li>
                  </ul>
                </div>
                <a
                  rel="noopener"
                  target="_blank"
                  href="https://chatify-orpin.vercel.app"
                  className="project-card__link"
                >
                  Take a Look
                </a>

                <div className="project-card__socials">
                  <a
                    rel="noopener"
                    target="_blank"
                    href="https://github.com/Alok-Vaishnav/Chatify"
                  >
                    <img src="svg/github.svg" alt="github icon" />
                  </a>
                </div>
              </div>
            </div>

            {/* 02 */}
            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">REACT JS, FRAMER MOTION</h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="webp/safarika-1.webp" alt="safarika" />
                <img src="webp/safarika-2.webp" alt="safarika logo" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="safarika-anim"
                  className="heading-2"
                >
                  Safarika
                </h2>

                <div className="project-card__details">
                  <p>
                    Travel landing page showcasing destinations with delightful
                    motion and hover transitions.
                  </p>
                  <ul>
                    <li>Framer Motion animations</li>
                    <li>Responsive React components</li>
                    <li>Optimized asset loading</li>
                  </ul>
                </div>
                <a
                  rel="noopener"
                  target="_blank"
                  href=""
                  className="project-card__link"
                >
                  Take a Look
                </a>
                <div className="project-card__socials">
                  <a
                    rel="noopener"
                    target="_blank"
                    href=""
                  >
                    <img src="svg/github.svg" alt="github icon" />
                  </a>
                </div>
              </div>
            </div>

            {/* 03 */}

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">
                  ReactJs, MongoDb, JSON Token,NodeJs
                </h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="webp/Paper-Trail-1.png" alt="paper-trail" />
                <img src="webp/Paper-Trail-2.png" alt="paper-trail logo" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="heatrow-anim"
                  className="heading-2"
                >
                  Paper-Trail
                  <br /> <span className="project-card__tag">Notes App</span>
                </h2>
                <div className="project-card__details">
                  <p>
                    Full-stack notes application with authentication and cloud
                    persistence.
                  </p>
                  <ul>
                    <li>JWT auth with protected routes</li>
                    <li>MongoDB storage via Mongoose</li>
                    <li>Search and tag management</li>
                  </ul>
                </div>
                <a
                  href="https://paper-trail-zeta.vercel.app/"
                  rel="noopener"
                  target="_blank"
                  className="project-card__link"
                >
                  Take a Look
                </a>
                <div className="project-card__socials">
                  <a
                    rel="noopener"
                    target="_blank"
                    href="https://github.com/Alok-Vaishnav/Paper-Trail"
                  >
                    <img src="svg/github.svg" alt="github icon" />
                  </a>
                </div>
              </div>
            </div>

            {/* 04 */}

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">
                  ReactJs, ExpressJs, TailwindCss, Mongoose{" "}
                </h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="webp/Shoping-Mart-01 .png" alt="shoping mart" />
                <img src="webp/Shoping-Mart-02 .png" alt="shoping mart" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="adeola-anim"
                  className="heading-2"
                >
                  Shoping-Mart
                  <br /> <span className="project-card__tag">E-Commerce App</span>
                </h2>

                <div className="project-card__details">
                  <p>
                    Modern e-commerce experience with cart, checkout and
                    product management.
                  </p>
                  <ul>
                    <li>Express API with MongoDB</li>
                    <li>Tailwind-styled React frontend</li>
                    <li>Secure user accounts and orders</li>
                  </ul>
                </div>

                <a
                  rel="noopener"
                  target="_blank"
                  href="https://shoping-mart-sepia.vercel.app/"
                  className="project-card__link"
                >
                  Take a Look
                </a>

                <div className="project-card__socials">
                  <a
                    rel="noopener"
                    target="_blank"
                    href="https://github.com/Alok-Vaishnav/Shoping-Mart"
                  >
                    <img src="svg/github.svg" alt="github icon" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* skills */}
          <section
            data-scroll
            data-scroll-offset="35%"
            data-scroll-repeat={true}
            data-scroll-class="section-reviews__bg"
            className="section-reviews"
          >
            <div className="section-reviews__top">
              <h1 className="heading-1">
                <span>Check out what I bring to the table</span>
                <small>🛠️</small>
              </h1>
            </div>

            {/* tools list below the reviews */}
            <div className="tools">
              {tools.map((tool) => {
                const needsInvert = [
                  "Git & GitHub",
                  "Tailwind CSS",
                  "Express.js",
                  "WebSockets",
                  "Vercel"
                ].includes(tool.name);
                
                return (
                  <div key={tool.name} className="tools__item">
                    <img 
                      src={tool.icon} 
                      alt={tool.name}
                      className={needsInvert ? "white-icon" : ""}
                    />
                    <span className="tools__tooltip">{tool.name}</span>
                  </div>
                );
              })}
            </div>
          </section>

          <section
            data-scroll
            data-scroll-offset="35%"
            data-scroll-repeat={true}
            data-scroll-class="section-reviews__bg"
            className="section-reviews"
          >
            <div className="section-reviews__top">
              <h1 className="heading-1">
                <span> Where it all started</span>
                <small>🎓</small>
              </h1>

              <div
                className="education"
                style={{
                  display: "flex",
                  gap: "3rem",
                  flexWrap: "wrap",
                  marginTop: "4rem",
                }}
              >
                <div
                  className="education__item"
                  style={{
                    flex: "1 1 calc(50% - 1.5rem)",
                    background:
                      "linear-gradient(135deg, rgba(4, 93, 233, 0.08) 0%, rgba(9, 198, 249, 0.12) 100%)",
                    border: "1px solid rgba(9, 198, 249, 0.2)",
                    borderRadius: "16px",
                    padding: "3rem 2.5rem",
                    minWidth: "320px",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 40px rgba(9, 198, 249, 0.2)";
                    e.currentTarget.style.borderColor =
                      "rgba(9, 198, 249, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 20px rgba(0, 0, 0, 0.1)";
                    e.currentTarget.style.borderColor =
                      "rgba(9, 198, 249, 0.2)";
                  }}
                >
                  <div
                    style={{
                      fontSize: "3rem",
                      marginBottom: "1rem",
                      background:
                        "linear-gradient(135deg, #045de9 0%, #09c6f9 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    📚
                  </div>
                  <h4
                    className="heading-4"
                    style={{ marginBottom: "0.8rem", fontSize: "1.8rem" }}
                  >
                    Bachelor of Computer Applications
                  </h4>

                  <p
                    style={{
                      fontSize: "1.2rem",
                      color: "rgba(255, 255, 255, 0.6)",
                      fontWeight: "300",
                      letterSpacing: "0.5px",
                    }}
                  >
                   Computer Applications
                  </p>

                  <p
                    className="paragraph"
                    style={{
                      marginTop: "1.5rem",
                      color: "rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    Kuchaman College •  2021-2024
                  </p>

                  <p
                    style={{
                      fontSize: "1rem",
                      color: "rgba(255, 255, 255, 0.6)",
                      fontWeight: "300",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Kuchaman City
                  </p>

                </div>

                <div
                  className="education__item"
                  style={{
                    flex: "1 1 calc(50% - 1.5rem)",
                    background:
                      "linear-gradient(135deg, rgba(109, 160, 161, 0.08) 0%, rgba(33, 54, 56, 0.12) 100%)",
                    border: "1px solid rgba(109, 160, 161, 0.2)",
                    borderRadius: "16px",
                    padding: "3rem 2.5rem",
                    minWidth: "320px",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 40px rgba(109, 160, 161, 0.2)";
                    e.currentTarget.style.borderColor =
                      "rgba(109, 160, 161, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 20px rgba(0, 0, 0, 0.1)";
                    e.currentTarget.style.borderColor =
                      "rgba(109, 160, 161, 0.2)";
                  }}
                >
                  <div
                    style={{
                      fontSize: "3rem",
                      marginBottom: "1rem",
                      background:
                        "linear-gradient(135deg, #6da0a1 0%, #213638 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    🎓
                  </div>
                  <h4
                    className="heading-4"
                    style={{ marginBottom: "0.8rem", fontSize: "1.8rem" }}
                  >
                    Master of Computer Applications
                  </h4>

                  <p
                    style={{
                      fontSize: "1.2rem",
                      color: "rgba(255, 255, 255, 0.6)",
                      fontWeight: "300",
                      letterSpacing: "0.5px",
                    }}
                  >
                   Cloud Computing & Full-Stack Development
                  </p>

                  <p
                    className="paragraph"
                    style={{
                      marginTop: "1.5rem",
                      color: "rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    JECRC University • 2024-2026
                  </p>

                  <p
                    style={{
                      fontSize: "1rem",
                      color: "rgba(255, 255, 255, 0.6)",
                      fontWeight: "300",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Jaipur
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="section-socials">
            <h1 className="heading-1">
              <span>Don`t be a stranger!</span> <small>👋</small>
            </h1>
            <p className="paragraph">Connect with me online</p>

            <div className="section-socials--links">
              <a
                href="https://github.com/Alok-Vaishnav"
                rel="noopener"
                target="_blank"
              >
                👾 GitHub 🛠️
              </a>

              <a
                href="https://leetcode.com/u/AlokVaishnav/"
                rel="noopener"
                target="_blank"
              >
                🐦 Leet-Code
              </a>

              <a
                href="mailto:alok.vsnv@gmail.com "
                rel="noopener"
                target="_blank"
              >
                ✉️ Email
              </a>

              <a
                href="https://www.linkedin.com/in/alok-vaishnav-63a9a4290"
                rel="noopener"
                target="_blank"
              >
                💼 LinkedIn
              </a>

              <a
                href="https://www.instagram.com/aalok_vsnv/"
                rel="noopener"
                target="_blank"
              >
                📸 Instagram
              </a>

            </div>
          </section>
        </main>
        <footer className="footer">
          <div className="footer__socials">
            <a
              href="https://github.com/Alok-Vaishnav"
              target="_blank"
              rel="noopener"
            >
              <img src="svg/github.svg" alt="github logo" />
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
