import { BtnArrow } from "../../components/buttons";
import Sidebar from "../../components/sidebar";

export const metadata = {
  title: "DeskThing | About",
};

export default function AboutPage() {
  return (
    <>
      <div className="min-h-svh flex flex-row justify-between pt-nav mx-6 xl:mx-0">
        <div className="lg:border-r border-neutral-800 w-full lg:pr-6 xl:px-6 2xl:px-0">
          <div className="mainContainer flex flex-col mx-auto gap-columnGap">
            <h1 className="text-green-600">
              About <br />
              DeskThing
            </h1>
            <section>
              <h2>A Quick History Lesson</h2>
              <p className="characterLimit">
                Spotify officially launched the CarThing in 2022. The device was
                very polarizing to its customers and ultimately flopped in the
                eyes of Spotify. As a result, Spotify has decided not only to
                discontinue the product but also to discontinue support for the
                device, leaving it as e-waste. Spotify has actually encouraged
                users to throw away their current devices. December 9, 2024, marks
                the official end of the very short-lived product. However, many of
                its users have found ways to repurpose the CarThing to increase
                productivity.
              </p>
              <div className="w-full bg-white rounded-2xl h-64 overflow-clip mt-4 border border-neutral-700">
                <img
                  src="./imgs/CarThing_Hero.png"
                  alt="Spotify CarThing"
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="font-mono text-xs mt-2 text-neutral-300">
                CREDIT: SPOTIFY
              </p>
            </section>
            <section>
              <h2>What We Plan to Do About It</h2>
              <p className="characterLimit">
                Summer of 2024, when the announcement was made, I made the choice
                to bring functionality back to the Car Thing. It started as a
                simple TODO List Project (called "TODOThing") but quickly grew to
                be far more capable. Our newfound goal is to provide new
                functionality to these devices Spotify deemed was use for little
                more than being thrown away. If you want to read more on the
                journey it took to get here, you can{" "}
                <a
                  className="text-emerald-500 hover:underline"
                  href="./showcase/when"
                  target="_self"
                >
                  view that right here.
                </a>
              <br />
              <br />
                DeskThing has come a long way since then. We have plans to explore
                new horizons, exploring the world that having a small device on
                your computer can offer in terms of productivity and
                personalization.
              </p>
              <div className="w-full bg-white rounded-2xl h-64 md:h-[500px] overflow-clip mt-4 border border-neutral-700">
                <img
                  src="./imgs/DeskThing_Promo.webp"
                  alt="Deskthing desktop app and on device screens."
                  className="object-cover w-full h-full"
                />
              </div>
            </section>
            <section>
              <h2>What DeskThing Strives to Become</h2>
              <p className="characterLimit">
                DeskThing is a project that aims to provide a platform for users
                to create their own applications and tools for their Car Thing. We
                want to make it easy for anyone to build their own apps, whether
                they are experienced developers or just starting out. We believe
                that the Car Thing has the potential to be a powerful tool for
                productivity and creativity, and we want to help users unlock that
                potential.
                <br />
                <br />
                What started as a hobby project has turned into a passion project.
                We hope to continue to improve the DeskThing and make it a staple
                in the lives of our users. We hope to continue to add new features
                and improve the user experience, making the DeskThing a better
                product for everyone. Take back the Car Thing.
              </p>
              <br />
              <p>We strive to always be:</p>
              <ul className="font-light">
                <li>- 100% Open Source</li>
                <li>- 100% Expandable</li>
                <li>- 100% Capable</li>
              </ul>
            </section>
            <section className="p-6 bg-neutral-900 rounded-2xl">
              <p>
                If you would like to learn more about DeskThing, feel free to
                reach out at{" "}
                <a
                  href="mailto:contact@deskthing.app"
                  className="text-emerald-500 hover:underline"
                >
                  contact@deskthing.app
                </a>{" "}
                or you can
              </p>
              <div className="mt-2">
                <BtnArrow to="./showcase/who" label="Go to the showcase" />
              </div>
            </section>
          </div>
        </div>
        <Sidebar />
      </div>
    </>
  );
}
