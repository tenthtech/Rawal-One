import type { Metadata } from "next";
import Link from "next/link";

import { CityPageIntro } from "@/components/city/city-page-intro";
import { CityContextNote, CitySources } from "@/components/city/city-sources";
import { PoliceDirectory } from "@/components/city/police-directory";

import styles from "@/components/city/health-safety.module.css";

export const metadata: Metadata = {
  title: "Police & public safety | Know Rawalpindi",
  description:
    "Police Emergency 15 and the official Punjab Police Rawalpindi station and circle directory, with name and circle filters.",
};

export default function PublicSafetyPage() {
  return (
    <>
      <CityPageIntro
        eyebrow="Police & public safety"
        title="Police & public safety"
        description="Reach Punjab Police and find station or post contacts in its published Rawalpindi directory."
        sections={[
          { href: "#police-emergency", label: "Police emergency" },
          { href: "#police-stations", label: "Find a police station" },
        ]}
      />

      <section id="police-emergency" className={styles.policeEmergencySection} aria-labelledby="police-emergency-heading">
        <div className={`civic-container ${styles.policeEmergency}`}>
          <div>
            <p className="civic-eyebrow">Punjab Police</p>
            <h2 id="police-emergency-heading" className="civic-heading mt-2">Police emergency</h2>
            <p className={styles.policeEmergencyDescription}>For police emergencies, the official contact is 15. Station directory numbers below are separate contacts.</p>
            <CitySources ids={["police-emergency"]} className="mt-3" />
          </div>
          <a href="tel:15" className={styles.emergencyNumber} aria-label="Call Punjab Police emergency on 15">
            <span>15</span>
            <span className={styles.callLabel}>Call Punjab Police<span aria-hidden="true"> →</span></span>
          </a>
        </div>
      </section>

      <section id="police-stations" className={styles.policeSection} aria-labelledby="police-stations-heading">
        <div className="civic-container">
          <div className={styles.sectionIntro}>
            <div>
              <p className="civic-eyebrow">Stations & posts</p>
              <h2 id="police-stations-heading" className="civic-heading mt-2">Find a police station</h2>
            </div>
            <p>Browse the facilities and circles in Punjab Police’s published Rawalpindi directory. These services are operated by Punjab Police.</p>
          </div>
          <aside className={styles.scopeNote} aria-label="Directory coverage and date">
            <p>The official listing includes Murree and Kotli Sattian; its update date is not shown. Confirm station details with Punjab Police.</p>
            <p>Entries reflect the published directory, rather than a guarantee of the current operating roster or district boundaries.</p>
            <CitySources ids={["police-directory"]} className="mt-3" />
          </aside>
          <PoliceDirectory />
          <p className={styles.note}>A direct telephone link is omitted where the printed number could not be verified in a usable format. Follow the official directory link for that entry.</p>
          <Link href="/rawalpindi/health-emergency" className="civic-link mt-3">Hospitals & emergency numbers<span aria-hidden="true"> →</span></Link>
        </div>
      </section>
      <CityContextNote />
    </>
  );
}
