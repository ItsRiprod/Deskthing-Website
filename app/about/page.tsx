import { Button } from '@/components/ui/button';
import { Github, Heart } from 'lucide-react';
import Link from 'next/link';

export default function About() {
  return (
    <section className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
          About DeskThing
        </h1>

        <div className="max-w-4xl mx-auto px-4 pb-8 leading-relaxed">
          <p className="text-lg mb-4">
            <strong>A quick history lesson</strong>
          </p>
          <p className="mb-6">
            Spotify officially launched the Car Thing in 2022. The device was
            polarizing and, in the eyes of Spotify, ultimately flopped. As a
            result, Spotify decided to not only discontinue the product but also
            cut support for it, effectively leaving it as e-waste. In fact,
            Spotify has even encouraged users to discard their current devices.
            They'll end support entirely on December 9, 2024. However, many
            users have found clever ways to hack their Car Things, repurposing
            the Car Thing to boost its productivity in unexpected ways.
          </p>

          <p className="text-lg mb-4">
            <strong>How We're Changing Things</strong>
          </p>
          <p className="mb-6">
            The DeskThing project aims to extend the life of the Car Thing,
            while enabling additional features to further boost productivity.
            Currently, the DeskThing is compatible with the Car Thing when
            connected directly to a computer. However, our end goal is to make
            it more adaptable to individual needs. This includes compatibility
            with other devices like Raspberry Pis, Android phones, desktop apps,
            and more.
          </p>
          <p className="mb-6">
            Currently, the DeskThing expands upon the Car Thing’s original
            functionality by eliminating the need for a Bluetooth connection to
            a mobile device with the Spotify app, adding local audio support
            (allowing it to report information from various sources), and
            integrating synced song lyrics and weather reporting. Although much
            work remains to make this project the product the Car Thing should
            have been at launch, we aim to reduce unnecessary e-waste and
            provide the best user experience past having a second monitor.
          </p>

          <p className="text-lg mb-4">
            <strong>Where we're headed</strong>
          </p>
          <p className="mb-6">
            What started as a hobby project has evolved into a genuine passion.
            We aim to keep enhancing DeskThing, steadily improving its features
            and user experience. With ongoing updates and thoughtful additions,
            we’re committed to making it the best it can be, bringing new life
            to the Car Thing.
          </p>

          <p className="text-lg mb-4">
            <strong>Our values:</strong>
          </p>
          <ul className="list-disc pl-4">
            <li>Forever open source</li>
            <li>Designed for Flexibility</li>
            <li>Built to last</li>
          </ul>

          <div className="pt-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link
                href="https://github.com/itsriprod/deskthing"
                target="_blank"
              >
                <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
                  <Github className="mr-2 h-4 w-4" />
                  Contribute on GitHub
                </Button>
              </Link>
              <Link href="#" target="_blank">
                <Button
                  variant="outline"
                  className="border-green-800 w-full sm:w-auto"
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Support the Project
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
