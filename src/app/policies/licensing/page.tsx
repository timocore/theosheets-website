import Link from "next/link";
import { SerifHeading } from "@/components/shared/SerifHeading";

export default function LicensingPage() {
  return (
    <>
      <SerifHeading as="h1" className="mb-10">
        Licensing Terms
      </SerifHeading>

      <div className="space-y-10 text-charcoal-light">
        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">Introduction</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              All music available on TheoSheets is protected by copyright and is provided under a limited usage license.
            </p>
            <p>
              When you purchase a digital product from TheoSheets, you are purchasing a license to use the content, not ownership of the composition or recordings.
            </p>
            <p>
              These licensing terms explain what you are allowed to do with purchased materials.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">Personal License</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              Every purchase includes a single-user license. This license allows the purchaser to:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Download the files to personal devices</li>
              <li>Print the sheet music for personal use</li>
              <li>Practice and rehearse the music</li>
              <li>Perform the music publicly</li>
              <li>Use accompaniment tracks for performances</li>
              <li>Record performances of the music</li>
            </ul>
            <p>
              The license is granted to one individual user only.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">Public Performance</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              Music purchased from TheoSheets may be performed publicly, including:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Concerts</li>
              <li>Recitals</li>
              <li>Live performances</li>
              <li>Church services</li>
              <li>Educational performances</li>
              <li>Competitions</li>
            </ul>
            <p>
              Whenever possible, we appreciate credit such as: <em>Music by TheoSheets</em>
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">Recording and Online Sharing</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              You are permitted to record performances of the music and share them online, including on platforms such as:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>YouTube</li>
              <li>Instagram</li>
              <li>TikTok</li>
              <li>SoundCloud</li>
              <li>Personal websites</li>
            </ul>
            <p>
              When sharing recordings, please credit the composer or TheoSheets when possible.
            </p>
            <p>
              Example: <em>Music from TheoSheets – www.theosheets.com</em>
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">Educational Use</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              Teachers may use purchased sheet music for instruction and demonstration.
            </p>
            <p>
              However, the files may not be distributed to students or shared publicly. Each student should obtain their own licensed copy of the music.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">Accompaniment Tracks</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              Accompaniment tracks may be used for:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Practice</li>
              <li>Performances</li>
              <li>Recordings</li>
              <li>Rehearsal</li>
            </ul>
            <p>
              The audio files themselves may not be redistributed or shared separately.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">Multitrack Files</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              Multitrack files are intended for music production and performance preparation. They may be used for:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Creating recordings</li>
              <li>Mixing and arrangement</li>
              <li>Performance preparation</li>
            </ul>
            <p>
              Multitrack audio may not be redistributed, resold, or uploaded to any file-sharing platform.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">Prohibited Uses</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              The following actions are not permitted:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Sharing purchased files with others</li>
              <li>Uploading files to public websites</li>
              <li>Distributing files through file-sharing platforms</li>
              <li>Reselling or redistributing the sheet music or audio</li>
              <li>Including the files in digital libraries or subscription services</li>
              <li>Claiming the music as your own composition</li>
            </ul>
            <p>
              Each purchase grants a license for individual use only.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">Copyright</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              All compositions, sheet music, recordings, and related content remain the intellectual property of TheoSheets and the respective composer.
            </p>
            <p>
              Unauthorized copying or redistribution of any materials is prohibited and may violate copyright law.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">Commercial Use</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              If you wish to use TheoSheets music in a commercial production, film, or other commercial project, please contact us to discuss licensing.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">Supporting Independent Music</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p className="text-charcoal">
              Every purchase helps support the creation of new music for performers around the world. Thank you for respecting the licensing terms and supporting independent composers.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-charcoal mb-4">Contact</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              If you have questions about licensing or usage rights, please contact us through the{" "}
              <Link href="/contact" className="text-honey hover:text-honey-dark underline underline-offset-2">
                Contact page
              </Link>{" "}
              on this website.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
